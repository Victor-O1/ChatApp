"use client"


import { SessionProvider } from "next-auth/react"
const ClientAuthProvider = ({ children }) => {

    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default ClientAuthProvider