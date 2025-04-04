
import { supabase } from './blogUtils';
import { StudyMaterial } from '@/data/studyMaterialsData';

export const fetchStudyMaterials = async (): Promise<StudyMaterial[]> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching study materials:', error);
    return [];
  }

  return data || [];
};

export const fetchStudyMaterialById = async (id: number): Promise<StudyMaterial | null> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching study material with id ${id}:`, error);
    return null;
  }

  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('category');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const uniqueCategories = [...new Set(data.map(item => item.category))];
  return uniqueCategories;
};

export const getSubjects = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('study_materials')
    .select('subject');

  if (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }

  const uniqueSubjects = [...new Set(data.map(item => item.subject))];
  return uniqueSubjects;
};
