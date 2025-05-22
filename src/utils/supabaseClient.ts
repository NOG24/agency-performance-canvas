
import { createClient } from '@supabase/supabase-js';

// Nota: Em produção, estas credenciais devem estar em variáveis de ambiente
const supabaseUrl = 'https://exemplo.supabase.co';
const supabaseKey = 'chave-publica-exemplo';

export const supabase = createClient(supabaseUrl, supabaseKey);
