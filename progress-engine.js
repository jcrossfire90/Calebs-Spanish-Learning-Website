/* ================================================= */
/* LOCAL PROGRESS ENGINE                             */
/* ================================================= */

const ProgressEngine = (() => {

    const storageKey = "calebSpanishProgressV1";

    const developerMode = true;


    /* ================================================= */
    /* LESSON UNLOCK REQUIREMENTS                        */
    /* ================================================= */

/* ========================================== */
/*   BEGINNER - LEVEL */
/* ========================================== */
    const lessonRules = {
    "lesson-1-alphabet": 0,
    "lesson-2-pronunciation": 25,
    "lesson-3-greetings": 50,
    "lesson-4-numbers": 75,
    "lesson-5-days": 100,

/* LESSON (AUDIO) COURSES */

    "lesson-a-colors": 125,
    "lesson-a-fruits-vegetables": 150,
    "lesson-a-animals": 175,
    "lesson-a-question-words": 200,
    "lesson-a-prepositions": 225,

/* ========================================== */
/*   NOVICE - LEVEL */
/* ========================================== */
    "lesson-scene-1": 250
};


    /* ================================================= */
    /* CREATE NEW PROGRESS                               */
    /* ================================================= */

    function createNewProgress() {

        return {

            totalXP: 0,

            completedLessons: [],

            lessonActivities: {}

        };

    }


    /* ================================================= */
    /* NORMALIZE AND MIGRATE SAVED PROGRESS              */
    /* ================================================= */

    function normalizeProgress(savedProgress) {

        const oldTotalPoints =
            Number(savedProgress.totalPoints) || 0;

        const savedTotalXP =
            Number(savedProgress.totalXP) || 0;

        return {

            totalXP:
                savedTotalXP > 0
                    ? savedTotalXP
                    : oldTotalPoints,

            completedLessons:
                Array.isArray(
                    savedProgress.completedLessons
                )
                    ? savedProgress.completedLessons
                    : [],

            lessonActivities:
                savedProgress.lessonActivities &&
                typeof savedProgress.lessonActivities === "object"
                    ? savedProgress.lessonActivities
                    : {}

        };

    }


    /* ================================================= */
    /* LOAD PROGRESS                                     */
    /* ================================================= */

    function loadProgress() {

        const savedProgress =
            localStorage.getItem(storageKey);

        if (!savedProgress) {

            return createNewProgress();

        }

        try {

            const parsedProgress =
                JSON.parse(savedProgress);

            const normalizedProgress =
                normalizeProgress(parsedProgress);

            /*
                Save the normalized version so older
                totalPoints progress is converted to totalXP.
            */

            saveProgress(normalizedProgress);

            return normalizedProgress;

        } catch (error) {

            console.error(
                "Unable to read saved progress:",
                error
            );

            return createNewProgress();

        }

    }


    /* ================================================= */
    /* SAVE PROGRESS                                     */
    /* ================================================= */

    function saveProgress(progress) {

        localStorage.setItem(
            storageKey,
            JSON.stringify(progress)
        );

    }


    /* ================================================= */
    /* COMPLETE AN ACTIVITY                              */
    /* ================================================= */

    function completeActivity(
        lessonId,
        activityId
    ) {

        if (!lessonId || !activityId) {

            console.error(
                "A lesson ID and activity ID are required."
            );

            return null;

        }

        const progress = loadProgress();


        if (!progress.lessonActivities[lessonId]) {

            progress.lessonActivities[lessonId] = {};

        }


        const wasAlreadyCompleted =
            progress.lessonActivities[lessonId][activityId]
            === true;


        if (!wasAlreadyCompleted) {

            progress.lessonActivities[lessonId][activityId] =
                true;

            saveProgress(progress);

        }


        return {

            newlyCompleted:
                !wasAlreadyCompleted,

            activityId:
                activityId,

            lessonId:
                lessonId,

            progress:
                progress

        };

    }


    /* ================================================= */
    /* CHECK ACTIVITY COMPLETION                         */
    /* ================================================= */

    function isActivityCompleted(
        lessonId,
        activityId
    ) {

        const progress = loadProgress();

        const lessonActivityProgress =
            progress.lessonActivities[lessonId];

        if (!lessonActivityProgress) {

            return false;

        }

        return (
            lessonActivityProgress[activityId]
            === true
        );

    }


    /* ================================================= */
    /* GET LESSON ACTIVITIES                             */
    /* ================================================= */

    function getLessonActivities(lessonId) {

        const progress = loadProgress();

        return (
            progress.lessonActivities[lessonId] ||
            {}
        );

    }


    /* ================================================= */
    /* CHECK REQUIRED ACTIVITIES                         */
    /* ================================================= */

    function areRequiredActivitiesCompleted(
        lessonId,
        requiredActivities
    ) {

        if (
            !Array.isArray(requiredActivities) ||
            requiredActivities.length === 0
        ) {

            return false;

        }

        return requiredActivities.every(
            activityId => {

                return isActivityCompleted(
                    lessonId,
                    activityId
                );

            }
        );

    }


    /* ================================================= */
    /* COMPLETE LESSON                                   */
    /* ================================================= */

    function completeLesson(
        lessonId,
        xpAwarded = 25
    ) {

        const progress = loadProgress();


        if (
            progress.completedLessons.includes(
                lessonId
            )
        ) {

            return {

                newlyCompleted: false,

                xpAwarded: 0,

                progress:
                    progress

            };

        }


        progress.completedLessons.push(
            lessonId
        );

        progress.totalXP += xpAwarded;

        saveProgress(progress);


        return {

            newlyCompleted: true,

            xpAwarded:
                xpAwarded,

            progress:
                progress

        };

    }


    /* ================================================= */
    /* CHECK LESSON COMPLETION                           */
    /* ================================================= */

    function isLessonCompleted(lessonId) {

        const progress = loadProgress();

        return progress.completedLessons.includes(
            lessonId
        );

    }


    /* ================================================= */
    /* CHECK LESSON UNLOCK                               */
    /* ================================================= */

    function isLessonUnlocked(lessonId) {

        const requiredXP =
            lessonRules[lessonId];


        if (requiredXP === undefined) {

            console.warn(
                `No unlock rule found for: ${lessonId}`
            );

            return false;

        }


        const progress = loadProgress();

        return (
            progress.totalXP >= requiredXP
        );

    }


    /* ================================================= */
    /* GET REQUIRED XP                                   */
    /* ================================================= */

    function getRequiredXP(lessonId) {

        return lessonRules[lessonId];

    }


    /*
        Temporary compatibility function.

        Other existing files may still call
        getRequiredPoints(). We will eventually
        update those files to use getRequiredXP().
    */

    function getRequiredPoints(lessonId) {

        return getRequiredXP(lessonId);

    }


    /* ================================================= */
    /* GET CURRENT PROGRESS                              */
    /* ================================================= */

    function getProgress() {

        return loadProgress();

    }

    /* ================================================= */
    /* SYNCHRONIZE PROGRESS FROM SUPABASE                */
    /* ================================================= */

    async function syncFromCloud() {

        if (!window.polyglotSupabase) {

            console.info(
                "Cloud progress sync skipped: Supabase is not loaded."
            );

            return {
                synced: false,
                reason: "supabase-not-loaded"
            };

        }


        const { data: sessionData, error: sessionError } =
            await window.polyglotSupabase.auth.getSession();


        if (sessionError) {

            console.error(
                "Cloud Progress Session Error:",
                sessionError
            );

            return {
                synced: false,
                reason: "session-error",
                error: sessionError
            };

        }


        const session =
            sessionData.session;


        if (!session || !session.user) {

            console.info(
                "Cloud progress sync skipped: learner is signed out."
            );

            return {
                synced: false,
                reason: "signed-out"
            };

        }


        const { data: cloudLessons, error: cloudError } =
            await window.polyglotSupabase
                .from("lesson_progress")
                .select(
                    "lesson_id, completed, xp_earned"
                )
                .eq(
                    "completed",
                    true
                );


        if (cloudError) {

            console.error(
                "Cloud Progress Download Error:",
                cloudError
            );

            return {
                synced: false,
                reason: "database-error",
                error: cloudError
            };

        }


        const localProgress =
            loadProgress();


        const cloudCompletedLessons =
            (cloudLessons || [])
                .filter(
                    lesson =>
                        lesson.completed === true
                )
                .map(
                    lesson =>
                        lesson.lesson_id
                );


        const mergedCompletedLessons =
            Array.from(
                new Set([
                    ...localProgress.completedLessons,
                    ...cloudCompletedLessons
                ])
            );


        const cloudXP =
            (cloudLessons || []).reduce(
                (total, lesson) => {

                    return total +
                        (
                            Number(
                                lesson.xp_earned
                            ) || 0
                        );

                },
                0
            );


        /*
         * Keep whichever XP value is greater.
         *
         * This prevents older or incomplete cloud data
         * from accidentally lowering local progress.
         */

        localProgress.totalXP =
            Math.max(
                localProgress.totalXP,
                cloudXP
            );


        localProgress.completedLessons =
            mergedCompletedLessons;


        saveProgress(
            localProgress
        );


        console.log(
            "Cloud progress synchronized:",
            localProgress
        );


        window.dispatchEvent(
            new CustomEvent(
                "polyglot-progress-synced",
                {
                    detail:
                        localProgress
                }
            )
        );


        return {
            synced: true,
            cloudLessons:
                cloudLessons || [],
            progress:
                localProgress
        };

    }

    /* ================================================= */
    /* DEVELOPER MODE                                    */
    /* ================================================= */

    function isDeveloperMode() {

        return developerMode;

    }


    /* ================================================= */
    /* RESET PROGRESS                                    */
    /* ================================================= */

    function resetProgress() {

        localStorage.removeItem(storageKey);

    }


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        completeActivity,

        isActivityCompleted,

        getLessonActivities,

        areRequiredActivitiesCompleted,

        completeLesson,

        isLessonCompleted,

        isLessonUnlocked,

        isDeveloperMode,

        getRequiredXP,

        getRequiredPoints,

        getProgress,

        syncFromCloud,

        resetProgress

    };

})();