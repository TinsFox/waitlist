import { MdxPreview } from "@/components/mdx-preview"
import { serialize } from "next-mdx-remote/serialize"

const DEFAULT_TEMPLATE = `
# Welcome to our newsletter!

Hi {name},

Thanks for subscribing to our newsletter. We're excited to have you on board!

Some **mdx** text, with a component
<Button>Click me</Button>
---

Best regards,
The Team
`

export default async function NextMdxRemote() {
  const content = await serialize(DEFAULT_TEMPLATE)
  return <MdxPreview template={content} />
}
