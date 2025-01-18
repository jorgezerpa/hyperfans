'use client'
import { useState, useRef, useEffect } from "react"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null);
  const [page, setPage] = useState(1)

  useEffect(() => {
    if(videoRef.current){
      const video = videoRef.current;
      video.play();
  
      return () => {
        video.pause();
      };
    }
  }, [videoRef.current]);

  return (
    <>
      {
        page === 1 &&
          <div className="bg-black min-h-screen w-screen relative">
            <video 
              autoPlay 
              loop 
              muted 
              ref={videoRef} 
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover" 
              src="/videos/hero-background.mp4" 
            />
            <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-start gap-8 sm:gap-0 sm:justify-between py-32">
              <h1 className="text-white text-center text-5xl sm:text-8xl italic font-extralight"><span>Hyper</span><span className="text-[#75C9E1]">Fans</span></h1>
              <div onClick={()=>setPage(2)} className="text-white text-3xl px-3 py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">
                enter early access
              </div>
            </div>
          </div>
      }
      {
        page === 2 &&
          <div className="bg-black min-h-screen">
            <h1 className="text-white text-center pt-20 font-bold text-3xl sm:text-4xl pb-10">Hyperfans</h1>
            <div className="flex flex-col justify-center items-center min-h-[600px] px-4">
              <div onClick={() => setPage(1)} className="text-white cursor-pointer text-center text-xl px-10 py-5 rounded-full inline-block">
                Back 
              </div>
              <div onClick={() => router.push("/signup")} className="text-white cursor-pointer text-center text-3xl px-10 py-5 rounded-full border border-white inline-block">
                Create Account 
              </div>
              <div onClick={() => router.push("/login")} className="text-white cursor-pointer text-3xl px-10 py-5 rounded-full border border-white inline-block mt-10">
                Login
              </div>
            </div>
          </div>
      }
    </>
  )
}