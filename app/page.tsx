import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Link from 'next/link'

export default function Home(){
  return (
    <html>
      <body className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <Topbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 max-w-4xl">
            <h1 className="text-3xl font-bold">Study Notes</h1>
            <p className="mt-3">Example content is available below.</p>
            <ul className="mt-4 space-y-2">
              <li><Link href="/content/examples/runtime-polymorphism">Runtime polymorphism (example)</Link></li>
            </ul>
          </main>
        </div>
      </body>
    </html>
  )
}
