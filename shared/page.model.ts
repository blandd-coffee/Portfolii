export interface IPage {
  title: string;
  slug: string;
  imageURI?: string; // Optional - can be URL or file
  pdfFile?: string; // Optional - path to uploaded PDF
  order?: number;
  elements?: Array<{
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
      | "image";
    data: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
