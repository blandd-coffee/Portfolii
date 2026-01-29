import type { IArticle } from "@shared/article.model";
import { getArticle } from "../tools/axiosConfigs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<IArticle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the backend server URL for PDFs (hardcoded to avoid routing issues)
  const pdfBaseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const response = await getArticle(slug);
        setArticle(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load article");
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  return (
    <div className="max-w-2xl mx-auto">
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading article...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && article && (
        <Card>
          <CardTitle className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100">
            {article.title}
          </CardTitle>
          <CardContent className="prose prose-sm">
            {(article.elements || []).map((element, idx) => {
              // Handle heading1 (large heading) - backward compatible with subtitle
              if (element.type === "heading1" || element.type === "subtitle")
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-semibold border-b border-cyan-200 pb-4 mt-6 text-gray-900"
                  >
                    {element.data}
                  </h2>
                );
              // Handle heading2 and heading3 (medium/small headings) - backward compatible with header
              if (
                element.type === "heading2" ||
                element.type === "heading3" ||
                element.type === "header"
              )
                return (
                  <h3
                    key={idx}
                    className="text-xl font-semibold mt-4 text-gray-800"
                  >
                    {element.data}
                  </h3>
                );
              if (element.type === "paragraph" || element.type === "quote")
                return (
                  <p key={idx} className="text-gray-700 my-3">
                    {element.data}
                  </p>
                );
              if (element.type === "code")
                return (
                  <pre
                    key={idx}
                    className="bg-gray-100 text-gray-900 p-4 rounded-lg overflow-x-auto my-4 text-sm leading-relaxed font-mono border border-cyan-200"
                  >
                    {element.data}
                  </pre>
                );
              if (element.type === "list")
                return (
                  <ul key={idx} className="list-disc pl-6 my-3">
                    {element.data}
                  </ul>
                );
              if (element.type === "pdf")
                return (
                  <div key={idx} className="my-4">
                    {/* Use h-screen or h-dvh for full viewport height */}
                    <div className="w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
                      <iframe
                        // Use & to combine parameters (view=FitH scales the width automatically)
                        src={`${pdfBaseUrl}/uploads/${element.data}#view=FitH&toolbar=0`}
                        className="w-full h-full"
                        title="Full Screen PDF Viewer"
                      />
                    </div>
                  </div>
                );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
