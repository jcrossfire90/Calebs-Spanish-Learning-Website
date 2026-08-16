/* ================================================= */
/* LESSON UNLOCK ENGINE                              */
/* ================================================= */

const LessonUnlockEngine = (() => {

    function initialize() {
        const lessonCards =
            document.querySelectorAll("[data-lesson-id]");

        lessonCards.forEach(card => {
            const lessonId = card.dataset.lessonId;

            const completed =
    ProgressEngine.isLessonCompleted(lessonId);

const developerMode =
    ProgressEngine.isDeveloperMode();

const unlocked =
    developerMode ||
    ProgressEngine.isLessonUnlocked(lessonId);

            if (completed) {
    markCompleted(card);
} else if (developerMode) {
    markDeveloperAccess(card);
} else if (unlocked) {
    markCurrent(card);
} else {
    lockCard(card, lessonId);
}
        });
    }


    function removeExistingStatus(card) {
        const existingStatus =
            card.querySelector(".lesson-status");

        if (existingStatus) {
            existingStatus.remove();
        }
    }


    function markCompleted(card) {
        removeExistingStatus(card);

        card.classList.remove(
            "locked-card",
            "current-lesson-card"
        );

        card.classList.add("completed-card");
        card.removeAttribute("aria-disabled");

        const status =
            document.createElement("p");

        status.className =
            "lesson-status completed-status";

        status.textContent =
            "✓ Completed";

        card.appendChild(status);
    }

function markDeveloperAccess(card) {
    removeExistingStatus(card);

    card.classList.remove(
        "locked-card",
        "completed-card",
        "current-lesson-card"
    );

    card.classList.add("developer-access-card");
    card.removeAttribute("aria-disabled");

    const status =
        document.createElement("p");

    status.className =
        "lesson-status developer-status";

    status.textContent =
        "🛠 Developer Access";

    card.appendChild(status);
}

    function markCurrent(card) {
        removeExistingStatus(card);

        card.classList.remove(
            "locked-card",
            "completed-card"
        );

        card.classList.add("current-lesson-card");
        card.removeAttribute("aria-disabled");

        const status =
            document.createElement("p");

        status.className =
            "lesson-status current-status";

        status.textContent =
            "▶ Continue Learning";

        card.appendChild(status);
    }


    function lockCard(card, lessonId) {
        removeExistingStatus(card);

        const requiredPoints =
            ProgressEngine.getRequiredPoints(lessonId);

        card.classList.remove(
            "completed-card",
            "current-lesson-card"
        );

        card.classList.add("locked-card");
        card.setAttribute("aria-disabled", "true");

        const status =
            document.createElement("p");

        status.className =
            "lesson-status locked-status";

        status.textContent =
            `🔒 Locked — ${requiredPoints} required points`;

        card.appendChild(status);

        card.addEventListener("click", event => {
            event.preventDefault();
        });
    }


    return {
        initialize
    };

})();


document.addEventListener(
    "DOMContentLoaded",
    LessonUnlockEngine.initialize
);