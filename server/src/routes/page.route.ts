import { Router } from "express";
import pageController from "../controllers/page.controller.js";
const router = Router();

router.get("/", pageController.getAllPages);
router.get("/:slug", pageController.getPageBySlug);
router.post("/add", pageController.postPage);
router.put("/:slug", pageController.updatePage);
router.delete("/:slug", pageController.deletePage);

export default router;
