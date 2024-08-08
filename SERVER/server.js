import express from "express";
import mongoose from "mongoose";
import connectDB from "./models/dbConnect.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cors from "cors"
import path from "path"
import { WebSocketServer, WebSocket } from "ws";
import { logger, logEvents, errorHandler } from "./middleware/logger.js";
import dotenv from "dotenv"
import asyncHandler from "express-async-handler"
dotenv.config()
import users from "./models/users.js"
import loginLimiter from "./middleware/rateLimiter.js";
import verifyJWT from "./middleware/verifyJWT.js";
const app = express();
console.log(process.env.NODE_ENV)
connectDB()
app.use(logger)

app.use(cors(
    {
        origin: (origin, callback) => {
            if (["http://localhost:3000", "http://localhost:3001"].indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        optionsSuccessStatus: 200
    }

))
app.use(express.json())
app.use(cookieParser())
// app.use("/", express.static(path.join(path.resolve(), "./public")))
app.use(express.urlencoded({ extended: true }))


// app.use(verifyJWT)

app.get("/users", asyncHandler(async (req, res) => {
    const user = await users.find()
    if (!user.length) return res.status(404).json({ message: "users not found" })
    res.json(user)
}))


app.post("/users", asyncHandler(async (req, res) => {
    const { username, email, password, bio } = req.body
    console.log("body is    ", req.body)
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const duplicate = await users.findOne({ email })
    if (duplicate) {
        return res.status(409).json({ message: "User already exists" })
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const user = await users.create({
            username,
            email,
            password: hashedPwd,
            bio
        })
        res.status(201).json({ message: "User" + user + "created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}))


app.post("/auth", loginLimiter, asyncHandler(async (req, res) => {

    const { email, username, password } = req.body
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const user = await users.findOne({ email }).exec()
    if (!user) {
        return res.status(401).json({ message: "The user was not found" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json({ message: "The password doesn't match" })
    }

    const accessToken = jwt.sign({ "userInfo": { "username": user.username, "email": user.email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
    const refreshToken = jwt.sign({ "email": user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

    res.cookie("jwt", refreshToken,
        {
            httpOnly: true, //accessible by the web server
            sameSite: "lax",  // cross-site cookie
            secure: false, // only sent over https
            maxAge: 24 * 60 * 60 * 1000 // cookie expires after 24 hrs
        })

    res.json({ accessToken })


}))


app.get("/auth/refresh", asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ "message": "Cookie not found" });
    const refreshToken = cookies.jwt;
    const foundUser = users.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async (err, decoded) => {
        if (err) return res.status(403).json({ "message": "Error in refresh token verification" });
        const foundUser = await users.findOne({ username: decoded.username }).exec();
        if (!foundUser) return res.status(401).json({ "message": "No user with this refresh token (the refresh token was decoded but no username was found)" });
        // const user = await users.findOne({ username: decoded.username }).exec();
        const accessToken = jwt.sign({ "userInfo": { "username": foundUser.username, "roles": foundUser.roles } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
        res.json({ accessToken });
    }));

}))


app.post("/auth/logout", asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(204).json({ "message": "No cookie was found. So, how the hell am i supposed to logout?" })

    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    res.json({ "message": "Cookie was cleared" })
}))


app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts("html")) {
        res.sendFile(path.join(path.resolve(), "./views/404.html"))
    } else if (req.accepts("json")) {
        res.json({ error: "404 not found" })
    } else {
        res.type("txt").send("404 not found")
    }
})

app.use(errorHandler)
const port = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")

    const httpServer = app.listen(port, () => { console.log("Server running at http://localhost:" + port) })
    const wss = new WebSocketServer({ server: httpServer })
    wss.on("connection", (client_wss) => {  // AS SOON AS CONNECTION WITH A CLIENT HAPPENS, client_wss THAT IS THE NAME OF THE CLIENT THAT GOT CONNECTED TO THE WSS IS PASSED TO THE CALLBACK
        console.log("WE HAVE CLIENTS: ", wss.clients.size);
        client_wss.id = "babanana"
        console.log("WE HAVE A NEW CLIENT: ", client_wss);
        client_wss.on("error", (err) => console.log(err)) // Socket is the client that sends the message and holds strings ( "error", "message", "send", "close") and the callback fn is sent to the on method of client_wss and when the string is a certain specified value , the callback fn is executed by the client_wss.on method by the method client_wss.on giving the argument to the callback
        client_wss.on("message", (message, isBinary) => {// AS SOON AS THE MESSAGE IS SENT BY A CLIENT, THAT MESSAGE IS SENT TO THE CALLBACK
            wss.clients.forEach((client) => {
                console.log(client == client_wss);
                if (client.readyState === WebSocket.OPEN && client !== client_wss) {// && client !== client_wss means that clients is basically a set of all the clients connected to the wss that includes client_wss which is the client that is sending the message 
                    client.send(message, { binary: isBinary })
                }

                console.log("message was sent: ", message.toString(), " from ", client_wss);
            })
        })
        client_wss.send("WSS connected. Hello from server. So far " + wss.clients.size + " users are connected and the client_wss is:  ", client_wss) // the message is sent as soon as the connection with the first client is established
    })
})

mongoose.connection.on("error", (err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
    )
})


