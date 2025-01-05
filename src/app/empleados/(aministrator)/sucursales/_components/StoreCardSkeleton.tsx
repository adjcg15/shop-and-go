export const StoreCardSkeleton = () => {
  return (
    <article className="animate-pulse p-8 rounded-lg border border-gray-300">
      <header className="border border-gray-300 rounded-lg h-72 bg-gray-200"></header>

      <main className="mt-6">
        <div className="h-8 w-96 bg-gray-200 rounded-full dark:bg-gray-700"></div>

        <section className="mt-5">
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </section>

        <section className="mt-5">
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </section>
      </main>

      <footer className="flex justify-end mt-5">
        <div className="h-14 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </footer>
    </article>
  );
}