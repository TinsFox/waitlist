"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const ComingSoonCard = () => {
  return (
    <Card className="group border border-dashed border-border/40 bg-background/60 dark:bg-card/80 backdrop-blur-xl h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Coming Soon
          </Badge>
          <Badge
            variant="outline"
            className="border-border/40 bg-background/60 text-muted-foreground"
          >
            In Progress
          </Badge>
        </div>
        <CardTitle className="text-xl mt-4 text-foreground/90">
          More Templates in Development
        </CardTitle>
        <CardDescription className="min-h-[48px] text-muted-foreground">
          We&apos;re working on more beautiful templates. Our team is crafting
          unique designs to help you create the perfect waitlist experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center space-y-4">
        <div className="text-4xl text-muted-foreground/50">✨</div>
        <div className="text-center text-sm text-muted-foreground">
          <p>Features coming in new templates:</p>
          <ul className="mt-2 space-y-1">
            <li>• Interactive animations</li>
            <li>• Custom form layouts</li>
            <li>• Advanced styling options</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
