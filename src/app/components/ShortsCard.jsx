"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'

export default function () {
  const [shorts, setShorts] = useState(null)
  const [shortsLoading, setShortsLoading] = useState(true)
  const [shortsError, setShortsError] = useState(false)

  const getShorts = async () => {
    setShortsLoading(true)
    try {
      const shortsList = await (await fetch('/api/getShorts')).json()
      setShorts(shortsList.items)
    } catch (error) {
      setShortsError(true)
    } finally {
      setShortsLoading(false)
    }
  }

  useEffect(() => {
    getShorts()
  }, [])

  return (
    <div className="w-full">
      {shortsLoading
        ? null
        : shortsError
          ? null
          : shorts
          ?
          <div className="flex gap-5 p-3 min-h-52 overflow-scroll">
            {shorts.map(short => (
              <div key={short.id.videoId} className=" relative rounded-xl flex items-center justify-center">
                <Image
                  src={short.snippet.thumbnails.high.url}
                  alt=""
                  width={300}
                  height={300}
                  className=" rounded-xl m-2 h-full absolute"
                />
              </div>
            ))}
          </div>
          : null
          
      }
    </div>
  )
}

