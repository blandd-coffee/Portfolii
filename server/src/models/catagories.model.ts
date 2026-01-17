import { model, Schema } from "mongoose";

export interface ICatagory {
  name: string;
  imageURI: string;
}

const catagorySchema = new Schema<ICatagory>({
  name: { type: String, required: true },
  imageURI: { type: String, required: false },
});

export const catagory = model<ICatagory>("catagory", catagorySchema);
