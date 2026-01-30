import "dotenv/config";
import express, { type Request, type Response } from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
//Routes
import articleRouter from "./routes/article.route.js";
import catagoryRouter from "./routes/catagories.route.js";
import pageRouter from "./routes/page.route.js";

const app = express();
connectDB();

// Configure CORS - allow development origins
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000",
  "http://localhost",
  "http://127.0.0.1",
  "file://", // Allow file:// protocol for local HTML files
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no origin (same origin or file://) or if origin matches allowed list
      if (
        !origin ||
        allowedOrigins.some((allowed) => {
          if (allowed === "file://") return origin?.startsWith("file://");
          return origin?.includes(allowed);
        })
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

const BASE_API_ROUTE = process.env.BASE_API_ROUTE || "/api";

app.use(`${BASE_API_ROUTE}/article`, articleRouter);
app.use(`${BASE_API_ROUTE}/catagories`, catagoryRouter);
app.use(`${BASE_API_ROUTE}/pages`, pageRouter);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
