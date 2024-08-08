"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'


const Signup = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [bio, setbio] = useState("")
    const [res, setres] = useState(null)

    async function createUser() {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, bio }),
            credentials: 'include'
        })
        const data = await res.json()
        console.log("data is ", data)
    }

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
        e.preventDefault()
        createUser()
        authenticateUser()
    }
    return (
        <div className="w-full h-screen flex justify-center items-center ">
            {/* <div className="flex flex-col gap-2 w-1/2 h-1/2 bg-purple-200 justify-center items-center p-5 rounded-2xl"> */}
            <form className="flex flex-col gap-2 w-1/2 h-1/2 overflow-auto bg-orange-200 justify-center items-center p-5 rounded-2xl" method='POST' action="http://localhost:3000/users" onSubmit={submit}>
                <div className="text-3xl mb-3">SIGNUP</div>
                <Input type="text" name="username" placeholder="Please enter your name" className=" p-2 outline-none rounded-xl" value={username} onChange={(e) => setusername(e.target.value)} />
                <Input type="email" name="email" placeholder="Please enter your email" className="p-2 outline-none rounded-xl" value={email} onChange={(e) => setemail(e.target.value)} />
                <Input type="password" name="password" placeholder="Please enter your password" className=" p-2 outline-none rounded-xl" value={password} onChange={(e) => setpassword(e.target.value)} />
                <textarea type="text" name="bio" placeholder="Do tell us something about yourself" className="w-full p-2 outline-none rounded-xl" value={bio} onChange={(e) => setbio(e.target.value)} />
                <Button className="mt-5">Signup</Button>
                {res}
            </form>
            {/* </div> */}

        </div>
    )
}

export default Signup