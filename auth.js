// ======================================================
// POLYGLOT AUTHENTICATION
// Google Sign-In, Session Display, and Sign-Out
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

    updateAuthenticationDisplay(null);

    if (authStatus) {
        authStatus.textContent =
            "You have been signed out.";
    }

}


// ======================================================
// UPDATE THE HOMEPAGE ACCOUNT DISPLAY
// ======================================================

function updateAuthenticationDisplay(session) {

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

    const authStatus =
        document.getElementById("authStatus");


    // Some lesson pages may not contain the account panel.

    if (!signedOutView || !signedInView) {
        return;
    }


    // USER IS SIGNED OUT

    if (!session || !session.user) {

        signedOutView.hidden = false;
        signedInView.hidden = true;

        if (authStatus) {
            authStatus.textContent = "";
        }

        return;

    }


    // USER IS SIGNED IN

    const user =
        session.user;

    const metadata =
        user.user_metadata || {};

    const displayName =
        metadata.full_name ||
        metadata.name ||
        user.email?.split("@")[0] ||
        "Learner";

    const avatarUrl =
        metadata.avatar_url ||
        metadata.picture ||
        "";


    signedOutView.hidden = true;
    signedInView.hidden = false;

    if (welcomeText) {
        welcomeText.textContent =
            `¡Hola, ${displayName}! Welcome back.`;
    }

    if (emailText) {
        emailText.textContent =
            `Signed in as ${user.email}`;
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
// LOAD THE EXISTING SESSION WHEN THE PAGE OPENS
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

    updateAuthenticationDisplay(
        data.session
    );

}


// ======================================================
// RESPOND TO FUTURE SIGN-IN AND SIGN-OUT EVENTS
// ======================================================

window.polyglotSupabase.auth.onAuthStateChange(
    (_event, session) => {

        updateAuthenticationDisplay(
            session
        );

    }
);


// Make functions available to the HTML buttons.

window.signInWithGoogle =
    signInWithGoogle;

window.signOutUser =
    signOutUser;


// Initialize after the homepage HTML is ready.

window.addEventListener(
    "DOMContentLoaded",
    initializeAuthentication
);

console.log(
    "Auth.js Loaded"
);