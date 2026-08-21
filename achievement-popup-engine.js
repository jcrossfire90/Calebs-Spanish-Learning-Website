/* ================================================= */
/* ACHIEVEMENT POPUP ENGINE                          */
/* ================================================= */

const AchievementPopupEngine = (() => {

    let popup;
    let badge;
    let title;
    let description;
    let xp;
    let button;


    /* ================================================ */
    /* INITIALIZE                                       */
    /* ================================================ */

    function initialize() {

        createPopup();

        window.addEventListener(

            "polyglot-achievement-unlocked",

            event => {

                show(
                    event.detail
                );

            }

        );

    }


    /* ================================================ */
    /* CREATE POPUP                                     */
    /* ================================================ */

    function createPopup() {

        popup =
            document.createElement("div");

        popup.id =
            "achievement-popup-overlay";

        popup.innerHTML = `

<div id="achievement-popup">

<div id="achievement-badge"></div>

<h2>Achievement Unlocked!</h2>

<h3 id="achievement-title"></h3>

<p id="achievement-description"></p>

<div id="achievement-xp"></div>

<button id="achievement-close">

Continue

</button>

</div>

`;

        document.body.appendChild(
            popup
        );


        badge =
            document.getElementById(
                "achievement-badge"
            );

        title =
            document.getElementById(
                "achievement-title"
            );

        description =
            document.getElementById(
                "achievement-description"
            );

        xp =
            document.getElementById(
                "achievement-xp"
            );

        button =
            document.getElementById(
                "achievement-close"
            );


        button.addEventListener(
            "click",
            hide
        );

    }


    /* ================================================ */
    /* SHOW                                             */
    /* ================================================ */

    function show(achievement) {

        badge.textContent =
            achievement.badgeIcon;

        title.textContent =
            achievement.name;

        description.textContent =
            achievement.description;

        xp.textContent =
            `+${achievement.xpBonus} XP`;

        popup.classList.add(
            "show-achievement-popup"
        );

    }


    /* ================================================ */
    /* HIDE                                             */
    /* ================================================ */

    function hide() {

        popup.classList.remove(
            "show-achievement-popup"
        );

    }


    return {

        initialize

    };

})();


document.addEventListener(

    "DOMContentLoaded",

    AchievementPopupEngine.initialize

);