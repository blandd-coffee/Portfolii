import { type Request, type Response } from "express";
import { Page } from "../models/page.model.js";
import type { IPage } from "../../../shared/page.model.js";
import { applyElementUploads, parseElements } from "../utils/elements.js";

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
    const slug = req.params.slug;
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    const page = await Page.findOne({ slug });
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function getPageById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const page = await Page.findById(id);
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
    let { title, slug, imageURI, order, elements }: IPage = req.body;
    const files = (req as any).files;
    let pdfFile = files?.pdfFile?.[0]?.filename;
    let finalImageURI = imageURI ?? null;

    if (files?.imageFile?.[0]) {
      finalImageURI = files.imageFile[0].filename;
    }

    let parsedElements = parseElements(elements);
    parsedElements = applyElementUploads(parsedElements, files);

    // Auto-assign order if not provided
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const lastPage = await Page.findOne().sort({ order: -1 });
      finalOrder = (lastPage?.order || 0) + 1;
    }

    const page = new Page({
      title,
      slug,
      imageURI: finalImageURI,
      pdfFile: pdfFile || null,
      order: finalOrder,
      elements: parsedElements || [],
    });
    await page.save();

    res.status(201).json({ status: "Success!", data: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

async function updatePage(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updates: Partial<IPage> = req.body;

    // Handle file upload
    const files = (req as any).files;
    if (files?.pdfFile?.[0]) {
      updates.pdfFile = files.pdfFile[0].filename;
    }
    if (files?.imageFile?.[0]) {
      updates.imageURI = files.imageFile[0].filename;
    }

    // Parse elements if it's a string
    if (typeof updates.elements === "string") {
      updates.elements = parseElements(updates.elements);
    } else if (updates.elements) {
      updates.elements = parseElements(updates.elements);
    }

    if (updates.elements && Array.isArray(updates.elements)) {
      updates.elements = applyElementUploads(updates.elements, files);
    }

    const page = await Page.findByIdAndUpdate(id, updates, { new: true });
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
    const id = req.params.id;
    const page = await Page.findByIdAndDelete(id);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.status(200).json({ status: "Success!", message: "Page deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export default {
  getAllPages,
  getPageBySlug,
  getPageById,
  postPage,
  updatePage,
  deletePage,
};
