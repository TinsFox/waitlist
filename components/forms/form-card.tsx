import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/types/forms"
import Link from "next/link"

interface FormCardProps {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{form.name}</h3>
        <p className="text-sm text-muted-foreground">{form.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div>Fields: {form.fields.length}</div>
          <div>Submissions: {form.submissions}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/forms/${form.id}`}>Edit</Link>
        </Button>
        <Button variant="outline">Preview</Button>
      </CardFooter>
    </Card>
  )
}
