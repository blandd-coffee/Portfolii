import axiosInstance from "../tools/axiosConfigs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Catagory {
  name: string;
  imageURI: string;
}

export const Catagories = ({ sidebar }: { sidebar?: boolean }) => {
  const [catagories, setCatagories] = useState<Catagory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatagories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/catagories/");
        setCatagories(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories",
        );
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatagories();
  }, []);

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
        {catagories.map((catagory) => (
          <Link key={catagory.name} to={`/catagory/${catagory.name}`}>
            <div className="px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-white/50">
              {catagory.name}
            </div>
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 justify-center p-8">
      {catagories.map((catagory) => (
        <Link key={catagory.name} to={`/catagory/${catagory.name}`}>
          <Button variant="outline" size="lg" className="min-w-max text-lg">
            {catagory.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};
