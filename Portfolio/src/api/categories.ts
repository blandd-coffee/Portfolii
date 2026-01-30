import type { IArticle } from "@shared/article.model";
import api from "./client";
import { unwrap } from "./request";

export interface Category {
  name: string;
  imageURI: string;
}

export const fetchCategories = () =>
  unwrap(api.get<Category[]>("/catagories"));

export const fetchArticlesByCategory = (name: string) =>
  unwrap(
    api.get<IArticle[]>(
      `/catagories/${encodeURIComponent(name)}/articles`,
    ),
  );
