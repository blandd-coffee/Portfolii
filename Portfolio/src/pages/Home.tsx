import { Link } from "react-router-dom";
import type { IArticle } from "@shared/article.model";
import { fetchArticles } from "../api";
import { ArticlePreview } from "../components/ArticlePreview";
import { useAsync } from "../hooks/useAsync";

export const Home = () => {
  const { data, loading, error } = useAsync<IArticle[]>(
    () => fetchArticles(),
    [],
    { initialData: [], errorMessage: "Failed to load articles" },
  );
  const articles = data ?? [];

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
