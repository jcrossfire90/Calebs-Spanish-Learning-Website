/* ============================================================ */
/* SHARED AUDIO                                                 */
/* ============================================================ */

const SharedAudio = (() => {

    let currentAudio = null;
    let currentButton = null;

    let audioMode =
        localStorage.getItem(
            "spanishAudioMode"
        ) || "beginner";


    /* ======================================================== */
    /* STOP CURRENT AUDIO                                       */
    /* ======================================================== */

    function stopCurrentAudio() {

        if (currentAudio) {

            currentAudio.pause();
            currentAudio.currentTime = 0;

        }

        if (currentButton) {

            currentButton.classList.remove(
                "audio-playing"
            );

            updateButtonText(
                currentButton,
                false
            );

        }

        currentAudio = null;
        currentButton = null;

    }


    /* ======================================================== */
    /* BUTTON TEXT                                              */
    /* ======================================================== */

    function updateButtonText(
        button,
        isPlaying
    ) {

        if (!button) {
            return;
        }

        const normalText =
            button.dataset.audioLabel ||
            "▶ Listen";

        const playingText =
            button.dataset.audioPlayingLabel ||
            "■ Stop";

        button.textContent =
            isPlaying
                ? playingText
                : normalText;

    }


    /* ======================================================== */
    /* PLAY AUDIO OBJECT                                        */
    /* ======================================================== */

    function playAudioObject(
        audio,
        button = null
    ) {

        if (!audio) {
            return;
        }


        /*
        Clicking the same playing audio
        stops it.
        */

        if (
            currentAudio === audio &&
            !audio.paused
        ) {

            stopCurrentAudio();
            return;

        }


        stopCurrentAudio();


        currentAudio = audio;
        currentButton = button;


        if (currentButton) {

            currentButton.classList.add(
                "audio-playing"
            );

            updateButtonText(
                currentButton,
                true
            );

        }


        audio.currentTime = 0;


        const playPromise =
            audio.play();


        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {

            playPromise.catch(error => {

                console.error(
                    "Audio could not be played:",
                    error
                );

                stopCurrentAudio();

            });

        }


        audio.addEventListener(
            "ended",
            stopCurrentAudio,
            {
                once: true
            }
        );

    }


    /* ======================================================== */
    /* OLD AUDIO-ID SUPPORT                                     */
    /* ======================================================== */

    function playAudioById(audioId) {

        const audio =
            document.getElementById(
                audioId
            );


        if (!audio) {

            console.error(
                `Audio element not found: ${audioId}`
            );

            return;

        }


        playAudioObject(audio);

    }


    /* ======================================================== */
    /* FIND AUDIO FILE FOR BUTTON                               */
    /* ======================================================== */

    function getButtonAudioSource(button) {

        const standardAudio =
            button.dataset.audio;

        const beginnerAudio =
            button.dataset.audioBeginner;

        const naturalAudio =
            button.dataset.audioNatural;


        /*
        A regular data-audio file works
        in either mode.
        */

        if (standardAudio) {
            return standardAudio;
        }


        if (audioMode === "natural") {

            return (
                naturalAudio ||
                beginnerAudio
            );

        }


        return (
            beginnerAudio ||
            naturalAudio
        );

    }


    /* ======================================================== */
    /* PLAY DATA-AUDIO BUTTON                                   */
    /* ======================================================== */

    function playButton(button) {

        const audioSource =
            getButtonAudioSource(button);


        if (!audioSource) {

            console.error(
                "No audio file was assigned to this button.",
                button
            );

            return;

        }


        /*
        Clicking the same active button
        stops its audio.
        */

        if (
            currentButton === button &&
            currentAudio &&
            !currentAudio.paused
        ) {

            stopCurrentAudio();
            return;

        }


        const audio =
            new Audio(audioSource);


        playAudioObject(
            audio,
            button
        );

    }


    /* ======================================================== */
    /* AUDIO MODE                                               */
    /* ======================================================== */

    function setAudioMode(mode) {

        if (
            mode !== "beginner" &&
            mode !== "natural"
        ) {

            console.error(
                `Invalid audio mode: ${mode}`
            );

            return;

        }


        stopCurrentAudio();

        audioMode = mode;


        localStorage.setItem(
            "spanishAudioMode",
            audioMode
        );


        updateModeButtons();

    }


    function getAudioMode() {

        return audioMode;

    }


    function updateModeButtons() {

        const modeButtons =
            document.querySelectorAll(
                "[data-audio-mode]"
            );


        modeButtons.forEach(button => {

            const buttonMode =
                button.dataset.audioMode;

            const isSelected =
                buttonMode === audioMode;


            button.classList.toggle(
                "audio-mode-selected",
                isSelected
            );


            button.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        });

    }


    /* ======================================================== */
    /* CONNECT BUTTONS                                          */
    /* ======================================================== */

    function connectAudioButtons() {

        const audioButtons =
            document.querySelectorAll(
                [
                    "[data-audio]",
                    "[data-audio-beginner]",
                    "[data-audio-natural]"
                ].join(",")
            );


        audioButtons.forEach(button => {

            if (
                button.dataset
                    .sharedAudioConnected ===
                "true"
            ) {
                return;
            }


            button.dataset
                .sharedAudioConnected =
                "true";


            updateButtonText(
                button,
                false
            );


            button.addEventListener(
                "click",
                () => {

                    playButton(button);

                }
            );

        });

    }


    function connectModeButtons() {

        const modeButtons =
            document.querySelectorAll(
                "[data-audio-mode]"
            );


        modeButtons.forEach(button => {

            if (
                button.dataset
                    .sharedAudioModeConnected ===
                "true"
            ) {
                return;
            }


            button.dataset
                .sharedAudioModeConnected =
                "true";


            button.addEventListener(
                "click",
                () => {

                    setAudioMode(
                        button.dataset.audioMode
                    );

                }
            );

        });


        updateModeButtons();

    }


    /* ======================================================== */
    /* INITIALIZE                                               */
    /* ======================================================== */

    function initialize() {

        connectAudioButtons();
        connectModeButtons();

    }


    return {

        initialize,
        playButton,
        playAudioById,
        stopCurrentAudio,
        setAudioMode,
        getAudioMode

    };

})();


/* ============================================================ */
/* BACKWARD COMPATIBILITY                                       */
/* ============================================================ */

/*
Existing Lesson 1 buttons using:

onclick="playAudio('audioA')"

will continue working.
*/

function playAudio(audioId) {

    SharedAudio.playAudioById(
        audioId
    );

}


/* ============================================================ */
/* AUTOMATIC INITIALIZATION                                     */
/* ============================================================ */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        SharedAudio.initialize
    );

} else {

    SharedAudio.initialize();

}