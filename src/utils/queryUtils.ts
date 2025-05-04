
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Define parameters for filtering study materials
interface StudyMaterialsQueryParams {
  category?: string;
  subject?: string;
  search?: string;
  limit?: number;
  featured?: boolean;
}

// Fetch study materials with optional filtering
export const fetchStudyMaterials = async (params: StudyMaterialsQueryParams = {}): Promise<Tables<'study_materials'>[]> => {
  let query = supabase
    .from('study_materials')
    .select('*');
  
  if (params.category) {
    query = query.eq('category', params.category);
  }
  
  if (params.subject) {
    query = query.eq('subject', params.subject);
  }
  
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%,content.ilike.%${params.search}%`);
  }
  
  if (params.featured) {
    query = query.eq('is_featured', true);
  }
  
  const { data, error } = await query.order('date', { ascending: false }).limit(params.limit || 50);
  
  if (error) {
    console.error('Error fetching study materials:', error);
    throw error;
  }
  
  return data || [];
};

// Define parameters for filtering past papers
interface PastPapersQueryParams {
  subject?: string;
  grade?: string;
  year?: number;
  search?: string;
  limit?: number;
}

// Fetch past papers with optional filtering
export const fetchPastPapers = async (params: PastPapersQueryParams = {}): Promise<Tables<'past_papers'>[]> => {
  let query = supabase
    .from('past_papers')
    .select('*');
  
  if (params.subject) {
    query = query.eq('subject', params.subject);
  }
  
  if (params.grade) {
    query = query.eq('grade', params.grade);
  }
  
  if (params.year) {
    query = query.eq('year', params.year);
  }
  
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,subject.ilike.%${params.search}%`);
  }
  
  const { data, error } = await query.order('year', { ascending: false }).limit(params.limit || 50);
  
  if (error) {
    console.error('Error fetching past papers:', error);
    throw error;
  }
  
  return data || [];
};

// Fetch featured study materials for the homepage
export const fetchFeaturedMaterials = async (limit: number = 6): Promise<Tables<'study_materials'>[]> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('is_featured', true)
    .order('downloads', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching featured materials:', error);
    throw error;
  }
  
  return data || [];
};

// Fetch a single study material by ID
export const fetchStudyMaterialById = async (id: string | number): Promise<Tables<'study_materials'>> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching study material with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Fetch a single past paper by ID
export const fetchPastPaperById = async (id: string | number): Promise<Tables<'past_papers'>> => {
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching past paper with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};
