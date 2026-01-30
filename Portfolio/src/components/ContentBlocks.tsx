import type { IElementBlock } from "@shared/article.model";
import { getUploadUrl } from "../api";

type ContentBlocksProps = {
  elements?: IElementBlock[];
};

export const ContentBlocks = ({ elements = [] }: ContentBlocksProps) => (
  <>
    {elements.map((element, idx) => {
      if (element.type === "heading1" || element.type === "subtitle") {
        return (
          <h2
            key={idx}
            className="text-2xl font-semibold border-b border-cyan-200 pb-4 mt-6 text-gray-900"
          >
            {element.data}
          </h2>
        );
      }
      if (
        element.type === "heading2" ||
        element.type === "heading3" ||
        element.type === "header"
      ) {
        return (
          <h3 key={idx} className="text-xl font-semibold mt-4 text-gray-800">
            {element.data}
          </h3>
        );
      }
      if (element.type === "paragraph" || element.type === "quote") {
        return (
          <p key={idx} className="text-gray-700 my-3">
            {element.data}
          </p>
        );
      }
      if (element.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-gray-100 text-gray-900 p-4 rounded-lg overflow-x-auto my-4 text-sm leading-relaxed font-mono border border-cyan-200"
          >
            {element.data}
          </pre>
        );
      }
      if (element.type === "list") {
        const items = Array.isArray(element.data)
          ? element.data
          : [element.data];
        return (
          <ul key={idx} className="list-disc pl-6 my-3">
            {items.map((item, itemIdx) => (
              <li key={`${idx}-${itemIdx}`}>{item}</li>
            ))}
          </ul>
        );
      }
      if (element.type === "image") {
        const imageUrl = getUploadUrl(element.data);
        return (
          <div key={idx} className="my-4">
            <img
              src={imageUrl}
              alt="Content"
              className="w-full rounded-lg border border-gray-200"
              loading="lazy"
            />
          </div>
        );
      }
      if (element.type === "pdf") {
        const pdfUrl = getUploadUrl(element.data);
        return (
          <div key={idx} className="my-4">
            <div className="w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
              <iframe
                src={`${pdfUrl}#view=FitH&toolbar=0`}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </div>
          </div>
        );
      }
      return null;
    })}
  </>
);
