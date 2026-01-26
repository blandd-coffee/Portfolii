import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Catagory {
  name: string;
  imageURI: string;
}

export const Catagories = () => {
  const [catagories, setCatagories] = useState<Catagory[]>([]);
  useEffect(() => {
    const fetchCatagories = async () => {
      const response = await axios.get("/api/catagories/");
      setCatagories(response.data);
    };
    fetchCatagories();
  }, []);

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
