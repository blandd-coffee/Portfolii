# 📝 Article Creator Utility

A standalone, browser-based tool for creating, formatting, and publishing articles to your portfolio with real-time preview and category management.

## 🎯 Overview

The Article Creator is a **separate utility** from your main Portfolio application. It's a simple HTML/CSS/JavaScript application that:

- ✨ Provides an intuitive interface for article creation
- 🏷️ Dynamically loads categories from your API
- 🎨 Supports multiple content element types
- 👁️ Shows live preview as you build
- 📱 Responsive design that works on all devices
- ⚡ Requires zero build process - just open the HTML file

## 📂 Directory Structure

```
ArticleCreator/
├── index.html           # Main article creation interface
├── examples.html        # Gallery of example articles
├── README.md           # This file
├── QUICKSTART.md       # Fast-track getting started guide
└── SETUP.md            # Database and environment setup
```

## 🚀 Quick Start

### Prerequisites

- ✅ Your portfolio server running (`npm run dev` in `/server`)
- ✅ At least one category in your database
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Verify Server is Running

```bash
cd server
npm run dev
# Should output: running on http://localhost:3000
```

### Step 2: Open Article Creator

1. Open `ArticleCreator/index.html` in your web browser
2. Categories should automatically load
3. You're ready to create!

### Step 3: Create an Article

1. Fill in basic info (title, slug, image, date)
2. Select categories
3. Add content elements
4. Review in preview panel
5. Click "Create Article"

That's it! Your article is now in the database and appears on your portfolio.

## 💡 How It Works

### Architecture

```
┌─────────────────────────────────────────────┐
│          Article Creator (HTML)             │
│   ├─ Forms for article metadata             │
│   ├─ Dynamic category loading               │
│   ├─ Content element builder                │
│   └─ Real-time preview                      │
└──────────────┬──────────────────────────────┘
               │
               │ HTTP Requests
               │
┌──────────────▼──────────────────────────────┐
│      Portfolio Backend API (Node.js)        │
│   ├─ GET  /api/catagories                   │
│   ├─ POST /api/article/add                  │
│   └─ Database operations                    │
└─────────────────────────────────────────────┘
```

### Workflow

1. **Load Categories**: When you open the tool, it fetches all categories from `/api/catagories`
2. **Build Article**: You fill in metadata and build content elements
3. **Real-time Preview**: See exactly how your article will look
4. **Submit**: POST to `/api/article/add` with all article data
5. **Verification**: Success message confirms it was created
6. **View**: Check your portfolio to see the published article

## 📝 Article Structure

### Metadata Fields

| Field      | Type     | Required | Example                       |
| ---------- | -------- | -------- | ----------------------------- |
| Title      | String   | ✅       | "Getting Started with React"  |
| Slug       | String   | ✅       | "getting-started-react"       |
| Image URI  | URL      | ✅       | "https://example.com/img.jpg" |
| Date       | ISO Date | ✅       | "2024-01-15"                  |
| Categories | Array    | ✅       | ["Programming", "Web Dev"]    |

### Content Elements

The article content is built from **blocks** (elements). Each element has a type and data:

```typescript
interface Element {
  type: "paragraph" | "header" | "subtitle" | "code" | "list";
  data: string;
}
```

#### Element Types

| Type           | Purpose               | Usage                     |
| -------------- | --------------------- | ------------------------- |
| **Subtitle**   | Major section divider | Use once at the beginning |
| **Header**     | Section title         | Use to organize sections  |
| **Paragraph**  | Body text             | Main content              |
| **Code Block** | Code snippets         | Programming examples      |
| **List**       | Bullet points         | Steps, requirements       |

### Example Article JSON

```json
{
  "title": "Introduction to Node.js",
  "slug": "intro-nodejs",
  "imageURI": "https://example.com/nodejs.jpg",
  "date": "2024-01-15T00:00:00.000Z",
  "catagories": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
  "elements": [
    {
      "type": "subtitle",
      "data": "Introduction to Node.js: Build Fast Server-Side JavaScript"
    },
    {
      "type": "paragraph",
      "data": "Node.js is a powerful runtime that allows you to run JavaScript outside the browser..."
    },
    {
      "type": "header",
      "data": "Installation"
    },
    {
      "type": "code",
      "data": "npm install express\nnpm start"
    }
  ]
}
```

## 🎨 Formatting Guidelines

### Best Practices

✅ **DO:**

- Use Subtitle for the main title at the start
- Organize content with Headers
- Break up long paragraphs (max 5 sentences)
- Use Code blocks for any code examples
- Use meaningful, descriptive slugs
- Select relevant categories

❌ **DON'T:**

- Leave required fields blank
- Use special characters in slugs (#, @, $, etc.)
- Skip categories
- Create articles without meaningful content
- Use all CAPS in titles or slugs

### Slug Naming Convention

A good slug:

- Uses only lowercase letters, numbers, and hyphens
- Describes the content concisely
- Matches your article title
- Is URL-friendly

```
Article Title: "Building REST APIs with Node.js"
Good Slug:     "building-rest-apis-nodejs"
Bad Slug:      "Building REST APIs with Node.js" ❌
```

## 📚 Features in Detail

### Category Management

The tool automatically:

- Loads all categories from your database
- Shows them as checkboxes
- Allows multiple selections
- Displays selected categories as visual tags
- Includes them in the submission

### Live Preview

The preview panel shows:

- How each element will appear
- Proper formatting (headers, code blocks, etc.)
- Updates as you add elements
- Helps catch formatting issues before submission

### Form Validation

Before submission, the tool verifies:

- All required fields are filled
- At least one element is added
- At least one category is selected
- Provides helpful error messages if validation fails

### Status Messages

- ✅ **Success**: "Article created successfully!" (auto-disappears)
- ❌ **Error**: Error details displayed (persistent)
- 💬 **Info**: Helpful tips and guidance

## 🔧 API Integration

### Endpoints Used

#### GET /api/catagories

Fetch all available categories

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Programming",
    "imageURI": "https://example.com/prog.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/article/add

Create a new article

**Request:**

```json
{
  "title": "Article Title",
  "slug": "article-slug",
  "imageURI": "https://example.com/image.jpg",
  "date": "2024-01-15T00:00:00.000Z",
  "catagories": ["category-id-1", "category-id-2"],
  "elements": [...]
}
```

**Response (Success):**

```json
{
  "status": "Success!",
  "data": {
    /* full article object */
  }
}
```

## 🚨 Troubleshooting

### Categories Won't Load

**Problem**: "Loading categories..." never finishes

**Solutions:**

1. Verify server is running: `npm run dev` in server folder
2. Check server is on port 3000
3. Open browser console (F12) → Network tab → check `/api/catagories` request
4. Verify categories exist in database

### Can't Submit Article

**Problem**: "Error creating article" message

**Solutions:**

1. ✅ Fill in ALL required fields (marked with \*)
2. ✅ Add at least one content element
3. ✅ Select at least one category
4. ✅ Verify server is running
5. Check browser console for detailed error messages

### Preview Not Updating

**Problem**: Added element but preview doesn't change

**Solution**: Ensure you clicked "Add Element" button to update preview

### CORS Errors

**Problem**: "CORS policy: blocked by same-origin policy"

**Solution**: Your server needs CORS enabled. Add to `server/src/app.ts`:

```typescript
import cors from "cors";
app.use(cors());
```

## 📖 Documentation Files

| File              | Purpose                                     |
| ----------------- | ------------------------------------------- |
| **README.md**     | Full documentation (you are here)           |
| **QUICKSTART.md** | Fast-track guide to creating articles       |
| **SETUP.md**      | Database setup and configuration            |
| **examples.html** | Gallery of example articles with structures |

## 🎓 Learning Resources

### View Examples

Open `examples.html` to see three complete article examples:

1. **Tutorial**: "Getting Started with React"
2. **Blog Post**: "5 Python Best Practices"
3. **Technical Doc**: "MongoDB Aggregation Pipeline"

Each example shows:

- Complete article metadata
- Full content structure
- How elements are organized
- Best practices

### Step-by-Step Tutorial

See **QUICKSTART.md** for a beginner-friendly walkthrough.

## 🔐 Security Notes

- The tool sends requests directly to your API
- No sensitive data is stored in the browser
- API authentication happens server-side
- Article data is validated on the server

For production deployments, consider:

- Adding API authentication (JWT tokens)
- Implementing rate limiting
- Adding spam/content filtering
- Setting up CORS properly for your domain

## 💾 No Installation Required

This is the biggest advantage of the Article Creator:

- No `npm install` needed
- No build process
- No dependencies to manage
- Just open the HTML file and use it
- Works offline (except API calls, of course)

## 🌐 Browser Support

Works on all modern browsers:

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📊 File Sizes

- `index.html` - ~25 KB (single file, everything included)
- `examples.html` - ~15 KB
- `README.md` - ~20 KB

Total: ~60 KB - incredibly lightweight!

## 🚀 Performance

- Instant load times
- No dependencies to download
- Fast form interactions
- Smooth previews
- Real-time validation

## 🎯 Next Steps

1. **Get Started**: Follow QUICKSTART.md
2. **View Examples**: Check examples.html for inspiration
3. **Create First Article**: Fill out the form and submit
4. **Verify**: Check your portfolio to see the published article
5. **Iterate**: Create more articles and refine your process

## 📞 Support

If you run into issues:

1. Check the **SETUP.md** file for configuration help
2. Review **examples.html** for structure examples
3. Check browser console (F12) for error details
4. Verify server is running and accessible
5. Ensure database has categories added

## 🎉 You're All Set!

Everything is ready to go. Just:

1. Run your server
2. Open `index.html`
3. Start creating amazing articles!

Happy writing! 📝✨
