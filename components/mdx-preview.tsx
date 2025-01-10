"use client"

import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { MDXRemote } from "next-mdx-remote"

interface MdxPreviewProps {
  template?: MDXRemoteSerializeResult
}

export function MdxPreview({ template }: MdxPreviewProps) {
  if (!template) {
    return null
  }

  return <MDXRemote {...template} />
}
