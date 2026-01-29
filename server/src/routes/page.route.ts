import { Router } from "express";
import pageController from "../controllers/page.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", pageController.getAllPages);
router.get("/id/:id", pageController.getPageById);
router.get("/:slug", pageController.getPageBySlug);
router.post("/add", upload.single("pdfFile"), pageController.postPage);
router.put("/:id", upload.single("pdfFile"), pageController.updatePage);
router.delete("/:id", pageController.deletePage);

export default router;
