"use client"

import { useRouter } from "next/navigation"
import { FaYoutube } from "react-icons/fa"

export default function () {
  const router = useRouter()

  setTimeout(() => router.replace('/home'), 4000)

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center gap-3 justify-center">
        <FaYoutube size={52} color="#a679c6" className="animate-icon" />
        <div className="animate-text text-nowrap overflow-hidden text-white font-semibold text-3xl">
          YouTube <span className="bg-gradient-to-r from-[#bfa0f2] to-[#52269a] bg-clip-text text-transparent  max-[400px]:hidden">{" "} Redefined</span> <span className="bg-gradient-to-r from-[#bfa0f2] to-[#52269a] bg-clip-text text-transparent  min-[400px]:hidden">{" "} RD</span>
        </div>
      </div>
    </div>
  )
}