import { type Request, type Response } from "express";
import { Page } from "../models/page.model.js";
import type { IPage } from "../../../shared/page.model.js";

async function getAllPages(req: Request, res: Response) {
  try {
    const pages = await Page.find().sort({ order: 1 });
    res.status(200).json(pages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function getPageBySlug(req: Request, res: Response) {
  try {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug;
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    const page = await Page.findOne({ slug } as any);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function postPage(req: Request, res: Response) {
  try {
    const { title, slug, imageURI, order, elements }: IPage = req.body;
    const page = new Page({ title, slug, imageURI, order, elements });
    await page.save();

    res.status(201).json({ status: "Success!", data: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function updatePage(req: Request, res: Response) {
  try {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug;
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    const updates: Partial<IPage> = req.body;
    const page = await Page.findOneAndUpdate({ slug } as any, updates, {
      new: true,
    });
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).json({ status: "Success!", data: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function deletePage(req: Request, res: Response) {
  try {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug;
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    const page = await Page.findOneAndDelete({ slug } as any);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).json({ status: "Success!", message: "Page deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export default { getAllPages, getPageBySlug, postPage, updatePage, deletePage };
