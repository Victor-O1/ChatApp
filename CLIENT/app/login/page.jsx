"use client"
import React, { useState } from 'react';


const Login = () => {
    const [username, setusername] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function authenticateUser() {

        const res = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email }),
            credentials: 'include'
        });
        const data = await res.json();
        console.log("data is ", data);
    }

    const submit = (e) => {
        e.preventDefault();
        authenticateUser()
    }


    return (
        <div className="w-full h-screen flex justify-center items-center">

            <div className="flex flex-col gap-2 bg-yellow-300 w-[30vw] h-[30vh] justify-center items-center rounded-xl">
                <div className="text-3xl">LOGIN</div>
                <input type="text" placeholder="username" value={username} onChange={(e) => setusername(e.target.value)} className="p-2 outline-none rounded-xl" />
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 outline-none rounded-xl' />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 outline-none rounded-xl" />
                <button className="p-2 bg-red-400 hover:bg-red-600 rounded-xl" onClick={submit} >SUBMIT</button>
            </div>
        </div>
    )
};

export default Login;
