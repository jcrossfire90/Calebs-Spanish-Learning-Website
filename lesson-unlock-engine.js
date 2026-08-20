/* ================================================= */
/* LESSON UNLOCK ENGINE                              */
/* Local Progress + Cloud Restore Refresh            */
/* ================================================= */

const LessonUnlockEngine = (() => {


    /* ================================================= */
    /* INITIALIZE                                        */
    /* ================================================= */

    function initialize() {

        if (
            typeof ProgressEngine === "undefined"
        ) {

            console.error(
                "ProgressEngine was not found."
            );

            return;

        }


        refreshLessonCards();


        /*
         * Progress may arrive from Supabase after the
         * homepage has already rendered.
         *
         * Refresh the lesson cards when cloud restore
         * finishes.
         */

        window.addEventListener(
            "polyglot-progress-synced",
            refreshLessonCards
        );


        /*
         * Use one delegated click handler instead of
         * adding a new handler to every locked card.
         */

        document.addEventListener(
            "click",
            preventLockedLessonNavigation
        );

    }


    /* ================================================= */
    /* REFRESH ALL LESSON CARDS                          */
    /* ================================================= */

    function refreshLessonCards() {

        const lessonCards =
            document.querySelectorAll(
                "[data-lesson-id]"
            );


        lessonCards.forEach(card => {

            const lessonId =
                card.dataset.lessonId;


            if (!lessonId) {
                return;
            }


            resetCardState(card);


            const completed =
                ProgressEngine.isLessonCompleted(
                    lessonId
                );


            const developerMode =
                ProgressEngine.isDeveloperMode();


            const unlocked =
                developerMode ||
                ProgressEngine.isLessonUnlocked(
                    lessonId
                );


            if (completed) {

                markCompleted(card);

            } else if (developerMode) {

                markDeveloperAccess(card);

            } else if (unlocked) {

                markAvailable(card);

            } else {

                lockCard(
                    card,
                    lessonId
                );

            }

        });

    }


    /* ================================================= */
    /* RESET CARD STATE                                  */
    /* ================================================= */

    function resetCardState(card) {

        removeExistingStatus(card);


        card.classList.remove(

            "locked-card",

            "completed-card",

            "current-lesson-card",

            "developer-access-card"

        );


        card.removeAttribute(
            "aria-disabled"
        );


        card.removeAttribute(
            "tabindex"
        );

    }


    /* ================================================= */
    /* REMOVE EXISTING STATUS                            */
    /* ================================================= */

    function removeExistingStatus(card) {

        const existingStatus =
            card.querySelector(
                ".lesson-status"
            );


        if (existingStatus) {

            existingStatus.remove();

        }

    }


    /* ================================================= */
    /* COMPLETED LESSON                                  */
    /* ================================================= */

    function markCompleted(card) {

        card.classList.add(
            "completed-card"
        );


        const status =
            createStatusElement(

                "completed-status",

                "✓ Completada — Completed"

            );


        card.appendChild(status);

    }


    /* ================================================= */
    /* DEVELOPER ACCESS                                  */
    /* ================================================= */

    function markDeveloperAccess(card) {

        card.classList.add(
            "developer-access-card"
        );


        const status =
            createStatusElement(

                "developer-status",

                "🛠 Developer Access"

            );


        card.appendChild(status);

    }


    /* ================================================= */
    /* AVAILABLE LESSON                                  */
    /* ================================================= */

    function markAvailable(card) {

        card.classList.add(
            "current-lesson-card"
        );


        const status =
            createStatusElement(

                "current-status",

                "▶ Continuar — Continue Learning"

            );


        card.appendChild(status);

    }


    /* ================================================= */
    /* LOCKED LESSON                                     */
    /* ================================================= */

    function lockCard(
        card,
        lessonId
    ) {

        const requiredXP =
            ProgressEngine.getRequiredXP(
                lessonId
            );


        card.classList.add(
            "locked-card"
        );


        card.setAttribute(
            "aria-disabled",
            "true"
        );


        card.setAttribute(
            "tabindex",
            "-1"
        );


        const xpText =
            Number.isFinite(
                Number(requiredXP)
            )
                ? `${requiredXP} XP required`
                : "Complete earlier lessons";


        const status =
            createStatusElement(

                "locked-status",

                `🔒 Bloqueada — ${xpText}`

            );


        card.appendChild(status);

    }


    /* ================================================= */
    /* CREATE STATUS ELEMENT                             */
    /* ================================================= */

    function createStatusElement(
        statusClass,
        message
    ) {

        const status =
            document.createElement("p");


        status.className =
            `lesson-status ${statusClass}`;


        status.textContent =
            message;


        return status;

    }


    /* ================================================= */
    /* PREVENT LOCKED NAVIGATION                         */
    /* ================================================= */

    function preventLockedLessonNavigation(
        event
    ) {

        const lockedCard =
            event.target.closest(
                "[data-lesson-id].locked-card"
            );


        if (!lockedCard) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        const status =
            lockedCard.querySelector(
                ".locked-status"
            );


        if (status) {

            status.classList.remove(
                "locked-status-attention"
            );


            /*
             * Force the animation to restart if the
             * learner clicks the card repeatedly.
             */

            void status.offsetWidth;


            status.classList.add(
                "locked-status-attention"
            );

        }

    }


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        initialize,

        refreshLessonCards

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    LessonUnlockEngine.initialize
);