"use strict";
const brightBtn = document.getElementById("brightness");
const saturationBtn = document.getElementById("saturation");
const inversionBtn = document.getElementById("inversion");
const grayScaleBtn = document.getElementById("grayscale");
const rangePercentDisplay = document.querySelector(".percent");
const rangeSelect = document.querySelector(".f-title");
const range = document.getElementById("range");
window.onload = () => {
    localStorage.clear();
    resetLocalStorageValues();
    getSliderValue(range.value);
};
const readURL = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            (_a = document
                .querySelector("#pre-image")) === null || _a === void 0 ? void 0 : _a.setAttribute("src", e.target.result);
            setupCanvas(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};
const filterButtons = (input) => {
    if (input === "brightness") {
        buttonsSet(brightBtn);
        rangeSelect.innerHTML = "Brightness";
        setFilterAttr(input);
        getSliderValue(range.value);
    }
    else if (input === "saturation") {
        buttonsSet(saturationBtn);
        rangeSelect.innerHTML = "Saturation";
        setFilterAttr(input);
        getSliderValue(range.value);
    }
    else if (input === "inversion") {
        buttonsSet(inversionBtn);
        rangeSelect.innerHTML = "Inversion";
        setFilterAttr(input);
        getSliderValue(range.value);
    }
    else if (input === "grayscale") {
        buttonsSet(grayScaleBtn);
        rangeSelect.innerHTML = "Grayscale";
        setFilterAttr(input);
        getSliderValue(range.value);
    }
};
const buttonsSet = (button) => {
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
const getSliderValue = (value) => {
    rangePercentDisplay.innerHTML = `${value}%`;
    applyFilter();
    valuesToLocalStorage(range.getAttribute("data-filter"), range.value);
};
let brightnessValue = "";
let saturationValue = "";
let inversionValue = "";
let grayscaleValue = "";
const setFilterAttr = (element) => {
    if (element === "brightness") {
        range.setAttribute("data-filter", "brightness");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "200");
        brightnessValue = JSON.parse(localStorage.getItem("brightness") || "{}");
        range.value = brightnessValue;
    }
    else if (element === "saturation") {
        range.setAttribute("data-filter", "saturate");
        range.setAttribute("data-scale", "");
        range.setAttribute("max", "200");
        saturationValue = JSON.parse(localStorage.getItem("saturate") || "{}");
        range.value = saturationValue;
    }
    else if (element === "inversion") {
        range.setAttribute("data-filter", "invert");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        inversionValue = JSON.parse(localStorage.getItem("invert") || "{}");
        range.value = inversionValue;
    }
    else if (element === "grayscale") {
        range.setAttribute("data-filter", "grayscale");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        grayscaleValue = JSON.parse(localStorage.getItem("grayscale") || "{}");
        range.value = grayscaleValue;
    }
};
const canvas = document.getElementById("filtered-image");
const originalImage = document.getElementById("pre-image");
const applyFilter = () => {
    brightnessValue = JSON.parse(localStorage.getItem("brightness") || "{}");
    saturationValue = JSON.parse(localStorage.getItem("saturate") || "{}");
    inversionValue = JSON.parse(localStorage.getItem("invert") || "{}");
    grayscaleValue = JSON.parse(localStorage.getItem("grayscale") || "{}");
    let computedFilters = "";
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
const setupCanvas = (src) => {
    const original = new MarvinImage();
    // if (canvas.getContext) {
    //     let ctx: any = canvas.getContext("2d");
    //     ctx.canvas.width = window.innerWidth;
    //     ctx.canvas.height = window.innerHeight;
    //     const img = new Image();
    //     img.onload = () => {
    //         // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //         ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    //     };
    //     img.src = src;
    // }
    const image = new MarvinImage(original.getWidth(), original.getHeight());
    image.load(src, () => {
        grayscale(original, image);
        image.draw(canvas);
    });
    function grayscale(imageIn, imageOut) {
        for (var y = 0; y < imageIn.getHeight(); y++) {
            for (var x = 0; x < imageIn.getWidth(); x++) {
                var red = imageIn.getIntComponent0(x, y);
                var green = imageIn.getIntComponent1(x, y);
                var blue = imageIn.getIntComponent2(x, y);
                var gray = Math.floor(red * 0.21 + green * 0.71 + blue * 0.08);
                imageOut.setIntColor(x, y, gray, gray, gray);
            }
        }
    }
};
const rotateFlipImage = (input) => {
    let ctx = canvas.getContext("2d");
    if (input === "rotate-left") {
        console.log(input);
    }
    else if (input === "rotate-right") {
        console.log(input);
    }
    else if (input === "flip-horizontal") {
        ctx.direction = "rtl";
    }
    else if (input === "flip-vertical") {
        console.log(input);
    }
};
const valuesToLocalStorage = (item, value) => {
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
