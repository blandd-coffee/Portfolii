import type { IArticle } from "@shared/article.model";
import { fetchArticle } from "../api";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { ContentBlocks } from "../components/ContentBlocks";
import { useAsync } from "../hooks/useAsync";

export const ArticlePage = () => {
  const { slug } = useParams();
  const { data: article, loading, error } = useAsync<IArticle | null>(
    () => fetchArticle(slug ?? ""),
    [slug],
    { skip: !slug, errorMessage: "Failed to load article" },
  );

  return (
    <div className="max-w-2xl mx-auto">
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading article...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && article && (
        <Card>
          <CardTitle className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100">
            {article.title}
          </CardTitle>
          <CardContent className="prose prose-sm">
            <ContentBlocks elements={article.elements} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
