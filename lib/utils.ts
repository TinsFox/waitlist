import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTemplateLink(link: string) {
  return process.env.NODE_ENV === "development"
    ? link.replace(
        "https://waitlist.afjs.dev/template",
        "http://localhost:3000/template"
      )
    : link;
}
