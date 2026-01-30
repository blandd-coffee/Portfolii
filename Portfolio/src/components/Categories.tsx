import { fetchCategories, type Category } from "../api";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAsync } from "../hooks/useAsync";

export const Categories = ({ sidebar }: { sidebar?: boolean }) => {
  const { data, loading, error } = useAsync<Category[]>(
    () => fetchCategories(),
    [],
    { initialData: [], errorMessage: "Failed to load categories" },
  );
  const categories = data ?? [];

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  if (sidebar) {
    return (
      <nav className="space-y-2">
        {categories.map((category) => (
          <Link key={category.name} to={`/category/${category.name}`}>
            <div className="px-4 py-2 rounded-lg transition-colors text-emerald-100/80 hover:bg-emerald-900/30">
              {category.name}
            </div>
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      {categories.map((category) => (
        <Link key={category.name} to={`/category/${category.name}`}>
          <Button variant="outline" size="lg" className="min-w-max text-lg">
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};
