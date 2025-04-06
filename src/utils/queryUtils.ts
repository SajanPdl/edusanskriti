
import { supabase } from '@/integrations/supabase/client';

// Study Materials fetching utilities
export const fetchStudyMaterial = async (id: string) => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('id', parseInt(id, 10))
    .single();
    
  if (error) throw error;
  return data;
};

export const fetchStudyMaterials = async (options: {
  category?: string;
  subject?: string;
  search?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from('study_materials')
    .select('*');
    
  if (options.category && options.category !== 'All') {
    query = query.eq('category', options.category);
  }
  
  if (options.subject && options.subject !== 'All') {
    query = query.eq('subject', options.subject);
  }
  
  if (options.search) {
    query = query.ilike('title', `%${options.search}%`);
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Past Papers fetching utilities
export const fetchPastPaper = async (id: string) => {
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .eq('id', parseInt(id, 10))
    .single();
    
  if (error) throw error;
  return data;
};

export const fetchPastPapers = async (options: {
  grade?: string;
  subject?: string;
  year?: number;
  difficulty?: string;
  hasSolution?: boolean;
  search?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from('past_papers')
    .select('*');
    
  if (options.grade) {
    query = query.eq('grade', options.grade);
  }
  
  if (options.subject) {
    query = query.eq('subject', options.subject);
  }
  
  if (options.year) {
    query = query.eq('year', options.year);
  }
  
  if (options.difficulty) {
    query = query.eq('difficulty', options.difficulty);
  }
  
  if (options.search) {
    query = query.ilike('title', `%${options.search}%`);
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
