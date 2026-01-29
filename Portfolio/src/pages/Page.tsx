import { getPage } from "../tools/axiosConfigs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export const Page = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<any>();

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        const response = await getPage(slug);
        setPage(response.data);
      } catch (err) {
        console.error("Failed to fetch page:", err);
      }
    };
    fetchPage();
  }, [slug]);

  // If page has a PDF file, display it as full-page viewer
  if (page?.pdfFile) {
    // Normalize the path - remove any duplicate /uploads/
    let pdfUrl = page.pdfFile;

    // Handle Windows backslashes
    pdfUrl = pdfUrl.replace(/\\/g, "/");

    // Remove the uploads/ prefix if it exists (we'll add it back if needed)
    if (pdfUrl.startsWith("uploads/")) {
      pdfUrl = pdfUrl.substring(8); // Remove 'uploads/' prefix
    }

    // Build absolute URL to avoid React Router interception
    // Always use the full backend URL for PDFs since iframe can't use the proxy
    const apiBase = "http://localhost:3000";
    const fullPdfUrl = pdfUrl.startsWith("http")
      ? pdfUrl
      : `${apiBase}/uploads/${pdfUrl}`;

    console.log("PDF URL:", fullPdfUrl, "Original pdfFile:", page.pdfFile); // Debug log

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="overflow">
          {" "}
          {/* Added overflow-hidden for rounded corners */}
          <CardTitle className="p-6 text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            {page?.title}
          </CardTitle>
          {/* Removed p-6 to let the PDF fill the card width entirely */}
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
      <Card>
        <CardTitle className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100">
          {page?.title}
        </CardTitle>
        <CardContent className="prose prose-sm">
          {page?.elements?.map((element: any, idx: number) => {
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
          })}
        </CardContent>
      </Card>
    </div>
  );
};
