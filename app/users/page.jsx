'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }, [])

  return (
    <div className="h-[100%]">
    

      {/* Body */}
      <div className="h-[100%] w-[100%]  bg-black flex items-center justify-center">
        <div
          className="h-[98%] w-[99%] rounded-2xl border border-white/10 p-4 "
          style={{
            background: "rgba(30, 30, 46, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >

 {/* Table */}
  <table className="w-full text-white border border-white-500">
    
    {/* Header */}
    <thead>
      <tr className="border-b border-white/20 text-left text-gray-400">
      
        <th className="pb-3 px-4">Name</th>
        <th className="pb-3 px-4">Email</th>
        <th className="pb-3 px-4">Action</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      {users.map((user) => (
        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
       
          <td className="py-3 px-4">{user.name}</td>
          <td className="py-3 px-4">{user.email}</td>
          <td className="py-3 px-4">
             <Link href={`/users/${user.id}`}>
    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
      View
    </button>
  </Link>
          </td>
        </tr>
      ))}
    </tbody>

  </table>

        </div>
      </div>

      
    </div>
  )
}



