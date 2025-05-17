"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import { IoMdDownload, IoMdThumbsUp } from "react-icons/io"


export default function () {
  const params = useSearchParams()

  const [loading, setloading] = useState(true)
  const [error, setError] = useState(null)
  const [videoDetails, setVideoDetails] = useState(null)

  const videoId = params.get("id")

  const getVideoDetails = async () => {
    setloading(true)
    try {
      const response = await (await fetch(`/api/getVideoDetails?videoId=${videoId}`)).json()

      setVideoDetails(response)
    } catch (error) {
      // do something 
      setError(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [])

  return (
    <div className="flex md:flex-row flex-col gap-3 w-full p-3 rounded-2xl overflow-hidden">
      <div className="flex flex-col p-3 gap-3 w-full">
        <iframe
          src={`http://www.youtube.com/embed/${videoId}?modestbranding=1`}
          allowFullScreen
          width={500}
          height={500}
          className="rounded-2xl w-full "
        />
        {loading
          ? null
          : error
            ? null // some loader component
            : videoDetails
              ?
              <div className="flex rounded-3xl flex-col px-5 pt-2">
                <div className="flex flex-col gap-0 ">
                  <div className="text-white font-bold text-lg">{videoDetails.title}</div>
                  <div className="flex flex-row gap-3 text-gray-400">
                    <div>{videoDetails.viewCount}</div>
                    <div>{videoDetails.publishedAt}</div>
                  </div>
                </div>
                <div className="flex flex-row p-2 gap-3 items-center">
                  <Image
                    className="rounded-full border border-gray-800 size-9"
                    width={100}
                    height={100}
                    src={videoDetails.channelThumbnail}
                    alt=""
                  />
                  <div className="text-white text-lg font-bold">{videoDetails.channelName}</div>
                  <div className="text-gray-400 ">{videoDetails.subscriberCount}</div>
                </div>

                <div className="flex gap-3 ">
                  <div className="p-1 px-4 rounded-full flex gap-2 bg-gray-900">
                    <IoMdThumbsUp
                      color="white"
                      className="size-5"
                    />
                    <div className="text-white font-semibold">{videoDetails.viewCount}</div>
                  </div>
                  <Link href={'/api/download'} className='p-1 px-5 rounded-full flex gap-2 bg-white'>
                    <IoMdDownload
                      color="black"
                      className="size-5"
                    />
                    <div className="text-black font-bold ">Download</div>
                  </Link>
                </div>

                {/* <div className="text-white">
                  {videoDetails.description}
                </div> */}
              </div>
              : null
        }
      </div>

      <div className="w-1/4 text-gray-400 flex p-5 border border-gray-800 bg-black rounded-[40px] m-2 flex-col gap-4">
        <div className="text-white text-lg pl-3">Description</div>
        <div>{videoDetails ? videoDetails.description : null}</div>
      </div>
    </div>
  )
}