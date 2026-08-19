/* ================================================= */
/* STUDENT PROGRESS DASHBOARD                        */
/* Local Progress + Cloud Sync + XP Levels           */
/* ================================================= */

const ProgressDashboard = (() => {


    /* ================================================= */
    /* BEGINNER LESSONS                                  */
    /* ================================================= */

    const beginnerLessons = [

        {
            id: "lesson-1-alphabet",
            name: "Lesson 1 - Alphabet"
        },

        {
            id: "lesson-2-pronunciation",
            name: "Lesson 2 - Pronunciation"
        },

        {
            id: "lesson-3-greetings",
            name: "Lesson 3 - Greetings"
        },

        {
            id: "lesson-4-numbers",
            name: "Lesson 4 - Numbers"
        },

        {
            id: "lesson-5-days",
            name: "Lesson 5 - Days"
        },

        {
            id: "lesson-a-colors",
            name: "Lesson A - Colors"
        }

    ];


    /* ================================================= */
    /* XP LEVEL DEFINITIONS                              */
    /* ================================================= */

    const levelDefinitions = [

        {
            level: 1,
            name: "Principiante",
            minimumXP: 0
        },

        {
            level: 2,
            name: "Principiante avanzado",
            minimumXP: 250
        },

        {
            level: 3,
            name: "Intermedio",
            minimumXP: 1000
        },

        {
            level: 4,
            name: "Intermedio alto",
            minimumXP: 2500
        },

        {
            level: 5,
            name: "Avanzado",
            minimumXP: 5000
        }

    ];


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


        renderDashboard();


        /*
         * Redraw the dashboard after cloud progress
         * has been restored from Supabase.
         */

        window.addEventListener(
            "polyglot-progress-synced",
            handleCloudProgressSync
        );

    }


    /* ================================================= */
    /* HANDLE CLOUD SYNC                                 */
    /* ================================================= */

    function handleCloudProgressSync(event) {

        const syncedProgress =
            event.detail;


        if (syncedProgress) {

            renderDashboard(
                syncedProgress
            );

            return;

        }


        renderDashboard();

    }


    /* ================================================= */
    /* RENDER COMPLETE DASHBOARD                         */
    /* ================================================= */

    function renderDashboard(providedProgress = null) {

        const progress =
            providedProgress ||
            ProgressEngine.getProgress();


        updateLevelProgress(progress);

        updateCompletedLessons(progress);

        updateCurrentLesson(progress);

        updateBeginnerProgress(progress);

        updateLearnerRank(
            progress.totalXP
        );

    }


    /* ================================================= */
    /* GET CURRENT LEVEL INFORMATION                     */
    /* ================================================= */

    function getLevelInformation(totalXP) {

        const xp =
            Number(totalXP) || 0;


        let currentLevel =
            levelDefinitions[0];

        let nextLevel =
            levelDefinitions[1];


        for (
            let index = 0;
            index < levelDefinitions.length;
            index++
        ) {

            const level =
                levelDefinitions[index];


            if (xp >= level.minimumXP) {

                currentLevel =
                    level;

                nextLevel =
                    levelDefinitions[index + 1] ||
                    null;

            }

        }


        /*
         * The learner has reached the highest
         * currently available level.
         */

        if (!nextLevel) {

            return {

                currentLevel,

                nextLevel: null,

                currentLevelXP:
                    xp - currentLevel.minimumXP,

                requiredLevelXP:
                    0,

                percentage:
                    100

            };

        }


        const currentLevelXP =
            xp - currentLevel.minimumXP;


        const requiredLevelXP =
            nextLevel.minimumXP -
            currentLevel.minimumXP;


        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    Math.round(
                        (
                            currentLevelXP /
                            requiredLevelXP
                        ) * 100
                    )
                )
            );


        return {

            currentLevel,

            nextLevel,

            currentLevelXP,

            requiredLevelXP,

            percentage

        };

    }


    /* ================================================= */
    /* UPDATE LEVEL AND XP PROGRESS                      */
    /* ================================================= */

    function updateLevelProgress(progress) {

        const totalXP =
            Number(progress.totalXP) || 0;


        const levelInformation =
            getLevelInformation(
                totalXP
            );


        const levelNameElement =
            document.getElementById(
                "dashboard-level-name"
            );


        const totalXPElement =
            document.getElementById(
                "dashboard-total-points"
            );


        const levelFillElement =
            document.getElementById(
                "dashboard-level-progress-fill"
            );


        const levelXPTextElement =
            document.getElementById(
                "dashboard-level-xp-text"
            );


        const nextLevelTextElement =
            document.getElementById(
                "dashboard-next-level-text"
            );


        if (levelNameElement) {

            levelNameElement.textContent =
                `Nivel ${levelInformation.currentLevel.level}` +
                ` — ${levelInformation.currentLevel.name}`;

        }


        if (totalXPElement) {

            totalXPElement.textContent =
                totalXP;

        }


        if (levelFillElement) {

            levelFillElement.style.width =
                `${levelInformation.percentage}%`;

        }


        /*
         * Highest available level.
         */

        if (!levelInformation.nextLevel) {

            if (levelXPTextElement) {

                levelXPTextElement.textContent =
                    `${totalXP} XP total`;

            }


            if (nextLevelTextElement) {

                nextLevelTextElement.textContent =
                    "Nivel máximo alcanzado";

            }


            return;

        }


        if (levelXPTextElement) {

            levelXPTextElement.textContent =
                `${levelInformation.currentLevelXP} / ` +
                `${levelInformation.requiredLevelXP} XP`;

        }


        if (nextLevelTextElement) {

            nextLevelTextElement.textContent =
                `${levelInformation.percentage}% toward ` +
                `Nivel ${levelInformation.nextLevel.level}`;

        }

    }


    /* ================================================= */
    /* UPDATE COMPLETED LESSON COUNT                     */
    /* ================================================= */

    function updateCompletedLessons(progress) {

        const completedElement =
            document.getElementById(
                "dashboard-lessons-completed"
            );


        if (!completedElement) {
            return;
        }


        const completedLessons =
            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [];


        const beginnerCompleted =
            beginnerLessons.filter(
                lesson =>
                    completedLessons.includes(
                        lesson.id
                    )
            ).length;


        completedElement.textContent =
            beginnerCompleted;

    }


    /* ================================================= */
    /* UPDATE CURRENT LESSON                             */
    /* ================================================= */

    function updateCurrentLesson(progress) {

        const currentLessonElement =
            document.getElementById(
                "dashboard-current-lesson"
            );


        if (!currentLessonElement) {
            return;
        }


        const completedLessons =
            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [];


        const nextLesson =
            beginnerLessons.find(
                lesson =>

                    !completedLessons.includes(
                        lesson.id
                    ) &&

                    ProgressEngine.isLessonUnlocked(
                        lesson.id
                    )
            );


        if (nextLesson) {

            currentLessonElement.textContent =
                nextLesson.name;

            return;

        }


        const allBeginnerCompleted =
            beginnerLessons.every(
                lesson =>
                    completedLessons.includes(
                        lesson.id
                    )
            );


        currentLessonElement.textContent =
            allBeginnerCompleted
                ? "Beginner Complete"
                : "No Lesson Available";

    }


    /* ================================================= */
    /* UPDATE BEGINNER LESSON PROGRESS                   */
    /* ================================================= */

    function updateBeginnerProgress(progress) {

        const completedLessons =
            Array.isArray(
                progress.completedLessons
            )
                ? progress.completedLessons
                : [];


        const completedCount =
            beginnerLessons.filter(
                lesson =>
                    completedLessons.includes(
                        lesson.id
                    )
            ).length;


        const percentage =
            Math.round(
                (
                    completedCount /
                    beginnerLessons.length
                ) * 100
            );


        const percentageElement =
            document.getElementById(
                "dashboard-beginner-percent"
            );


        const fillElement =
            document.getElementById(
                "dashboard-progress-fill"
            );


        const messageElement =
            document.getElementById(
                "dashboard-progress-message"
            );


        if (percentageElement) {

            percentageElement.textContent =
                `${percentage}%`;

        }


        if (fillElement) {

            fillElement.style.width =
                `${percentage}%`;

        }


        if (!messageElement) {
            return;
        }


        if (percentage === 0) {

            messageElement.textContent =
                "Begin Lesson 1 to start your Spanish journey.";

        } else if (percentage === 100) {

            messageElement.textContent =
                "¡Excelente! You completed the Beginner lessons.";

        } else {

            messageElement.textContent =
                `${completedCount} of ` +
                `${beginnerLessons.length} ` +
                "Beginner lessons completed.";

        }

    }


    /* ================================================= */
    /* UPDATE LEARNER RANK                               */
    /* ================================================= */

    function updateLearnerRank(totalXP) {

        const rankElement =
            document.getElementById(
                "learner-rank"
            );


        if (!rankElement) {
            return;
        }


        const levelInformation =
            getLevelInformation(
                totalXP
            );


        rankElement.textContent =
            `Nivel ${levelInformation.currentLevel.level}` +
            ` — ${levelInformation.currentLevel.name}`;

    }


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        initialize,

        renderDashboard,

        getLevelInformation

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    ProgressDashboard.initialize
);