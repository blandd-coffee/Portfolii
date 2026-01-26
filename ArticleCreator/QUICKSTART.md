# Article Creator - Quick Start Guide

## How to Use

### Step 1: Start Your Server

Make sure your API server is running:

```bash
cd server
npm run dev
```

The server should be running on `http://localhost:3000`

### Step 2: Open Article Creator

Simply open `ArticleCreator/index.html` in your web browser.

That's it! No build process, no installation needed.

## Creating Your First Article

### 1. Fill in Basic Information

- **Title**: Give your article a catchy title
- **Slug**: Create a URL-friendly version (auto-convert: spaces → hyphens, UPPERCASE → lowercase)
- **Image URL**: Link to your featured image
- **Date**: When you want to publish it

### 2. Select Categories

Check the boxes for categories that match your article. Multiple selections are supported!

### 3. Build Content

Choose your element type and add content:

**Example Article Structure:**

```
1. Subtitle: "Getting Started with Node.js"
2. Header: "What is Node.js?"
3. Paragraph: "Node.js is a JavaScript runtime..."
4. Header: "Installation"
5. Code Block: (paste your installation commands)
6. Header: "Creating Your First Server"
7. Code Block: (paste example code)
8. Paragraph: "This code creates a simple HTTP server..."
```

### 4. Review & Create

- Check the preview panel to see how it looks
- Click "Create Article" when ready
- You'll get a success message when it's saved

### 5. View Your Article

Your article will appear on:

- The home page in the article list
- In the selected categories pages

## Element Type Cheat Sheet

| Type           | When to Use            | Looks Like            |
| -------------- | ---------------------- | --------------------- |
| **Subtitle**   | Major section dividers | Large heading         |
| **Header**     | Section titles         | Medium heading        |
| **Paragraph**  | Main content           | Regular text          |
| **Code Block** | Programming examples   | Monospace dark box    |
| **List**       | Bullet points          | Text with bullet icon |

## Pro Tips

✅ **DO:**

- Use multiple headers to organize your article
- Include code examples for technical articles
- Use simple, descriptive slugs
- Preview your article before submitting
- Add relevant categories

❌ **DON'T:**

- Leave required fields blank
- Use special characters in slugs
- Create articles without categories
- Use very long paragraphs (break them up!)

## Example: Blog Post

Here's how you'd create a typical blog post:

```
Title: "10 Tips for Better Code"
Slug: "10-tips-better-code"
Image: https://example.com/code-tips.jpg
Date: [today's date]

Categories: Programming, Best Practices

Content:
1. Subtitle: "10 Tips for Writing Better Code"
2. Header: "1. Write Comments"
3. Paragraph: "Comments explain your reasoning..."
4. Code Block: (example code with comments)
5. Header: "2. Use Meaningful Names"
6. Paragraph: "Variable and function names should be clear..."
... (continue for remaining tips)
```

## Troubleshooting

**Q: "Loading categories..." never disappears**

- A: Server isn't running. Make sure `npm run dev` is active in the server folder

**Q: "Error creating article" after clicking submit**

- A: Check that all required fields are filled in and the server is running

**Q: The preview isn't showing anything**

- A: Make sure you've clicked "Add Element" to add at least one content block

**Q: My article slug is getting rejected**

- A: Use only lowercase letters, numbers, and hyphens (no spaces or special characters)

## Need Help?

Check the main README.md file for more detailed information about:

- API integration details
- Browser compatibility
- File structure
- Future enhancements
