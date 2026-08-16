import Markdoc from 'markdoc'
import React from 'react'

// Simple Markdoc schema with a few tags mapped to component names.
export const schema = {
  tags: {
    definition: { render: 'DefinitionCard', children: ['paragraph'] },
    important: { render: 'ImportantBox', children: ['paragraph'] },
    example: { render: 'ExampleBox', children: ['paragraph', 'code'] },
    exam: { render: 'ExamQuestion', attributes: { marks: { type: 'number' } }, children: ['paragraph'] },
    quiz: { render: 'QuizCard', attributes: { question: { type: 'string' }, answer: { type: 'string' } }, allowChildren: true }
  }
}

export function renderToReact(source, components = {}) {
  const ast = Markdoc.parse(source)
  const content = Markdoc.transform(ast, { nodes: {}, tags: schema.tags })
  return Markdoc.renderers.react(content, React, { components })
}
