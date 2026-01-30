import type { IArticle } from "@shared/article.model";
import { fetchArticlesByCategory } from "../api";
import { useParams, Link } from "react-router-dom";
import { ArticlePreview } from "../components/ArticlePreview";
import { useAsync } from "../hooks/useAsync";

export const CategoryPage = () => {
  const { name } = useParams();
  const { data, loading, error } = useAsync<IArticle[]>(
    () => fetchArticlesByCategory(name ?? ""),
    [name],
    {
      skip: !name,
      initialData: [],
      errorMessage: "Failed to load articles",
    },
  );
  const articles = data ?? [];

  return (
    <div className="min-w-min m-10 border bg-white p-6">
      <h1 className="font-bold text-3xl pb-4">Articles in "{name}"</h1>
      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading articles...
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && (
        <div className="flex flex-wrap gap-6 justify-center">
          {articles.length === 0 ? (
            <p className="text-gray-500">
              No articles found for this category.
            </p>
          ) : (
            articles.map((article) => (
              <Link key={article.slug} to={`/article/${article.slug}`}>
                <ArticlePreview {...article} />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
