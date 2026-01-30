import type { IElementBlock } from "../../../shared/article.model.js";

type UploadFile = {
  filename: string;
};

type UploadMap = {
  imageFiles?: UploadFile[];
  pdfFiles?: UploadFile[];
};

export const parseElements = (value: unknown): IElementBlock[] => {
  if (!value) return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as IElementBlock[]) : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(value) ? (value as IElementBlock[]) : [];
};

export const applyElementUploads = (
  elements: IElementBlock[],
  files?: UploadMap,
) => {
  if (!elements.length) return elements;
  const imageFiles = files?.imageFiles ?? [];
  const pdfFiles = files?.pdfFiles ?? [];
  let imageIndex = 0;
  let pdfIndex = 0;

  for (const element of elements) {
    if (element.type === "image") {
      const file = imageFiles[imageIndex];
      if (file) {
        element.data = file.filename;
        imageIndex += 1;
      }
    } else if (element.type === "pdf") {
      const file = pdfFiles[pdfIndex];
      if (file) {
        element.data = file.filename;
        pdfIndex += 1;
      }
    }
  }

  return elements;
};
