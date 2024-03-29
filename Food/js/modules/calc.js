function calc() {
    // Создаем калькулятор калорий
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }
    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector}`);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }
            if (
                elem.getAttribute("data-ratio") ===
                localStorage.getItem("ratio")
            ) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );
    initLocalSettings("#gender div", "calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector}`);

        elements.forEach(elem => {
            elem.addEventListener("click", e => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem(
                        "ratio",
                        +e.target.getAttribute("data-ratio")
                    );
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );
    getStaticInformation("#gender div", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const inputs = document.querySelectorAll(`${selector} input`);

        inputs.forEach(inp => {
            inp.addEventListener("input", () => {
                if (inp.value.match(/\D/g)) {
                    inp.style.border = "2px solid red";
                } else {
                    inp.style.border = "none";
                }

                switch (inp.getAttribute("id")) {
                    case "height":
                        height = +inp.value;
                        break;
                    case "weight":
                        weight = +inp.value;
                        break;
                    case "age":
                        age = +inp.value;
                        break;
                }
                calcTotal();
            });
        });
    }
    getDynamicInformation(".calculating__choose_medium");
}
export default calc;
