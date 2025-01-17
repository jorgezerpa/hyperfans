'use client'
import React, { useState, useEffect } from "react"
import axios from "axios"

export default function Users() {

  const [users, setUsers] = useState<any[]>([])

  const getUsers = async() => {
    try {
      const response = await axios.post("/api/users/admin/getUsers")
      setUsers(response.data.users)
    } catch (error) {
      console.log("error getting admin users -> ", error)
      alert("something went wrong, please try again")
    }
  }

  useEffect(()=>{
    (async()=>{
      getUsers()
    })()
  }, [])
console.log(users)

  return (
    <div className="px-3 pt-4">
        <h1 className="text-xl font-bold mb-10">Users</h1>

        {
          users?.map((user, index)=>{
            return (
              <UserCard key={"adminuserslistsa"+index} user={user}/>
            )
          })
        }

    </div>
  )
}


function UserCard({user}:{user:any}) {

  // 1. Call check subscription from contract 

  return (  
  <div className="mb-7">
    <div>
      <span className="font-bold">name:</span> { user.name }
    </div>
    <div>
    <span className="font-bold">email:</span> { user.email }
    </div>
    <div>
      <span className="font-bold">address:</span> { user.addresses[0] }
    </div>
  </div>
  )
}