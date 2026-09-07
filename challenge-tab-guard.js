// ======================================================
// LESSON 2 PRONUNCIATION CHALLENGE TAB GUARD
// ======================================================

const challengeTabChannel =
    new BroadcastChannel(
        "pronunciation-challenge-guard"
    );

const currentPage =
    window.location.pathname;

const isPronunciationLesson =
    currentPage.endsWith(
        "/lessons/pronunciation.html"
    );

const isPronunciationChallenge =
    currentPage.endsWith(
        "/lessons/pronunciation-challenge.html"
    );


// ======================================================
// PRONUNCIATION LESSON PAGE
// ======================================================

if (isPronunciationLesson) {

    function announcePronunciationPage() {

        challengeTabChannel.postMessage({
            type: "pronunciation-page-open"
        });

    }


    // Announce immediately.
    announcePronunciationPage();


    // Continue announcing while this tab is open.
    const pronunciationHeartbeat =
        setInterval(
            announcePronunciationPage,
            750
        );


    // Respond immediately when a challenge checks.
    challengeTabChannel.addEventListener(
        "message",
        event => {

            if (
                event.data?.type ===
                "challenge-check"
            ) {

                announcePronunciationPage();

            }

        }
    );


    window.addEventListener(
        "beforeunload",
        () => {

            clearInterval(
                pronunciationHeartbeat
            );

        }
    );

}


// ======================================================
// PRONUNCIATION CHALLENGE PAGE
// ======================================================

if (isPronunciationChallenge) {

    let challengeLocked = false;

    let checkAgainTimer = null;


    // Ask any open Lesson 2 tab to identify itself.
    challengeTabChannel.postMessage({
        type: "challenge-check"
    });


    challengeTabChannel.addEventListener(
        "message",
        event => {

            if (
                event.data?.type ===
                "pronunciation-page-open"
            ) {

                lockChallenge();

            }

        }
    );


    // ==================================================
    // LOCK CHALLENGE
    // ==================================================

    function lockChallenge() {

        if (challengeLocked) {
            return;
        }


        challengeLocked = true;


        // Reset challenge progress.
        if (
            typeof currentQuestion !==
            "undefined"
        ) {

            currentQuestion = 0;

        }


        if (
            typeof score !==
            "undefined"
        ) {

            score = 0;

        }


        if (
            typeof questionAnswered !==
            "undefined"
        ) {

            questionAnswered = false;

        }


        document.body.classList.add(
            "challenge-locked"
        );


        showChallengeWarning();

    }


    // ==================================================
    // WARNING OVERLAY
    // ==================================================

    function showChallengeWarning() {

        let overlay =
            document.getElementById(
                "challenge-tab-warning"
            );


        if (!overlay) {

            overlay =
                document.createElement(
                    "div"
                );

            overlay.id =
                "challenge-tab-warning";

            overlay.className =
                "challenge-tab-warning-overlay";

            document.body.appendChild(
                overlay
            );

        }


        overlay.innerHTML = `

            <div class="challenge-tab-warning-card">

                <div class="challenge-tab-warning-icon">
                    ⚠️
                </div>

                <h2>
                    Challenge Paused
                </h2>

                <p>
                    Another Lesson 2 pronunciation page
                    is currently open.
                </p>

                <p>
                    Close all other Lesson 2 tabs before
                    continuing the Pronunciation Challenge.
                </p>

                <p class="challenge-reset-notice">
                    Your current challenge progress has
                    been reset.
                </p>

                <button
                    id="check-tabs-again"
                    type="button"
                >
                    Check Again
                </button>

            </div>

        `;


        document
            .getElementById(
                "check-tabs-again"
            )
            .addEventListener(
                "click",
                checkAgain
            );

    }


    // ==================================================
    // CHECK AGAIN
    // ==================================================

    function checkAgain() {

        const button =
            document.getElementById(
                "check-tabs-again"
            );


        button.disabled = true;
        button.textContent =
            "Checking...";


        /*
         * Assume clear temporarily.
         * If another Lesson 2 page is open,
         * it will answer the broadcast.
         */

        challengeLocked = false;


        challengeTabChannel.postMessage({
            type: "challenge-check"
        });


        clearTimeout(
            checkAgainTimer
        );


        checkAgainTimer =
            setTimeout(
                () => {

                    if (
                        challengeLocked
                    ) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Check Again";

                        return;

                    }


                    /*
                     * No Lesson 2 page answered.
                     * Reload the challenge from a clean state.
                     */

                    window.location.reload();

                },
                1200
            );

    }

}