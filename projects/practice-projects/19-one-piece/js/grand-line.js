
// ================================
// GRAND LINE MEMBERS
// ================================

const grandLineGrid =
    document.querySelector("#grand-line-grid");


// Get registered crew

const registeredCrew = getCrew();


// ================================
// RENDER MEMBERS
// ================================

function renderGrandLineMembers() {

    grandLineGrid.innerHTML = "";


    // No members

    if (registeredCrew.length === 0) {

        grandLineGrid.innerHTML = `
            <p class="grand-line-empty">
                No pirates have joined the Grand Line yet.
            </p>
        `;

        return;
    }


    // Create cards

    registeredCrew.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add(
            "grand-member-card"
        );


        card.innerHTML = `

            <div class="grand-member-image">

                <img
                    src="${member.profilePicture}"
                    alt="${member.pirateName}"
                >

            </div>


            <h3 class="grand-member-name">
                ${member.pirateName}
            </h3>


            <p class="grand-member-role">
                ${member.role}
            </p>


            <p class="grand-member-dream">
                "${member.dream}"
            </p>


            <div class="grand-member-bounty">

                <span>
                    BOUNTY
                </span>

                <strong>
                    ฿ ${member.bounty.toLocaleString()}
                </strong>

            </div>

        `;


        grandLineGrid.appendChild(card);

    });

}


renderGrandLineMembers();