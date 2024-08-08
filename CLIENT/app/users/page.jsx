"use client"
// import React, { useEffect, useState } from 'react'

// const Users = () => {
//     const [users, setusers] = useState(null)
//     useEffect(() => {
//         const fetchData = async () => {

//             const res = await fetch('http://localhost:3000/users');
//             const data = await res.json();
//             console.log(data)
//             setusers(data)
//         }
//         fetchData()
//     }
//         , [])
//     return (
//         <div>
//             <h1>Users</h1>
//             <div>
//                 {users?.length ? users.map((el) => {
//                     return <div>{el.email}  -  {el.username}</div>
//                 }) : null}
//             </div>
//         </div>
//     )
// }

// export default Users


// pages/users.js
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {users.length ? (
                users.map((user) => (
                    <div key={user._id}>
                        <p>{user.username}</p>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default Users;
