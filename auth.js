// ======================================================
// POLYGLOT AUTHENTICATION
// Google Sign-In, Profile Display, and Sign-Out
// ======================================================


// ======================================================
// GOOGLE SIGN-IN
// ======================================================

async function signInWithGoogle() {

    const authStatus =
        document.getElementById("authStatus");

    if (authStatus) {
        authStatus.textContent =
            "Opening Google Sign-In...";
    }

    const redirectUrl =
        window.location.origin +
        window.location.pathname;

    const { error } =
        await window.polyglotSupabase.auth.signInWithOAuth({

            provider: "google",

            options: {
                redirectTo: redirectUrl
            }

        });

    if (error) {

        console.error(
            "Google Sign-In Error:",
            error
        );

        if (authStatus) {
            authStatus.textContent =
                "Unable to sign in. Please try again.";
        }

    }

}


// ======================================================
// SIGN OUT
// ======================================================

async function signOutUser() {

    const authStatus =
        document.getElementById("authStatus");

    if (authStatus) {
        authStatus.textContent =
            "Signing out...";
    }

    const { error } =
        await window.polyglotSupabase.auth.signOut();

    if (error) {

        console.error(
            "Sign-Out Error:",
            error
        );

        if (authStatus) {
            authStatus.textContent =
                "Unable to sign out. Please try again.";
        }

        return;

    }

    await updateAuthenticationDisplay(null);

    if (authStatus) {
        authStatus.textContent =
            "You have been signed out.";
    }

}


// ======================================================
// DETERMINE LEVEL FROM XP
// ======================================================

function getLearnerLevel(totalXP) {

    if (totalXP >= 5000) {
        return "5 — Avanzado";
    }

    if (totalXP >= 2500) {
        return "4 — Intermedio alto";
    }

    if (totalXP >= 1000) {
        return "3 — Intermedio";
    }

    if (totalXP >= 250) {
        return "2 — Principiante avanzado";
    }

    return "1 — Principiante";

}


// ======================================================
// LOAD PROFILE FROM SUPABASE
// ======================================================

async function loadUserProfile(user) {

    const { data: profile, error } =
        await window.polyglotSupabase
            .from("profiles")
            .select(
                "full_name, avatar_url, total_xp, streak_days"
            )
            .eq("id", user.id)
            .single();

    if (error) {

        console.error(
            "Profile Load Error:",
            error
        );

        return null;

    }

    return profile;

}


// ======================================================
// UPDATE THE HOMEPAGE ACCOUNT DISPLAY
// ======================================================

async function updateAuthenticationDisplay(session) {

    const signedOutView =
        document.getElementById("signedOutView");

    const signedInView =
        document.getElementById("signedInView");

    const welcomeText =
        document.getElementById("signedInWelcome");

    const emailText =
        document.getElementById("signedInEmail");

    const avatar =
        document.getElementById("signedInAvatar");

    const profileLevel =
        document.getElementById("profileLevel");

    const profileXP =
        document.getElementById("profileXP");

    const profileStreak =
        document.getElementById("profileStreak");

    const authStatus =
        document.getElementById("authStatus");


    // Pages without an account panel should do nothing.

    if (!signedOutView || !signedInView) {
        return;
    }


    // ==================================================
    // USER IS SIGNED OUT
    // ==================================================

    if (!session || !session.user) {

        signedOutView.hidden =
            false;

        signedInView.hidden =
            true;

        if (authStatus) {
            authStatus.textContent = "";
        }

        return;

    }


    // ==================================================
    // USER IS SIGNED IN
    // ==================================================

    const user =
        session.user;

    const metadata =
        user.user_metadata || {};

    const profile =
        await loadUserProfile(user);

    const displayName =
        profile?.full_name ||
        metadata.full_name ||
        metadata.name ||
        user.email?.split("@")[0] ||
        "Learner";

    const avatarUrl =
        profile?.avatar_url ||
        metadata.avatar_url ||
        metadata.picture ||
        "";

    const totalXP =
        profile?.total_xp ?? 0;

    const streakDays =
        profile?.streak_days ?? 0;


    signedOutView.hidden =
        true;

    signedInView.hidden =
        false;


    if (welcomeText) {
        welcomeText.textContent =
            `¡Hola, ${displayName}! Welcome back.`;
    }


    if (emailText) {
        emailText.textContent =
            `Signed in as ${user.email}`;
    }


    if (profileLevel) {
        profileLevel.textContent =
            getLearnerLevel(totalXP);
    }


    if (profileXP) {
        profileXP.textContent =
            `${totalXP} XP`;
    }


    if (profileStreak) {

        const dayWord =
            streakDays === 1
                ? "día"
                : "días";

        profileStreak.textContent =
            `${streakDays} ${dayWord}`;

    }


    if (avatar) {

        if (avatarUrl) {

            avatar.src =
                avatarUrl;

            avatar.hidden =
                false;

        } else {

            avatar.removeAttribute("src");

            avatar.hidden =
                true;

        }

    }


    if (authStatus) {
        authStatus.textContent = "";
    }

}


// ======================================================
// LOAD EXISTING SESSION WHEN PAGE OPENS
// ======================================================

async function initializeAuthentication() {

    const { data, error } =
        await window.polyglotSupabase.auth.getSession();

    if (error) {

        console.error(
            "Session Check Error:",
            error
        );

        return;

    }


    await updateAuthenticationDisplay(
        data.session
    );


    // Restore cloud progress after confirming
    // that the learner is signed in.

    if (
        data.session &&
        typeof ProgressEngine !== "undefined"
    ) {

        const syncResult =
            await ProgressEngine.syncFromCloud();

        console.log(
            "Automatic cloud progress sync:",
            syncResult
        );

    }

}


// ======================================================
// RESPOND TO SIGN-IN AND SIGN-OUT EVENTS
// ======================================================

window.polyglotSupabase.auth.onAuthStateChange(
    async (event, session) => {

        await updateAuthenticationDisplay(
            session
        );


        if (
            session &&
            typeof ProgressEngine !== "undefined" &&
            (
                event === "SIGNED_IN" ||
                event === "INITIAL_SESSION"
            )
        ) {

            const syncResult =
                await ProgressEngine.syncFromCloud();

            console.log(
                "Authentication cloud sync:",
                syncResult
            );

        }

    }
);


// Make functions available to HTML buttons.

window.signInWithGoogle =
    signInWithGoogle;

window.signOutUser =
    signOutUser;


// Initialize after the page HTML is ready.

window.addEventListener(
    "DOMContentLoaded",
    initializeAuthentication
);


console.log(
    "Auth.js Loaded"
);