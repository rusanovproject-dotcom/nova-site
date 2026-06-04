import { clsx, type ClassValue } from "clsx";

// Лёгкий cn без tailwind-merge (в проекте нет зависимости).
// Для наших компонентов достаточно — конфликтов утилит не возникает.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
