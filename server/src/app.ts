import express, { type Request, type Response } from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
//Routes
import articleRouter from "./routes/article.route.js";
import catagoryRouter from "./routes/catagories.route.js";
import pageRouter from "./routes/page.route.js";
const app = express();
connectDB();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.use("/api/article", articleRouter);
app.use("/api/catagories", catagoryRouter);
app.use("/api/pages", pageRouter);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
