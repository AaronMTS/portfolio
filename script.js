document.addEventListener("DOMContentLoaded", () => {
    const scrollingContainer = document.querySelector(".scrolling-text-animation");
});

window.addEventListener("load", () => {
    const getComputedStyle = (element, property) => window.getComputedStyle(element).getPropertyValue(property);
    const linkedInIcon = document.querySelector("#linkedin-icon-container");
    const githubIcon = document.querySelector("#github-icon-container");
    const htmlBGColor = getComputedStyle(document.documentElement, 'background-color').match(/\d{2,3}/g);
    let websiteLuminance;

    const convertArrayToObject = (keyArray, valueArray) => {
        let newObj = {};
        if (keyArray.length === valueArray.length) {
            for (let i=0; i < keyArray.length; i++) {
                Object.defineProperty(newObj, keyArray[i], {
                    value: valueArray[i],
                    writable: false
                })
            }
            return newObj;
        }
        else {
            console.log("Key array length does not match value array length.")
        }
    }
    
    const getLuminance = (red, green, blue) => {
        return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    };

    websiteLuminance = getLuminance(htmlBGColor[0], htmlBGColor[1], htmlBGColor[2]);

    if (websiteLuminance < 128) {
        githubIcon.firstElementChild.firstElementChild.setAttribute("src", "images/github-mark-white.png");
        linkedInIcon.firstElementChild.firstElementChild.setAttribute("src", "images/linkedin_icon_white.png");
    }
    else {
        githubIcon.firstElementChild.firstElementChild.setAttribute("src", "images/github-mark.png");
        linkedInIcon.firstElementChild.firstElementChild.setAttribute("src", "images/linkedin_icon.png");
    }

    console.log(htmlBGColor);
    console.log(websiteLuminance);
});