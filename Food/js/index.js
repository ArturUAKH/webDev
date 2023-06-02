// "use strict";

//Создаем логику по переключению табов !
window.addEventListener("DOMContentLoaded", () => {
   const tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      wrapper = document.querySelector(".tabheader__items");
   hideContent();
   function hideContent() {
      tabs.forEach(item => {
         item.classList.remove("tabheader__item_active");
      });
      tabsContent.forEach(item => {
         item.classList.add("hide");
      });
   }

   function showContent(i = 0) {
      tabs[i].classList.add("tabheader__item_active");
      tabsContent[i].classList.remove("hide");
      tabsContent[i].classList.add("show", "fade");
   }

   wrapper.addEventListener("click", e => {
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

   // hideContent();
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
      modal = document.querySelector(".modal");

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

   const modalTimerId = setTimeout(openModal, 50000);

   modalTrigger.forEach(btn => {
      btn.addEventListener("click", openModal);
   });

   modal.addEventListener("click", e => {
      if (e.target === modal || e.target.getAttribute("data-close") == "") {
         closeModal();
      }
   });

   window.addEventListener("keydown", e => {
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
            this.classes.forEach(className => {
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
   const getResource = async url => {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could no fetch-${url} status - ${res.status}`);
      }
      return await res.json();
   };
   getResource("http://localhost:3000/menu").then(data => {
      data.forEach(({ img, altimg, title, descr, price }) => {
         new Menucard(
            img,
            altimg,
            title,
            descr,
            price,
            ".menu .container"
         ).render();
      });
   });

   const forms = document.querySelectorAll("form");
   // Обьект сообщений со статусом запроса для вывода пользователю на разных этапах запроса
   const message = {
      loading: "svg/spinner.svg",
      succes: "Спасибо мы скоро с Вами свяжемся...",
      failure: "Что-то пошло не так..."
   };
   forms.forEach(item => {
      bindPostData(item);
   });
   //Модифицировали запросы на fetch с использованием async/await
   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: "POST",
         headers: {
            "Content-type": "application/json"
         },
         body: data
      });

      return await res.json();
   };
   function bindPostData(form) {
      form.addEventListener("submit", e => {
         e.preventDefault();

         const statusMessage = document.createElement("img");
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
         form.insertAdjacentElement("afterend", statusMessage);

         const formData = new FormData(form);
         //Создаем обьект из formData т.к. напрямую превратить в JSON его нельзя
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData("http://localhost:3000/requests", json)
            .then(data => {
               console.log(data);
               showThanksModal(message.succes);
               statusMessage.remove();
            })
            .catch(() => {
               showThanksModal(message.failure);
            })
            .finally(() => {
               form.reset();
            });
      });
   }
   //Модифицируем модалку благодарности и вставляем спиннер загрузки
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector(".modal__dialog");
      prevModalDialog.classList.add("hide");
      openModal();

      const thanksModal = document.createElement("div");
      thanksModal.classList.add("modal__dialog");

      thanksModal.innerHTML = `
        <div class="modal__content">
            <div class"modal__close" data-close></div>
            <div class="modal__title">${message}</div>
        </div>`;
      document.querySelector(".modal").append(thanksModal);

      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.remove("hide");
         prevModalDialog.classList.add("show");
         closeModal();
      }, 3000);
   }
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
   // Создаем калькулятор калорий
   const result = document.querySelector(".calculating__result span");
   let sex = "female",
      height,
      weight,
      age,
      ratio = 1.375;

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
      const elements = document.querySelectorAll(`${parentSelector} div`);

      elements.forEach(elem => {
         elem.addEventListener("click", e => {
            if (e.target.getAttribute("data-ratio")) {
               ratio = +e.target.getAttribute("data-ratio");
            } else {
               sex = e.target.getAttribute("id");
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
      ".calculating__choose_big",
      "calculating__choose-item_active"
   );
   getStaticInformation("#gender", "calculating__choose-item_active");

   function getDynamicInformation(selector) {
      inputs = document.querySelectorAll(`${selector} input`);

      inputs.forEach(inp => {
         inp.addEventListener("input", () => {
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
   // const slides = document.querySelectorAll(".offer__slide"),
   //     prev = document.querySelector(".offer__slider-prev"),
   //     next = document.querySelector(".offer__slider-next"),
   //     current = document.querySelector("#current"),
   //     total = document.querySelector("#total");

   // let slideIndex = 1;

   // if (slideIndex.length < 10) {
   //     console.log(`0${slides.length}`);
   //     total.textContent = "0" + slides.length;
   // } else {
   //     total.textContent = slides.length;
   // }

   // showSlides(slideIndex);
   // function showSlides(n) {
   //     if (n < 1) {
   //         slideIndex = slides.length;
   //     }
   //     if (n > slides.length) {
   //         slideIndex = 1;
   //     }

   //     slides.forEach((item) => item.classList.add("hide"));

   //     slides[slideIndex - 1].classList.remove("hide");
   //     slides[slideIndex - 1].classList.add("show");

   //     if (slides.length < 10) {
   //         current.textContent = `0${slideIndex}`;
   //     } else {
   //         current.textContent = slideIndex;
   //     }
   // }
   // function plusSlide(n) {
   //     showSlides((slideIndex += n));
   // }

   // next.addEventListener("click", () => {
   //     plusSlide(1);
   // });
   // prev.addEventListener("click", () => {
   //     plusSlide(-1);
   // });
});
