/**
 * Utility: Markdoc Renderer
 * Converts Markdoc AST to React components
 */

import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Callout } from '@/components/Callout';
import { Quiz } from '@/components/Quiz';
import { FlashcardDeck } from '@/components/FlashcardDeck';
import { Diagram } from '@/components/Diagram';
import { Definition } from '@/components/Definition';
import { Citation } from '@/components/Citation';
import { CodeBlock } from '@/components/CodeBlock';
import { Todo } from '@/components/Todo';

const components = {
  callout: Callout,
  quiz: Quiz,
  'flashcard-deck': FlashcardDeck,
  card: (props) => null, // Rendered within FlashcardDeck
  diagram: Diagram,
  code: CodeBlock,
  definition: Definition,
  citation: Citation,
  todo: Todo,
};

export function renderMarkdoc(ast) {
  return Markdoc.renderers.react(ast, React, {
    components,
  });
}

export function parseMarkdoc(content) {
  const ast = Markdoc.parse(content);
  const errors = Markdoc.validate(ast, { tags: {} }); // TODO: pass full schema
  return { ast, errors };
}
