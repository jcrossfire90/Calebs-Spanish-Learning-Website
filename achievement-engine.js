/* ================================================= */
/* POLYGLOT ACHIEVEMENT ENGINE                       */
/* ================================================= */

const AchievementEngine = (() => {


    /* ================================================= */
    /* ACHIEVEMENT DEFINITIONS                           */
    /* ================================================= */

    const achievements = {

        firstStep: {

            id:
                "first-step",

            name:
                "The First Step",

            description:
                "Every journey begins with the courage to take the first step.",

            badgeIcon:
                "🌱",

            xpBonus:
                10,

            sofiaMessage:
                "You took the hardest step—you began. I'm proud of you."

        }

    };


    /* ================================================= */
    /* GET ACHIEVEMENT DEFINITION                        */
    /* ================================================= */

    function getAchievement(
        achievementKey
    ) {

        return (
            achievements[achievementKey] ||
            null
        );

    }


    /* ================================================= */
    /* CHECK WHETHER ACHIEVEMENT WAS ALREADY EARNED      */
    /* ================================================= */

    async function hasAchievement(
        userId,
        achievementId
    ) {

        const { data, error } =
            await window.polyglotSupabase
                .from("user_achievements")
                .select("id")
                .eq(
                    "user_id",
                    userId
                )
                .eq(
                    "achievement_id",
                    achievementId
                )
                .maybeSingle();


        if (error) {

            console.error(
                "Achievement Check Error:",
                error
            );

            return false;

        }


        return Boolean(data);

    }


    /* ================================================= */
    /* AWARD ACHIEVEMENT                                 */
    /* ================================================= */

    async function awardAchievement(
        achievementKey
    ) {

        const achievement =
            getAchievement(
                achievementKey
            );


        if (!achievement) {

            console.error(
                `Unknown achievement: ${achievementKey}`
            );

            return {
                awarded: false,
                reason: "unknown-achievement"
            };

        }


        if (!window.polyglotSupabase) {

            console.info(
                "Achievement skipped: Supabase is not loaded."
            );

            return {
                awarded: false,
                reason: "supabase-not-loaded"
            };

        }


        const {
            data: sessionData,
            error: sessionError
        } =
            await window.polyglotSupabase
                .auth
                .getSession();


        if (sessionError) {

            console.error(
                "Achievement Session Error:",
                sessionError
            );

            return {
                awarded: false,
                reason: "session-error",
                error: sessionError
            };

        }


        const session =
            sessionData.session;


        if (!session?.user) {

            console.info(
                "Achievement skipped: learner is signed out."
            );

            return {
                awarded: false,
                reason: "signed-out"
            };

        }


        const alreadyEarned =
            await hasAchievement(
                session.user.id,
                achievement.id
            );


        if (alreadyEarned) {

            console.info(
                `Achievement already earned: ${achievement.name}`
            );

            return {
                awarded: false,
                reason: "already-earned",
                achievement
            };

        }


        const achievementRecord = {

            user_id:
                session.user.id,

            achievement_id:
                achievement.id,

            achievement_name:
                achievement.name,

            achievement_description:
                achievement.description,

            badge_icon:
                achievement.badgeIcon,

            xp_bonus:
                achievement.xpBonus

        };


        const { data, error } =
            await window.polyglotSupabase
                .from("user_achievements")
                .insert(
                    achievementRecord
                )
                .select()
                .single();


        if (error) {

            console.error(
                "Achievement Award Error:",
                error
            );

            return {
                awarded: false,
                reason: "database-error",
                error
            };

        }


        console.log(
            "Achievement unlocked:",
            data
        );


        window.dispatchEvent(
            new CustomEvent(
                "polyglot-achievement-unlocked",
                {
                    detail: {
                        ...achievement,
                        databaseRecord:
                            data
                    }
                }
            )
        );


        return {
            awarded: true,
            achievement,
            record: data
        };

    }


    /* ================================================= */
    /* PUBLIC FUNCTIONS                                  */
    /* ================================================= */

    return {

        getAchievement,

        hasAchievement,

        awardAchievement

    };

})();