import { getAllMailBlocks } from "@/lib/blocks";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { ArrowRight, Inbox } from "lucide-react";

export async function FilteredMails() {
  const allMails = await getAllMailBlocks();
  const mailsArray = Object.values(allMails);

  const filteredMails = mailsArray;
  if (filteredMails.length === 0) {
    return (
      <div className="col-span-full text-center">
        <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No mails found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {filteredMails.map((mail) => (
        <Link
          key={mail.name}
          href={`/preview/${mail.category}/${mail.slug}`}
          className={cn(
            "group relative rounded-lg border p-6 hover:bg-accent",
            "transition-colors flex flex-col h-full"
          )}
        >
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium leading-none">{mail.name}</h3>
                <Badge variant="secondary" className="pointer-events-none">
                  {mail.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {mail.description}
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex-1 border rounded-md p-4 bg-white min-h-[500px] overflow-hidden">
                <Suspense fallback={null}>
                  <iframe
                    frameBorder="0"
                    src={`/preview/${mail.category}/${mail.slug}`}
                    className="w-full h-full"
                  />
                </Suspense>
              </div>

              <div className="flex items-center justify-end">
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
