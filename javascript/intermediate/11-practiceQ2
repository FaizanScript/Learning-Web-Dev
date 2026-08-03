// Elements
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");

const cardSection = document.querySelector(".card-section");
const modal = document.querySelector(".modal");

const form = document.getElementById("noteForm");

// Card Elements
const cardImage = document.getElementById("cardImage");
const cardName = document.getElementById("cardName");
const cardTown = document.getElementById("cardTown");
const cardPurpose = document.getElementById("cardPurpose");

// Open Form
addBtn.addEventListener("click", () => {
    cardSection.style.display = "none";
    modal.classList.add("active");
});

// Close Form
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    cardSection.style.display = "block";
});

// Submit Form
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const town = document.getElementById("town").value;
    const purpose = document.getElementById("purpose").value;

    // Update Card

    cardImage.src = image || "images/profile.jpg";

    cardName.textContent = name;

    cardTown.textContent = town;

    cardPurpose.textContent = purpose;

    // Hide Form
    modal.classList.remove("active");

    // Show Card
    cardSection.style.display = "block";

    // Clear Form
    form.reset();

});