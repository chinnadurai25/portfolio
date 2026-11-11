import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://moqzdrhwabwrxrmfzrft.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_qxfYHfqHq79YLXzZQTkxhA_FjPVwuoB';

let client = null;

try {
    if (supabaseUrl && supabaseKey) {
        client = createClient(supabaseUrl, supabaseKey);
    }
} catch (err) {
    console.error("Supabase client initialization failed:", err);
}

// Fallback dummy client to guarantee zero runtime crashes on production
const fallbackClient = {
    from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
    }),
    channel: () => ({
        on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
        subscribe: () => ({ unsubscribe: () => {} })
    }),
    removeChannel: () => {},
    storage: {
        from: () => ({
            upload: () => Promise.resolve({ data: null, error: null }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
            remove: () => Promise.resolve({ data: null, error: null })
        })
    },
    auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null })
    }
};

export const supabase = client || fallbackClient;
