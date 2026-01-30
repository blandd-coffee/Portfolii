import { Router } from "express";
import pageController from "../controllers/page.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", pageController.getAllPages);
router.get("/id/:id", pageController.getPageById);
router.get("/:slug", pageController.getPageBySlug);
router.post(
  "/add",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 20 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  pageController.postPage,
);
router.put(
  "/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 20 },
    { name: "pdfFiles", maxCount: 10 },
  ]),
  pageController.updatePage,
);
router.delete("/:id", pageController.deletePage);

export default router;
