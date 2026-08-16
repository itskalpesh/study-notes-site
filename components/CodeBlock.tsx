import Prism from 'prism-react-renderer/prism'
// optional: load additional languages if needed

export default function CodeBlock({children}:{children: any}){
  return (
    <pre className="bg-gray-900 text-white p-3 rounded overflow-auto text-sm">{children}</pre>
  )
}
