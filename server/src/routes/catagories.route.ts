import { Router } from "express";
import catagoriesController from "../controllers/catagories.controller.js";
const router = Router();

router.get("/", catagoriesController.getAllCatagories);
router.post("/add", catagoriesController.postCatagory);

export default router;
