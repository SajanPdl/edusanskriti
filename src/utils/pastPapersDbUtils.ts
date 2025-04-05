
import { supabase } from '@/lib/supabase';

export interface PastPaper {
  id: number;
  title: string;
  subject: string;
  year: number;
  grade: string;
  difficulty: string;
  duration: string;
  file_url?: string;
  downloads: number;
  created_at?: string;
  updated_at?: string;
}

export const fetchPastPapers = async (): Promise<PastPaper[]> => {
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching past papers:', error);
    return [];
  }

  return data || [];
};

export const fetchPastPaperById = async (id: number): Promise<PastPaper | null> => {
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching past paper with id ${id}:`, error);
    return null;
  }

  return data;
};

export const updatePastPaper = async (paper: PastPaper): Promise<boolean> => {
  const { error } = await supabase
    .from('past_papers')
    .update(paper)
    .eq('id', paper.id);

  if (error) {
    console.error('Error updating past paper:', error);
    return false;
  }

  return true;
};

export const createPastPaper = async (paper: Omit<PastPaper, 'id'>): Promise<PastPaper | null> => {
  const { data, error } = await supabase
    .from('past_papers')
    .insert([paper])
    .select();

  if (error) {
    console.error('Error creating past paper:', error);
    return null;
  }

  return data[0] || null;
};

export const deletePastPaper = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('past_papers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting past paper with id ${id}:`, error);
    return false;
  }

  return true;
};
