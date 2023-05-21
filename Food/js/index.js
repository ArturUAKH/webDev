// "use strict";

//Создаем логику по переключению табов !
window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        wrapper = document.querySelector(".tabheader__items");

    function hideContent() {
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
        tabsContent.forEach((item) => {
            item.classList.add("hide");
        });
    }

    function showContent(i = 0) {
        tabs[i].classList.add("tabheader__item_active");
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
    }

    wrapper.addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    hideContent();
    showContent();

    //Создаем таймер обратного отсчета

    let endTime = "2023-06-10";

    function getTimeRemaining(deadline) {
        let t = Date.parse(endTime) - Date.parse(new Date());
        let day, hours, minutes, seconds;

        if (t <= 0) {
            return {
                day: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        } else {
            (day = Math.floor(t / (1000 * 60 * 60 * 24))),
                (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
                (seconds = Math.floor((t / 1000) % 60)),
                (minutes = Math.floor((t / 1000 / 60) % 60));
        }

        return {
            total: t,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(deadLine, selector) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(deadLine);
            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
            days.innerHTML = getZero(t.day);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    }
    setClock(endTime, ".timer");

    //Модальное окно
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        closeBtn = document.querySelector("[data-close]");

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(modalTimerId);
    }
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    const modalTimerId = setTimeout(openModal, 5000);

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    window.addEventListener("scroll", showModalByScroll);

    //Создаем карточки с помощью классов

    class Menucard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 37;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const el = document.createElement("div");
            if (this.classes.length === 0) {
                this.el = "menu__item";
                el.classList.add(this.el);
            } else {
                this.classes.forEach((className) => {
                    el.classList.add(className);
                });
            }

            el.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(el);
        }
    }
    new Menucard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        10,
        ".menu .container"
    ).render();

    new Menucard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки,но и качественное исполнение блюд. Красная рыба, морепродукты,фрукты - ресторанное меню без похода в ресторан!",
        20,
        ".menu .container"
    ).render();

    new Menucard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        15,
        ".menu .container"
    ).render();
});
