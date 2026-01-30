import type { IElementBlock } from "@shared/article.model";
import { getUploadUrl } from "../api";

type ContentBlocksProps = {
  elements?: IElementBlock[];
};

const asString = (value: string | string[]) =>
  Array.isArray(value) ? value[0] ?? "" : value;

export const ContentBlocks = ({ elements = [] }: ContentBlocksProps) => (
  <>
    {elements.map((element, idx) => {
      if (element.type === "heading1" || element.type === "subtitle") {
        return (
          <h2
            key={idx}
            className="text-2xl font-semibold border-b border-emerald-700/50 pb-3 mt-8 text-emerald-50"
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
          <h3 key={idx} className="text-xl font-semibold mt-6 text-emerald-100">
            {element.data}
          </h3>
        );
      }
      if (element.type === "paragraph" || element.type === "quote") {
        return (
          <p key={idx} className="text-emerald-50/80 my-4 leading-relaxed">
            {element.data}
          </p>
        );
      }
      if (element.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-black/80 text-emerald-200 p-5 rounded-xl overflow-x-auto my-6 text-sm leading-relaxed font-mono border border-emerald-400/40 shadow-inner"
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
          <ul key={idx} className="list-disc pl-6 my-4 text-emerald-50/80">
            {items.map((item, itemIdx) => (
              <li key={`${idx}-${itemIdx}`}>{item}</li>
            ))}
          </ul>
        );
      }
      if (element.type === "image") {
        const imageUrl = getUploadUrl(asString(element.data));
        return (
          <div key={idx} className="my-6">
            <img
              src={imageUrl}
              alt="Content"
              className="w-full rounded-2xl border border-emerald-900/50 shadow-sm"
              loading="lazy"
            />
          </div>
        );
      }
      if (element.type === "pdf") {
        const pdfUrl = getUploadUrl(asString(element.data));
        return (
          <div key={idx} className="my-4">
            <div className="w-full h-screen border border-emerald-900/50 rounded-2xl overflow-hidden shadow-sm">
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
