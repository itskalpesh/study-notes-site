import fs from 'fs'
import path from 'path'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'
import { renderToReact } from '../../lib/markdoc'
import * as StudyBlocks from '../../components/StudyBlocks'
import QuizCard from '../../components/QuizCard'
import CodeBlock from '../../components/CodeBlock'

export const metadata = {
  title: 'Study Notes'
}

export default function ContentLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <Topbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 max-w-4xl">{children}</main>
        </div>
      </body>
    </html>
  )
}

// Dynamic route rendering for content files
export async function generateStaticParams(){
  const contentDir = path.join(process.cwd(), 'content')
  function walk(dir){
    const entries = []
    for(const name of fs.readdirSync(dir)){
      const p = path.join(dir, name)
      const stat = fs.statSync(p)
      if(stat.isDirectory()){
        entries.push(...walk(p))
      }else if(/\.md$/.test(name)){
        const rel = path.relative(contentDir, p)
        entries.push(rel.replace(/\\\\/g,'/').replace(/\.md$/,''))
      }
    }
    return entries
  }
  const pages = walk(contentDir)
  return pages.map(p=>({ slug: p.split('/') }))
}

export default async function Page({ params }:{ params: { slug: string[] } }){
  const slug = params.slug.join('/')
  const filePath = path.join(process.cwd(), 'content', slug + '.md')
  let source = ''
  try{ source = fs.readFileSync(filePath, 'utf8') }catch(e){
    return <div className="p-6">Not found: {slug}</div>
  }

  const content = renderToReact(source, {
    DefinitionCard: StudyBlocks.DefinitionCard,
    ImportantBox: StudyBlocks.ImportantBox,
    ExampleBox: StudyBlocks.ExampleBox,
    ExamQuestion: (props:any) => <div className="border rounded p-3 mt-4">📌 Exam ({props.marks || 0} marks) <div className="mt-2">{props.children}</div></div>,
    QuizCard: (props:any) => <QuizCard question={props.question} answer={props.answer}>{props.children}</QuizCard>,
    code: CodeBlock
  })

  return (
    <div>
      <article className="prose dark:prose-invert">
        {content}
      </article>
    </div>
  )
}
