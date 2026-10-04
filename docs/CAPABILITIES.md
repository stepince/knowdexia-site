# Product capability audit

Inspected `/Users/since/projects/knowdexia` on 2026-10-04 before implementing marketing content. No application source changes were made.

| Marketing claim | Evidence in application | Boundary |
| --- | --- | --- |
| Persistent document library | `src/library/sqlite-repository.ts`, `src/library/types.ts`, `README.md` | Current local SQLite/file deployment, not a released hosted account service |
| Collections, document movement | `src/api/routes/library.route.ts`, `public/app.js` collections and move UI | Flat collections; no invented hierarchy or shared workspace |
| Supported document formats | `src/parsers/registry.ts` | PDF, DOCX, XLSX, XLS, CSV, MD/MDX, HTML/HTM, TXT; no OCR |
| Semantic + keyword retrieval | `src/retrieval/service.ts`, `src/retrieval/hybrid.ts`, `src/search/bm25.ts` | Relevant passage retrieval, not guaranteed discovery of every related concept |
| Library, collection, selected-document scope | `src/retrieval/scope.ts`, `src/api/routes/knowledge.route.ts`, `public/app.js` | Selection defines retrieval scope |
| Cross-document RAG | `src/rag/ask-service.ts`, `src/rag/text-generator.ts` | Generated synthesis requires AI provider; top retrieved passages are context, not full-library exhaustive reading |
| Built-in extractive answer | `src/rag/ask-service.ts`, `README.md` | Returns a cited verbatim extract when a supported answer is found |
| Clickable citations and source highlighting | `public/app.js` Ask source/citation handlers, `public/viewer.js` | Location details vary by document format and extraction |
| Citation validation | `src/rag/ask-service.ts` `parseCitedAnswer` | Rejects invalid reference numbers and answers with no valid citation; does not establish semantic entailment of every claim |
| Deferred features | `docs/ARCHITECTURE.md` section 7 | Hosted OAuth/accounts, connectors, agents, GraphRAG, topic/entity extraction are not implemented |

The production app URL was not found in application configuration or documentation. The website uses the centralized `APP_URL` setting and defaults to an informative local getting-started page.

Brand reuse: blue `#315bda`, ink `#182339` (slightly adapted for marketing), system typography, and a blue K favicon/mark inspired by `public/index.html`. No separate asset library was present.

Implementation structure: static Node generation, shared shell and reusable sections, home + eight intent-specific articles + about + legal drafts + getting started + 404. No framework or external runtime dependencies were needed for this predominantly static site.
