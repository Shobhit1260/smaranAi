import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jfbswojtmgfwxtlhsrrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmYnN3b2p0bWdmd3h0bGhzcnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NDAwMzMsImV4cCI6MjA3NTMxNjAzM30.BHpgT7B5K6Rzi2H48H4wW9sw_XFYj9UjHLHzmhfBbho';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// });



// module.exports = { supabase, supabaseAdmin };