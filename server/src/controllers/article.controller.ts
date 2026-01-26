import { type Response, type Request } from "express";
import { Article } from "../models/article.model.js";
import { type IArticle } from "../../../shared/article.model.js";

async function getAllArticle(req: Request, res: Response) {
  try {
    const articles = await Article.find();
    if (!articles[0])
      return res.status(404).json({ error: "Unable to find article" });
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

async function postArticle(req: Request, res: Response) {
  try {
    const { title, slug, imageURI, date, catagories, elements }: IArticle =
      req.body;
    const article = new Article({
      slug,
      title,
      imageURI,
      date,
      catagories,
      elements,
    });
    await article.save();
    res.status(201).json({ status: "Success!", data: article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export default {
  getAllArticle,
  getArticleBySlug,
  postArticle,
};
