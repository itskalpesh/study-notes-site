export function DefinitionCard({children}:{children: React.ReactNode}){
  return (
    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-800 p-4 rounded">
      <div className="font-semibold">📖 Definition</div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function ImportantBox({children}:{children: React.ReactNode}){
  return (
    <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-gray-800 p-4 rounded">
      <div className="font-semibold">⭐ Important</div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function ExampleBox({children}:{children: React.ReactNode}){
  return (
    <div className="border rounded p-3 bg-white dark:bg-gray-900">
      <div className="font-semibold">💡 Example</div>
      <div className="mt-2">{children}</div>
    </div>
  )
}
