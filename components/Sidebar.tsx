export default function Sidebar(){
  return (
    <aside className="w-64 hidden md:block border-r border-gray-200 dark:border-gray-800 p-4">
      <nav className="space-y-2">
        <div className="font-semibold">Subjects</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li className="pl-1">C# .NET</li>
          <li className="pl-1">Data Structures</li>
          <li className="pl-1">Algorithms</li>
        </ul>
      </nav>
    </aside>
  )
}
