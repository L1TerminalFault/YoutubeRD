import { useRouter } from "next/navigation"

import { FaYoutube } from "react-icons/fa"
import { IoMdSearch } from "react-icons/io"
import { IoMdSettings } from "react-icons/io"
import { IoMdPerson } from "react-icons/io"

export default function () {
  const router = useRouter()

  const search = (formData) => {
    const keyword = formData.get("search")

    router.push(`/search?keyword=${keyword}`)
  }

  const forward = () => {
    router.push('/search')
  }

  return (
    <div className="flex fixed top-0 w-full py-4 px-3 backdrop-blur-2xl bg-[#11182754]h flex-col items-center">
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center px-3 rounded-full bg-[#04051099]">
          <FaYoutube size={24} color="#a679c6" />
          <div className="text-white  font-semibold text-xl">
            Youtube <span className="bg-gradient-to-r from-[#bfa0f2] to-[#783fd3] bg-clip-text text-transparent  max-[400px]:hidden">{" "} Redefined</span> <span className="bg-gradient-to-r from-[#bfa0f2] to-[#52269a] bg-clip-text text-transparent  min-[400px]:hidden">{" "} RD</span>
          </div>
        </div>

        <div className="bg-[#11182789] md:flex gap-2 rounded-full w-max border focus-within:border-gray-500 items-center text-white p-1 px-4 hidden border-gray-600 transition-all">
          <IoMdSearch color="#99aaab" size={20} />
          <form action={search}>
            <input
              type="text"
              name="search"
              placeholder="Search anything"
              className="hidden sm:block outline-none bg-transparent flex-1"
            />
          </form>
        </div>

        <div className="flex gap-2 text-white font-semibold">

          <div onClick={forward} className="md:hidden gap-2 flex items-center  active:bg-[#323646] transition-all px-4 rounded-full">
            <IoMdSearch size={16} strokeWidth={30} color="#dee5ef" />
            <div className="hidden md:block">Search</div>
          </div>

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
  )
}