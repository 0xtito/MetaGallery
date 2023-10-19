import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nfts, chunkedNfts } from "@/utils/types";

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

export function chunkArray(array: nfts[], chunkSize: number): chunkedNfts[] {
  const results: chunkedNfts[] = [];
  while (array.length) {
    if (array.length < chunkSize) {
      const chunk = array.splice(0, array.length);
      results.push({
        nfts: chunk,
        id: chunk.reduce((acc, { id }) => (acc += id), ""),
      });
    } else {
      const chunk = array.splice(0, chunkSize);
      results.push({
        nfts: chunk,
        id: chunk.reduce((acc, { id }) => (acc += `${id}-`), ""),
      });
    }
  }
  return results;
}
