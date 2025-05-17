import ViewCard from "./ViewCard"

export default function ({ trendingVideos }) {

  return (
    <div className="p-3">
      <div className="p-2 w-full gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trendingVideos?.length ? trendingVideos.map((eachVideo) => (
          <ViewCard key={eachVideo.videoId + Math.floor(Math.random() * 10000).toString()} eachVideo={eachVideo} />
        ))
          : null
        }
      </div>
    </div>
  )
}

