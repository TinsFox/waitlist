"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import { render } from "@react-email/render"
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
  Button,
} from "@react-email/components"
import { Editor } from "@monaco-editor/react"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { debounce } from "lodash-es"
import tailwindConfig from "@/tailwind.config"
import { MdxProvider } from "@/components/mdx-provider"
import { MdxPreview } from "@/components/mdx-preview"
import { Button as ButtonUI, buttonVariants } from "@/components/ui/button"
const DEFAULT_TEMPLATE = `
# Welcome to our newsletter!

Hi {name},

Thanks for subscribing to our newsletter. We're excited to have you on board!

Some **mdx** text, with a component

<Button href="https://example.com">Click1 me</Button>
<Badge>123</Badge>
---

Best regards,
The Team
`
console.log("tailwindConfig", tailwindConfig)
console.log(buttonVariants({ variant: "default" }))
const EmailTemplate = ({ source }: { source: MDXRemoteSerializeResult }) => {
  if (!source) return null
  return (
    <MdxProvider>
      <Html>
        <Head>
          <title>My email title</title>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            {`
              body {
  font-family: Arial, Helvetica, sans-serif;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>')
    center / 0 no-repeat;
  animation: scale 0.8s ease-in-out;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation: scale 0.8s ease-in-out;
}

@keyframes scale {
  to {
    mask-size: 200vmax;
  }
}
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
            `}
          </style>
        </Head>
        <Tailwind
          config={{
            theme: tailwindConfig.theme,
            plugins: tailwindConfig.plugins,
            darkMode: tailwindConfig.darkMode,
          }}
        >
          <Preview>Welcome to our newsletter</Preview>
          <Body>
            <MdxPreview template={source} />
          </Body>
        </Tailwind>
      </Html>
    </MdxProvider>
  )
}
interface EditorState {
  preview: string
  error: string
  isLoading: boolean
}

export default function EmailEditor() {
  const [mdxSource, setMdxSource] = useState(DEFAULT_TEMPLATE)
  const [editorState, setEditorState] = useState<EditorState>({
    preview: "",
    error: "",
    isLoading: false,
  })
  const [preview, setPreview] = useState<MDXRemoteSerializeResult | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // 使用 useCallback 和 debounce 优化更新函数
  const updateIframeContent = useCallback((html: string) => {
    if (iframeRef.current?.contentWindow?.document) {
      const doc = iframeRef.current.contentWindow.document
      doc.open()
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            ${html}
          </body>
        </html>
      `
      doc.write(htmlContent)
      console.log(htmlContent)
      doc.close()
    }
  }, [])

  // 初始化预览
  useEffect(() => {
    const initPreview = async () => {
      try {
        const content = await serialize(mdxSource, {
          mdxOptions: {},
        })
        setPreview(content)
        const html = await render(<EmailTemplate source={content} />, {
          pretty: true,
        })

        setEditorState((prev) => ({
          ...prev,
          preview: html,
          error: "",
        }))
        updateIframeContent(html)
      } catch (err) {
        console.error("Initial rendering error:", err)
        setEditorState((prev) => ({
          ...prev,
          error:
            err instanceof Error
              ? `Error: ${err.message}`
              : "An unexpected error occurred while rendering the template",
        }))
      }
    }

    initPreview()
  }, [mdxSource, updateIframeContent])

  const debouncedHandleEditorChange = useCallback(
    debounce(async (value: string | undefined) => {
      if (!value) return
      setEditorState((prev) => ({ ...prev, isLoading: true }))
      try {
        setMdxSource(value)

        const content = await serialize(value)
        setPreview(content)
        const html = await render(<EmailTemplate source={content} />, {
          pretty: true,
        })

        console.log("html: ", html)
        setEditorState((prev) => ({
          ...prev,
          preview: html,
          error: "",
        }))

        updateIframeContent(html)
      } catch (err) {
        console.error("Rendering error:", err)
        setEditorState((prev) => ({
          ...prev,
          error:
            err instanceof Error
              ? `Error: ${err.message}`
              : "An unexpected error occurred while rendering the template",
        }))
      } finally {
        setEditorState((prev) => ({ ...prev, isLoading: false }))
      }
    }, 100),
    [updateIframeContent]
  )

  const { error, isLoading } = editorState

  return (
    <div className="flex h-screen  ">
      {/* 编辑器部分 */}
      <div className="w-1/2 border-r border-[#1C1F2E]">
        <div className="flex justify-between items-center p-4 border-b border-[#1C1F2E]">
          <h2 className="text-sm font-medium ">Email Editor (MDX)</h2>
          <div className="space-x-2">
            <button
              onClick={() => debouncedHandleEditorChange(mdxSource)}
              className="px-3 py-1.5 bg-[#5E6AD2] hover:bg-[#4E5ABF]  text-sm
              rounded-md transition-colors duration-200 font-medium"
            >
              Refresh Preview
            </button>
          </div>
        </div>

        <Editor
          height="calc(100vh - 57px)"
          defaultLanguage="markdown"
          value={mdxSource}
          onChange={debouncedHandleEditorChange}
          theme="linear-theme"
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            lineNumbers: "on",
            renderWhitespace: "boundary",
            fontFamily: "SF Mono, Monaco, Menlo, monospace",
            fontSize: 13,
            lineHeight: 1.6,
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
        {error && (
          <div
            className="absolute bottom-4 left-4 right-4 p-3 bg-[#2D1518]
            border border-[#5E2427] text-[#F5938D] rounded-md text-sm"
          >
            {error}
          </div>
        )}
      </div>

      {/* 预览部分 */}
      <div className="w-1/2 ">
        <div className="p-4 border-b border-[#1C1F2E]">
          <h2 className="text-sm font-medium ">Preview</h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-[calc(100vh-120px)] text-[#636E7C]">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm">Generating preview...</span>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-120px)]">
              <div className="w-full h-1/2 rounded-md">
                <h3 className="text-sm font-medium bg-[#1C1F2E] p-2 rounded-md text-white">
                  React Email Preview
                </h3>
                <iframe
                  ref={iframeRef}
                  className="w-full h-full rounded-md border border-[#1C1F2E]"
                  title="Email Preview"
                  sandbox="allow-same-origin"
                />
              </div>
              <div className="border-b border-[#1C1F2E]"></div>
              {preview && (
                <div className="mt-4 h-1/2 mt-4">
                  <h3 className="text-sm font-medium bg-[#1C1F2E] p-2 rounded-md text-white">
                    MDX Preview
                  </h3>
                  <div className="rounded-md border border-[#1C1F2E]">
                    <MdxPreview template={preview} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
