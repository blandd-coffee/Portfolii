import articleControllers from "../controllers/article.controllers.js";
import { Router } from "express";
const router = Router();
router.get("/", articleControllers.getAllArticle);
router.get("/:slug", articleControllers.getArticleBySlug);
router.post("/add", articleControllers.postArticle);
export default router;
