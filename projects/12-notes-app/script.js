// selecting elements (quering)
let searchInput = document.querySelector(".search-input");
let form = document.querySelector(".input");
let noteInput = document.querySelector(".note-input");
let list = document.querySelector(".list");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (noteInput.value.trim() !== "") {

        // creating the li element
        const li = document.createElement("li");

        // giving li its class
        li.classList.add("note");

        // creating the span element
        const span = document.createElement("span");

        // giving span its class
        span.classList.add("text");

        // creating delete button element
        const dlt = document.createElement("button");

        // giving dlt button its class
        dlt.classList.add("delete");

        // giving dlt its symbol
        dlt.textContent = "X";

        // deleting the note when the user click dlt button using (event listner)
        // dlt.addEventListener("click", function () {
        //     li.remove();
        // });

        // putting the user's note insdie the span element
        span.textContent = noteInput.value;

        // appending the child element inside its parent element
        li.append(span, dlt);

        // appending the child element inside html list
        list.append(li);

        // clearing the note input
        noteInput.value = "";
    }

});


// deleting the note when the user click dlt button using (event delegation)
list.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
    }
});


// searching the note function code
searchInput.addEventListener("input", function (event) {

    let searchedValue = event.target.value;

    const notes = document.querySelectorAll(".note");

    // to get the note one by one
    notes.forEach(function (note) {

        const noteText = note.querySelector(".text");

        if (noteText.textContent.toLowerCase().includes(searchedValue.toLowerCase())) {
            note.hidden = false;
        } else {
            note.hidden = true;

        }

    });

});