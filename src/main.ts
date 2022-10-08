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

window.onload = () => {
    brightBtn.style.backgroundColor = "rgb(0, 110, 212)";
    brightBtn.style.color = "white";
    rangeSelect.innerHTML = "Brightness";
    rangePercentDisplay.innerHTML = "100%";
};

const filterButtons = (input: any) => {
    if (input === "brightness") {
        buttonsSet(brightBtn);
        rangeSelect.innerHTML = "Brightness";
    } else if (input === "saturation") {
        buttonsSet(saturationBtn);
        rangeSelect.innerHTML = "Saturation";
    } else if (input === "inversion") {
        buttonsSet(inversionBtn);
        rangeSelect.innerHTML = "Inversion";
    } else if (input === "grayscale") {
        buttonsSet(grayScaleBtn);
        rangeSelect.innerHTML = "Grayscale";
    }
};

const buttonsSet = (button: any) => {
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

const readURL = (input: any) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            document
                .querySelector("#pre-image")
                ?.setAttribute("src", e.target?.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const getSliderValue = (value: any) => {
    rangePercentDisplay.innerHTML = `${value}%`;
};

const originalImage = document.getElementById("pre-image");
const filteredImage = document.getElementById("filtered-image");

const filter = () => {};
