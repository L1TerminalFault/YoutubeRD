const index = [0, 1, 2, 3, 4, 5, 6]

export default function () {
  return (
    <div className="flex flex-col gap-5 p-3 mt-4">
      {index.map(eachIndex => (
        <div key={eachIndex} className="flex items-center gap-3">
          <div className="p-24 py-16 bg-gray-800 rounded-3xl"></div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="p-2 bg-gray-800 w-3/4 sm:w-1/2 rounded-lg"></div>
            <div className="p-2 bg-gray-800 w-1/2 sm:w-1/3 rounded-lg"></div>
            <div className="items-center flex">
            <div className="p-5 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}