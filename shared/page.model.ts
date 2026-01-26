export interface IPage {
  title: string;
  slug: string;
  imageURI?: string; // Optional - can be URL or file
  pdfFile?: string; // Optional - path to uploaded PDF
  order?: number;
  elements?: Array<{
    type: "subtitle" | "header" | "paragraph" | "image" | "code" | "list";
    data: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
