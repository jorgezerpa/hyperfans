'use client'
import React, { useState, useEffect } from "react"
import axios from "axios"

export default function Config() {

  const [loading, setLoading] = useState(false)
  const [newPrice, setNewPrice] = useState<string>("")

  // const getUsers = async() => {
  //   try {
  //     const response = 
  //     setUsers(response.data.users)
  //   } catch (error) {
  //     console.log("error getting admin users -> ", error)
  //   }
  // }

  // useEffect(()=>{
  //   (async()=>{
  //     getUsers()
  //   })()
  // }, [])

  const handleSetNewPrice = async() => {
    try {
      if(!newPrice) return 
      setLoading(true)
      await axios.put("/api/payments/setPrice", { price:newPrice })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert("error setting new price, try again")
    }
  }

  return (
    <div className="px-3 pt-4">
        <h1 className="text-xl font-bold mb-10">Config</h1>
        {
          loading && <div>Loading...</div>
        }
        {
          !loading && 
            <div>
              <div className="flex  items-center">
                <input  value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} type="number" placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5" />
                <button onClick={handleSetNewPrice} className="px-4 py-2 text-white bg-purple-700 rounded-lg ml-2 hover:bg-purple-800 cursor-pointer">set new price</button>
              </div>
            </div>
        }

    </div>
  )
}

