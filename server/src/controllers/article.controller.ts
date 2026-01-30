import { type Response, type Request } from "express";
import { Article } from "../models/article.model.js";
import { type IArticle } from "../../../shared/article.model.js";
import { applyElementUploads, parseElements } from "../utils/elements.js";

async function getAllArticle(req: Request, res: Response) {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function getArticleBySlug(req: Request, res: Response) {
  try {
    const article = await Article.findOne({
      slug: req.params.slug as string,
    });
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function getArticleById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function postArticle(req: Request, res: Response) {
  try {
    const { title, slug, imageURI, date, catagories, elements }: IArticle =
      req.body;

    let finalImageURI = imageURI;
    if ((req as any).files?.imageFile?.[0]) {
      finalImageURI = (req as any).files.imageFile[0].filename;
    }

    let parsedElements = parseElements(elements);
    parsedElements = applyElementUploads(parsedElements, (req as any).files);

    const article = new Article({
      slug,
      title,
      imageURI: finalImageURI,
      date,
      catagories,
      elements: parsedElements,
    });
    await article.save();
    res.status(201).json({ status: "Success!", data: article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function updateArticle(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updates: any = {};

    // Handle form fields
    if (req.body.title) updates.title = req.body.title;
    if (req.body.slug) updates.slug = req.body.slug;
    if (req.body.date) updates.date = req.body.date;
    if (req.body.catagories) {
      if (typeof req.body.catagories === "string") {
        try {
          updates.catagories = JSON.parse(req.body.catagories);
        } catch (e) {
          updates.catagories = [];
        }
      } else {
        updates.catagories = req.body.catagories;
      }
    }
    if (req.body.elements) {
      updates.elements = parseElements(req.body.elements);
    }
    if (req.body.isIndexed !== undefined) {
      updates.isIndexed = req.body.isIndexed === "true";
    }

    // Handle image file
    if ((req as any).files?.imageFile?.[0]) {
      updates.imageURI = (req as any).files.imageFile[0].filename;
    } else if (req.body.imageURI) {
      updates.imageURI = req.body.imageURI;
    }

    if (updates.elements && Array.isArray(updates.elements)) {
      updates.elements = applyElementUploads(
        updates.elements,
        (req as any).files,
      );
    }

    const article = await Article.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ status: "Success!", data: article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function deleteArticle(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ status: "Success!", message: "Article deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export default {
  getAllArticle,
  getArticleBySlug,
  getArticleById,
  postArticle,
  updateArticle,
  deleteArticle,
};
