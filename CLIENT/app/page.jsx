"use client"
import LeftPanel from '@/components/LeftPanel'
import RightPanel from '@/components/RightPanel'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import Signup from './signup/page'
import Cookies from 'js-cookie';

const Page_children_client_component = () => {
  const [chat, setchat] = useState(false)
  const { setTheme } = useTheme()
  const { data: session } = useSession()
  const token = Cookies.get('accessToken');
  return (
    <div>
      <div>
        <div className="flex h-[100vh] w-full gap-3 p-2">
          <div className={`${chat ? "hidden" : "block"} md:block w-[26vw]`}>
            <LeftPanel />
          </div>
          <div className="bg-primary w-full rounded-2xl">
            <RightPanel />
          </div>

        </div>
        <div>{JSON.stringify(session)},{token}</div></div>
    </div >

  )
}

export default Page_children_client_component