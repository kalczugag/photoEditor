"use strict";
const brightBtn = document.getElementById("brightness");
const saturationBtn = document.getElementById("saturation");
const inversionBtn = document.getElementById("inversion");
const grayScaleBtn = document.getElementById("grayscale");
const rangePercentDisplay = document.querySelector(".percent");
const rangeSelect = document.querySelector(".f-title");
const range = document.getElementById("range");
window.onload = () => {
    rangeSelect.innerHTML = "";
    rangePercentDisplay.innerHTML = "";
    range.setAttribute("max", "0");
    localStorage.clear();
};
let url = "";
const readURL = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            url = e.target.result;
            (_a = document
                .querySelector("#pre-image")) === null || _a === void 0 ? void 0 : _a.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
    // drawImage(url);
};
const filterButtons = (input) => {
    if (input === "brightness") {
        buttonsSet(brightBtn);
        rangeSelect.innerHTML = "Brightness";
        setFilterAttr(input);
        getSliderValue(range.value);
        // applyFilterToCanvas(`"${input}"`, range.value);
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
        range.value = "100";
        brightnessValue = JSON.parse(localStorage.getItem("brightness") || "{}");
        range.value = brightnessValue;
    }
    else if (element === "saturation") {
        range.setAttribute("data-filter", "saturate");
        range.setAttribute("data-scale", "");
        range.setAttribute("max", "200");
        range.value = "1";
        saturationValue = JSON.parse(localStorage.getItem("saturate") || "{}");
        range.value = saturationValue;
    }
    else if (element === "inversion") {
        range.setAttribute("data-filter", "invert");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        range.value = "0";
        inversionValue = JSON.parse(localStorage.getItem("invert") || "{}");
        range.value = inversionValue;
    }
    else if (element === "grayscale") {
        range.setAttribute("data-filter", "grayscale");
        range.setAttribute("data-scale", "%");
        range.setAttribute("max", "100");
        range.value = "0";
        grayscaleValue = JSON.parse(localStorage.getItem("grayscale") || "{}");
        range.value = grayscaleValue;
    }
};
let originalImage = document.getElementById("pre-image");
let filteredImage = document.getElementById("filtered-image");
const applyFilter = () => {
    let computedFilters = "";
    computedFilters +=
        range.getAttribute("data-filter") +
            "(" +
            range.value +
            range.getAttribute("data-scale") +
            ")";
    originalImage.style.filter = computedFilters;
};
const context = filteredImage.getContext("2d");
const applyFilterToCanvas = (style, value) => {
    // drawImage(url);
    const context = filteredImage.getContext("2d");
    context.fillStyle = style;
    filteredImage.toDataURL("image/png");
};
const drawImage = (url) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        context.drawImage(image, 0, 0);
    };
    filteredImage.style.display = "block";
};
const valuesToLocalStorage = (item, value) => {
    localStorage.setItem(`${item}`, JSON.stringify(value));
};
//filter wrong values on default load!!! to fix
