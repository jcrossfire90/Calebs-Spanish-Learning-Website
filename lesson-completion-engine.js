/* ================================================= */
/* LESSON COMPLETION ENGINE                          */
/* Local Progress + Supabase Cloud Saving            */
/* ================================================= */

const LessonCompletionEngine = (() => {


    /* ================================================= */
    /* INITIALIZE                                        */
    /* ================================================= */

    function initialize() {

        if (
            typeof lessonConfig === "undefined"
        ) {

            console.error(
                "lessonConfig was not found."
            );

            return;

        }


        if (
            typeof ProgressEngine === "undefined"
        ) {

            console.error(
                "ProgressEngine was not found."
            );

            return;

        }


        attemptLessonCompletion();

    }


    /* ================================================= */
    /* GET REQUIRED ACTIVITY IDS                         */
    /* ================================================= */

    function getRequiredActivityIds() {

        if (
            !Array.isArray(
                lessonConfig.requiredActivities
            )
        ) {

            return [];

        }


        return lessonConfig.requiredActivities.map(
            activity => {

                if (
                    typeof activity === "string"
                ) {

                    return activity;

                }

                return activity.id;

            }
        );

    }


    /* ================================================= */
    /* SAVE COMPLETED LESSON TO SUPABASE                 */
    /* ================================================= */

    async function saveLessonCompletionToCloud(
        completionResult
    ) {

        // Keep local progress working if Supabase
        // is not loaded on the current page.

        if (!window.polyglotSupabase) {

            console.info(
                "Cloud save skipped: Supabase is not loaded."
            );

            return {
                saved: false,
                reason: "supabase-not-loaded"
            };

        }


        // Find the currently signed-in learner.

        const { data: sessionData, error: sessionError } =
            await window.polyglotSupabase.auth.getSession();


        if (sessionError) {

            console.error(
                "Cloud Session Error:",
                sessionError
            );

            return {
                saved: false,
                reason: "session-error",
                error: sessionError
            };

        }


        const session =
            sessionData.session;


        // Signed-out learners continue using local progress.

        if (!session || !session.user) {

            console.info(
                "Cloud save skipped: learner is signed out."
            );

            return {
                saved: false,
                reason: "signed-out"
            };

        }


        const lessonTitle =
            lessonConfig.lessonTitle ||
            lessonConfig.lessonLabel ||
            lessonConfig.lessonId;


        const cloudRecord = {

            user_id:
                session.user.id,

            lesson_id:
                lessonConfig.lessonId,

            lesson_title:
                lessonTitle,

            completed:
                true,

            xp_earned:
                completionResult.xpAwarded || 0,

            completed_at:
                new Date().toISOString()

        };


        /*
         * The database has a unique constraint on:
         *
         * user_id + lesson_id
         *
         * Therefore:
         *
         * - first completion inserts a row
         * - later saves update that same row
         * - duplicate lesson rows are not created
         */

        const { data, error } =
            await window.polyglotSupabase
                .from("lesson_progress")
                .upsert(
                    cloudRecord,
                    {
                        onConflict:
                            "user_id,lesson_id"
                    }
                )
                .select()
                .single();


        if (error) {

            console.error(
                "Lesson Cloud Save Error:",
                error
            );

            return {
                saved: false,
                reason: "database-error",
                error
            };

        }


        console.log(
            "Lesson saved to Supabase:",
            data
        );


        return {
            saved: true,
            record: data
        };

    }


    /* ================================================= */
    /* MARK ACTIVITY COMPLETE                            */
    /* ================================================= */

    function completeActivity(activityId) {

        if (!activityId) {

            console.error(
                "An activity ID is required."
            );

            return null;

        }


        const activityResult =
            ProgressEngine.completeActivity(

                lessonConfig.lessonId,

                activityId

            );


        const lessonResult =
            attemptLessonCompletion();


        if (
            typeof LessonUIEngine !== "undefined"
        ) {

            LessonUIEngine.update();

        }


        return {

            activityResult,

            lessonResult

        };

    }


    /* ================================================= */
    /* CHECK ALL REQUIRED ACTIVITIES                     */
    /* ================================================= */

    function areAllActivitiesComplete() {

        const requiredActivityIds =
            getRequiredActivityIds();


        return ProgressEngine
            .areRequiredActivitiesCompleted(

                lessonConfig.lessonId,

                requiredActivityIds

            );

    }


    /* ================================================= */
    /* ATTEMPT LESSON COMPLETION                         */
    /* ================================================= */

    function attemptLessonCompletion() {

        if (!areAllActivitiesComplete()) {

            return {

                lessonCompleted: false,

                newlyCompleted: false,

                progress:
                    ProgressEngine.getProgress()

            };

        }


        const result =
            ProgressEngine.completeLesson(

                lessonConfig.lessonId,

                lessonConfig.completionXP

            );


        if (result.newlyCompleted) {

            if (
                typeof LessonUIEngine !== "undefined"
            ) {

                LessonUIEngine.showLessonCompleted(
                    result
                );

            }

                if (
        lessonConfig.lessonId ===
        "lesson-1-alphabet" &&

        typeof AchievementEngine !== "undefined"
    ) {

        AchievementEngine.awardAchievement(
            "firstStep"
        );

    }

            /*
             * Save in the background.
             *
             * We do not pause or block the existing
             * lesson-completion interface.
             */

            saveLessonCompletionToCloud(
                result
            );

        }


        return {

            lessonCompleted: true,

            newlyCompleted:
                result.newlyCompleted,

            xpAwarded:
                result.xpAwarded,

            progress:
                result.progress

        };

    }


    /* ================================================= */
    /* GET LESSON STATUS                                 */
    /* ================================================= */

    function getLessonStatus() {

        const activities =
            ProgressEngine.getLessonActivities(

                lessonConfig.lessonId

            );


        const requiredActivityIds =
            getRequiredActivityIds();


        const completedCount =
            requiredActivityIds.filter(

                activityId =>
                    activities[activityId] === true

            ).length;


        return {

            lessonId:
                lessonConfig.lessonId,

            completedActivities:
                completedCount,

            totalActivities:
                requiredActivityIds.length,

            allActivitiesCompleted:
                requiredActivityIds.length > 0 &&
                completedCount ===
                requiredActivityIds.length,

            lessonCompleted:
                ProgressEngine.isLessonCompleted(
                    lessonConfig.lessonId
                ),

            activities:
                activities

        };

    }


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        initialize,

        completeActivity,

        attemptLessonCompletion,

        getLessonStatus,

        saveLessonCompletionToCloud

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    LessonCompletionEngine.initialize
);