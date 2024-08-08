import mongoose from "mongoose"

const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log("Already connected")
        return;
    }
    else if (connectionState === 2) {
        console.log("Connecting...")
        return
    }
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/PHEONIXGO")
        console.log("Connected")
    }
    catch (e) {
        console.log(e)
    }
}

export default connect
// const connectDB = async () => {
// try {
// const { connection } = await mongoose.connect("mongodb://localhost:27017/")
// console.log(`MongoDB Connected: ${connection.host}`)
// }
// catch (e) {
// console.log(e)
// }
// }

// export {connectDB}
