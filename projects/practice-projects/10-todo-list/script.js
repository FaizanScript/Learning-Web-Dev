// Selecting Elements (Querying)
let input = document.querySelector(".task-input");
let add = document.querySelector(".add");
let taskList = document.querySelector(".task-list");

// creating the task elements that gonna be in the task list
add.addEventListener("click", function () {

    if (input.value !== "") {

    // creating the li element
    const li = document.createElement("li");

    // giving the li element its class
    li.classList.add("task");

    // creating the checkbox element
    const checkbox = document.createElement("input");

    // giving the checkbox its attribute
    checkbox.setAttribute('type', 'checkbox');

    // giving the checkbox its class
    checkbox.classList.add("checkbox");

    // creating the span element
    const task = document.createElement("span");

    // giving task its class
    task.classList.add("task-text");

    // putting the user's input task inside the text element
    task.textContent = input.value;

    // creating the delete button
    const dlt =  document.createElement("button");

    // giving delete button its class
    dlt.classList.add("delete");

    // giving delete button its symbol
    dlt.textContent = "X";

    // deleting the task function code
    dlt.addEventListener('click', function() {

        li.remove();

    });

    // putting the delete, checkbox and task element inside the li element
    li.append(checkbox, task, dlt); 

    // putting the li inside the tasklist
    taskList.append(li);

    input.value = "";

    }

});