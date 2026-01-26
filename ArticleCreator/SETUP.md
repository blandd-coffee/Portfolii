# Setup Guide for Article Creator

## Database Setup

Before using the Article Creator, you need to have at least one category in your database.

### Adding Categories via API

Use a tool like Postman or curl to add categories to your database:

```bash
curl -X POST http://localhost:3000/api/catagories/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Programming",
    "imageURI": "https://example.com/programming.jpg"
  }'
```

### Example Categories

Here are some common categories to get started:

```json
[
  {
    "name": "Programming",
    "imageURI": "https://via.placeholder.com/400x300?text=Programming"
  },
  {
    "name": "Web Development",
    "imageURI": "https://via.placeholder.com/400x300?text=Web+Development"
  },
  {
    "name": "Data Science",
    "imageURI": "https://via.placeholder.com/400x300?text=Data+Science"
  },
  {
    "name": "DevOps",
    "imageURI": "https://via.placeholder.com/400x300?text=DevOps"
  },
  {
    "name": "Mobile Development",
    "imageURI": "https://via.placeholder.com/400x300?text=Mobile+Development"
  },
  {
    "name": "Best Practices",
    "imageURI": "https://via.placeholder.com/400x300?text=Best+Practices"
  }
]
```

### Using MongoDB Compass or Similar Tool

If you prefer using a MongoDB GUI:

1. Connect to your MongoDB database
2. Navigate to the `catagories` collection
3. Insert a new document with the structure:
   ```json
   {
     "name": "Your Category Name",
     "imageURI": "https://your-image-url.com/image.jpg",
     "createdAt": ISODate(),
     "updatedAt": ISODate()
   }
   ```

## Server Configuration

Make sure your server is properly configured:

### Environment Variables

Create a `.env` file in the server directory if you haven't already:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=3000
```

### Start the Server

```bash
cd server
npm run dev
```

You should see output like:

```
running on http://localhost:3000
```

## Testing the Article Creator

### 1. Verify API is Accessible

Open your browser console (F12) and test:

```javascript
fetch("http://localhost:3000/api/catagories")
  .then((r) => r.json())
  .then(console.log);
```

You should see your categories returned.

### 2. Create a Test Article

1. Open `ArticleCreator/index.html` in your browser
2. Categories should load automatically
3. Fill in the form:
   - Title: "Test Article"
   - Slug: "test-article"
   - Image: https://via.placeholder.com/600x400
   - Date: Today's date
4. Select a category
5. Add some elements
6. Click "Create Article"

### 3. Verify on Portfolio

Check if your article appears:

1. Open the portfolio at `http://localhost:5174`
2. You should see your article in the main feed
3. It should also appear under the selected category

## CORS Issues?

If you see CORS errors, you may need to add CORS middleware to your server.

Add to `server/src/app.ts`:

```typescript
import cors from "cors";

// After creating the app:
app.use(cors());
```

Then install cors:

```bash
npm install cors
npm install --save-dev @types/cors
```

## Next Steps

1. ✅ Add some categories to your database
2. ✅ Start the server with `npm run dev`
3. ✅ Open `ArticleCreator/index.html`
4. ✅ Create your first article
5. ✅ View it on your portfolio

Enjoy creating content! 📝
