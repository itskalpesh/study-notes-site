'use client'
import { useState } from 'react'

export default function QuizCard({children, question, answer}:{children: any, question: string, answer: string}){
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  function submit(){
    setDone(true)
    try{ localStorage.setItem('quiz:'+question, selected || '') }catch(e){}
  }
  return (
    <div className="border rounded p-4 bg-white dark:bg-gray-900">
      <div className="font-semibold">🧠 Quiz</div>
      <div className="mt-2">{question}</div>
      <div className="mt-3 space-y-2">{children}</div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Submit</button>
        {done && <div className="text-sm">Answer: {answer}</div>}
      </div>
    </div>
  )
}
