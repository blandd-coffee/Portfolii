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
    let pdfFile = (req as any).file ? (req as any).file.filename : undefined;

    // Ensure we only store the filename, not the path
    if (pdfFile && pdfFile.includes("/")) {
      pdfFile = pdfFile.split("/").pop();
    }
    if (pdfFile && pdfFile.includes("\\")) {
      pdfFile = pdfFile.split("\\").pop();
    }

    let parsedElements = elements;
    if (typeof elements === "string") {
      try {
        parsedElements = JSON.parse(elements);
      } catch (e) {
        parsedElements = [];
      }
    }

    // Auto-assign order if not provided
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const lastPage = await Page.findOne().sort({ order: -1 });
      finalOrder = (lastPage?.order || 0) + 1;
    }

    const page = new Page({
      title,
      slug,
      imageURI: imageURI || null,
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
    if ((req as any).file) {
      let pdfFile = (req as any).file.filename;
      // Ensure we only store the filename, not the path
      if (pdfFile.includes("/")) {
        pdfFile = pdfFile.split("/").pop() || pdfFile;
      }
      if (pdfFile.includes("\\")) {
        pdfFile = pdfFile.split("\\").pop() || pdfFile;
      }
      updates.pdfFile = pdfFile;
    }

    // Parse elements if it's a string
    if (typeof updates.elements === "string") {
      try {
        updates.elements = JSON.parse(updates.elements);
      } catch (e) {
        updates.elements = [];
      }
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
