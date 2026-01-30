import type { IElementBlock } from "./article.model.js";

export interface IPage {
  title: string;
  slug: string;
  imageURI?: string; // Optional - can be URL or file
  pdfFile?: string; // Optional - path to uploaded PDF
  order?: number;
  elements?: IElementBlock[];
  createdAt?: Date;
  updatedAt?: Date;
}
