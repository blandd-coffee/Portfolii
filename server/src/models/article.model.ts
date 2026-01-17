import { model, Schema } from "mongoose";
import {
  type IElementBlock,
  type IArticle,
} from "../../../shared/article.model.js";
//Element (such as subtitle, header, bold, etc)

const elementBlockSchema = new Schema<IElementBlock>({
  type: { type: String, required: true },
  data: { type: String, required: true },
});

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  imageURI: { type: String, required: true },
  date: { type: Date, required: true },
  catagories: { type: [String], required: true },
  elements: { type: [elementBlockSchema], required: true },
});

export const Article = model<IArticle>("article", articleSchema);
