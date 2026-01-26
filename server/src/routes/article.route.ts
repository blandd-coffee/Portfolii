import articleControllers from "../controllers/article.controller.js";
import { Router } from "express";
const router = Router();
router.get("/", articleControllers.getAllArticle);
router.get("/:slug", articleControllers.getArticleBySlug);
router.post("/add", articleControllers.postArticle);
router.put("/:id", articleControllers.updateArticle);
router.delete("/:id", articleControllers.deleteArticle);
export default router;
