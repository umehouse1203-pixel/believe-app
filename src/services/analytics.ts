import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client safely
let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Gets or creates a local anonymous ID for the user to count unique "people" without personal info.
 */
const getAnonymousId = () => {
  let id = localStorage.getItem('believe_anonymous_id');
  if (!id) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      // Fallback for non-secure contexts (e.g., local IP access without HTTPS)
      id = 'user_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    }
    localStorage.setItem('believe_anonymous_id', id);
  }
  return id;
};

/**
 * Gets the ISO 3166-1 alpha-2 country code from navigator.language or Intl API
 */
const getCountryCode = () => {
  try {
    // 1. Prefer Intl API for more reliable locale on mobile
    const locale = new Intl.DateTimeFormat().resolvedOptions().locale || navigator.language || 'en-US';
    console.log('[Analytics] Detected Locale:', locale);
    
    const parts = locale.split('-');
    
    // 2. Explicit country code in locale (e.g., ja-JP -> JP)
    if (parts.length > 1) return parts[1].toUpperCase();
    
    // 3. Common language-only fallbacks (Mapping of 12 supported languages)
    const lang = parts[0].toLowerCase();
    const mapping: Record<string, string> = {
      'ja': 'JP', 'en': 'US', 'zh': 'CN', 'ko': 'KR', 
      'fr': 'FR', 'de': 'DE', 'es': 'ES', 'it': 'IT', 
      'pt': 'BR', 'ru': 'RU', 'hi': 'IN', 'ar': 'SA'
    };
    
    return mapping[lang] || lang.toUpperCase();
  } catch (e) {
    return 'JP'; // Default to JP
  }
};

export const Analytics = {
  /**
   * Tracks the completion of a thinking session by inserting securely into Postgres.
   */
  trackSession: async (targetName: string, durationSeconds: number) => {
    // Check environment support (especially for mobile)
    const hasLS = (() => { try { localStorage.setItem('t', '1'); return true; } catch(e) { return false; } })();
    console.log('[Analytics Debug] Device Environment:', {
      ua: navigator.userAgent,
      hasLS,
      lang: navigator.language
    });

    // 1. Sanitize and validate inputs for a secure public release
    const cleanTargetName = targetName.trim().substring(0, 30);
    const cleanDuration = Math.min(Math.max(1, durationSeconds), 86400); // Caps at 24 hours

    console.log('[Analytics] Session Start:', { targetName: cleanTargetName, durationSeconds: cleanDuration });
    try {
      const payload = {
        target_name: cleanTargetName,
        duration_seconds: cleanDuration,
        locale: navigator.language, 
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country_code: getCountryCode(),
        user_id: getAnonymousId(), 
      };

      if (supabase) {
        // Use Type casting to any to bypass Supabase schema mismatch and ensure smooth recording
        const { error } = await (supabase as any)
          .from('believe_analytics')
          .insert([payload]);
          
        if (error) {
          console.error('[Analytics] Supabase Transfer Error:', error.message, error.details);
        } else {
          console.log('[Analytics] Successfully recorded globally! Payload:', payload);
        }
      } else {
        console.warn('[Analytics] DB Configuration missing. Showing payload:', payload);
      }
    } catch (e) {
      console.error('[Analytics] Failed to track session:', e);
    }
  },

  /**
   * Fetches global and local statistics for a given target name.
   */
  fetchStats: async (targetName: string) => {
    if (!supabase) return null;

    const countryCode = getCountryCode();

    try {
      // Use the pre-aggregated view for accurate results bypassing RLS on raw rows
      const { data, error } = await (supabase as any)
        .from('target_stats')
        .select('*')
        .eq('target_name', targetName);

      if (error) {
        console.error('[Analytics] View Fetch Error:', error);
        return null;
      }

      const rows = data || [];
      
      // Safety parser (extremely rigorous for mobile Chrome)
      const safeParse = (val: any) => {
        if (val === null || val === undefined) return 0;
        let p = 0;
        if (typeof val === 'number') p = val;
        else if (typeof val === 'string') p = parseInt(val, 10);
        else p = Number(val);
        return isNaN(p) ? 0 : p;
      };

      let gSec = 0;
      let gPeo = 0;
      let lSec = 0;
      let lPeo = 0;

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const s = safeParse(r.total_seconds);
        const p = safeParse(r.total_people);
        
        gSec += s;
        gPeo += p;
        
        if (r.country_code === countryCode) {
          lSec = s;
          lPeo = p;
        }
      }

      // Expose to window for manual "F12" check on mobile
      (window as any)._DEBUG_LAST_FETCH = {
        targetName,
        countryCode,
        rows,
        calculated: { gSec, gPeo, lSec, lPeo }
      };

      console.group(`[Analytics Final Debug] "${targetName}"`);
      console.log('Matched Rows Count:', rows.length);
      console.log('Final Totals:', { gSec, gPeo, lSec, lPeo });
      console.groupEnd();

      return {
        globalHours: Math.floor(gSec / 3600),
        localHours: Math.floor(lSec / 3600),
        globalPeople: gPeo,
        localPeople: lPeo,
      };
    } catch (e) {
      console.error('[Analytics] Critical failure fetching stats from view:', e);
      return null;
    }
  }
};
