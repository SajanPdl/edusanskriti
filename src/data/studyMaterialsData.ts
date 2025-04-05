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
  grade?: string;
  updatedAt?: string;
  readTime?: string;
  pages?: number;
  topics?: string[];
}

// Add categories 
export const categories = [
  "All", "Grade 7", "Grade 8", "Grade 9", "Grade 10", 
  "Grade 11", "Grade 12", "Bachelor's", "Engineering"
];

// Add subjects
export const subjects = [
  "All", "Mathematics", "Science", "Physics", "Chemistry", "Biology", 
  "History", "Geography", "Computer Science", "Literature"
];

// Export studyMaterialsData as a mock dataset
export const studyMaterialsData: StudyMaterial[] = [
  {
    id: 1,
    title: "Comprehensive Guide to Quantum Physics",
    description: "Explore the mysteries of quantum mechanics with this detailed guide.",
    content: "Quantum physics is the study of the very small...",
    subject: "Physics",
    category: "Bachelor's",
    imageUrl: "/images/quantum-physics.jpg",
    downloadUrl: "/files/quantum-physics.pdf",
    author: "Dr. Eleanor Vance",
    date: "2024-01-15",
    rating: 4.8,
    level: "Advanced",
    tags: ["quantum", "physics", "science"],
    isFeatured: true,
    grade: "Bachelor's",
    updatedAt: "2024-01-20",
    readTime: "60 minutes",
    pages: 150,
    topics: ["Quantum Entanglement", "Wave-Particle Duality"]
  },
  {
    id: 2,
    title: "Ecology and Ecosystems Explained",
    description: "Understand the basics of ecology and how ecosystems function.",
    content: "Ecology is the study of the relationships between...",
    subject: "Biology",
    category: "Grade 11",
    imageUrl: "/images/ecology-ecosystems.jpg",
    downloadUrl: "/files/ecology-ecosystems.pdf",
    author: "Prof. Samuel Green",
    date: "2023-12-01",
    rating: 4.5,
    level: "Intermediate",
    tags: ["ecology", "ecosystems", "biology"],
    isFeatured: false,
    grade: "Grade 11",
    updatedAt: "2023-12-05",
    readTime: "45 minutes",
    pages: 80,
    topics: ["Food Webs", "Biodiversity"]
  },
  {
    id: 3,
    title: "Introduction to Computer Science",
    description: "A beginner-friendly guide to the fundamentals of computer science.",
    content: "Computer science is the study of computation and...",
    subject: "Computer Science",
    category: "Grade 12",
    imageUrl: "/images/computer-science-intro.jpg",
    downloadUrl: "/files/computer-science-intro.pdf",
    author: "Mr. Alex Johnson",
    date: "2024-02-10",
    rating: 4.6,
    level: "Beginner",
    tags: ["computer science", "programming", "algorithms"],
    isFeatured: true,
    grade: "Grade 12",
    updatedAt: "2024-02-15",
    readTime: "50 minutes",
    pages: 120,
    topics: ["Data Structures", "Basic Algorithms"]
  },
  {
    id: 4,
    title: "The History of the Roman Empire",
    description: "Explore the rise and fall of one of history's greatest empires.",
    content: "The Roman Empire began in 27 BC and lasted for...",
    subject: "History",
    category: "Grade 10",
    imageUrl: "/images/roman-empire-history.jpg",
    downloadUrl: "/files/roman-empire-history.pdf",
    author: "Dr. Helen White",
    date: "2023-11-15",
    rating: 4.7,
    level: "Intermediate",
    tags: ["roman empire", "history", "ancient rome"],
    isFeatured: false,
    grade: "Grade 10",
    updatedAt: "2023-11-20",
    readTime: "55 minutes",
    pages: 100,
    topics: ["Julius Caesar", "The Punic Wars"]
  },
  {
    id: 5,
    title: "Advanced Calculus Techniques",
    description: "Master advanced calculus techniques with this comprehensive guide.",
    content: "Calculus is a branch of mathematics that deals with...",
    subject: "Mathematics",
    category: "Engineering",
    imageUrl: "/images/advanced-calculus.jpg",
    downloadUrl: "/files/advanced-calculus.pdf",
    author: "Prof. Leonard Euler",
    date: "2024-03-01",
    rating: 4.9,
    level: "Advanced",
    tags: ["calculus", "mathematics", "engineering"],
    isFeatured: true,
    grade: "Engineering",
    updatedAt: "2024-03-05",
    readTime: "70 minutes",
    pages: 180,
    topics: ["Differential Equations", "Integral Transforms"]
  },
  {
    id: 6,
    title: "Understanding Climate Change",
    description: "Learn about the causes and effects of climate change and what can be done.",
    content: "Climate change is a long-term shift in temperatures and...",
    subject: "Geography",
    category: "Grade 9",
    imageUrl: "/images/climate-change.jpg",
    downloadUrl: "/files/climate-change.pdf",
    author: "Ms. Rachel Carson",
    date: "2023-10-20",
    rating: 4.4,
    level: "Beginner",
    tags: ["climate change", "geography", "environment"],
    isFeatured: false,
    grade: "Grade 9",
    updatedAt: "2023-10-25",
    readTime: "40 minutes",
    pages: 60,
    topics: ["Greenhouse Gases", "Deforestation"]
  }
];
