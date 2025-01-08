export const CategoryCardSkeleton = () => {
  return (
    <article className="animate-pulse border border-gray-300 p-8 rounded-lg flex items-center justify-between">
      <main className="flex items-center">
        <div className="h-6 w-36 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </main>
      <footer className="shrink-0 flex">
        <div className="h-8 w-16 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </footer>
    </article>
  )
}
