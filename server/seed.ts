import mongoose from "mongoose";
import connectDB from "./src/database/connection.js";
import Article from "./src/models/article.model.js";
import Category from "./src/models/catagories.model.js";
import Page from "./src/models/page.model.js";

const loremWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
];

function generateLoremWord(): string {
  return loremWords[Math.floor(Math.random() * loremWords.length)];
}

function generateLoremSentence(): string {
  const wordCount = Math.floor(Math.random() * 10) + 5;
  const words = Array(wordCount)
    .fill(0)
    .map(() => generateLoremWord());
  return (
    words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + "."
  );
}

function generateLoremParagraph(): string {
  const sentenceCount = Math.floor(Math.random() * 8) + 4;
  return Array(sentenceCount)
    .fill(0)
    .map(() => generateLoremSentence())
    .join(" ");
}

function generateElements() {
  const types = ["subtitle", "header", "paragraph", "code"];
  const elementCount = Math.floor(Math.random() * 8) + 3;
  const elements = [];

  for (let i = 0; i < elementCount; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    let data = "";

    if (type === "code") {
      data = `const ${generateLoremWord()} = "${generateLoremWord()}";`;
    } else {
      data = generateLoremParagraph();
    }

    elements.push({ type, data });
  }

  return elements;
}

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to database");

    // Clear existing data
    console.log("Clearing existing data...");
    await Article.deleteMany({});
    await Page.deleteMany({});
    await Category.deleteMany({});

    // Create categories first
    console.log("Creating categories...");
    const categories = await Category.create([
      {
        name: "Technology",
        imageURI: "https://via.placeholder.com/400x300?text=Technology",
      },
      {
        name: "Design",
        imageURI: "https://via.placeholder.com/400x300?text=Design",
      },
      {
        name: "Business",
        imageURI: "https://via.placeholder.com/400x300?text=Business",
      },
      {
        name: "Development",
        imageURI: "https://via.placeholder.com/400x300?text=Development",
      },
      {
        name: "Lifestyle",
        imageURI: "https://via.placeholder.com/400x300?text=Lifestyle",
      },
    ]);
    console.log(`✓ Created ${categories.length} categories`);

    // Create articles
    console.log("Creating articles...");
    const articles = [];
    const articleTitles = [
      "Getting Started with Web Development",
      "Modern Design Trends",
      "The Future of Technology",
      "Building Scalable Applications",
      "User Experience Best Practices",
      "Cloud Computing Essentials",
      "Mobile App Development Guide",
      "Data Science Fundamentals",
      "Cybersecurity Basics",
      "AI and Machine Learning",
    ];

    for (let i = 0; i < articleTitles.length; i++) {
      const title = articleTitles[i];
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const categoryIds = [
        categories[Math.floor(Math.random() * categories.length)]._id,
        categories[Math.floor(Math.random() * categories.length)]._id,
      ];

      articles.push({
        title,
        slug: slug + "-" + Date.now(),
        imageURI: `https://via.placeholder.com/800x600?text=${encodeURIComponent(title)}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        catagories: [...new Set(categoryIds)],
        elements: generateElements(),
      });
    }

    await Article.create(articles);
    console.log(`✓ Created ${articles.length} articles`);

    // Create pages
    console.log("Creating pages...");
    const pages = [
      {
        title: "Home",
        slug: "home",
        order: 1,
        elements: [
          {
            type: "subtitle",
            data: "Welcome to My Portfolio",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
        ],
      },
      {
        title: "About Me",
        slug: "about",
        order: 2,
        elements: [
          {
            type: "subtitle",
            data: "About Me",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "header",
            data: "Experience",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "header",
            data: "Skills",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
        ],
      },
      {
        title: "Resume",
        slug: "resume",
        order: 3,
        elements: [
          {
            type: "subtitle",
            data: "Professional Resume",
          },
          {
            type: "header",
            data: "Education",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "header",
            data: "Work Experience",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "header",
            data: "Technical Skills",
          },
          {
            type: "paragraph",
            data: generateLoremParagraph(),
          },
          {
            type: "code",
            data: "skills: [JavaScript, TypeScript, React, Node.js, MongoDB, AWS]",
          },
        ],
      },
    ];

    await Page.create(pages);
    console.log(`✓ Created ${pages.length} pages`);

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
