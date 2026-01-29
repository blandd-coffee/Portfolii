import articleControllers from "../controllers/article.controller.js";
import { Router } from "express";
import upload from "../middleware/upload.js";
const router = Router();
router.get("/", articleControllers.getAllArticle);
router.get("/:slug", articleControllers.getArticleBySlug);
router.get("/id/:id", articleControllers.getArticleById);
router.post(
  "/add",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  articleControllers.postArticle,
);
router.put(
  "/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  articleControllers.updateArticle,
);
router.delete("/:id", articleControllers.deleteArticle);
export default router;
