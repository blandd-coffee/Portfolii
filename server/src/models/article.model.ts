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
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  imageURI: { type: String, required: true },
  date: { type: Date, required: true },
  catagories: [{ type: Schema.Types.ObjectId, ref: "catagory" }],
  elements: { type: [elementBlockSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Article = model<IArticle>("article", articleSchema);
