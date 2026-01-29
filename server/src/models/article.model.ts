import { model, Schema } from "mongoose";
import {
  type IElementBlock,
  type IArticle,
} from "../../../shared/article.model.js";

import { Catagory } from "./catagories.model.js";
//Element (such as subtitle, header, bold, etc)

const elementBlockSchema = new Schema<IElementBlock>({
  type: { type: String, required: true },
  data: { type: String, required: true },
});

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true, unique: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  imageURI: { type: String, required: true },
  date: { type: Date, required: true, index: true },
  catagories: [{ type: Schema.Types.ObjectId, ref: "catagory", index: true }],
  elements: { type: [elementBlockSchema], required: true },
  isIndexed: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Article = model<IArticle>("article", articleSchema);
