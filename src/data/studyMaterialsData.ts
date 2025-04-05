export interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  content: string;
  subject: string;
  category: string;
  imageUrl: string;
  downloadUrl: string;
  author: string;
  date: string;
  rating: number;
  level: string;
  tags: string[];
  isFeatured: boolean;
  // Add the missing properties that are causing TypeScript errors
  grade?: string;
  updatedAt?: string;
  readTime?: string;
  pages?: number;
  topics?: string[];
}
