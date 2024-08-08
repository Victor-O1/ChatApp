"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Chats from './Chats'



const LeftPanel = () => {

    const { theme, setTheme } = useTheme()
    return (
        <div className="flex flex-col gap-2 ">

            <div className="flex justify-between p-5 mt-3 text-primary rounded-xl dark:bg-black">
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-3xl font-bold font-play">Pheonix</div>
                <div className="flex gap-3">
                    <div>

                        {theme === "dark" ? <Moon size={26} onClick={() => setTheme("light")} className=" my-2 rounded text-primary" /> : <Sun size={26} onClick={() => setTheme("dark")} className="my-2 rounded text-primary" />}
                    </div>
                    <div>
                        <MessageSquare size={24} strokeWidth={2} absoluteStrokeWidth className="dark:color-slate-900 my-2 text-primary" />
                    </div>

                </div>
            </div>
            <div className="p-2 rounded"><Input placeholder={"Search for friends and groups"} /></div>
            <Chats />
        </div>
    )
}

export default LeftPanel