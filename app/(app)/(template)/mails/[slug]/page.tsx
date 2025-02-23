import { Suspense } from "react";
import { getAllMailBlocks } from "@/lib/blocks";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MailPage({ params }: Props) {
  const slug = (await params).slug;
  const mails = await getAllMailBlocks();
  if (!mails) {
    return <div>Mail not found</div>;
  }
  const Component = mails[slug].component;
  return (
    <div className="">
      <Suspense fallback={<Skeleton className="h-screen" />}>
        <Component />
      </Suspense>
    </div>
  );
}
