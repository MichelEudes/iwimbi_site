import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne intelligemment les classes Tailwind.
 * Résout les conflits de style de manière prédictible.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}