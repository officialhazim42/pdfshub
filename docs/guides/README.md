# PDFHub User Guides & Visual Tutorials System

The **User Guides & Tips** system provides step-by-step visual tutorials for every one of PDFHub's 33 tools.

- **Guides Landing Hub:** [/guides/](https://pdfshub.netlify.app/guides/)
- **Individual Guide Routes:** `/guides/<tool-id>/` (33 routes)

---

## Key Features

1. **Statically Pre-Rendered HTML:** Every guide route contains full semantic HTML (`<h1>`, `<h2>` step titles, walkthrough cards, instructions, callouts, and FAQs) rendered directly in the initial HTTP response for immediate search engine indexing.
2. **Interactive Walkthrough Lightbox:** Clicking any step screenshot opens a responsive full-screen lightbox viewer with keyboard arrows and zoom capabilities.
3. **Structured Data:** Each guide includes Schema.org `TechArticle` and `HowTo` JSON-LD markup.
4. **Direct Tool Integration:** Every guide includes floating and header action buttons to launch the live tool immediately.
