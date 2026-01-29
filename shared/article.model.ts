//Element (such as heading1, heading2, heading3, etc)

export interface IElementBlock {
  type:
    | "heading1"
    | "heading2"
    | "heading3"
    | "paragraph"
    | "quote"
    | "code"
    | "list"
    | "subtitle"
    | "header"
    | "image"
    | "pdf";
  data: string;
}

export interface IArticle {
  title: string;
  slug: string;
  imageURI: string;
  date: Date;
  catagories: Array<any>; // ObjectId references to categories
  elements: IElementBlock[];
  isIndexed?: boolean; // Whether to index this article for search
  createdAt?: Date;
  updatedAt?: Date;
}
