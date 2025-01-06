export const OrderToDeliverCardSkeleton = () => {
  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <header className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="h-14 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="h-14 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </header>

      <main className="mt-5">
        <section>
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-8 mt-2 w-96 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </section>

        <section className="mt-3">
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

          <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1 bg-gray-200"></div>
        </section>

        <section className="mt-3">
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </section>

        <section className="mt-3">
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </section>
      </main>
    </article>
  )
}
