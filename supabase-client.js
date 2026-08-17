// ======================================================
// SUPABASE CLIENT
// Polyglot Authentication and Cloud Data
// ======================================================

const SUPABASE_URL =
    "https://jxlmrdhhbipauusbddye.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_zw3EztduaY347T-8Zt2BQQ_aRp3UrjU";

if (!window.supabase) {
    throw new Error(
        "The Supabase browser library did not load."
    );
}

window.polyglotSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log(
    "Supabase Connected!",
    window.polyglotSupabase
);