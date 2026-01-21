import { model, Schema } from "mongoose";
import { type ICatagory } from "../../../shared/catagories.model.js";
const catagorySchema = new Schema<ICatagory>({
  name: { type: String, required: true, unique: true },
  imageURI: { type: String, required: false },
});

export const Catagory = model<ICatagory>("catagory", catagorySchema);
