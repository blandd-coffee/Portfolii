import { model, Schema } from "mongoose";
import type { IPage } from "../../../shared/page.model.js";

const elementBlockSchema = new Schema({
  type: { type: String, required: true },
  data: { type: String, required: true },
});

const pageSchema = new Schema<IPage>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  imageURI: { type: String, required: true },
  order: { type: Number, default: 0 },
  elements: { type: [elementBlockSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Page = model<IPage>("page", pageSchema);
