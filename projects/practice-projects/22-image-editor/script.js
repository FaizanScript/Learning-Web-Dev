// ---------- config ----------
// One place defines every filter. Defaults, reset and presets are all derived from it.
const FILTERS = {
    brightness:  { value: 100, min: 0, max: 200, step: 1,   unit: "%" },
    contrast:    { value: 100, min: 0, max: 200, step: 1,   unit: "%" },
    exposure:    { value: 100, min: 0, max: 200, step: 1,   unit: "%" },
    saturation:  { value: 100, min: 0, max: 200, step: 1,   unit: "%" },
    hueRotation: { value: 0,   min: 0, max: 360, step: 1,   unit: "deg" },
    blur:        { value: 0,   min: 0, max: 20,  step: 0.1, unit: "px" },
    grayscale:   { value: 0,   min: 0, max: 100, step: 1,   unit: "%" },
    sepia:       { value: 0,   min: 0, max: 100, step: 1,   unit: "%" },
    opacity:     { value: 100, min: 0, max: 100, step: 1,   unit: "%" },
    invert:      { value: 0,   min: 0, max: 100, step: 1,   unit: "%" },
};

const DEFAULTS = Object.fromEntries(
    Object.entries(FILTERS).map(([name, f]) => [name, f.value])
);

// Presets only list what differs from the defaults.
const PRESETS = {
    original:      {},
    drama:         { brightness: 95,  contrast: 145, saturation: 125, sepia: 5 },
    vintage:       { brightness: 108, contrast: 90,  saturation: 75,  hueRotation: 350, sepia: 30 },
    oldSchool:     { brightness: 105, contrast: 90,  saturation: 60,  grayscale: 10, sepia: 40 },
    cinematic:     { brightness: 90,  contrast: 130, saturation: 85,  hueRotation: 350, sepia: 12 },
    noir:          { brightness: 90,  contrast: 155, saturation: 0,   grayscale: 100 },
    blackAndWhite: { brightness: 105, contrast: 125, saturation: 0,   grayscale: 100 },
    faded:         { brightness: 112, contrast: 82,  saturation: 85,  grayscale: 5, sepia: 8 },
    warm:          { brightness: 105, contrast: 108, saturation: 115, hueRotation: 5, sepia: 15 },
    cool:          { contrast: 112,   saturation: 110, hueRotation: 190 },
    vibrant:       { brightness: 105, contrast: 115, saturation: 160 },
    dreamy:        { brightness: 115, contrast: 85,  saturation: 110, blur: 0.5, sepia: 5 },
    retro:         { brightness: 105, contrast: 95,  saturation: 90,  hueRotation: 5, sepia: 20 },
    matte:         { brightness: 108, contrast: 80,  saturation: 85,  sepia: 5 },
};

// ---------- elements ----------
const canvas = document.querySelector("#image-canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.querySelector("#image-input");
const filtersContainer = document.querySelector("#filters");
const presetsContainer = document.querySelector("#presets");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const placeholder = document.querySelector("#placeholder");
const stage = document.querySelector(".bottom");
const statusEl = document.querySelector("#status");

// ---------- state ----------
const state = { ...DEFAULTS };
const sliders = {};          // name -> { input, output }
const presetButtons = {};    // name -> button
let image = null;
let imageName = "image";
let activePreset = "original";
let renderQueued = false;

// ---------- helpers ----------
function prettify(name) {
    const text = name.replace(/([A-Z])/g, " $1").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function setStatus(message) {
    statusEl.textContent = message;
}

function setEditable(enabled) {
    resetButton.disabled = !enabled;
    downloadButton.disabled = !enabled;
}

// ---------- filter controls ----------
function syncSlider(name) {
    const { input, output } = sliders[name];
    const { min, max, unit } = FILTERS[name];
    const value = state[name];

    input.value = value;
    output.textContent = `${value}${unit}`;
    input.style.setProperty("--fill", `${((value - min) / (max - min)) * 100}%`);
}

function createFilterElement(name) {
    const { value, min, max, step } = FILTERS[name];

    const wrapper = document.createElement("div");
    wrapper.className = "filter";

    const label = document.createElement("label");
    label.htmlFor = name;
    label.append(prettify(name));

    const output = document.createElement("output");
    output.htmlFor = name;
    label.append(output);

    const input = document.createElement("input");
    input.type = "range";
    input.id = name;
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = value;

    input.addEventListener("input", () => {
        state[name] = Number(input.value);
        syncSlider(name);
        setActivePreset(null);
        scheduleRender();
    });

    wrapper.append(label, input);
    sliders[name] = { input, output };
    return wrapper;
}

function createFilters() {
    Object.keys(FILTERS).forEach(name => {
        filtersContainer.append(createFilterElement(name));
        syncSlider(name);
    });
}

function applyValues(values) {
    Object.keys(FILTERS).forEach(name => {
        state[name] = values[name];
        syncSlider(name);
    });
    scheduleRender();
}

// ---------- presets ----------
function setActivePreset(name) {
    activePreset = name;
    Object.entries(presetButtons).forEach(([key, button]) => {
        button.setAttribute("aria-pressed", String(key === name));
    });
}

function createPresets() {
    Object.entries(PRESETS).forEach(([name, overrides]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = prettify(name);
        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", () => {
            applyValues({ ...DEFAULTS, ...overrides });
            setActivePreset(name);
        });

        presetsContainer.append(button);
        presetButtons[name] = button;
    });
    setActivePreset("original");
}

// ---------- rendering ----------
function buildFilterString() {
    const s = state;
    // CSS has no "exposure" filter, so it scales brightness.
    const brightness = (s.brightness * s.exposure) / 100;

    return [
        `brightness(${brightness}%)`,
        `contrast(${s.contrast}%)`,
        `saturate(${s.saturation}%)`,
        `hue-rotate(${s.hueRotation}deg)`,
        `blur(${s.blur}px)`,
        `grayscale(${s.grayscale}%)`,
        `sepia(${s.sepia}%)`,
        `opacity(${s.opacity}%)`,
        `invert(${s.invert}%)`,
    ].join(" ");
}

function render() {
    renderQueued = false;
    if (!image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = buildFilterString();
    ctx.drawImage(image, 0, 0);
}

// Redraw at most once per frame, so dragging a slider stays smooth on big photos.
function scheduleRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(render);
}

// ---------- loading images ----------
function loadFile(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setStatus("That file isn't an image. Try a JPG, PNG or WebP.");
        return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
        URL.revokeObjectURL(url);

        image = img;
        imageName = file.name.replace(/\.[^.]+$/, "") || "image";
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        canvas.hidden = false;
        placeholder.hidden = true;
        setEditable(true);

        applyValues(DEFAULTS);
        setActivePreset("original");
        setStatus(`${file.name} · ${img.naturalWidth} × ${img.naturalHeight}px`);
    };

    img.onerror = () => {
        URL.revokeObjectURL(url);
        setStatus("Couldn't open that image. It may be damaged or an unsupported format.");
    };

    img.src = url;
}

imageInput.addEventListener("change", () => {
    loadFile(imageInput.files[0]);
    imageInput.value = ""; // lets you pick the same file again
});

// Drag and drop onto the stage
stage.addEventListener("dragover", evt => {
    evt.preventDefault();
    stage.classList.add("is-dragover");
});

["dragleave", "dragend"].forEach(type => {
    stage.addEventListener(type, () => stage.classList.remove("is-dragover"));
});

stage.addEventListener("drop", evt => {
    evt.preventDefault();
    stage.classList.remove("is-dragover");
    loadFile(evt.dataTransfer.files[0]);
});

// Paste an image from the clipboard (Ctrl/Cmd + V)
document.addEventListener("paste", evt => {
    const item = [...evt.clipboardData.items].find(i => i.type.startsWith("image/"));
    if (item) loadFile(item.getAsFile());
});

// ---------- actions ----------
resetButton.addEventListener("click", () => {
    applyValues(DEFAULTS);
    setActivePreset("original");
    setStatus("Filters reset.");
});

downloadButton.addEventListener("click", () => {
    if (!image) return;

    // render() has already drawn the filtered image at full resolution
    canvas.toBlob(blob => {
        if (!blob) {
            setStatus("Couldn't create the file. The image may be too large for your browser.");
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${imageName}-edited.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setStatus(`Saved ${imageName}-edited.png`);
    }, "image/png");
});

// ---------- start ----------
createFilters();
createPresets();
setEditable(false);

// Some browsers (older Safari) don't support ctx.filter at all.
if (!("filter" in ctx)) {
    setStatus("Your browser doesn't support canvas filters. Try Chrome, Edge or Firefox.");
}