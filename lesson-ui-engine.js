/* ================================================= */
/* LESSON UI ENGINE                                  */
/* ================================================= */

const LessonUIEngine = (() => {


    /* ================================================= */
    /* INITIALIZE                                        */
    /* ================================================= */

    function initialize() {

        if (
            typeof lessonConfig === "undefined" ||
            typeof ProgressEngine === "undefined"
        ) {
            return;
        }

        update();

    }


    /* ================================================= */
    /* GET REQUIRED ACTIVITIES                           */
    /* ================================================= */

    function getRequiredActivities() {

        if (
            !Array.isArray(
                lessonConfig.requiredActivities
            )
        ) {
            return [];
        }

        return lessonConfig.requiredActivities.map(
            activity => {

                if (typeof activity === "string") {

                    return {
                        id: activity,
                        label: activity
                    };

                }

                return activity;

            }
        );

    }


    /* ================================================= */
    /* GET LESSON STATUS                                 */
    /* ================================================= */

    function getStatus() {

        const requiredActivities =
            getRequiredActivities();

        const savedActivities =
            ProgressEngine.getLessonActivities(
                lessonConfig.lessonId
            );

        const completedCount =
            requiredActivities.filter(
                activity =>
                    savedActivities[activity.id] === true
            ).length;

        const totalActivities =
            requiredActivities.length;

        const percentage =
            totalActivities > 0
                ? Math.round(
                    completedCount /
                    totalActivities *
                    100
                )
                : 0;

        return {

            requiredActivities,

            savedActivities,

            completedCount,

            totalActivities,

            percentage,

            lessonCompleted:
                ProgressEngine.isLessonCompleted(
                    lessonConfig.lessonId
                )

        };

    }


    /* ================================================= */
    /* UPDATE ALL LESSON UI                              */
    /* ================================================= */

    function update() {

        const status = getStatus();

        updateProgressPanel(status);
        updateCompletionSection(status);

    }


    /* ================================================= */
    /* UPDATE PROGRESS PANEL                             */
    /* ================================================= */

    function updateProgressPanel(status) {

        const checklist =
            document.getElementById(
                "lesson-progress-checklist"
            );

        const progressText =
            document.getElementById(
                "lesson-progress-text"
            );

        const progressBar =
            document.getElementById(
                "lesson-progress-bar-fill"
            );

        const percentageText =
            document.getElementById(
                "lesson-progress-percentage"
            );

        if (checklist) {

            checklist.innerHTML =
                status.requiredActivities
                    .map(activity => {

                        const completed =
                            status.savedActivities[
                                activity.id
                            ] === true;

                        return `
                            <li
                                class="${
                                    completed
                                        ? "lesson-activity-complete"
                                        : "lesson-activity-incomplete"
                                }">

                                <span
                                    class="lesson-activity-icon">

                                    ${
                                        completed
                                            ? "✓"
                                            : "○"
                                    }

                                </span>

                                <span>
                                    ${activity.label}
                                </span>

                            </li>
                        `;

                    })
                    .join("");

        }


        if (progressText) {

            progressText.textContent =
                `${status.completedCount} of ` +
                `${status.totalActivities} ` +
                `activities complete`;

        }


        if (percentageText) {

            percentageText.textContent =
                `${status.percentage}%`;

        }


        if (progressBar) {

            progressBar.style.width =
                `${status.percentage}%`;

            progressBar.setAttribute(
                "aria-valuenow",
                String(status.percentage)
            );

        }

    }


    /* ================================================= */
    /* UPDATE COMPLETION SECTION                         */
    /* ================================================= */

    function updateCompletionSection(status) {

    const message =
        document.getElementById(
            "lesson-completion-message"
        );

    const continueLink =
        document.getElementById(
            "continue-to-next-lesson"
        );


    if (!message) {
        return;
    }


    if (!status.lessonCompleted) {

        message.innerHTML = `
            <div class="lesson-incomplete-message">

                <h2>
                    Lesson Completion
                </h2>

                <p>
                    Complete every required activity
                    to earn
                    <strong>
                        ${lessonConfig.completionXP} XP
                    </strong>.
                </p>

            </div>
        `;


        if (continueLink) {
            continueLink.hidden = true;
        }

        return;
    }


    const progress =
        ProgressEngine.getProgress();


    renderCompletionCard(
        {
            xpAwarded:
                lessonConfig.completionXP,

            progress:
                progress
        },

        false
    );


    if (continueLink) {
        continueLink.hidden = false;
    }

}

function renderCompletionCard(
    result,
    newlyCompleted
) {

    const message =
        document.getElementById(
            "lesson-completion-message"
        );


    if (!message) {
        return;
    }


    const xpMessage =
        newlyCompleted
            ? `+${result.xpAwarded} XP`
            : `${lessonConfig.completionXP} XP earned`;


    message.innerHTML = `
        <div class="lesson-success-message">

            <div class="lesson-completion-icon">
                🎉
            </div>

            <h2>
                Congratulations!
            </h2>

            <p class="lesson-mastery-message">
                You mastered the
                <strong>
                    ${lessonConfig.lessonTitle}
                </strong>!
            </p>

            <p class="lesson-xp-earned">
                ${xpMessage}
            </p>

            <p>
                Total XP:
                <strong>
                    ${result.progress.totalXP}
                </strong>
            </p>

            <p class="lesson-completion-achievement">
                🏆 ${lessonConfig.lessonLabel} Complete
            </p>

            <p class="lesson-unlock-message">
                🔓 ${lessonConfig.nextLessonTitle}
                has been unlocked!
            </p>

        </div>
    `;

}


    /* ================================================= */
    /* SHOW NEW LESSON COMPLETION                        */
    /* ================================================= */

   function showLessonCompleted(result) {

    const continueLink =
        document.getElementById(
            "continue-to-next-lesson"
        );

    renderCompletionCard(
        result,
        true
    );

    if (continueLink) {
        continueLink.hidden = false;
    }

    updateProgressPanel(
        getStatus()
    );


    const completionSection =
        document.querySelector(
            ".lesson-completion-box"
        );

    if (completionSection) {

        setTimeout(() => {

            completionSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 300);

    }

}


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        initialize,

        update,

        getStatus,

        showLessonCompleted

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    LessonUIEngine.initialize
);