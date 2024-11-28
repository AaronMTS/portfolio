document.addEventListener("DOMContentLoaded", () => {
    const pjpsContainer = document.querySelector("#pjp-section-content");
    // let isScrolling = false;

    // pjpsContainer.addEventListener("scroll", (Event) => {
    //     isScrolling = true;
    // });

    pjpsContainer.addEventListener("wheel", (Event) => {
        if (Math.abs(Event.deltaY) > 0) {
            Event.preventDefault();
            pjpsContainer.scrollLeft += Event.deltaY;
            console.log(Event);
        }
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