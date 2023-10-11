import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function wrapText(text: string, maxLength: number): string {
  const words = text.split(" ");
  let wrappedText = "";
  let line = "";

  for (let word of words) {
    if ((line + word).length <= maxLength) {
      line += word + " ";
    } else {
      wrappedText += line + "\n";
      line = word + " ";
    }
  }
  wrappedText += line;
  return wrappedText.trim();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
