export default function Topbar(){
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-2xl">📚 Kalpesh Notes</div>
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Search..." className="px-3 py-1 border rounded-md hidden sm:inline-block" />
        <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800">☰</button>
      </div>
    </header>
  )
}
