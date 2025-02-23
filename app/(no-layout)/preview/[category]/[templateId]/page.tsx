
import { MailPreview } from '@/components/mail-preview'
import { Skeleton } from '@/components/ui/skeleton';
import { getAllHomeBlocks } from '@/lib/blocks';
import { Suspense } from 'react';


export default async function PreviewPage({
  params,
}: {
  params: Promise<{ category: string, templateId: string }>
}) {
  const { category, templateId } = await params

  if (!category || !templateId || Array.isArray(category) || Array.isArray(templateId)) {
    return <div>Invalid parameters</div>
  }
  if (category === 'emails') {
    return <MailPreview category={category} templateId={templateId} />
  }
  if (category === 'template') {
    const templates = await getAllHomeBlocks()
    const Component = templates[templateId].component
    return (
      <Suspense fallback={<Skeleton className="h-screen" />}>
        <Component />
      </Suspense>
    )
  }

  return <div>Invalid category</div>
}