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
    <div className="max-w-5xl mx-auto bg-slate-950/70 border border-emerald-900/50 rounded-3xl shadow-lg p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
        Category
      </p>
      <h1 className="font-semibold text-3xl text-emerald-50 pb-2">
        Articles in "{name}"
      </h1>
      <p className="text-sm text-emerald-100/70 pb-6">
        Browse all entries tagged with this category.
      </p>
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
