# Article Creator - Quick Reference Card

## 📋 Checklist Before Creating an Article

- [ ] Title filled in (catchy and descriptive)
- [ ] Slug created (lowercase, hyphens, no spaces)
- [ ] Image URL provided (or placeholder)
- [ ] Date selected
- [ ] At least 1 category selected
- [ ] At least 1 content element added
- [ ] Preview looks good

## 🎯 Article Metadata

```
Title:           "Your Article Title"
Slug:            "your-article-slug"
Image:           https://example.com/image.jpg
Date:            2024-01-15 (today by default)
Categories:      [✓] Programming [✓] Web Dev
```

## 📝 Element Types & When to Use

```
┌─────────────┬──────────────────┬─────────────────────────────┐
│ Type        │ Frequency        │ Example                     │
├─────────────┼──────────────────┼─────────────────────────────┤
│ SUBTITLE    │ 1 at start      │ "Getting Started with React"│
│ HEADER      │ Several (1-3)   │ "Installation", "Basics"    │
│ PARAGRAPH   │ Most common     │ Body text explanations      │
│ CODE        │ As needed       │ Code snippets, examples     │
│ LIST        │ Optional        │ Steps, requirements         │
└─────────────┴──────────────────┴─────────────────────────────┘
```

## 📐 Recommended Structure

```
1. SUBTITLE: Main title (matches article title)
   ↓
2. PARAGRAPH: Introduction/overview
   ↓
3. HEADER: "Section 1 Title"
   ↓
4. PARAGRAPH: Explanation
   ↓
5. CODE: Example code (if applicable)
   ↓
6. HEADER: "Section 2 Title"
   ↓
[repeat as needed...]
```

## 🎨 Slug Examples

```
Article Title                          Good Slug
─────────────────────────────────────────────────────────────
"Getting Started with React"           getting-started-react
"10 Python Best Practices"             10-python-best-practices
"Building REST APIs"                   building-rest-apis
"Advanced TypeScript Tips"             advanced-typescript-tips
"Database Design Patterns"             database-design-patterns
```

## ❌ Slug Anti-Patterns

```
DON'T:                          DO:
──────────────────────────────────────────────────
"Article"                       "specific-title"
"Getting-Started-With-React"    "getting-started-react"
"article_slug"                  "article-slug"
"getting started react"         "getting-started-react"
"Getting Started React!!"       "getting-started-react"
```

## 🏷️ Category Selection

**Choose 1-3 categories that fit:**

- Primary: Most relevant category
- Secondary: Related category (optional)
- Tertiary: Broader classification (optional)

❌ **Don't select too many** - dilutes the article classification

## 💬 Element Content Examples

### Subtitle

```
"Getting Started with Node.js: A Beginner's Guide"
```

### Header

```
"Installation"
"Key Concepts"
"Common Mistakes"
```

### Paragraph

```
"Node.js is a JavaScript runtime that allows you to build
server-side applications. It's event-driven and uses a
non-blocking I/O model."
```

### Code Block

```
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server running!');
});
```

### List

```
npm install -g npm (update npm)
npm init (create package.json)
npm install express (install express)
```

## ⏱️ Estimated Time Breakdown

| Task              | Time          |
| ----------------- | ------------- |
| Fill metadata     | 2-3 min       |
| Select categories | 1 min         |
| Write/add content | 10-30 min     |
| Preview & refine  | 2-5 min       |
| **Total**         | **15-40 min** |

_Varies based on article length and complexity_

## 🚀 Post-Creation Checklist

After clicking "Create Article":

- [ ] Got success message ✅
- [ ] Open portfolio (http://localhost:5174)
- [ ] Article appears in home feed ✅
- [ ] Can click and view article ✅
- [ ] Categories are linked correctly ✅
- [ ] Image displays properly ✅
- [ ] Content formatting looks good ✅

## 🆘 Quick Troubleshooting

| Problem                           | Solution                           |
| --------------------------------- | ---------------------------------- |
| Categories won't load             | Restart server, check port 3000    |
| Submit button disabled            | Fill required fields, add elements |
| Can't find article after creating | Refresh portfolio page             |
| Error: "Invalid slug"             | Use only letters, numbers, hyphens |
| CORS error                        | Ensure server has CORS enabled     |

## 📚 Helpful Links

- **Examples**: `examples.html` - See sample articles
- **Setup**: `SETUP.md` - Database configuration
- **Quick Start**: `QUICKSTART.md` - Beginner guide
- **Full Docs**: `README.md` - Complete reference

## 💡 Pro Tips

💡 **Draft Your Content First**
Write content in a text editor, then paste into the tool

💡 **Use Consistent Formatting**
Keep header names and structure similar across articles

💡 **Keep Paragraphs Short**
Max 3-5 sentences per paragraph for readability

💡 **Code Examples Are Gold**
Readers appreciate working code examples

💡 **Review Before Submit**
Check the preview panel - it shows exactly how readers see it

💡 **Meaningful Categories**
Help readers find related articles by using consistent categories

## 🎓 Learning Path

1. **Start with Examples** → Open `examples.html`
2. **Read Quick Start** → Follow `QUICKSTART.md`
3. **Create First Article** → Use this reference card
4. **Refine Process** → Iterate and improve

## 🎯 Success Criteria for Great Articles

✅ **Clear Structure**

- Subtitle at the start
- Headers organizing sections
- Logical flow

✅ **Good Content**

- Accurate information
- Relevant examples
- Helpful to readers

✅ **Proper Formatting**

- No super long paragraphs
- Code examples where helpful
- Organized with categories

✅ **Polished Appearance**

- Good featured image
- Descriptive title
- Clean slug

---

**You've got this! 🚀 Start creating amazing articles!**
