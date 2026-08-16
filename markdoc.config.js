/**
 * Markdoc Configuration
 * Defines custom tags, nodes, and functions for the study notes system
 */

const tags = {
  /**
   * Callout Tag - For admonitions (info, warning, danger, tip, success)
   * Usage: {% callout type="info" title="Optional Title" %}
   */
  callout: {
    description: 'Highlighted callout box for information, warnings, tips, etc.',
    attributes: {
      type: {
        type: String,
        default: 'info',
        matches: ['info', 'note', 'tip', 'hint', 'warning', 'caution', 'danger', 'error', 'success', 'check', 'question', 'faq', 'quote', 'cite'],
        errorLevel: 'critical',
      },
      title: {
        type: String,
      },
    },
    children: ['paragraph', 'tag', 'list'],
  },

  /**
   * Quiz Tag - Embed auto-generated quizzes
   * Usage: {% quiz subject="Software Engineering" count="5" %}
   */
  quiz: {
    description: 'Interactive quiz with auto-generated questions from notes',
    attributes: {
      subject: {
        type: String,
        errorLevel: 'critical',
      },
      count: {
        type: Number,
        default: 5,
      },
    },
  },

  /**
   * Flashcard Deck Tag - Spaced repetition cards
   * Usage: {% flashcard-deck %} {% card front="Question" back="Answer" %} {% /flashcard-deck %}
   */
  'flashcard-deck': {
    description: 'Container for interactive flashcard decks',
    children: ['tag'],
  },

  /**
   * Individual Flashcard
   * Usage: {% card front="What is X?" back="X is..." %}
   */
  card: {
    description: 'Individual flashcard with front and back content',
    attributes: {
      front: {
        type: String,
        errorLevel: 'critical',
      },
      back: {
        type: String,
        errorLevel: 'critical',
      },
    },
  },

  /**
   * Mermaid Diagram Tag
   * Usage: {% diagram type="mermaid" %} graph TD \n A --> B {% /diagram %}
   */
  diagram: {
    description: 'Embeddable diagrams (Mermaid, ASCII, etc.)',
    attributes: {
      type: {
        type: String,
        default: 'mermaid',
        matches: ['mermaid', 'ascii'],
      },
      title: {
        type: String,
      },
    },
    children: ['paragraph', 'fence'],
  },

  /**
   * Code Block with Copy Button
   * Usage: {% code language="javascript" title="Example" %} const x = 1; {% /code %}
   */
  code: {
    description: 'Enhanced code block with language highlighting and copy button',
    attributes: {
      language: {
        type: String,
      },
      title: {
        type: String,
      },
      highlight: {
        type: String,
      },
    },
    children: ['fence'],
  },

  /**
   * Definition Tag for Glossary
   * Usage: {% definition term="API" %} Application Programming Interface {% /definition %}
   */
  definition: {
    description: 'Glossary definition with term and explanation',
    attributes: {
      term: {
        type: String,
        errorLevel: 'critical',
      },
      id: {
        type: String,
      },
    },
    children: ['paragraph', 'tag'],
  },

  /**
   * Citation Tag
   * Usage: {% citation url="https://..." author="Name" date="2024" %} Quote {% /citation %}
   */
  citation: {
    description: 'Formatted citation block',
    attributes: {
      url: {
        type: String,
      },
      author: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    children: ['paragraph', 'tag'],
  },

  /**
   * TODO/Task Tag
   * Usage: {% todo %} Complete this section {% /todo %}
   */
  todo: {
    description: 'Highlighted task or incomplete item',
    children: ['paragraph', 'tag'],
  },
};

const nodes = {
  /**
   * Enhanced Heading with Automatic ID Generation
   */
  heading: {
    attributes: {
      id: {
        type: String,
      },
      level: {
        type: Number,
      },
    },
  },

  /**
   * Enhanced Link with Internal Reference Support
   */
  link: {
    attributes: {
      href: {
        type: String,
      },
      title: {
        type: String,
      },
      internal: {
        type: Boolean,
      },
    },
  },

  /**
   * Enhanced Image with Lazy Loading
   */
  image: {
    attributes: {
      src: {
        type: String,
      },
      alt: {
        type: String,
      },
      title: {
        type: String,
      },
      loading: {
        type: String,
        default: 'lazy',
      },
    },
  },
};

const functions = {
  /**
   * Generate slug from text for heading IDs
   */
  slugify: (text) => {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  /**
   * Escape HTML special characters
   */
  escapeHtml: (str) => {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  /**
   * Extract reading time from word count
   */
  readingTime: (text) => {
    const wpm = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wpm));
  },
};

module.exports = { tags, nodes, functions };
