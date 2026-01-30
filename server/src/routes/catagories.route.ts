import { Router } from "express";
import catagoriesController from "../controllers/catagories.controller.js";
import upload from "../middleware/upload.js";
const router = Router();

router.get("/", catagoriesController.getAllCatagories);
router.post("/add", upload.single("imageFile"), catagoriesController.postCatagory);
// New endpoint: get articles by category name
router.get("/:name/articles", catagoriesController.getArticlesByCatagoryName);

export default router;
