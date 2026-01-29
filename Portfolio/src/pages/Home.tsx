import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { IArticle } from "@shared/article.model";
import axiosInstance, { getArticles } from "../tools/axiosConfigs";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticleArray = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getArticles();
        setArticles(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load articles",
        );
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    getArticleArray();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {loading && (
        <div className="text-center w-full py-8 text-gray-500">
          Loading articles...
        </div>
      )}
      {error && (
        <div className="text-center w-full py-8 text-red-500">
          Error: {error}
        </div>
      )}
      {!loading && !error && articles.length === 0 && (
        <div className="text-center w-full py-8 text-gray-500">
          No articles found
        </div>
      )}
      {!loading &&
        !error &&
        articles.map((article) => (
          <Link key={article.slug} to={`/article/${article.slug}`}>
            <ArticlePreview {...article} />
          </Link>
        ))}
    </div>
  );
};

const ArticlePreview: React.FC<IArticle> = ({ title, elements }) => {
  // Limit preview to 120 chars, add ellipsis if longer
  const preview = elements[0]?.data || "";
  const cutoff = 120;
  const previewText =
    preview.length > cutoff ? preview.slice(0, cutoff) + "..." : preview;
  return (
    <Card className="w-64 h-50 flex flex-col hover:shadow-lg transition-shadow">
      <CardTitle className="p-4 border-b">{title}</CardTitle>
      <CardContent className="flex-1 flex items-end">
        <p className="text-sm text-gray-600">{previewText}</p>
      </CardContent>
    </Card>
  );
};
