// ================================
// STRAW HAT CREW DATA
// ================================

const strawHatCrew = [

    {
        name: "MONKEY D. LUFFY",
        role: "CAPTAIN",
        bounty: 3000000000,
        description:
            "The captain of the Straw Hat Pirates and the man who aims to become the Pirate King.",
        image: "https://i.pinimg.com/1200x/dd/3d/40/dd3d40de23348a9f40cd5e3e908e9902.jpg"
        // image: "https://i.pinimg.com/736x/35/0b/2b/350b2ba6af47ebe049db3064aeb802c0.jpg"
        // image: "https://i.pinimg.com/736x/16/6c/05/166c0567d28dee0d156a8f72d131f1f5.jpg"
        // image: "https://i.pinimg.com/736x/33/5f/a6/335fa695ebe9e3ef96651a9ec6acb92e.jpg"
    },

    {
        name: "RORONOA ZORO",
        role: "SWORDSMAN",
        bounty: 1111000000,
        description:
            "A master swordsman who dreams of becoming the world's greatest swordsman.",
        image: "https://i.pinimg.com/736x/bf/09/7b/bf097b5e35083a95552d528fa5f0f8e0.jpg"
    },

    {
        name: "NAMI",
        role: "NAVIGATOR",
        bounty: 366000000,
        description:
            "The Straw Hats' navigator who dreams of creating a complete map of the world.",
        // image: "https://i.pinimg.com/736x/cb/a2/54/cba2548081950aab66017a72ccc54ee2.jpg"
        image: "https://i.pinimg.com/1200x/5f/1c/24/5f1c2461f8d1ef79381dff3179187110.jpg"
    },

    {
        name: "USOPP",
        role: "SNIPER",
        bounty: 500000000,
        description:
            "The crew's sharpshooter who dreams of becoming a brave warrior of the sea.",
        image: "https://i.pinimg.com/1200x/ee/5c/c0/ee5cc0c3e308dc5f632601091411caac.jpg"
    },

    {
        name: "SANJI",
        role: "COOK",
        bounty: 1032000000,
        description:
            "The Straw Hats' cook who dreams of finding the legendary All Blue.",
        image: "https://i.pinimg.com/736x/7c/d4/99/7cd499768b5b4fdc58b1dce302cf2bb1.jpg"
        // image: "https://i.pinimg.com/736x/35/82/76/3582762c4b2ca754f28bcdb0a6dd68fe.jpg"
        //    image: "https://i.pinimg.com/736x/55/93/72/5593724fa7772f3f9ad3685cc8220c54.jpg"
        //    image: "https://i.pinimg.com/1200x/be/19/83/be19838de8ade36f7a51900453cb7539.jpg"
    },

    {
        name: "TONY TONY CHOPPER",
        role: "DOCTOR",
        bounty: 1000,
        description:
            "The Straw Hats' doctor who dreams of becoming a doctor capable of curing any disease.",
        image: "https://i.pinimg.com/736x/0a/0f/ac/0a0fac90d2136f9f0481bdd2d03b969e.jpg"
    },

    {
        name: "NICO ROBIN",
        role: "ARCHAEOLOGIST",
        bounty: 930000000,
        description:
            "An archaeologist searching for the true history of the world and the Rio Poneglyph.",
        image: "https://i.pinimg.com/736x/6e/63/9a/6e639a6ab17f0a88ae8c0e90b72b2827.jpg"
    },

    {
        name: "FRANKY",
        role: "SHIPWRIGHT",
        bounty: 394000000,
        description:
            "The Straw Hats' shipwright who dreams of building a ship capable of reaching the end of the Grand Line.",
        image: "https://i.pinimg.com/1200x/54/75/d5/5475d5f8bda366ac94dc46f20d5b56a2.jpg"
    },

    {
        name: "BROOK",
        role: "MUSICIAN",
        bounty: 383000000,
        description:
            "The Straw Hats' musician who dreams of reuniting with Laboon.",
        image: "https://motionbgs.com/media/8757/one-piece-brook-souls-voyage.3840x2160.jpg"
    },

    {
        name: "JINBE",
        role: "HELMSMAN",
        bounty: 1100000000,
        description:
            "The Straw Hats' helmsman and former Warlord of the Sea.",
        image: "https://i.pinimg.com/736x/95/a9/dd/95a9dd5eab2d7a1b4f1b9ab5da382438.jpg"
    }

];



// ================================
// CREW CAROUSEL
// ================================

const crewMain =
    document.querySelector(".crew-main");

const mainImage =
    document.querySelector(".crew-main-image");

const mainRole =
    document.querySelector(".crew-main-role");

const mainName =
    document.querySelector(".crew-main-name");

const mainDescription =
    document.querySelector(".crew-main-description");

const mainBounty =
    document.querySelector(".crew-main-bounty strong");

const thumbnails =
    document.querySelectorAll(".crew-thumbnail");

const dots =
    document.querySelectorAll(".crew-dot");

const previousButton =
    document.querySelector(".crew-prev");

const nextButton =
    document.querySelector(".crew-next");

let currentIndex = 0;


// ================================
// RENDER CHARACTER
// ================================

function renderCharacter(index, animate = true) {

    const character =
        strawHatCrew[index];


    if (animate) {

        crewMain.classList.remove(
            "slide-in",
            "slide-out"
        );

        void crewMain.offsetWidth;

        crewMain.classList.add("slide-out");

    }


    setTimeout(() => {

        mainImage.src =
            character.image;

        mainImage.alt =
            character.name;


        mainRole.textContent =
            character.role;

        mainName.textContent =
            character.name;

        mainDescription.textContent =
            character.description;

        mainBounty.textContent =
            `฿ ${character.bounty.toLocaleString()}`;


        thumbnails.forEach(
            (thumbnail, thumbnailIndex) => {

                thumbnail.classList.toggle(
                    "active",
                    thumbnailIndex === index
                );

                if (
                    thumbnailIndex === index
                ) {

                    thumbnail.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });

                }

            }
        );


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );


        currentIndex = index;


        if (animate) {

            crewMain.classList.remove(
                "slide-out"
            );

            crewMain.classList.add(
                "slide-in"
            );

        }

    }, animate ? 350 : 0);

}


// ================================
// THUMBNAIL CLICK
// ================================

thumbnails.forEach((thumbnail) => {

    thumbnail.addEventListener(
        "click",
        () => {

            const index =
                Number(thumbnail.dataset.index);

            renderCharacter(index);

        }
    );

});


// ================================
// NEXT
// ================================

nextButton.addEventListener(
    "click",
    () => {

        let nextIndex =
            currentIndex + 1;

        if (
            nextIndex >=
            strawHatCrew.length
        ) {

            nextIndex = 0;

        }

        renderCharacter(nextIndex);

    }
);


// ================================
// PREVIOUS
// ================================

previousButton.addEventListener(
    "click",
    () => {

        let previousIndex =
            currentIndex - 1;

        if (previousIndex < 0) {

            previousIndex =
                strawHatCrew.length - 1;

        }

        renderCharacter(previousIndex);

    }
);


// ================================
// DOT CLICK
// ================================

dots.forEach((dot) => {

    dot.addEventListener(
        "click",
        () => {

            const index =
                Number(dot.dataset.index);

            renderCharacter(index);

        }
    );

});


// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight"
        ) {

            let nextIndex =
                currentIndex + 1;

            if (
                nextIndex >=
                strawHatCrew.length
            ) {

                nextIndex = 0;

            }

            renderCharacter(nextIndex);

        }


        if (
            event.key === "ArrowLeft"
        ) {

            let previousIndex =
                currentIndex - 1;

            if (previousIndex < 0) {

                previousIndex =
                    strawHatCrew.length - 1;

            }

            renderCharacter(previousIndex);

        }

    }
);


// ================================
// INITIAL CHARACTER
// ================================

renderCharacter(0, false);