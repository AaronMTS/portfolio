document.addEventListener("DOMContentLoaded", () => {
    const pjpsContainer = document.querySelector("#pjp-section-content");
    const pjpWrapper = document.querySelectorAll(".pjp-container");
    const pjpImageContainers = document.querySelectorAll(".pjp-image-container");
    const pjpOverlays = document.querySelectorAll(".pjp-overlay");
    const modalWrapper = document.querySelectorAll(".modal");
    const zoomImgModal = document.querySelector("#pjp-zoom-img");
    const zoomImgMainContainer = document.querySelector(".pjp-zoom-img-content");
    const zoomImgWrapper = document.querySelector(".zoom-img-wrapper");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    let currentPos = 0;
    let currentContainerRight = 0;
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

        if (imgChild.clientWidth < imgContainer.clientWidth && window.innerWidth > 850) {
            imgChild.style.transform = `scale(${imgContainer.clientWidth/imgChild.clientWidth})`;
        }
    
        element.addEventListener("mouseover", () => {
            if (imgChild.clientWidth > imgContainer.clientWidth) {
                imgChild.style.transform = `translate(0) scale(${imgContainer.clientWidth/imgChild.clientWidth})`;
            }
            else if (imgChild.clientHeight > imgContainer.clientHeight) {
                imgChild.style.transform = `translate(0) scale(${imgContainer.clientHeight/imgChild.clientHeight})`;
            }
            element.style.opacity = 1;
        });

        element.addEventListener("mouseout", () => {
            if (imgChild.clientWidth > imgContainer.clientWidth) {
                imgChild.style.transform = `initial`;
            }
            element.style.opacity = 0;
        });

        element.addEventListener("click", Event => {
            zoomImgModal.style.visibility = "visible";
            zoomImgModal.style.opacity = 1;
            if (prevArrow.getBoundingClientRect().left === prevArrow.nextElementSibling.getBoundingClientRect().left) {
                prevArrow.style.display = "none";
            }
        });
    });

    modalWrapper.forEach(element => {
        element.addEventListener("click", Event => {
            let modalContentCoord = element.firstElementChild.getBoundingClientRect();

            if (Event.clientX < modalContentCoord.left || Event.clientX > modalContentCoord.right || Event.clientY < modalContentCoord.top || Event.clientY > modalContentCoord.bottom) {
                element.style.visibility = "hidden";
                element.style.opacity = 0;
            }
        });
    });

    prevArrow.addEventListener("click", () => {
        if (prevArrow.getBoundingClientRect().left === prevArrow.nextElementSibling.getBoundingClientRect().left || currentPos === -100) {
            prevArrow.style.display = "none";
        }
        else {
            prevArrow.style.display = "flex";
        }

        if (nextArrow.style.display === "none") {
            nextArrow.style.display = "flex";
        }

        currentPos += 100;
        zoomImgWrapper.style.transform = `translateX(${currentPos}%)`;
    });

    nextArrow.addEventListener("click", () => {
        let container = nextArrow.previousElementSibling;
        let containerWidth = nextArrow.previousElementSibling.getBoundingClientRect().width;
        if (nextArrow.getBoundingClientRect().right !== container.getBoundingClientRect().right) {
            currentContainerRight += Math.abs(container.getBoundingClientRect().right);

            if (currentContainerRight === containerWidth || (Math.abs(currentPos) / 100) - zoomImgWrapper.childElementCount === 1) {
                nextArrow.style.display = "none";
                prevArrow.style.display = "flex";
            }
        }

        if (prevArrow.style.display === "none") {
            prevArrow.style.display = "flex";
        }

        currentPos -= 100;
        zoomImgWrapper.style.transform = `translateX(${currentPos}%)`;
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