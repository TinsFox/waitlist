
import { Preview } from '@/components/preview'
import { render } from '@react-email/render'
import { registryData } from '@/registry'

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ category: string, templateId: string }>
}) {
  const { category, templateId } = await params

  if (!category || !templateId || Array.isArray(category) || Array.isArray(templateId)) {
    return <div>Invalid parameters</div>
  }
  // if (category === 'emails') {
  //   const Component = registryData[category]?.[templateId]?.component
  //   const html = await render(<Component />, {
  //     pretty: true,
  //   });

  //   return (
  //     <div className="preview-page">
  //       <iframe frameBorder="0" srcDoc={html} className='w-full h-full' />
  //     </div>
  //   )
  // }

  return (
    <Preview category={category} templateId={templateId} />
  )
}