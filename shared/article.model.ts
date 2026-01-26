//Element (such as subtitle, header, bold, etc)

export interface IElementBlock {
  type: "subtitle" | "header" | "paragraph" | "image" | "code" | "list";
  data: string;
}

export interface IArticle {
  title: string;
  slug: string;
  imageURI: string;
  date: Date;
  catagories: Array<any>; // ObjectId references to categories
  elements: IElementBlock[];
  createdAt?: Date;
  updatedAt?: Date;
}
