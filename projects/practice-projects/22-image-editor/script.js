let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 360,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

function createFilterElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (evt) => {
        filters[ name ].value = input.value
        applyFilters()
    })

    return div

} 

function createFilters() {

    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
        filtersContainer.appendChild(filterElement)
    })
}

createFilters()

imgInput.addEventListener("change", (evt) => {

    imageCanvas.hidden = false;

    const file = evt.target.files[ 0 ]
    const imagePlaceHolder = document.querySelector(".placeholder")
    imagePlaceHolder.style.display = "none"

    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {

        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `

    canvasCtx.drawImage(image, 0, 0)
}


resetButton.addEventListener("click", () => {
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 360,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    }

    applyFilters()

    filtersContainer.innerHTML = ""
    createFilters()
})

downloadButton.addEventListener("click", () => {

    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})


const Presets = {
    original: {
        brightness: 100,
        contrast: 100,
        exposure: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 95,
        contrast: 145,
        exposure: 100,
        saturation: 125,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 108,
        contrast: 90,
        exposure: 100,
        saturation: 75,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 105,
        contrast: 90,
        exposure: 100,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 130,
        exposure: 100,
        saturation: 85,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 12,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 90,
        contrast: 155,
        exposure: 100,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 105,
        contrast: 125,
        exposure: 100,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 112,
        contrast: 82,
        exposure: 100,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 8,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 108,
        exposure: 100,
        saturation: 115,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 112,
        exposure: 100,
        saturation: 110,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vibrant: {
        brightness: 105,
        contrast: 115,
        exposure: 100,
        saturation: 160,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        exposure: 100,
        saturation: 110,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 95,
        exposure: 100,
        saturation: 90,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    matte: {
        brightness: 108,
        contrast: 80,
        exposure: 100,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    }
};


Object.keys(Presets).forEach(presetName => {

    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {

        const preset = Presets[presetName]

        Object.keys(preset).forEach(filterName => {
            filters[ filterName ].value = preset[ filterName ]
        })

        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()
    })

})