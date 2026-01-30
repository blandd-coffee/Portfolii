import articleControllers from "../controllers/article.controller.js";
import { Router } from "express";
import upload from "../middleware/upload.js";
const router = Router();
router.get("/", articleControllers.getAllArticle);
router.get("/id/:id", articleControllers.getArticleById);
router.get("/:slug", articleControllers.getArticleBySlug);
router.post(
  "/add",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 20 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  articleControllers.postArticle,
);
router.put(
  "/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 20 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  articleControllers.updateArticle,
);
router.delete("/:id", articleControllers.deleteArticle);
export default router;
