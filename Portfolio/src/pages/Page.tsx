import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { fetchPage, getUploadUrl, type PageRecord } from "../api";
import { ContentBlocks } from "../components/ContentBlocks";
import { useAsync } from "../hooks/useAsync";

export const Page = () => {
  const { slug } = useParams();
  const { data: page, loading, error } = useAsync<PageRecord | null>(
    () => fetchPage(slug ?? ""),
    [slug],
    { skip: !slug, errorMessage: "Failed to load page" },
  );

  // If page has a PDF file, display it as full-page viewer
  if (page?.pdfFile) {
    const fullPdfUrl = getUploadUrl(page.pdfFile);

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardTitle className="p-6 text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            {page?.title}
          </CardTitle>
          <CardContent className="p-0">
            <iframe
              src={`${fullPdfUrl}#toolbar=0&view=FitH`}
              className="w-full h-screen border-none"
              title={page?.title}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading page...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && page && (
        <Card>
          <CardTitle className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100">
            {page?.title}
          </CardTitle>
          <CardContent className="prose prose-sm">
            <ContentBlocks elements={page?.elements} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
