import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LucideIcon, BookOpen } from 'lucide-react';
import { Reference } from '../types/generalTypes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Define ReferenceType if it's not defined elsewhere
export type ReferenceType = {
  id: string;
  title: string;
  content: string;
  // Add any other properties that a Reference should have
};

export function convertStringToReference(input: string): Reference {
  return {
    id: generateId(),
    title: input.slice(0, 50), // Use first 50 characters as title
    content: input,
    icon: BookOpen, // Default icon, you might want to determine this dynamically
    type: 'common', // Default type, you might want to determine this dynamically
  };
}

// Implement a proper ID generation function
export function generateId(): string {
  // This function generates a unique ID using a combination of timestamp and random string
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
  const randomStr = Math.random().toString(36).substr(2, 5); // Generate a random string
  return `${timestamp}-${randomStr}`;
}