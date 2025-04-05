
import { supabase } from '@/lib/supabase';

export interface WebsiteStat {
  id: number;
  month: string;
  visits: number;
  downloads: number;
  queries: number;
  recorded_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface UserQuery {
  id: number;
  user_name: string;
  email?: string;
  query_text: string;
  status: string;
  created_at?: string;
  resolved_at?: string;
}

// Stats functions
export const fetchWebsiteStats = async (): Promise<WebsiteStat[]> => {
  const { data, error } = await supabase
    .from('website_stats')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching website stats:', error);
    return [];
  }

  return data || [];
};

// Categories functions
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

export const addCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select();

  if (error) {
    console.error('Error adding category:', error);
    return null;
  }

  return data[0] || null;
};

export const updateCategory = async (category: Omit<Category, 'created_at'>): Promise<boolean> => {
  const { error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      description: category.description
    })
    .eq('id', category.id);

  if (error) {
    console.error('Error updating category:', error);
    return false;
  }

  return true;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    return false;
  }

  return true;
};

// Subject functions
export const fetchSubjects = async (): Promise<Subject[]> => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }

  return data || [];
};

export const addSubject = async (subject: Omit<Subject, 'id' | 'created_at'>): Promise<Subject | null> => {
  const { data, error } = await supabase
    .from('subjects')
    .insert([subject])
    .select();

  if (error) {
    console.error('Error adding subject:', error);
    return null;
  }

  return data[0] || null;
};

export const updateSubject = async (subject: Omit<Subject, 'created_at'>): Promise<boolean> => {
  const { error } = await supabase
    .from('subjects')
    .update({
      name: subject.name,
      description: subject.description
    })
    .eq('id', subject.id);

  if (error) {
    console.error('Error updating subject:', error);
    return false;
  }

  return true;
};

export const deleteSubject = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting subject with id ${id}:`, error);
    return false;
  }

  return true;
};

// User queries functions
export const fetchUserQueries = async (): Promise<UserQuery[]> => {
  const { data, error } = await supabase
    .from('user_queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user queries:', error);
    return [];
  }

  return data || [];
};

export const updateQueryStatus = async (id: number, status: string): Promise<boolean> => {
  const updates: Record<string, any> = { status };
  
  if (status === 'Resolved') {
    updates.resolved_at = new Date().toISOString();
  }
  
  const { error } = await supabase
    .from('user_queries')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating query status:', error);
    return false;
  }

  return true;
};
