export interface IPage {
  title: string;
  slug: string;
  imageURI: string;
  order?: number;
  elements: Array<{
    type: "subtitle" | "header" | "paragraph" | "image" | "code" | "list";
    data: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
