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
    <div className="max-w-3xl mx-auto">
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading article...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && article && (
        <Card className="border-emerald-900/50 shadow-xl rounded-3xl bg-slate-950/70">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-emerald-50 bg-gradient-to-r from-emerald-900/60 to-transparent border-emerald-900/40">
            {article.title}
          </CardTitle>
          <CardContent className="px-6 sm:px-8 py-8 sm:py-10 text-[15px] leading-relaxed text-emerald-50/90">
            <ContentBlocks elements={article.elements} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
