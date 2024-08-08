import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Chats = () => {
    const conversations = [
        {
            _id: "1",
            admin: "user1",
            groupImage: null,
            groupName: "Group A",
            participants: ["user1", "user2", "user3"],
            _creationTime: 1638232272, // Unix timestamp for 2021-11-30 12:04:32 UTC
            lastMessage: {
                _id: "1",
                messageType: "text",
                content: "Hello everyone!",
                sender: "user1",
            },
            sender: "user1",
            isOnline: true,
        },
        {
            _id: "2",
            admin: null,
            groupImage: "https://avatars.githubusercontent.com/u/75279146?v=4",
            groupName: null,
            participants: ["user4", "user5"],
            _creationTime: 1638235872, // Unix timestamp for 2021-11-30 13:04:32 UTC
            lastMessage: {
                _id: "2",
                messageType: "text",
                content: "Hey there!",
                sender: "user2",
            },
            sender: "user4",
            isOnline: true,
        },
        {
            _id: "3",
            admin: null,
            groupImage: null,
            groupName: null,
            participants: ["user6", "user7"],
            _creationTime: 1638239472, // Unix timestamp for 2021-11-30 14:04:32 UTC
            lastMessage: {
                _id: "3",
                messageType: "image",
                content: "image_url.jpg",
                sender: "user6",
            },
            sender: "user6",
            isOnline: false,
        },
        {
            _id: "4",
            admin: null,
            groupImage:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
            groupName: null,
            participants: ["user8", "user9", "user10"],
            _creationTime: 1638243072, // Unix timestamp for 2021-11-30 15:04:32 UTC
            lastMessage: {
                _id: "4",
                messageType: "video",
                content: "video_url.mp4",
                sender: "user9",
            },
            sender: "user9",
            isOnline: true,
        },
    ];

    const users = [
        {
            _id: "user1",
            name: "John Doe",
            email: "johndoe@email.com",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            admin: true,
            isOnline: true,
        },
        {
            _id: "user2",
            name: "Jane Doe",
            email: "janedoe@email.com",
            image: "https://randomuser.me/api/portraits/women/67.jpg",
            isOnline: true,
        },
        {
            _id: "user3",
            name: "Alice",
            email: "alice@email.com",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            isOnline: false,
        },
    ];


    return (
        <div className="flex flex-col gap-3">
            {conversations.map((conversation) => (
                <div className="p-2">
                    {/* <Card className="p-2"> */}
                    <div key={conversation._id} >
                        <div className="flex gap-2 justify-between">
                            <div className="flex gap-3">
                                <div>
                                    {conversation.isOnline ? <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 " /> : null}
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <h1>{conversation.groupName ? conversation.groupName : conversation.participants[0]}</h1>
                                    <CardDescription>{conversation.lastMessage.content} </CardDescription>
                                </div>
                            </div>
                            <div>{new Date(conversation._creationTime * 1000).toLocaleTimeString()}</div>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
            ))}
            <Card className="p-0">
                <CardHeader>
                    <div className="flex gap-3">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 -m-3 -mx-5 -mb-8" />
                        <Avatar>
                            {/* {conversations[0].isOnline ? "." : null} */}
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Shivansh</CardTitle>
                            <CardDescription>Card Ohh I see </CardDescription></div></div>
                </CardHeader>

            </Card>

        </div>

    )
}

export default Chats