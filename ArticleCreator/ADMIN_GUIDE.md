# Admin Panel - Article & Page Creator

A comprehensive admin panel for managing articles and pages with support for:

- ✅ Creating and editing articles with category selection
- ✅ Creating and editing pages (with optional PDF uploads)
- ✅ Content blocks editor (subtitle, header, paragraph, code)
- ✅ Category management and tagging
- ✅ Navbar integration with page ordering

## How to Use

### Open the Admin Panel

Navigate to: `ArticleCreator/admin.html`

### Creating Articles

1. Click the **"📰 Article"** tab
2. Fill in:
   - **Title**: Article name
   - **Slug**: URL-friendly identifier (e.g., `my-first-article`)
   - **Image URL**: Cover image link
   - **Date**: Publication date
3. **Select Categories** from the sidebar
4. Add content blocks using the editor (or start typing with `/` for commands)
5. Click **"📤 Publish"**

### Creating Pages

1. Click the **"📄 Page"** tab
2. Fill in:
   - **Title**: Page name
   - **Slug**: URL-friendly identifier
   - **Order**: Position in navbar (lower numbers appear first)
   - **Image URL**: Optional cover image
   - **PDF File**: Optional - upload a PDF to display as full-page viewer
3. Add content or just upload a PDF
4. Click **"📤 Publish"**

### Editing Existing Items

- **Articles**: Select from the dropdown under "Select to Edit"
- **Pages**: Click the "Edit" button next to the page name in the sidebar

### Content Blocks

Available block types:

- **Subtitle**: Large heading (h2)
- **Header**: Section heading (h3)
- **Paragraph**: Regular text (p)
- **Code**: Code snippet (pre)

## API Endpoints

### Articles

- `GET /api/article` - Get all articles
- `GET /api/article/:slug` - Get article by slug
- `POST /api/article/add` - Create article
- `PUT /api/article/:id` - Update article
- `DELETE /api/article/:id` - Delete article

### Pages

- `GET /api/pages` - Get all pages
- `GET /api/pages/:id` - Get page by ID
- `POST /api/pages/add` - Create page (supports FormData for PDF)
- `PUT /api/pages/:id` - Update page (supports FormData for PDF)
- `DELETE /api/pages/:id` - Delete page

### Categories

- `GET /api/catagories` - Get all categories
- `GET /api/catagories/:name/articles` - Get articles by category

## PDF Support

To add a PDF page (like a resume):

1. Go to **"📄 Page"** tab
2. Fill title, slug, order
3. Click **"📎 Upload PDF"** and select your PDF file
4. Click **"📤 Publish"**
5. The page will display the PDF in an interactive viewer

## Notes

- Make sure your backend server is running on `http://localhost:3000`
- PDFs and images are stored in `/uploads` directory
- All slugs must be unique
- Articles require at least one category
