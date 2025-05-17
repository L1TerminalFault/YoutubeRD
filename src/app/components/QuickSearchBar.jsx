"use client"

import { useRouter } from "next/navigation"

const quickSearch = [
  "All",
  "Malware Analysis",
  "Kernel Exploit",
  "Rust",
  "Go",
  "C",
  "ARM Assembly",
  "X86_64 Assembly",
  "Android Development"
]

export default function () {
  const router = useRouter()

  const forward = (destination) => {
    router.push(`/search?keyword=${destination}`)
  }

  return (
    <div className="px-0 w-full h-max scrollbar-hide overflow-scroll py-1 text-white md:text-base text-sm flex items-center gap-2 ">
      {quickSearch.map(title => (
        <div key={title} onClick={() => title !== 'All' ? forward(title) : null} className={`active:bg-gray-700 transition-all rounded-full px-5 mb-1 text-nowrap py-1 ${title === 'All' ? 'text-black bg-white font-bold' : 'bg-gray-800'} `}>{title}</div>
      ))}
    </div>
  )
}