"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { Plus, GripVertical, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Form, FormField } from "@/types/forms"
import { nanoid } from "nanoid"

interface FormEditorProps {
  formId?: string
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "textarea", label: "Text Area" },
  { value: "checkbox", label: "Checkbox" },
] as const

export function FormEditor({ formId }: FormEditorProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Form>>({
    name: "",
    description: "",
    fields: [],
  })

  const addField = () => {
    const newField: FormField = {
      id: nanoid(),
      type: "text",
      label: "",
      required: false,
    }
    setFormData((prev) => ({
      ...prev,
      fields: [...(prev.fields || []), newField],
    }))
  }

  const removeField = (fieldId: string) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields?.filter((field) => field.id !== fieldId),
    }))
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields?.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const fields = Array.from(formData.fields || [])
    const [reorderedItem] = fields.splice(result.source.index, 1)
    fields.splice(result.destination.index, 0, reorderedItem)

    setFormData((prev) => ({
      ...prev,
      fields,
    }))
  }

  const handleSubmit = async () => {
    try {
      // TODO: Implement form submission logic
      const endpoint = formId ? `/api/forms/${formId}` : "/api/forms"
      const method = formId ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save form")

      router.push("/forms")
    } catch (error) {
      console.error("Error saving form:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {formId ? "Edit Form" : "Create Form"}
        </h1>
        <Button onClick={handleSubmit}>Save Form</Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Form Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter form name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter form description"
            />
          </div>
        </div>
      </Card>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {formData.fields?.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-2 cursor-move"
                        >
                          <GripVertical className="size-5 text-muted-foreground" />
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Field Type</Label>
                              <Select
                                value={field.type}
                                onValueChange={(value: FormField["type"]) =>
                                  updateField(field.id, { type: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FIELD_TYPES.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Label</Label>
                              <Input
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    label: e.target.value,
                                  })
                                }
                                placeholder="Enter field label"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Placeholder</Label>
                              <Input
                                value={field.placeholder}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    placeholder: e.target.value,
                                  })
                                }
                                placeholder="Enter placeholder text"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`required-${field.id}`}
                                checked={field.required}
                                onCheckedChange={(checked) =>
                                  updateField(field.id, { required: checked })
                                }
                              />
                              <Label htmlFor={`required-${field.id}`}>
                                Required Field
                              </Label>
                            </div>
                          </div>

                          {field.type === "select" && (
                            <div className="space-y-2">
                              <Label>Options</Label>
                              <Textarea
                                value={field.options?.join("\n")}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    options: e.target.value
                                      .split("\n")
                                      .filter(Boolean),
                                  })
                                }
                                placeholder="Enter options (one per line)"
                              />
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeField(field.id)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button variant="outline" className="w-full" onClick={addField}>
        <Plus className="mr-2 size-4" />
        Add Field
      </Button>
    </div>
  )
}
