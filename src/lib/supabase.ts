
import { createClient } from '@supabase/supabase-js';

// Use hardcoded values from the auto-generated client as fallbacks
const SUPABASE_URL = "https://gwludaapupacqneiuybr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bHVkYWFwdXBhY3FuZWl1eWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzc3NzksImV4cCI6MjA1OTMxMzc3OX0.abf97sXujsovsVmixD58bJArcaybNqQ_XhEwVtDurrU";

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

// Check if we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create a single Supabase client instance to reuse across the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type { SupabaseClient } from '@supabase/supabase-js';
