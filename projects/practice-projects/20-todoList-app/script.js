// ==========================================
// 1. STATE
// ==========================================

let tasks = [];
let editingTaskId = null;
let currentFilter = "all";
let currentSort = "newest";
let deleteTaskId = null;

const STORAGE_KEY = "todoMasterTasks";
const THEME_KEY = "todoMasterTheme";


// ==========================================
// 2. DOM ELEMENTS
// ==========================================

// Form
const todoForm = document.querySelector("#todoform");

const taskTitle = document.querySelector("#tasktitle");
const taskDescription = document.querySelector("#taskdescription");
const taskPriority = document.querySelector("#taskpriority");
const taskDueDate = document.querySelector("#taskduedate");

const taskList = document.querySelector("#tasklist");


// Statistics
const totalTask = document.querySelector("#totaltask");
const activeTask = document.querySelector("#activetask");
const completedTask = document.querySelector("#completedtask");
const overdueTask = document.querySelector("#overduetask");


// Progress
const progressFill = document.querySelector("#progressFill");
const progressText = document.querySelector("#progress-bar");
const progressCount = document.querySelector("#progressCount");


// Search & Filters
const searchInput = document.querySelector("#searchinput");
const filterButtons = document.querySelectorAll(".filter-btn");


// Sort
const sortSelect = document.querySelector("#sortSelect");


// Clear completed
const clearCompleted = document.querySelector("#clearcompleted");


// Form buttons
const submitTaskBtn = document.querySelector("#submitTaskBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");


// Delete modal
const deleteModal = document.querySelector("#deleteModal");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");


// Description counter
const descriptionCounter =
    document.querySelector("#descriptionCounter");


// Task count
const taskCount = document.querySelector("#taskCount");


// Theme
const themeToggle = document.querySelector("#themeToggle");


// ==========================================
// 3. STORAGE
// ==========================================

function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}


function loadTasks() {

    const savedTasks =
        localStorage.getItem(STORAGE_KEY);


    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

}


// ==========================================
// 4. DATE HELPERS
// ==========================================

function isOverdue(task) {

    if (!task.dueDate) {
        return false;
    }


    if (task.completed) {
        return false;
    }


    const today = new Date();

    today.setHours(0, 0, 0, 0);


    const dueDate = new Date(task.dueDate);

    dueDate.setHours(0, 0, 0, 0);


    return dueDate < today;

}


function isToday(task) {

    if (!task.dueDate) {
        return false;
    }


    if (task.completed) {
        return false;
    }


    const today = new Date();

    today.setHours(0, 0, 0, 0);


    const dueDate = new Date(task.dueDate);

    dueDate.setHours(0, 0, 0, 0);


    return dueDate.getTime() === today.getTime();

}


// ==========================================
// 5. FILTER + SEARCH
// ==========================================

function getFilteredTasks() {

    let filteredTasks = [...tasks];


    // --------------------------------------
    // STATUS FILTER
    // --------------------------------------

    if (currentFilter === "active") {

        filteredTasks = filteredTasks.filter(function (task) {

            return !task.completed;

        });
    }


    else if (currentFilter === "completed") {

        filteredTasks = filteredTasks.filter(function (task) {

            return task.completed;

        });

    }


    // --------------------------------------
    // PRIORITY FILTER
    // --------------------------------------

    else if (
        currentFilter === "easy" ||
        currentFilter === "medium" ||
        currentFilter === "hard"
    ) {

        filteredTasks = filteredTasks.filter(function (task) {

            return task.priority === currentFilter;

        });

    }


    // --------------------------------------
    // SEARCH
    // --------------------------------------

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();


    if (searchValue !== "") {

        filteredTasks = filteredTasks.filter(function (task) {

            return (
                task.title.toLowerCase().includes(searchValue) ||
                task.description.toLowerCase().includes(searchValue)
            );

        });

    }


    return sortTasks(filteredTasks);

}


// ==========================================
// 6. SORTING
// ==========================================

function sortTasks(taskArray) {

    const sortedTasks = [...taskArray];


    // --------------------------------------
    // NEWEST
    // --------------------------------------

    if (currentSort === "newest") {

        sortedTasks.sort(function (a, b) {

            return b.id - a.id;

        });

    }


    // --------------------------------------
    // OLDEST
    // --------------------------------------

    else if (currentSort === "oldest") {

        sortedTasks.sort(function (a, b) {

            return a.id - b.id;

        });

    }


    // --------------------------------------
    // PRIORITY
    // --------------------------------------

    else if (currentSort === "priority") {

        const priorityOrder = {

            hard: 1,
            medium: 2,
            easy: 3

        };


        sortedTasks.sort(function (a, b) {

            return (
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
            );

        });

    }


    // --------------------------------------
    // DUE DATE
    // --------------------------------------

    else if (currentSort === "dueDate") {

        sortedTasks.sort(function (a, b) {

            if (!a.dueDate) {
                return 1;
            }


            if (!b.dueDate) {
                return -1;
            }


            return (
                new Date(a.dueDate) -
                new Date(b.dueDate)
            );

        });

    }


    // --------------------------------------
    // ALPHABETICAL
    // --------------------------------------

    else if (currentSort === "alphabetical") {

        sortedTasks.sort(function (a, b) {

            return a.title.localeCompare(b.title);

        });

    }


    return sortedTasks;

}


// ==========================================
// 7. STATISTICS
// ==========================================

function updateStats() {

    const total = tasks.length;


    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;


    const active = tasks.filter(function (task) {

        return !task.completed;

    }).length;


    const overdue = tasks.filter(function (task) {

        return isOverdue(task);

    }).length;


    totalTask.textContent = total;

    activeTask.textContent = active;

    completedTask.textContent = completed;

    overdueTask.textContent = overdue;

}


// ==========================================
// 8. PROGRESS
// ==========================================

function updateProgress() {

    const total = tasks.length;


    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;


    if (total === 0) {

        progressFill.style.width = "0%";

        progressText.textContent = "0%";

        progressCount.textContent =
            "0 of 0 tasks completed";

        return;

    }


    const progress = Math.round(
        (completed / total) * 100
    );


    progressFill.style.width = `${progress}%`;

    progressText.textContent = `${progress}%`;

    progressCount.textContent =
        `${completed} of ${total} tasks completed`;

}


// ==========================================
// 9. RENDER TASKS
// ==========================================

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks = getFilteredTasks();


    // Task count
    taskCount.textContent =
        `Showing ${filteredTasks.length} of ${tasks.length} tasks`;


    // --------------------------------------
    // EMPTY STATE
    // --------------------------------------

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">✓</div>

                <h3>
                    ${tasks.length === 0
                ? "No tasks yet"
                : "No matching tasks"
            }
                </h3>

                <p>
                    ${tasks.length === 0
                ? "Create your first task and start getting things done."
                : "Try changing your search or filter."
            }
                </p>

            </div>

        `;

    }


    // --------------------------------------
    // TASK CARDS
    // --------------------------------------

    else {

        filteredTasks.forEach(function (task) {

            const taskElement =
                document.createElement("div");


            taskElement.classList.add("task-item");


            // Completed class
            if (task.completed) {

                taskElement.classList.add("completed");

            }


            taskElement.innerHTML = `

                <div class="task-main">

                    <input
                        type="checkbox"
                        class="task-checkbox"
                        data-id="${task.id}"
                        ${task.completed ? "checked" : ""}
                    >


                    <div class="task-info">

                        <h3>${task.title}</h3>


                        ${task.description
                    ? `<p>${task.description}</p>`
                    : ""
                }


                        <div class="task-meta">

                            <span class="priority ${task.priority}">
                                ${task.priority}
                            </span>


                            ${task.dueDate
                    ? isOverdue(task)
                        ? `
                                            <span class="due-date overdue">
                                                🔴 Overdue
                                            </span>
                                        `
                        : isToday(task)
                            ? `
                                                <span class="due-date today">
                                                    🟠 Due Today
                                                </span>
                                            `
                            : `
                                                <span class="due-date">
                                                    📅 ${task.dueDate}
                                                </span>
                                            `
                    : ""
                }

                        </div>

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        class="edit-btn"
                        data-id="${task.id}">
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        data-id="${task.id}">
                        Delete
                    </button>

                </div>

            `;


            taskList.appendChild(taskElement);

        });

    }


    // Always update these
    updateStats();

    updateProgress();

}


// ==========================================
// 10. TASK OPERATIONS
// ==========================================

// ------------------------------------------
// ADD / UPDATE TASK
// ------------------------------------------

function handleTaskSubmit(evt) {

    evt.preventDefault();


    const title = taskTitle.value.trim();

    const description =
        taskDescription.value.trim();


    // --------------------------------------
    // VALIDATE TITLE
    // --------------------------------------

    if (title === "") {

        alert("Please enter a task title.");

        taskTitle.focus();

        return;

    }


    // --------------------------------------
    // VALIDATE DUE DATE FOR NEW TASK
    // --------------------------------------

    if (
        editingTaskId === null &&
        taskDueDate.value !== ""
    ) {

        const selectedDate =
            new Date(taskDueDate.value);


        const today = new Date();

        today.setHours(0, 0, 0, 0);

        selectedDate.setHours(0, 0, 0, 0);


        if (selectedDate < today) {

            alert("Due date cannot be in the past.");

            taskDueDate.focus();

            return;

        }

    }


    // --------------------------------------
    // EDIT MODE
    // --------------------------------------

    if (editingTaskId !== null) {

        const task = tasks.find(function (task) {

            return task.id === editingTaskId;

        });


        if (!task) {
            return;
        }


        task.title = title;

        task.description = description;

        task.priority = taskPriority.value;

        task.dueDate = taskDueDate.value;


        editingTaskId = null;


        submitTaskBtn.textContent = "+ Add Task";

        cancelEditBtn.hidden = true;

    }


    // --------------------------------------
    // ADD MODE
    // --------------------------------------

    else {

        const task = {

            id: Date.now(),

            title: title,

            description: description,

            priority: taskPriority.value,

            dueDate: taskDueDate.value,

            completed: false

        };


        tasks.push(task);

    }


    todoForm.reset();

    taskTitle.focus();


    saveTasks();

    renderTasks();

}


// ------------------------------------------
// COMPLETE TASK
// ------------------------------------------

function handleTaskComplete(evt) {

    if (!evt.target.classList.contains("task-checkbox")) {
        return;
    }


    const id = Number(evt.target.dataset.id);


    const task = tasks.find(function (task) {

        return task.id === id;

    });


    if (!task) {
        return;
    }


    task.completed = evt.target.checked;


    saveTasks();

    renderTasks();

}


// ------------------------------------------
// EDIT TASK
// ------------------------------------------

function handleEditTask(evt) {

    if (!evt.target.classList.contains("edit-btn")) {
        return;
    }


    const id = Number(evt.target.dataset.id);


    const task = tasks.find(function (task) {

        return task.id === id;

    });


    if (!task) {
        return;
    }


    editingTaskId = id;


    taskTitle.value = task.title;

    taskDescription.value = task.description;

    taskPriority.value = task.priority;

    taskDueDate.value = task.dueDate;


    submitTaskBtn.textContent = "Update Task";

    cancelEditBtn.hidden = false;


    taskTitle.focus();

}


// ------------------------------------------
// CANCEL EDIT
// ------------------------------------------

function cancelEdit() {

    editingTaskId = null;


    todoForm.reset();


    submitTaskBtn.textContent = "+ Add Task";

    cancelEditBtn.hidden = true;


    taskTitle.focus();

}


// ==========================================
// 11. DELETE MODAL
// ==========================================

// ------------------------------------------
// OPEN DELETE MODAL
// ------------------------------------------

function openDeleteModal(id) {

    deleteTaskId = id;

    deleteModal.classList.add("show");

}


// ------------------------------------------
// CLOSE DELETE MODAL
// ------------------------------------------

function closeDeleteModal() {

    deleteTaskId = null;

    deleteModal.classList.remove("show");

}


// ------------------------------------------
// HANDLE DELETE BUTTON
// ------------------------------------------

function handleDeleteTask(evt) {

    if (!evt.target.classList.contains("delete-btn")) {
        return;
    }


    const id = Number(evt.target.dataset.id);


    openDeleteModal(id);

}


// ------------------------------------------
// CONFIRM DELETE
// ------------------------------------------

function confirmDelete() {

    if (deleteTaskId === null) {
        return;
    }


    tasks = tasks.filter(function (task) {

        return task.id !== deleteTaskId;

    });


    saveTasks();

    renderTasks();

    closeDeleteModal();

}


// ==========================================
// 12. CLEAR COMPLETED
// ==========================================

function clearCompletedTasks() {

    const completedCount = tasks.filter(function (task) {

        return task.completed;

    }).length;


    if (completedCount === 0) {

        alert("There are no completed tasks.");

        return;

    }


    const confirmClear = confirm(
        `Delete ${completedCount} completed task(s)?`
    );


    if (!confirmClear) {
        return;
    }


    tasks = tasks.filter(function (task) {

        return !task.completed;

    });


    saveTasks();

    renderTasks();

}


// ==========================================
// 13. DESCRIPTION COUNTER
// ==========================================

function updateDescriptionCounter() {

    const length =
        taskDescription.value.length;


    descriptionCounter.textContent =
        `${length} / 300`;

}


// ==========================================
// 14. EVENT LISTENERS
// ==========================================

// Form submit
todoForm.addEventListener(
    "submit",
    handleTaskSubmit
);


// Complete task
taskList.addEventListener(
    "change",
    handleTaskComplete
);


// Edit / Delete buttons
taskList.addEventListener(
    "click",
    function (evt) {

        handleEditTask(evt);

        handleDeleteTask(evt);

    }
);


// Cancel edit
cancelEditBtn.addEventListener(
    "click",
    cancelEdit
);


// Confirm delete
confirmDeleteBtn.addEventListener(
    "click",
    confirmDelete
);


// Cancel delete
cancelDeleteBtn.addEventListener(
    "click",
    closeDeleteModal
);


// Click outside delete modal
deleteModal.addEventListener(
    "click",
    function (evt) {

        if (evt.target === deleteModal) {

            closeDeleteModal();

        }

    }
);


// Escape key
document.addEventListener(
    "keydown",
    function (evt) {

        if (evt.key !== "Escape") {
            return;
        }


        // Close delete modal
        if (deleteTaskId !== null) {

            closeDeleteModal();

            return;

        }


        // Cancel editing
        if (editingTaskId !== null) {

            cancelEdit();

        }

    }
);


// Search
searchInput.addEventListener(
    "input",
    renderTasks
);


// Description counter
taskDescription.addEventListener(
    "input",
    updateDescriptionCounter
);


// Sort
sortSelect.addEventListener(
    "change",
    function () {

        currentSort = sortSelect.value;

        renderTasks();

    }
);


// Clear completed
clearCompleted.addEventListener(
    "click",
    clearCompletedTasks
);

themeToggle.addEventListener(
    "click",
    toggleTheme
);


// Filter buttons
filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            currentFilter =
                button.dataset.filter;


            filterButtons.forEach(
                function (btn) {

                    btn.classList.remove("active");

                }
            );


            button.classList.add("active");


            renderTasks();

        }
    );

});


// ==========================================
// 15. INITIALIZE APP
// ==========================================

loadTheme();

loadTasks();

updateDescriptionCounter();

renderTasks();



// ==========================================
// THEME
// ==========================================

function setTheme(theme) {

    document.body.dataset.theme = theme;


    if (theme === "dark") {

        themeToggle.textContent = "☼";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    }


    localStorage.setItem(
        THEME_KEY,
        theme
    );

}


function toggleTheme() {

    const currentTheme =
        document.body.dataset.theme || "light";


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    setTheme(newTheme);

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);


    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }

}