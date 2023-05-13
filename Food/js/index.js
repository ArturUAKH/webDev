"use strict";
//Создаем логику по переключению табов !
window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    wrapper = document.querySelector(".tabheader__items");

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

  hideContent();
  showContent();
});
