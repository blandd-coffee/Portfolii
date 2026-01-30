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
    <section className="space-y-6">
      <div className="rounded-3xl border border-emerald-900/50 bg-slate-950/70 shadow-sm p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          Latest
        </p>
        <h2 className="text-2xl font-semibold text-emerald-50">
          Featured articles
        </h2>
        <p className="text-sm text-emerald-100/70">
          Fresh writing and research curated for quick scanning.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
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
    </section>
  );
};
