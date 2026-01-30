import type { IArticle } from "@shared/article.model";
import api from "./client";
import { unwrap } from "./request";

export const fetchArticles = () =>
  unwrap(api.get<IArticle[]>("/article"));

export const fetchArticle = (slug: string) =>
  unwrap(api.get<IArticle>(`/article/${encodeURIComponent(slug)}`));
