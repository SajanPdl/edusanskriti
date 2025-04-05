
import { supabase } from '@/lib/supabase';
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
    .from('categories')
    .select('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map(item => item.name) || [];
};

export const getSubjects = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('subjects')
    .select('name');

  if (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }

  return data.map(item => item.name) || [];
};

export const updateStudyMaterial = async (material: StudyMaterial): Promise<boolean> => {
  const { error } = await supabase
    .from('study_materials')
    .update(material)
    .eq('id', material.id);

  if (error) {
    console.error('Error updating study material:', error);
    return false;
  }

  return true;
};

export const createStudyMaterial = async (material: Omit<StudyMaterial, 'id'>): Promise<StudyMaterial | null> => {
  const { data, error } = await supabase
    .from('study_materials')
    .insert([material])
    .select();

  if (error) {
    console.error('Error creating study material:', error);
    return null;
  }

  return data[0] || null;
};

export const deleteStudyMaterial = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('study_materials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting study material with id ${id}:`, error);
    return false;
  }

  return true;
};
