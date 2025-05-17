const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


export default function () {
  return (
    <div className="p-2 w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {index.map(eachIndex => (
        <div key={eachIndex} className="flex flex-col gap-3">
          <div className="bg-gray-800 rounded-3xl p-32 py-24"></div>
          <div className="flex gap-3 items-center">
            <div className="p-5 rounded-full bg-gray-800"></div>
            <div className="flex flex-col flex-1 gap-2 justify-center items-stretch">
              <div className="rounded-lg bg-gray-800 p-2 w-3/4"></div>
              <div className="rounded-lg bg-gray-800 p-2 w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}