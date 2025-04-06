
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

// Admin dashboard statistics fetching
export const fetchDashboardStats = async () => {
  // This is a placeholder for fetching dashboard statistics
  // In a real application, you would fetch this data from your backend
  
  const { data: websiteStats, error: statsError } = await supabase
    .from('website_stats')
    .select('*')
    .order('recorded_at', { ascending: false })
    .limit(7);
  
  if (statsError) throw statsError;
  
  return {
    totalUsers: 24367,
    totalDownloads: 532891,
    totalStudyMaterials: 12845,
    openQueries: 124,
    analytics: websiteStats || [],
    userGrowth: '+12%',
    downloadGrowth: '+8%',
    materialsGrowth: '+15%',
    queriesGrowth: '+4%'
  };
};

// Recent content fetching
export const fetchRecentUploads = async (limit = 5) => {
  const { data: studyMaterials, error: materialsError } = await supabase
    .from('study_materials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (materialsError) throw materialsError;
  
  return studyMaterials || [];
};

// Recent queries fetching
export const fetchRecentQueries = async (limit = 5) => {
  const { data: queries, error: queriesError } = await supabase
    .from('user_queries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (queriesError) throw queriesError;
  
  return queries || [];
};
