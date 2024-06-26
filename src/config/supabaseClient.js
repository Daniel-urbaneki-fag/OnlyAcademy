import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aoqsnodfnkzsmqnnvfoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvcXNub2Rmbmt6c21xbm52Zm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNDg1NzIsImV4cCI6MjAzMzcyNDU3Mn0.0-fK2_x0mcQTkIoiQfGU4a2Nkd6HE-AFPeU_KVICljY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
