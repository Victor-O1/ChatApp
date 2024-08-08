"use client"

import React, { useEffect, useState } from 'react'

const Socket = () => {
    const [socket, setsocket] = useState(null)
    const [latestMessage, setlatestMessage] = useState("")
    const [messages, setmessages] = useState([])

    useEffect(() => {
        const client_wss = new WebSocket("ws://localhost:3000")

        client_wss.onopen = () => {  //as soon as client is connected to the server
            console.log("Client connected to the wss");
            setsocket(client_wss)
            client_wss.send("Hello Server. I am socket.js of the NEXT JS CLIENT")
        }
        client_wss.onmessage = (message) => {
            console.log("A NEW MESSAGE WAS RECIEVED", message.data)
            setlatestMessage(message.data)
        }
        return () => { client_wss.close() }
    }, [])
    if (!socket) return <div>CONNECTING TO THE SERVER.......</div>

    return (
        <div>
            <input type="text" value={latestMessage} onChange={(e) => { setlatestMessage(e.target.value) }} className="bg-green-400" />
            <button onClick={(e) => { socket.send(latestMessage) }}>SEND</button>
        </div>
    )
}

export default Socket