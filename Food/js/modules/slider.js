function slider() {
    //Создаем слайдер
    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        sliderField = slidesWrapper.querySelector(".offer__slider-inner"),
        //Меиод getComputedStyle работает на обьекте window
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    const currentDot = arrDots => {
        arrDots.forEach(dot => (dot.style.opacity = "0.5"));
        arrDots[slideIndex - 1].style.opacity = "1";
    };

    const currentSlideCounter = () => {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.cssText = slideIndex;
        }
    };

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
        total.textContent = `0${slides.length}`;
    } else {
        current.textContent = slideIndex;
        total.textContent = slides.length;
    }

    sliderField.style.cssText = `
 width: ${100 * slides.length}%;
 display: flex;
 transition: 0.5s all;
 `;

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if (i == 0) {
            dot.style.opacity = "1";
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener("click", () => {
        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlideCounter();
        currentDot(dots);
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        currentSlideCounter();
        currentDot(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", e => {
            const slideTo = e.target.getAttribute("data-slide-to");
            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            currentDot(dots);
            currentSlideCounter();
        });
    });
}
export default slider;
