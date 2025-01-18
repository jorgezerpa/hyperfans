'use client'
import { useState, useRef, useEffect } from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaXTwitter } from "react-icons/fa6";

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
    <div className="bg-black min-h-screen w-screen relative">
      <video  
        autoPlay  
        loop 
        muted 
        ref={videoRef} 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover" 
        // src="/videos/hero-background.mp4" 
      >
         <source src="/videos/hero-background.mp4" type="video/mp4"/>
      </video>
      {
        page === 1 &&
            <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-start gap-8 sm:gap-0 sm:justify-between py-32">
              <div style={{ width: '450px', height: '80px', position:"relative"}} className="scale-[50%] sm:scale-100"> 
                <Image 
                  src="/images/logo.png" 
                  alt="My Image" 
                  layout="fill" 
                  objectFit="contain" 
                />
              </div>
              <div onClick={()=>setPage(2)} className="text-white text-3xl px-3 py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">
                enter early access
              </div>
            </div>
      }
      {
        page === 2 &&
          <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-between items-center pt-32 pb-24">
            <div style={{ width: '450px', height: '80px', position:"relative"}} className="scale-[50%] sm:scale-100"> 
              <Image 
                src="/images/logo.png" 
                alt="My Image" 
                layout="fill" 
                objectFit="contain" 
              />
            </div>
            <div className="flex flex-col justify-center items-center px-4">
              <div onClick={() => setPage(1)} className="text-white cursor-pointer text-center text-lg hover:text-xl transition-all px-10 py-5 rounded-full inline-block">
                Back 
              </div>
              <div onClick={() => router.push("/signup")} className="min-w-[240px] text-center mb-3 text-white text-2xl py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">
                Create Account 
              </div>
              <div onClick={() => router.push("/login")} className="min-w-[240px] text-center text-white text-2xl py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">
                Login
              </div>
            </div>
          </div>
      }

      <div className="absolute top-6 right-6 cursor-pointer">
        <a href="https://x.com/HyperFans_x" target="_blank">
          <FaXTwitter color="white" size={40} />
        </a>
      </div>
    </div>
  )
}