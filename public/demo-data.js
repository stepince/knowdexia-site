// Illustrative content for the homepage demo. Not real retrieval results.
export const collections = [
  { id: 'all', label: 'All knowledge', icon: '▦' },
  { id: 'ai', label: 'AI research', icon: '▤' },
  { id: 'product', label: 'Product docs', icon: '▤' },
  { id: 'market', label: 'Market research', icon: '▤' }
];

export const documents = [
  { name: 'AI discovery report.pdf', type: 'PDF', collection: 'ai' },
  { name: 'Content strategy.md', type: 'MD', collection: 'product' },
  { name: 'Release notes guide.docx', type: 'DOCX', collection: 'product' },
  { name: 'Market landscape.pdf', type: 'PDF', collection: 'market' },
  { name: 'Buyer research summary.xlsx', type: 'XLSX', collection: 'market' }
];

export const questions = [
  {
    id: 'visibility',
    text: 'How can we improve visibility in AI recommendations?',
    keywords: ['visibility', 'recommendation', 'recommendations', 'discover', 'discovery', 'improve', 'evidence', 'terminology'],
    scopes: ['all', 'ai', 'product'],
    answer: [
      { text: 'Make your expertise easy to discover, structure content around clear questions, and support claims with original evidence.', cite: 0 },
      { text: 'Keep terminology consistent across product documentation and research so key concepts remain clear.', cite: 1 }
    ],
    sources: [
      { doc: 'AI discovery report.pdf', location: 'Page 8 · Discovery principles', highlight: 'Structure content around clear questions and support claims with original evidence.', remainder: ' This gives readers a direct path from an explanation to its underlying research.' },
      { doc: 'Content strategy.md', location: 'Section · Consistent language', highlight: 'Keep terminology consistent across product documentation and research.', remainder: ' A shared vocabulary helps readers follow the same concepts across different documents.' }
    ]
  },
  {
    id: 'citable',
    text: 'What makes a source easy for an AI model to cite?',
    keywords: ['cite', 'citable', 'citation', 'citations', 'source', 'sources', 'model', 'attribution'],
    scopes: ['all', 'ai'],
    answer: [
      { text: 'Sources that state a claim plainly, name their origin, and keep the supporting data nearby are easier to attribute.', cite: 0 }
    ],
    sources: [
      { doc: 'AI discovery report.pdf', location: 'Page 11 · Attribution', highlight: 'State each claim plainly, name where it comes from, and keep the supporting data nearby.', remainder: ' Passages written this way are easier to attribute accurately.' }
    ]
  },
  {
    id: 'release-notes',
    text: 'How should we structure release notes?',
    keywords: ['release', 'notes', 'structure', 'changelog', 'changes', 'update', 'updates', 'customers'],
    scopes: ['all', 'product'],
    answer: [
      { text: 'Lead with what changed for the reader, group items by impact, and link each entry to deeper documentation.', cite: 0 },
      { text: 'Use the same names for features that appear elsewhere in your product documentation.', cite: 1 }
    ],
    sources: [
      { doc: 'Release notes guide.docx', location: 'Heading · Writing an entry', highlight: 'Lead with what changed for the reader, group items by impact, and link to deeper documentation.', remainder: ' Avoid internal ticket language.' },
      { doc: 'Content strategy.md', location: 'Section · Consistent language', highlight: 'Keep terminology consistent across product documentation and research.', remainder: ' A shared vocabulary helps readers follow the same concepts across different documents.' }
    ]
  },
  {
    id: 'buyers',
    text: 'What are buyers asking AI assistants before they purchase?',
    keywords: ['buyers', 'buyer', 'purchase', 'shopping', 'customers', 'assistants', 'ask', 'asking', 'market', 'comparisons'],
    scopes: ['all', 'market'],
    answer: [
      { text: 'Buyers most often ask for side-by-side comparisons and for evidence that a product fits their situation.', cite: 0 },
      { text: 'Assistant-led research is growing as an early step in the evaluation process.', cite: 1 }
    ],
    sources: [
      { doc: 'Buyer research summary.xlsx', location: 'Sheet · Survey themes · Row 14', highlight: 'Comparison requests and fit-for-situation questions were the most common themes.', remainder: ' Pricing questions followed.' },
      { doc: 'Market landscape.pdf', location: 'Page 5 · Research behavior', highlight: 'Assistant-led research is increasingly an early step in how buyers evaluate options.', remainder: ' Vendor sites are visited later in the process.' }
    ]
  }
];
