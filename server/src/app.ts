import express, { type Request, type Response } from "express";
import connectDB from "./database/connection.js";

//Routes
import articleRouter from "./routes/article.route.js";
import catagoryRouter from "./routes/catagories.route.js";
const app = express();
connectDB();
app.use(express.json());
app.use("/api/article", articleRouter);
app.use("/api/catagories", catagoryRouter);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`running on http://localhost:3000`);
});
