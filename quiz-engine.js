/* ================================================= */
/* GENERIC QUIZ ENGINE                               */
/* ================================================= */

const QuizEngine = (() => {

    function normalizeAnswer(value) {
        return value
            .toLowerCase()
            .trim();
    }


    function gradeQuiz(config) {
        let score = 0;
        const feedbackMessages = [];

        config.questions.forEach((question, index) => {

            const input =
                document.getElementById(question.inputId);

            if (!input) {
                console.error(
                    `Quiz input not found: ${question.inputId}`
                );

                return;
            }

            const studentAnswer =
                normalizeAnswer(input.value);

            const acceptedAnswers =
                question.acceptedAnswers.map(
                    normalizeAnswer
                );

            const correct =
                acceptedAnswers.includes(studentAnswer);

            if (correct) {
                score++;

                if (question.correctFeedback) {
                    feedbackMessages.push(
                        question.correctFeedback
                    );
                }
            }
        });

       displayResults(
    config,
    score,
    feedbackMessages
);

const passingScore =
    Number.isFinite(config.passingScore)
        ? config.passingScore
        : config.questions.length;

const passed =
    score >= passingScore;

if (
    passed &&
    config.completionActivityId &&
    typeof LessonCompletionEngine !== "undefined"
) {
    LessonCompletionEngine.completeActivity(
        config.completionActivityId
    );
}

return {
    score,
    totalQuestions: config.questions.length,
    passingScore,
    passed
};
    }


    function displayResults(
        config,
        score,
        feedbackMessages
    ) {
        const resultsElement =
            document.getElementById(config.resultsId);

        if (!resultsElement) {
            console.error(
                `Quiz results element not found: ${config.resultsId}`
            );

            return;
        }

        const total =
            config.questions.length;

        const percentage =
            Math.round((score / total) * 100);

        let message = "";
        let messageClass = "";

        if (percentage === 100) {
            message =
                `✅ Perfect! ${score} out of ${total} correct!`;

            messageClass =
                "quiz-result-perfect";
        }
        else if (percentage >= 80) {
            message =
                `👍 Excellent work! ${score} out of ${total} correct.`;

            messageClass =
                "quiz-result-good";
        }
        else if (percentage >= 60) {
            message =
                `🙂 You're getting there! ${score} out of ${total} correct.`;

            messageClass =
                "quiz-result-practice";
        }
        else {
            message =
                `❌ Keep practicing! You got ${score} out of ${total} correct.`;

            messageClass =
                "quiz-result-needs-work";
        }

        const feedbackHtml =
            feedbackMessages.length > 0
                ? `<div class="quiz-feedback">
                    ${feedbackMessages.join("<br>")}
                   </div>`
                : "";

        resultsElement.innerHTML = `
            <span class="${messageClass}">
                ${message}
            </span>

            ${feedbackHtml}
        `;
    }


    return {
        gradeQuiz
    };

})();