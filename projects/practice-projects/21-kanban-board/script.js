const STORAGE_KEY = "tasks";

const board = document.querySelector(".board");
const columns = Array.from(document.querySelectorAll(".task-column"));
const todoColumn = document.querySelector("#todo");

const modal = document.querySelector("#task-modal");
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title-input");
const descInput = document.querySelector("#task-desc-input");
const openModalButton = document.querySelector("#toggle-modal");
const cancelButton = document.querySelector("#cancel-task");
const modalBackdrop = modal.querySelector(".bg");

let draggedTask = null;

/* ---------- Helpers ---------- */

function getList(column) {
    return column.querySelector(".task-list");
}

/* ---------- Rendering ---------- */

function createTask({ title, desc }) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;

    // textContent (not innerHTML) so user input is never run as HTML
    const heading = document.createElement("h3");
    heading.className = "task-title";
    heading.textContent = title;
    task.append(heading);

    if (desc) {
        const text = document.createElement("p");
        text.className = "task-desc";
        text.textContent = desc;
        task.append(text);
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${title}`);
    task.append(deleteButton);

    task.addEventListener("dragstart", (e) => {
        draggedTask = task;
        task.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", ""); // Firefox won't start a drag without this
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
        columns.forEach((col) => col.classList.remove("hover-over"));
        draggedTask = null;
    });

    return task;
}

function updateCounts() {
    columns.forEach((column) => {
        column.querySelector(".count").textContent =
            column.querySelectorAll(".task").length;
    });
}

/* ---------- Storage ---------- */

function saveTasks() {
    const data = {};

    columns.forEach((column) => {
        data[column.id] = Array.from(column.querySelectorAll(".task")).map((task) => ({
            title: task.querySelector(".task-title").textContent,
            desc: task.querySelector(".task-desc")?.textContent ?? "",
        }));
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Could not save tasks:", error);
    }
}

function loadTasks() {
    let data = {};

    try {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    } catch (error) {
        console.error("Saved tasks were unreadable, starting fresh:", error);
    }

    columns.forEach((column) => {
        const saved = Array.isArray(data[column.id]) ? data[column.id] : [];
        saved.forEach((task) => getList(column).append(createTask(task)));
    });

    updateCounts();
}

// Call this after any change to the board
function refresh() {
    updateCounts();
    saveTasks();
}

/* ---------- Deleting (one listener for every task) ---------- */

board.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".task-delete");
    if (!deleteButton) return;

    deleteButton.closest(".task").remove();
    refresh();
});

/* ---------- Drag and drop ---------- */

columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
        if (!draggedTask) return;
        e.preventDefault(); // required, otherwise the drop event never fires
    });

    column.addEventListener("dragenter", (e) => {
        if (!draggedTask) return;
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        // dragleave also fires when moving over a child element; ignore that
        if (column.contains(e.relatedTarget)) return;
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        if (!draggedTask) return;
        e.preventDefault();

        getList(column).append(draggedTask);
        column.classList.remove("hover-over");
        refresh();
    });
});

/* ---------- Modal ---------- */

function openModal() {
    modal.hidden = false;
    titleInput.focus();
}

function closeModal() {
    modal.hidden = true;
    form.reset();
    openModalButton.focus();
}

openModalButton.addEventListener("click", openModal);
cancelButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
        titleInput.value = "";
        titleInput.focus();
        return;
    }

    const task = createTask({ title, desc: descInput.value.trim() });
    getList(todoColumn).append(task);

    refresh();
    closeModal();
});

/* ---------- Start ---------- */

loadTasks();