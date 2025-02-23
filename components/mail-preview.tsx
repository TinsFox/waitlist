import React, { Suspense } from "react";
import { registryData } from "../registry";
import { render } from "@react-email/render";

interface PreviewProps {
  category: string;
  templateId: string;
}

export const MailPreview: React.FC<PreviewProps> = async ({
  category,
  templateId,
}) => {
  const template = registryData[category]?.[templateId];

  if (!template) {
    return <div>Template not found</div>;
  }
  const Component = template.component;
  const html = await render(<Component />, {
    pretty: true,
  });

  return (
    <div className="bg-background">
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "calc(100% * 720 / 1280)",
        }}
      >
        <iframe
          className="w-full overflow-hidden ring-1 ring-slate-900/10"
          srcDoc={html}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
          }}
        />
      </div>
    </div>
  );
};
