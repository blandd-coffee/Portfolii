//Element (such as subtitle, header, bold, etc)

export interface IElementBlock {
  type: "subtitle" | "header" | "paragraph" | "code";
  data: string;
}

export interface IArticle {
  title: string;
  slug: string;
  imageURI: string;
  date: Date;
  catagories: Array<string>;
  elements: IElementBlock[];
}
