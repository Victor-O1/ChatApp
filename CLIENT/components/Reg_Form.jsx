"use client"
import React from 'react'
import { Input } from './ui/input'

const Reg_Form = () => {
    return (
        <div className="h-screen w-full bg-primary flex justify-center items-center">
            <form onSubmit={(e) => {
                e.preventDefault()

            }}>
                <div className="w-1/3 h-1/3 bg-secondary rounded p-4 flex flex-col gap-4 items-center justify-center">
                    <Input type="text" placeholder="First Name" className="w-full p-2 outline-none rounded-xl" />
                    <Input type="text" placeholder="Last Name" className="w-full p-2 outline-none rounded-xl" />
                    <Input type="email" name="email" placeholder="Email" className="w-full p-2 outline-none rounded-xl" />
                    <Input type="password" name="password" placeholder="Password" className="w-full p-2 outline-none rounded-xl" />

                    <input type='submit' className="p-2 hover:bg-secondary rounded-full" />
                </div>
            </form>
        </div>
    )
}

export default Reg_Form