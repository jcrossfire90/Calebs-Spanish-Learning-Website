// ======================================================
// POLYGLOT AUTHENTICATION
// Google Sign In
// ======================================================

async function signInWithGoogle() {

    const { error } = await window.polyglotSupabase.auth.signInWithOAuth({

        provider: "google",

        options: {
            redirectTo: window.location.origin
        }

    });

    if (error) {
        console.error("Google Sign In Error:", error);
    }

}

console.log("Auth.js Loaded");