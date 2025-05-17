"use client";

import { useState, useEffect } from "react";

import ShortsCard from "@/app/components/ShortsCard";
import MainFeed from "@/app/components/MainFeed";
import QuickSearchBar from "@/app/components/QuickSearchBar";
import MainFeedLoading from "@/app/skeletons/MainFeedLoading";
import TopBar from "@/app/components/TopBar";

export default function () {
  const [trendingVideos, setTrendingVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getFeeds = async () => {
    setLoading(true);
    try {
      const response = await (await fetch("/api/getFeeds")).json();

      setTrendingVideos(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <TopBar />
      <div className="mt-8 w-full p-2">
        <div className="p-2 pt-6 h-full w-full z-10">
          <QuickSearchBar />
          <div className="overflow-scroll flex flex-col flex-1 h-[calc(100vh-140px)]">
            {loading ? (
              <MainFeedLoading />
            ) : error ? (
              <div>error</div>
            ) : (
              <>
                <MainFeed
                  trendingVideos={trendingVideos?.slice(0, 8)}
                  loading={loading}
                  error={error}
                />
                <ShortsCard />
                <MainFeed
                  trendingVideos={trendingVideos?.slice(8)}
                  loading={loading}
                  error={error}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
