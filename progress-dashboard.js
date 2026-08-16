/* ================================================= */
/* STUDENT PROGRESS DASHBOARD                        */
/* ================================================= */

const ProgressDashboard = (() => {

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
            name: "Lesson A - Colors",
        }
    ];


    function initialize() {
        const progress = ProgressEngine.getProgress();

        updatePoints(progress);
        updateCompletedLessons(progress);
        updateCurrentLesson(progress);
        updateBeginnerProgress(progress);
        updateLearnerRank(progress.totalPoints);
    }


    function updatePoints(progress) {
        const pointsElement =
            document.getElementById("dashboard-total-points");

        if (pointsElement) {
            pointsElement.textContent = progress.totalPoints;
        }
    }


    function updateCompletedLessons(progress) {
        const completedElement =
            document.getElementById("dashboard-lessons-completed");

        if (!completedElement) {
            return;
        }

        const beginnerCompleted =
            beginnerLessons.filter(lesson =>
                progress.completedLessons.includes(lesson.id)
            ).length;

        completedElement.textContent = beginnerCompleted;
    }


    function updateCurrentLesson(progress) {
        const currentLessonElement =
            document.getElementById("dashboard-current-lesson");

        if (!currentLessonElement) {
            return;
        }

        const nextLesson =
            beginnerLessons.find(lesson =>
                !progress.completedLessons.includes(lesson.id) &&
                ProgressEngine.isLessonUnlocked(lesson.id)
            );

        if (nextLesson) {
            currentLessonElement.textContent = nextLesson.name;
            return;
        }

        const allBeginnerCompleted =
            beginnerLessons.every(lesson =>
                progress.completedLessons.includes(lesson.id)
            );

        currentLessonElement.textContent =
            allBeginnerCompleted
                ? "Beginner Complete"
                : "No Lesson Available";
    }


    function updateBeginnerProgress(progress) {
        const completedCount =
            beginnerLessons.filter(lesson =>
                progress.completedLessons.includes(lesson.id)
            ).length;

        const percentage =
            Math.round(
                (completedCount / beginnerLessons.length) * 100
            );

        const percentageElement =
            document.getElementById("dashboard-beginner-percent");

        const fillElement =
            document.getElementById("dashboard-progress-fill");

        const messageElement =
            document.getElementById("dashboard-progress-message");

        if (percentageElement) {
            percentageElement.textContent = `${percentage}%`;
        }

        if (fillElement) {
            fillElement.style.width = `${percentage}%`;
        }

        if (!messageElement) {
            return;
        }

        if (percentage === 0) {
            messageElement.textContent =
                "Begin Lesson 1 to start your Spanish journey.";
        } else if (percentage === 100) {
            messageElement.textContent =
                "Excellent! You completed the Beginner lessons.";
        } else {
            messageElement.textContent =
                `${completedCount} of ${beginnerLessons.length} Beginner lessons completed.`;
        }
    }


    function updateLearnerRank(totalPoints) {
        const rankElement =
            document.getElementById("learner-rank");

        if (!rankElement) {
            return;
        }

        let rank = "New Learner";

        if (totalPoints >= 100) {
            rank = "Beginner Graduate";
        } else if (totalPoints >= 75) {
            rank = "Conversation Starter";
        } else if (totalPoints >= 50) {
            rank = "Vocabulary Builder";
        } else if (totalPoints >= 25) {
            rank = "Spanish Explorer";
        }

        rankElement.textContent = rank;
    }


    return {
        initialize
    };

})();


document.addEventListener(
    "DOMContentLoaded",
    ProgressDashboard.initialize
);