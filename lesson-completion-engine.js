/* ================================================= */
/* LESSON COMPLETION ENGINE                          */
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


        if (
            result.newlyCompleted &&
            typeof LessonUIEngine !== "undefined"
        ) {

            LessonUIEngine.showLessonCompleted(
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

        getLessonStatus

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    LessonCompletionEngine.initialize
);