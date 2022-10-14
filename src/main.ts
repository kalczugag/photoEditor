const brightBtn = document.getElementById("brightness") as HTMLButtonElement;
const saturationBtn = document.getElementById(
    "saturation"
) as HTMLButtonElement;
const inversionBtn = document.getElementById("inversion") as HTMLButtonElement;
const grayScaleBtn = document.getElementById("grayscale") as HTMLButtonElement;
const rangePercentDisplay = document.querySelector(
    ".percent"
) as HTMLDivElement;
const rangeSelect = document.querySelector(".f-title") as HTMLDivElement;
const range = document.getElementById("range") as HTMLInputElement;

window.onload = () => {
    localStorage.clear();
    resetLocalStorageValues();
    getSliderValue(range.value);
};

const readURL = (input: HTMLInputElement) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            document
                .querySelector("#pre-image")
                ?.setAttribute("src", e.target.result);
            setupCanvas(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const filterButtons = (input: string) => {
    if (input === "brightness") {
        buttonsSet(brightBtn);
        rangeSelect.innerHTML = "Brightness";
        setFilterAttr(input);
        getSliderValue(range.value);
    } else if (input === "saturation") {
        buttonsSet(saturationBtn);
        rangeSelect.innerHTML = "Saturation";
        setFilterAttr(input);
        getSliderValue(range.value);
    } else if (input === "inversion") {
        buttonsSet(inversionBtn);
        rangeSelect.innerHTML = "Inversion";
        setFilterAttr(input);
        getSliderValue(range.value);
    } else if (input === "grayscale") {
        buttonsSet(grayScaleBtn);
        rangeSelect.innerHTML = "Grayscale";
        setFilterAttr(input);
        getSliderValue(range.value);
    }
};

const buttonsSet = (button: HTMLButtonElement) => {
    buttonsReset();
    button.style.backgroundColor = "rgb(0, 110, 212)";
    button.style.color = "white";
};

const buttonsReset = () => {
    brightBtn.style.backgroundColor = "white";
    saturationBtn.style.backgroundColor = "white";
    inversionBtn.style.backgroundColor = "white";
    grayScaleBtn.style.backgroundColor = "white";
    brightBtn.style.color = "rgb(44, 44, 44)";
    saturationBtn.style.color = "rgb(44, 44, 44)";
    inversionBtn.style.color = "rgb(44, 44, 44)";
    grayScaleBtn.style.color = "rgb(44, 44, 44)";
};

const getSliderValue = (value: string) => {
    rangePercentDisplay.innerHTML = `${value}%`;
    applyFilter();
    valuesToLocalStorage(range.getAttribute("data-filter"), range.value);
};

let brightnessValue: string = "";
let saturationValue: string = "";
let inversionValue: string = "";
let grayscaleValue: string = "";
const setFilterAttr = (element: string) => {
    if (element === "brightness") {
        range.setAttribute("data-filter", "brightness");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "200");
        brightnessValue = JSON.parse(
            localStorage.getItem("brightness") || "{}"
        );
        range.value = brightnessValue;
    } else if (element === "saturation") {
        range.setAttribute("data-filter", "saturate");
        range.setAttribute("data-scale", "");
        range.setAttribute("max", "200");
        saturationValue = JSON.parse(localStorage.getItem("saturate") || "{}");
        range.value = saturationValue;
    } else if (element === "inversion") {
        range.setAttribute("data-filter", "invert");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        inversionValue = JSON.parse(localStorage.getItem("invert") || "{}");
        range.value = inversionValue;
    } else if (element === "grayscale") {
        range.setAttribute("data-filter", "grayscale");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        grayscaleValue = JSON.parse(localStorage.getItem("grayscale") || "{}");
        range.value = grayscaleValue;
    }
};

const canvas = document.getElementById("filtered-image") as HTMLCanvasElement;
const originalImage = document.getElementById("pre-image") as HTMLImageElement;

const applyFilter = () => {
    brightnessValue = JSON.parse(localStorage.getItem("brightness") || "{}");
    saturationValue = JSON.parse(localStorage.getItem("saturate") || "{}");
    inversionValue = JSON.parse(localStorage.getItem("invert") || "{}");
    grayscaleValue = JSON.parse(localStorage.getItem("grayscale") || "{}");
    let computedFilters: string = "";
    computedFilters +=
        range.getAttribute("data-filter") +
        "(" +
        range.value +
        range.getAttribute("data-scale") +
        ")";
    originalImage.style.filter = computedFilters;
    // let ctx: any = canvas.getContext("2d");
    // ctx.filter.brightness(brightnessValue);
    // ctx.filter.saturation(saturationValue);
    // ctx.filter.inversion(inversionValue);
    // ctx.filter.grayscale(grayscaleValue);
};

const setupCanvas = (src: string) => {
    canvas.style.display = "block";
    canvas.width = 650;
    canvas.height = 400;
    const ctx: any = canvas.getContext("2d");
    let img: any = new Image();
    img.addEventListener("load", () => {
        drawImageScaled(img, ctx);
    });
    img.src = src;

    const drawImageScaled = (img: any, ctx: any) => {
        const canvas = ctx.canvas;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };
};

const download = () => {
    const downloadButton = document.getElementById(
        "button-img-save"
    ) as HTMLButtonElement;
    const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    downloadButton.setAttribute("href", image);
};

const rotateFlipImage = (input: string) => {
    let ctx: any = canvas.getContext("2d");
    if (input === "rotate-left") {
        console.log(input);
    } else if (input === "rotate-right") {
        console.log(input);
    } else if (input === "flip-horizontal") {
        ctx.direction = "rtl";
    } else if (input === "flip-vertical") {
        console.log(input);
    }
};

const valuesToLocalStorage = (item: any, value: string) => {
    localStorage.setItem(`${item}`, JSON.stringify(value));
};

const resetLocalStorageValues = () => {
    localStorage.setItem("brightness", JSON.stringify("100"));
    localStorage.setItem("saturate", JSON.stringify("1"));
    localStorage.setItem("invert", JSON.stringify("0"));
    localStorage.setItem("grayscale", JSON.stringify("0"));
    rangeSelect.innerHTML = "Brightness";
    buttonsSet(brightBtn);
    setFilterAttr(brightBtn.id);
    getSliderValue(range.value);
};
