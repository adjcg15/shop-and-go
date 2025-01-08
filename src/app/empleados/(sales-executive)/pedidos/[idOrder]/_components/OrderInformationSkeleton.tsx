import React from 'react'

export const OrderInformationSkeleton = () => {
  return (
    <div className="mt-8 animate-pulse">
      <section>
        <div className="h-8 w-96 max-w-full bg-gray-200 rounded-full"></div>

        <div className="mt-3">
          <div className="h-2.5 max-w-full w-20 bg-gray-200 rounded-full"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
        </div>

        <div className="mt-3">
          <div className="h-2.5 max-w-full w-20 bg-gray-200 rounded-full"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
        </div>

        <div className="mt-3">
          <div className="h-2.5 max-w-full w-20 bg-gray-200 rounded-full"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
        </div>
      </section>
      <section className="mt-8">
        <div className="h-6 w-80 max-w-full bg-gray-200 rounded-full"></div>

        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <table className="w-full min-w-[500px] mt-3">
            <thead className="bg-gray-50">
              <tr>
                <th className="uppercase py-3 px-5">Producto</th>
                <th className="uppercase py-3 px-5 text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, index) => (
              <tr className="animate-pulse border-b border-gray-300" key={`loading-skeleton-${index}`}>
                <td className="py-3 px-5">
                  <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
                </td>
                <td className="py-3 px-5">
                <div className="h-4 mt-2 bg-gray-200 rounded-full"></div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-end">
          <div className="h-2.5 mr-3 max-w-full w-10 bg-gray-200 rounded-full"></div>
          <div className="h-4 mt-2 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </section>
    </div>
  );
}
