import type { IArticle } from "@shared/article.model";
import { Card, CardContent, CardTitle } from "./ui/card";

type ArticlePreviewProps = Pick<IArticle, "title" | "elements">;

export const ArticlePreview = ({ title, elements }: ArticlePreviewProps) => {
  const firstBlock = elements?.[0];
  const rawPreview =
    Array.isArray(firstBlock?.data) ? firstBlock?.data.join(" ") : firstBlock?.data;
  const preview = rawPreview ?? "";
  const cutoff = 120;
  const previewText =
    preview.length > cutoff ? preview.slice(0, cutoff) + "..." : preview;

  return (
    <Card className="w-64 h-52 flex flex-col hover:shadow-lg transition-shadow">
      <CardTitle className="p-4 border-b">{title}</CardTitle>
      <CardContent className="flex-1 flex items-end">
        <p className="text-sm text-gray-600">{previewText}</p>
      </CardContent>
    </Card>
  );
};
