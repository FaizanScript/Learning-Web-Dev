// ================================
// MOBILE MENU
// ================================

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show-menu"
            );

        }
    );

}

const crewSection = document.querySelector(".crew-preview");
const joinCta = document.querySelector(".join-cta");
const journeySection = document.querySelector(".journey");


const crewObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.2
    }
);

if (crewSection) {
    crewObserver.observe(crewSection);
};

if (joinCta) {
    crewObserver.observe(joinCta);
}

if (journeySection) {
    crewObserver.observe(journeySection);
}


// ================================
// PROFILE PICTURE PREVIEW
// ================================

const profileInput = document.querySelector("#profile-picture");
const profilePreview = document.querySelector(".profile-preview");

if (profileInput && profilePreview) {

    profileInput.addEventListener("change", () => {

        const file = profileInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", () => {

            profilePreview.innerHTML = `
                <img
                    src="${reader.result}"
                    alt="Profile preview"
                >
            `;
        });

        reader.readAsDataURL(file);

    });
}


// ================================
// JOIN CREW FORM VALIDATION
// ================================

const piratename = document.querySelector("#pirate-name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const role = document.querySelector("#role");
const dream = document.querySelector("#dream");

const joinform = document.querySelector(".join-form");

if (joinform) {

    // const piratename = document.querySelector("#pirate-name");
    // const email = document.querySelector("#email");
    // const password = document.querySelector("#password");
    // const role = document.querySelector("#role");
    // const dream = document.querySelector("#dream");
    // const profileInput = document.querySelector("#profile-picture");

    joinform.addEventListener("submit", (event) => {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        // ----------------------------
        // PIRATE NAME
        // ----------------------------

        if (piratename.value.trim() === "") {

            showError(
                piratename,
                "pirate-name-error",
                "pirate name is required."
            );

            isValid = false;

        }
        else if (piratename.value.trim().length < 3) {

            showError(
                piratename,
                "pirate-name-error",
                "pirate name must be at least 3 characters."
            );

            isValid = false;
        }
        else {

            piratename.classList.add("valid");
        }



        // ----------------------------
        // EMAIL
        // ----------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {

            showError(
                email,
                "email-error",
                "Email is required."
            );

            isValid = false;
        }
        else if (!emailPattern.test(email.value.trim())) {

            showError(
                email,
                "email-error",
                "Enter a valid email address."
            );

            isValid = false;
        }
        else {

            email.classList.add("valid");
        }


        // ----------------------------
        // PASSWORD
        // ----------------------------

        if (password.value === "") {

            showError(
                password,
                "password-error",
                "password is required."
            );

            isValid = false;
        }
        else if (password.value.length < 8) {

            showError(
                password,
                "password-error",
                "password must be at least 8 characters."
            );

            isValid = false;
        }
        else {

            password.classList.add("valid");
        }



        // ----------------------------
        // CREW ROLE
        // ----------------------------

        if (role.value === "") {

            showError(
                role,
                "role-error",
                "choose your crew role."
            );

            isValid = false;
        }
        else {

            role.classList.add("valid");
        }


        // ----------------------------
        // DREAM
        // ----------------------------

        if (dream.value.trim() === "") {

            showError(
                dream,
                "dream-error",
                "tell us about your dream."
            );

            isValid = false;
        }
        else if (dream.value.trim().length < 5) {

            showError(
                dream,
                "dream-error",
                "your dream must be at least 5 characters."
            );

            isValid = false;
        }
        else {

            dream.classList.add("valid");
        }


        // ----------------------------
        // PROFILE PICTURE
        // ----------------------------

        if (profileInput.files.length === 0) {

            document.querySelector(
                "#profile-picture-error"
            ).textContent = "choose a profile picture.";

            isValid = false;
        }


        // ----------------------------
        // RESULT
        // ----------------------------

        if (isValid) {

            createCrewMembers();
        }

    });


    // ================================
    // SHOW ERROR
    // ================================

    function showError(input, errorID, message) {

        input.classList.add("invalid");

        document.querySelector(
            `#${errorID}`
        ).textContent = message;
    }


    // ================================
    // CLEAR ERRORS
    // ================================

    function clearErrors() {

        const inputs = joinform.querySelectorAll(
            "input, select, textarea"
        );

        inputs.forEach((input) => {

            input.classList.remove(
                "invalid",
                "valid"
            );
        });

        const errors = joinform.querySelectorAll(
            ".form-error"
        );

        errors.forEach((error) => {

            error.textContent = "";
        });

    }

}





// ================================
// CREATE CREW MEMBER
// ================================

function createCrewMembers() {

    const file = profileInput.files[0];

    const reader = new FileReader();

    reader.addEventListener("load", () => {

        const crew = getCrew();

        const newCrewMember = {

            id: crypto.randomUUID(),
            pirateName: piratename.value.trim(),
            email: email.value.trim(),
            password: password.value,
            profilePicture: reader.result,
            role: role.value,
            dream: dream.value.trim(),
            bounty:
                Math.floor(
                    Math.random() * 9000000
                ) + 1000000
        };

        crew.push(newCrewMember);

        saveCrew(crew);

        console.log("crew member created!");

        console.log(newCrewMember);

        showJoinSuccess(newCrewMember);
    });

    reader.readAsDataURL(file);
}


// ================================
// JOIN SUCCESS
// ================================

function showJoinSuccess(member) {

    const joinForm =
        document.querySelector(".join-form");

    const successScreen =
        document.querySelector(".join-success");

    const successName =
        document.querySelector(".success-name");


    successName.textContent =
        member.pirateName;


    joinForm.style.display = "none";

    successScreen.style.display = "block";

    successScreen.classList.add("show");

}


// ================================
// PIRATE STATUS
// ================================

const currentPirate =
    JSON.parse(
        sessionStorage.getItem(
            "currentPirate"
        )
    );

if (currentPirate) {

    const pirateStatus =
        document.querySelector(
            ".pirate-status"
        );

    const pirateName =
        document.querySelector(
            ".pirate-status-name"
        );

    const pirateRole =
        document.querySelector(
            ".pirate-status-role"
        );

    const pirateBounty =
        document.querySelector(
            ".pirate-status-bounty"
        );

    const pirateDream =
        document.querySelector(
            ".pirate-status-dream"
        );

    pirateName.textContent =
        currentPirate.pirateName;

    pirateRole.textContent =
        currentPirate.role;

    pirateBounty.textContent =
        `฿ ${currentPirate.bounty.toLocaleString()}`;

    pirateDream.textContent =
        currentPirate.dream;

    pirateStatus.classList.add(
        "show"
    );

}


const pirateLogout =
    document.querySelector(
        ".pirate-logout"
    );

if (pirateLogout) {

    pirateLogout.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "currentPirate"
            );

            location.reload();

        }
    );

}


// ================================
// BACKGROUND IMAGE CHANGE
// ================================

const background =
    document.querySelector(".bg-img");

const backgroundSections = [

    {
        element: document.querySelector("#hero"),
        image: "https://i.pinimg.com/1200x/b6/2e/39/b62e390b21b093e1c89a22b45ec0e928.jpg"
    },

    {
        element: document.querySelector("#crew-preview"),
        image: "https://i.pinimg.com/1200x/86/8c/d1/868cd1d6afae03df5eb9c4dcb7121810.jpg"
    },

    {
        element: document.querySelector("#journey"),
        image: "https://i.pinimg.com/1200x/80/d7/1a/80d71abcc7426cdf264e48d0db1ef1cb.jpg"
    }

];

const backgroundObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    if (
                        background.src ===
                        entry.target.dataset.bg
                    ) {
                        return;
                    }

                    background.style.opacity = "0";

                    setTimeout(() => {

                        background.src =
                            entry.target.dataset.bg;

                        background.style.opacity = "1";

                    }, 400);

                }

            });

        },

        {
            threshold: 0.6
        }

    );

backgroundSections.forEach((section) => {

    if (section.element) {

        section.element.dataset.bg =
            section.image;

        backgroundObserver.observe(
            section.element
        );

    }

});