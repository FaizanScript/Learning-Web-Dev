let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dotsWrap = document.querySelector(".dots");

let total = document.querySelectorAll(".item").length;

// create one dot per slide
for (let i = 0; i < total; i++) {
    let dot = document.createElement("span");
    dotsWrap.appendChild(dot);
}

function updateDots() {
    let items = document.querySelectorAll(".item");
    let activeIndex = parseInt(items[1].getAttribute("data-index"));

    let dots = document.querySelectorAll(".dots span");
    dots.forEach((dot, i) => dot.classList.remove("active"));
    dots[activeIndex].classList.add("active");
}

next.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]);
    updateDots();
});

prev.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").prepend(items[items.length - 1]);
    updateDots();
});

updateDots(); // run once on page load