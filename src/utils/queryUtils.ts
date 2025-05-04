
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
    .eq('id', typeof id === 'string' ? parseInt(id, 10) : id)
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
    .eq('id', typeof id === 'string' ? parseInt(id, 10) : id)
    .single();
  
  if (error) {
    console.error(`Error fetching past paper with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Dashboard stats interface
export interface DashboardStats {
  totalUsers: number;
  userGrowth: string;
  totalDownloads: number;
  downloadGrowth: string;
  totalStudyMaterials: number;
  materialsGrowth: string;
  openQueries: number;
  queriesGrowth: string;
  analytics: {
    month: string;
    visits: number;
    downloads: number;
    queries: number;
  }[];
}

// Fetch dashboard statistics for the admin panel
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Get website stats from the database
  const { data: statsData, error: statsError } = await supabase
    .from('website_stats')
    .select('*')
    .order('recorded_at', { ascending: false })
    .limit(12);
  
  if (statsError) {
    console.error('Error fetching website stats:', statsError);
    throw statsError;
  }

  // Get study materials count
  const { count: materialsCount, error: materialsError } = await supabase
    .from('study_materials')
    .select('*', { count: 'exact', head: true });
  
  if (materialsError) {
    console.error('Error counting study materials:', materialsError);
    throw materialsError;
  }
  
  // Get open queries count
  const { count: queriesCount, error: queriesError } = await supabase
    .from('user_queries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Open');
  
  if (queriesError) {
    console.error('Error counting open queries:', queriesError);
    throw queriesError;
  }

  // Format the analytics data
  const analytics = (statsData || []).map(stat => ({
    month: stat.month,
    visits: stat.visits || 0,
    downloads: stat.downloads || 0,
    queries: stat.queries || 0
  })).reverse();
  
  // Simulate user data and growth percentages (in a real app, this would come from actual data)
  return {
    totalUsers: 2458,
    userGrowth: '12%',
    totalDownloads: analytics.reduce((sum, item) => sum + item.downloads, 0),
    downloadGrowth: '8%',
    totalStudyMaterials: materialsCount || 0,
    materialsGrowth: '15%',
    openQueries: queriesCount || 0,
    queriesGrowth: '4%',
    analytics
  };
};

// Recent upload interface
export interface RecentUpload {
  id: number;
  title: string;
  category: string;
  downloads: number;
  date: string;
}

// Recent query interface
export interface RecentQuery {
  id: number;
  user_name: string;
  query_text: string;
  status: string;
  created_at: string;
}

// Fetch recent uploads for the admin dashboard
export const fetchRecentUploads = async (limit: number = 5): Promise<RecentUpload[]> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('id, title, category, downloads, date')
    .order('date', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent uploads:', error);
    throw error;
  }
  
  return data || [];
};

// Fetch recent queries for the admin dashboard
export const fetchRecentQueries = async (limit: number = 5): Promise<RecentQuery[]> => {
  const { data, error } = await supabase
    .from('user_queries')
    .select('id, user_name, query_text, status, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent queries:', error);
    throw error;
  }
  
  return data || [];
};
