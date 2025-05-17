"use client";

import { useEffect, useState } from "react";
import { IoMdPerson, IoMdSettings, IoMdSearch } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

import SearchComponent from "@/app/components/SearchComponent";
import SearchLoading from "@/app/skeletons/SearchLoading";

export default function ({ children }) {
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(null);

  const params = useSearchParams();
  const inputRef = useRef(null);

  const getSearch = async (keyword) => {
    setSearchLoading(true);

    try {
      // fetch from the api
      const response = await (
        await fetch(`/api/getSearch?keyword=${keyword}`)
      ).json();

      setSearchResults(response);
    } catch (error) {
      setSearchError(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const search = (formData) => {
    const term = formData.get("search");

    getSearch(term);
  };

  useEffect(() => {
    const keyword = params.get("keyword");
    if (!keyword) return inputRef.current?.focus();
    getSearch(keyword);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex fixed top-0 w-full py-4 px-3 backdrop-blur-2xl bg-[#11182754]h flex-col items-center">
        <div className="flex w-full justify-between">
          <div className="flex gap-2 items-center px-3 rounded-full bg-[#04051099]">
            <FaYoutube size={24} color="#a679c6" />
          </div>

          <div className="bg-[#11182789] flex mx-3 flex-1 gap-2 rounded-full border focus-within:border-gray-500 items-center text-white p-1 px-4 border-gray-600 transition-all">
            <IoMdSearch color="#99aaab" size={20} />
            <form action={search} className="w-full">
              <input
                type="text"
                ref={inputRef}
                name="search"
                placeholder="Search anything"
                className="outline-none w-full bg-transparent "
              />
            </form>
          </div>

          <div className="flex gap-2 text-white font-semibold">
            <div className="flex gap-2 items-center bg-[#1f2937dd] active:bg-[#323646] transition-all px-4 rounded-full">
              <IoMdSettings size={16} color="#dee5ef" />
              <div className="hidden md:block">Settings</div>
            </div>

            <div className="flex gap-2 items-center bg-[#1f2937dd] active:bg-[#323646] transition-all px-4 rounded-full">
              <IoMdPerson size={16} color="#dee5ef" />
              <div className="hidden md:block">Profile</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-12 p-2">
        {searchLoading ? (
          <SearchLoading />
        ) : searchError ? (
          <div>Error</div>
        ) : searchResults ? (
          <SearchComponent searchResults={searchResults} />
        ) : null}
      </div>
    </div>
  );
}
