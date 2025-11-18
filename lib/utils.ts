import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function lead(char: string, digit: number, value: number): string {
  return char.repeat(digit - value.toString().length) + value;
}

export default function leadZero(value: number): string {
  return lead("0", 2, value);
}
