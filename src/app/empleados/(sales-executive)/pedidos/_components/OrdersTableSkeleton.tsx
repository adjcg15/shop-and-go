import React from 'react'

export const OrdersTableSkeleton = () => {
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <table className="w-full min-w-[500px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="uppercase py-3 px-5">Pedido</th>
            <th className="uppercase py-3 px-5 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }, (_, index) => (
            <tr className="animate-pulse border-b border-gray-300" key={`loading-skeleton-${index}`}>
              <td className="py-3 px-5">
                <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </td>
              <td className="py-3 px-5">
                <div className="h-14 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
