export const OrderToDeliverCardSkeleton = () => {
  return (
    <article className="p-8 rounded-lg border border-gray-300 mb-5">
      <header className="flex flex-col sm:flex-row sm:justify-between lg:justify-end">
        <div className="w-full sm:w-40 h-14 bg-gray-200 rounded-full"></div>
        <div className="h-14 w-full sm:w-40 mt-3 sm:mt-0 lg:ml-3 bg-gray-200 rounded-full"></div>
      </header>

      <main className="mt-5 lg:grid lg:grid-cols-2 lg:gap-10">
        <section>
          <div>
            <div className="h-2.5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 mt-2 w-full md:w-96 bg-gray-200 rounded-full"></div>
          </div>

          <div className="mt-3">
            <div className="h-2.5 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
          </div>

          <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1 bg-gray-200"></div>
        </section>

        <div>
          <section className="mt-5 lg:mt-0">
            <div className="h-8 mt-2 w-full md:w-96 bg-gray-200 rounded-full"></div>

            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
              <table className="w-full min-w-[500px] mt-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="uppercase py-3 px-1 md:px-5"><div className="h-5 bg-gray-200 rounded-full"></div></th>
                    <th className="uppercase py-3 px-1 md:px-5"><div className="h-5 bg-gray-200 rounded-full"></div></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.from({ length: 5 }, (_, index) => (
                      <tr className="animate-pulse border-b border-gray-300" key={`loading-skeleton-${index}`}>
                        <td className="py-3 px-5"><div className="h-5 bg-gray-200 rounded-full"></div></td>
                        <td className="py-3 px-5"><div className="h-5 bg-gray-200 rounded-full"></div></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-5 lg:mt-10">
            <div className="h-8 mt-2 w-full md:w-96 bg-gray-200 rounded-full"></div>

            <div className="mt-3">
              <div className="h-2.5 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
            </div>

            <div className="mt-1">
              <div className="h-2.5 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
            </div>
          </section>
        </div>
      </main>
    </article>
  )
}
