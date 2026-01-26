# Article Creator Utility

A standalone HTML utility for creating beautifully formatted articles with category selection and live preview.

## Features

✨ **Easy-to-use Interface**

- Clean, modern UI with intuitive controls
- Real-time preview of article content
- Form validation for all required fields

📝 **Article Management**

- Create articles with title, slug, image URL, and publication date
- Support for multiple element types:
  - **Paragraph**: Standard text content
  - **Header**: Section headers
  - **Subtitle**: Major section dividers
  - **Code Block**: Formatted code snippets
  - **List**: Bullet points and list items

🏷️ **Category Selection**

- Automatically loads categories from your API
- Select multiple categories for each article
- Visual tag display of selected categories

👁️ **Live Preview**

- See how your article will look as you create it
- Preview updates in real-time as you add elements
- Formatted display matching your portfolio's styling

## Getting Started

### Prerequisites

- Your server must be running on `http://localhost:3000`
- Categories must be populated in your database

### Usage

1. Open `index.html` in a web browser
2. Fill in the article details:
   - **Title**: The article's title
   - **Slug**: URL-friendly version of the title (e.g., `my-awesome-article`)
   - **Image URL**: Link to the article's featured image
   - **Publication Date**: When the article was published

3. Select one or more categories from the list

4. Build your article content:
   - Choose an element type from the dropdown
   - Enter the content
   - Click "Add Element"
   - Repeat for all content blocks
   - Watch the preview update in real-time

5. Review your article in the preview panel

6. Click "Create Article" to save it to your database

7. Use "Reset Form" to start a new article

## Element Types

| Type           | Usage                  | Example                             |
| -------------- | ---------------------- | ----------------------------------- |
| **Paragraph**  | Main body text         | Blog post content, descriptions     |
| **Header**     | Section titles         | "Getting Started", "Best Practices" |
| **Subtitle**   | Major section dividers | "Part 1: Introduction"              |
| **Code Block** | Code snippets          | Python, JavaScript, SQL code        |
| **List**       | Bullet points          | Steps, requirements, features       |

## API Integration

The utility connects to your server API:

- **Categories Endpoint**: `GET http://localhost:3000/api/catagories`
- **Article Creation**: `POST http://localhost:3000/api/article/add`

## Tips

💡 Always generate a clean, URL-friendly slug

- Use lowercase letters and hyphens
- Example: `introduction-to-nodejs` ✅
- Avoid: `Introduction to Node.js` ❌

💡 Keep element content organized

- Use headers and subtitles to structure your article
- Break up long content into multiple paragraphs
- Use code blocks for any technical content

💡 Select appropriate categories

- Help readers find related articles
- Use categories that accurately describe the content

## File Structure

```
ArticleCreator/
├── index.html          # Complete standalone application
└── README.md          # This file
```

## Browser Compatibility

Works on all modern browsers:

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Troubleshooting

### Categories not loading?

- Make sure your server is running on port 3000
- Check that the `/api/catagories` endpoint is accessible
- Open browser console (F12) to see error details

### Articles not saving?

- Verify all required fields are filled in (marked with \*)
- Check that the server is running
- Check browser console for error messages
- Ensure at least one element is added

### Preview not updating?

- Click "Add Element" to update the preview
- Try refreshing the page

## Future Enhancements

Potential improvements:

- [ ] Image upload functionality
- [ ] Draft saving and recovery
- [ ] Markdown support
- [ ] Article editing interface
- [ ] Category management interface
