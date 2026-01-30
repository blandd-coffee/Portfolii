import type { IElementBlock } from "@shared/article.model";
import api from "./client";
import { unwrap } from "./request";

export interface PageRecord {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  pdfFile?: string;
  elements?: IElementBlock[];
}

export const fetchPages = () =>
  unwrap(api.get<PageRecord[]>("/pages"));

export const fetchPage = (slug: string) =>
  unwrap(api.get<PageRecord>(`/pages/${encodeURIComponent(slug)}`));
