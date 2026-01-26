import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Catagory {
  name: string;
  imageURI: string;
}

export const Catagories = ({ sidebar }: { sidebar?: boolean }) => {
  const [catagories, setCatagories] = useState<Catagory[]>([]);
  useEffect(() => {
    const fetchCatagories = async () => {
      const response = await axios.get("/api/catagories/");
      setCatagories(response.data);
    };
    fetchCatagories();
  }, []);

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
