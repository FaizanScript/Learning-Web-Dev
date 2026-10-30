"use strict";

/* ==========================================================================
   Snake: works with the <dialog> + <dl> + .controls markup and style.css
   Coordinates: x = column, y = row
   ========================================================================== */

/* ---------- DOM ---------- */
const $ = (selector) => document.querySelector(selector);

const board = $(".board");
const controls = $(".controls");
const modal = $("#modal");
const modalTitle = $("#modal-title");
const modalText = $("#modal-text");
const modalBtn = $("#modal-btn");

const scoreEl = $("#score");
const highScoreEl = $("#high-score");
const timeEl = $("#time");

/* ---------- Config ---------- */
const STORAGE_KEY = "highScore";   // same key as your old version, so scores carry over
const START_DELAY = 180;           // ms per move at the start
const MIN_DELAY = 80;              // fastest the game gets
const SPEEDUP_PER_FOOD = 4;        // ms removed per food eaten
const POINTS_PER_FOOD = 10;
const SWIPE_THRESHOLD = 24;        // px a swipe must travel to count
const MAX_QUEUED_TURNS = 2;

const DIRS = {
    up:    { x: 0,  y: -1 },
    down:  { x: 0,  y: 1 },
    left:  { x: -1, y: 0 },
    right: { x: 1,  y: 0 },
};
const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

const KEY_TO_DIR = {
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    w: "up", s: "down", a: "left", d: "right",
    W: "up", S: "down", A: "left", D: "right",
};

/* ---------- Storage (safe: private mode / blocked storage won't crash) ---------- */
const storage = {
    getHighScore() {
        try {
            return Number(localStorage.getItem(STORAGE_KEY)) || 0;
        } catch {
            return 0;
        }
    },
    setHighScore(value) {
        try {
            localStorage.setItem(STORAGE_KEY, String(value));
        } catch {
            /* ignore */
        }
    },
};

/* ---------- State ---------- */
let cols = 0;
let rows = 0;
let cells = [];                    // flat array: index = y * cols + x

const state = {
    snake: [],                     // [0] is the head
    food: null,
    dir: "right",
    queue: [],                     // buffered turns, so fast key presses aren't lost
    score: 0,
    highScore: storage.getHighScore(),
    newRecord: false,
    seconds: 0,
    running: false,
    mode: "start",                 // start | paused | over | won
    loopId: null,
    timerId: null,
};

/* ---------- Helpers ---------- */
const indexOf = ({ x, y }) => y * cols + x;
const paint = (pos, className, on) => cells[indexOf(pos)].classList.toggle(className, on);

function formatTime(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

function currentDelay() {
    const eaten = state.score / POINTS_PER_FOOD;
    return Math.max(MIN_DELAY, START_DELAY - eaten * SPEEDUP_PER_FOOD);
}

/* ---------- Grid ---------- */
// Reads --cell from CSS so JS and CSS can never disagree (it changes on touch devices).
function readCellSize() {
    const value = getComputedStyle(document.documentElement).getPropertyValue("--cell");
    return parseFloat(value) || 28;
}

function buildGrid() {
    const style = getComputedStyle(board);
    const innerWidth = board.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const innerHeight = board.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const size = readCellSize();

    cols = Math.max(4, Math.floor(innerWidth / size));
    rows = Math.max(4, Math.floor(innerHeight / size));

    const fragment = document.createDocumentFragment();
    cells = [];

    for (let i = 0; i < cols * rows; i++) {
        const block = document.createElement("div");
        block.className = "block";
        cells.push(block);
        fragment.appendChild(block);
    }

    board.replaceChildren(fragment);
}

function clearBoard() {
    cells.forEach((cell) => (cell.className = "block"));
}

/* ---------- Food ---------- */
// Picks only from free cells, so food never spawns on the snake.
function spawnFood() {
    const occupied = new Set(state.snake.map(indexOf));
    const free = [];

    for (let i = 0; i < cols * rows; i++) {
        if (!occupied.has(i)) free.push(i);
    }

    if (free.length === 0) return false; // board is full

    const pick = free[Math.floor(Math.random() * free.length)];
    state.food = { x: pick % cols, y: Math.floor(pick / cols) };
    paint(state.food, "food", true);
    return true;
}

/* ---------- UI ---------- */
function updateStats() {
    scoreEl.textContent = state.score;
    highScoreEl.textContent = state.highScore;
    timeEl.textContent = formatTime(state.seconds);
}

const DIALOGS = {
    start: () => ({
        title: "Welcome to the Snake Game",
        text: "Use the arrow keys or WASD to move. On touch screens, swipe the board or use the buttons.",
        button: "Start Game",
    }),
    paused: () => ({
        title: "Paused",
        text: "Your game is waiting.",
        button: "Resume",
    }),
    over: () => ({
        title: "Game Over",
        text: state.newRecord
            ? `New high score: ${state.score}!`
            : `You scored ${state.score}.`,
        button: "Play Again",
    }),
    won: () => ({
        title: "You filled the board",
        text: `Perfect game. Final score: ${state.score}.`,
        button: "Play Again",
    }),
};

function openDialog(mode) {
    state.mode = mode;
    const { title, text, button } = DIALOGS[mode]();
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalBtn.textContent = button;

    if (!modal.open) modal.showModal();
    modalBtn.focus();
}

/* ---------- Game flow ---------- */
function resetGame() {
    stopLoops();
    clearBoard();

    state.snake = [{ x: Math.floor(cols / 4), y: Math.floor(rows / 2) }];
    state.dir = "right";
    state.queue = [];
    state.score = 0;
    state.seconds = 0;
    state.newRecord = false;

    paint(state.snake[0], "fill", true);
    spawnFood();
    updateStats();
}

function startLoops() {
    if (state.running) return; // guards against stacked intervals (a bug in the old version)
    state.running = true;
    state.loopId = setTimeout(loop, currentDelay());
    state.timerId = setInterval(() => {
        state.seconds += 1;
        timeEl.textContent = formatTime(state.seconds);
    }, 1000);
}

function stopLoops() {
    state.running = false;
    clearTimeout(state.loopId);
    clearInterval(state.timerId);
}

function loop() {
    tick();
    if (state.running) state.loopId = setTimeout(loop, currentDelay());
}

function newGame() {
    resetGame();
    modal.close();
    startLoops();
}

function pauseGame() {
    if (!state.running) return;
    stopLoops();
    openDialog("paused");
}

function resumeGame() {
    modal.close();
    startLoops();
}

function endGame(won = false) {
    stopLoops();
    openDialog(won ? "won" : "over");
}

function tick() {
    // apply the next buffered turn, if any
    if (state.queue.length) state.dir = state.queue.shift();

    const step = DIRS[state.dir];
    const head = { x: state.snake[0].x + step.x, y: state.snake[0].y + step.y };

    // wall collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        return endGame();
    }

    const ate = head.x === state.food.x && head.y === state.food.y;

    // self collision: the tail moves away this tick unless we're growing
    const body = ate ? state.snake : state.snake.slice(0, -1);
    if (body.some((part) => part.x === head.x && part.y === head.y)) {
        return endGame();
    }

    // move: add head (always), remove tail (unless eating). Only 2 cells repaint per tick.
    state.snake.unshift(head);
    paint(head, "fill", true);

    if (ate) {
        paint(head, "food", false);
        state.score += POINTS_PER_FOOD;

        if (state.score > state.highScore) {
            state.highScore = state.score;
            state.newRecord = true;
            storage.setHighScore(state.highScore);
        }

        updateStats();

        if (!spawnFood()) return endGame(true);
    } else {
        const tail = state.snake.pop();
        paint(tail, "fill", false);
    }
}

/* ---------- Input ---------- */
// Buffer turns and reject reversals, so you can't hit a wall of "instant death" by
// pressing two keys inside one tick or turning 180 degrees into yourself.
function queueTurn(dir) {
    if (!state.running || !DIRS[dir]) return;

    const last = state.queue.at(-1) ?? state.dir;
    if (dir === last || dir === OPPOSITE[last]) return;
    if (state.queue.length >= MAX_QUEUED_TURNS) return;

    state.queue.push(dir);
}

addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "p" || event.key === "P") {
        if (state.running && !event.repeat) {
            event.preventDefault();
            pauseGame();
        }
        return;
    }

    const dir = KEY_TO_DIR[event.key];
    if (!dir) return;

    event.preventDefault(); // stop arrow keys from scrolling the page
    queueTurn(dir);
});

// On-screen d-pad: pointerdown reacts faster than click on touch screens.
controls.addEventListener("pointerdown", (event) => {
    const button = event.target.closest("[data-dir]");
    if (!button) return;
    event.preventDefault();
    queueTurn(button.dataset.dir);
});

// Keyboard activation (Enter/Space on a focused d-pad button) arrives as a click with detail 0.
controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dir]");
    if (button && event.detail === 0) queueTurn(button.dataset.dir);
});

// Swipe on the board
let swipeStart = null;

board.addEventListener("pointerdown", (event) => {
    swipeStart = { x: event.clientX, y: event.clientY };
});

board.addEventListener("pointerup", (event) => {
    if (!swipeStart) return;

    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return;

    if (Math.abs(dx) > Math.abs(dy)) {
        queueTurn(dx > 0 ? "right" : "left");
    } else {
        queueTurn(dy > 0 ? "down" : "up");
    }
});

board.addEventListener("pointercancel", () => (swipeStart = null));

/* ---------- Dialog ---------- */
modalBtn.addEventListener("click", () => {
    if (state.mode === "paused") resumeGame();
    else newGame();
});

// Esc would close the <dialog> without starting anything and leave the game stuck.
modal.addEventListener("cancel", (event) => event.preventDefault());

/* ---------- Page lifecycle ---------- */
// Auto-pause when the tab is hidden, so you don't die in the background.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseGame();
});

// Rebuild the grid if the board changes size (rotation, window resize).
// The grid dimensions change, so the current game can't continue and we return to the start screen.
let resizeFrame = null;

new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
        const before = `${cols}x${rows}`;
        const style = getComputedStyle(board);
        const size = readCellSize();
        const nextCols = Math.max(4, Math.floor((board.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) / size));
        const nextRows = Math.max(4, Math.floor((board.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) / size));

        if (`${nextCols}x${nextRows}` === before) return;

        stopLoops();
        buildGrid();
        resetGame();
        openDialog("start");
    });
}).observe(board);

/* ---------- Init ---------- */
buildGrid();
resetGame();
updateStats();
openDialog("start");