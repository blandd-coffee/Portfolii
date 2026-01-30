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
      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden border-emerald-900/50 shadow-xl rounded-3xl bg-slate-950/70">
          <CardTitle className="p-6 text-3xl md:text-4xl font-semibold text-emerald-50 bg-gradient-to-r from-emerald-900/60 to-transparent border-b border-emerald-900/40">
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
    <div className="max-w-3xl mx-auto">
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading page...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}
      {!loading && !error && page && (
        <Card className="border-emerald-900/50 shadow-xl rounded-3xl bg-slate-950/70">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-emerald-50 bg-gradient-to-r from-emerald-900/60 to-transparent border-emerald-900/40">
            {page?.title}
          </CardTitle>
          <CardContent className="px-6 sm:px-8 py-8 sm:py-10 text-[15px] leading-relaxed text-emerald-50/90">
            <ContentBlocks elements={page?.elements} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
