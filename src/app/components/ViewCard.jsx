import Image from "next/image"
import Link from "next/link"

// import { formatTimeDifference, parseViewCount } from "@/lib/utils"

export default function ({ eachVideo }) {


  return (
    <Link href={`/watch?id=${eachVideo.videoId}`}
       key={eachVideo.videoId} className="rounded-2xl bg-[#071423] w-full p-1 active:bg-gray-800 transition-all">
      <div className="h-56 rounded-2xl">
        <Image
          src={eachVideo.thumbnail}
          alt=""
          loading="lazy"
          width={120}
          height={90}
          className="size-full object-cover rounded-2xl"
        />
      </div>

      <div className="flex p-4 px-3 items-center gap-4">
        
          <Image
            src={eachVideo.channelThumbnail}
            alt=""
            className="rounded-full size-10 border border-gray-800"
            width={200}
            height={200}
          />

        <div className="flex flex-col gap-1 ">
          <div className="text-white text-sm font-semibold">{eachVideo.title}</div>
          <div className="text-gray-400 text-xs flex items-center gap-2">
            <span>{eachVideo.channelName}</span>
            <span>•</span>
            <span> {eachVideo.viewCount}</span>
            <span>•</span>
            <span>{eachVideo.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* <video src={`https://youtube.com/watch?v=${eachVideo.id}`} width={500} height={500}></video> */}
      {/* <iframe  src={`https://youtube.com/embed/${eachVideo.id}`} width={300} height={300} frameborder="0"></iframe> */}
    </Link>
  )
}