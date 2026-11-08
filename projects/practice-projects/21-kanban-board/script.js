const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const addTaskButton = document.querySelector("#add-new-task");

let taskData = {};

const tasks = document.querySelectorAll(".task");

const columns = [todo, progress, done];

let dragElement = null;

function addtask(title, desc, column) {
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `

    column.appendChild(div)

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText,
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskData));

        count.innerText = tasks.length;
    })


}

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            addtask(task.title, task.desc, column);
        })
    }

    updateTaskCount();
}

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})

function addDragEventsOnColumn(column) {

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// modal related logic
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    addtask(taskTitle, taskDesc, todo);

    updateTaskCount();

    modal.classList.remove("active");

})

