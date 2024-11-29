document.addEventListener("DOMContentLoaded", () => {
    const pjpsContainer = document.querySelector("#pjp-section-content");
    const pjpWrapper = document.querySelectorAll(".pjp-container");
    const pjpImageContainers = document.querySelectorAll(".pjp-image-container");
    const pjpOverlays = document.querySelectorAll(".pjp-overlay");
    // let isScrolling = false;

    // pjpsContainer.addEventListener("scroll", (Event) => {
    //     isScrolling = true;
    // });

    pjpsContainer.addEventListener("wheel", (Event) => {
        if (Math.abs(Event.deltaY) > 0) {
            Event.preventDefault();
            pjpsContainer.scrollLeft += Event.deltaY;
        }
    });

    pjpOverlays.forEach(element => {
        let imgContainer = element.previousElementSibling;
        let imgChild = imgContainer.firstElementChild;

        if (imgChild.clientWidth < imgContainer.clientWidth) {
            imgChild.style.transform = `scale(${imgContainer.clientWidth/imgChild.clientWidth})`;
        }
    
        element.addEventListener("mouseover", () => {
            if (imgChild.clientWidth > imgContainer.clientWidth) {
                imgChild.style.transform = `scale(${imgContainer.clientWidth/imgChild.clientWidth})`;
            }
            element.style.opacity = 1;
        });

        element.addEventListener("mouseout", () => {
            if (imgChild.clientWidth > imgContainer.clientWidth) {
                imgChild.style.transform = `unset`;
            }
            element.style.opacity = 0;
        });
    });
});

window.addEventListener("load", () => {
    const getComputedStyle = (element, property) => window.getComputedStyle(element).getPropertyValue(property);
    const htmlBGColor = getComputedStyle(document.documentElement, 'background-color').match(/\d{2,3}/g);
    let websiteLuminance;
    
    const getLuminance = (red, green, blue) => {
        return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    };

    websiteLuminance = getLuminance(htmlBGColor[0], htmlBGColor[1], htmlBGColor[2]);
    console.log(htmlBGColor);
    console.log(websiteLuminance);
});