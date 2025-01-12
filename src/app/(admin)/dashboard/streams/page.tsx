'use client'

export default function Streams() {
  return (
    <div className="flex items-center flex-col py-5">
      <h1 className="text-2xl font-bold mb-5">Streams</h1>
      <form className="flex flex-col items-center gap-3">
        <h4 className="text-lg font-bold mb-2">Share New Stream</h4>
        <p>Stream Id:</p>
        <input type="text" placeholder="id" className="border" />
        <button>Share</button>
      </form>

      <div>
        <h4 className="mt-5 text-lg text-center font-bold mb-2">Previous streams</h4>
        <div>
          <div className="flex gap-5">
            <p>Call_id: 1023</p>
            <p>state: Finished</p>
          </div>
          <div className="flex gap-5">
            <p>Call_id: 1223</p>
            <p>state: Finished</p>
          </div>
          <div className="flex gap-5">
            <p>Call_id: 1034</p>
            <p>state: Finished</p>
          </div>
        </div>
      </div>

    </div>
  )
}