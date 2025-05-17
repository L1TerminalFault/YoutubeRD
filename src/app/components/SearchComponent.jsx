"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function ({ searchResults: initialResults }) {
  const [searchResults, setSearchResults] = useState(initialResults.videos);
  const [loadingMore, setLoadingMore] = useState(false);
  const [continuationToken, setContinuationToken] = useState(
    initialResults.continuationToken,
  );
  const bottom = useRef(null);
  const container = useRef(null)

  const videoIds = new Set();

  const fetchMoreResults = async () => {
    setLoadingMore(true);
    try {
      const response = await (
        await fetch(
          `/api/getSearch?keyword=${initialResults.query}&token=${continuationToken}`,
        )
      ).json();

      let moreVideos = [];
      response.videos.forEach((video) => {
        if (videoIds.has(video.videoId)) return;
        videoIds.add(video.videoId);
        moreVideos.push(video);
      });

      if (moreVideos.length)
        setSearchResults((prev) => [...prev, ...moreVideos])

      setContinuationToken(response.continuationToken);
    } catch (error) {
      // handle error
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    initialResults.videos.forEach((video) => videoIds.add(video.videoId));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreResults();
        }
      },
      {
        root: null, // The scrollable container
        threshold: 1, // Fully visible
      },
    );

    if (bottom.current) observer.observe(bottom.current);
  }, []);

  return (
    <div ref={container} className="flex flex-col h-full overflow-scroll p-3">
      {searchResults.map((eachVideo) => (
        <Link href={`/watch?id=${eachVideo.videoId}`}
          key={
            eachVideo.videoId + Math.floor(Math.random() * 100000).toString()
          }
          className="p-2 flex gap-4 bg-gray-950 rounded-2xl transition-all active:bg-gray-900"
        >
          <div className="w-1/4">
            <Image
              src={eachVideo.thumbnail}
              className="rounded-2xl w-full"
              alt=""
              width={500}
              height={300}
            />
          </div>

          <div className="flex flex-col justify-center gap-3 text-white">
            <div className="flex flex-col gap-2 ">
              <div className="text-white text-sm font-semibold">
                {eachVideo.title}
              </div>
              <div className="text-gray-400 text-xs flex items-center gap-2">
                <span>{eachVideo.channelName}</span>
                <span>•</span>
                <span> {eachVideo.viewCount}</span>
                <span>•</span>
                <span>{eachVideo.publishedAt}</span>
              </div>
            </div>
            <Image
              src={eachVideo.channelThumbnail}
              width={300}
              height={300}
              alt=""
              className="size-10 border border-gray-800 rounded-full "
            />
          </div>
        </Link>
      ))}

      <div ref={bottom} className={`text-white p-9 ${loadingMore ? "" : ""}`}>
        {loadingMore ? "Loading more content" : ""}
      </div>
    </div>
  );
}
