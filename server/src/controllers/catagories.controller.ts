import { type Request, type Response } from "express";
import { Catagory } from "../models/catagories.model.js";
import { type ICatagory } from "../../../shared/catagories.model.js";

async function getAllCatagories(req: Request, res: Response) {
  try {
    const catagories = await Catagory.find();
    res.status(200).json(catagories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function getArticlesByCatagory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id as string;
    const category = await Catagory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function postCatagory(req: Request, res: Response) {
  try {
    const { name, imageURI }: ICatagory = req.body;
    let finalImageURI = imageURI;
    if ((req as any).file) {
      finalImageURI = (req as any).file.filename;
    }

    const catagory = new Catagory({ name, imageURI: finalImageURI });
    await catagory.save();

    res.status(201).json({ status: "Success!", data: catagory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

import { Article } from "../models/article.model.js";

// Get articles by category name
async function getArticlesByCatagoryName(req: Request, res: Response) {
  try {
    const name = req.params.name as string;
    // Find the category by name
    const cat = await Catagory.findOne({ name });
    if (!cat) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Find articles with this category's _id in their catagories array
    const articles = await Article.find({ catagories: cat._id });
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export default { getAllCatagories, postCatagory, getArticlesByCatagoryName };
