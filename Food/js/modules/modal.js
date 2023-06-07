function openModal(modalSelector, modalTimerId) {
    modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}
function closeModal(modalSelector) {
    modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}
function modal(triggerSelector, modalSelector, modalTimerId) {
    //Модальное окно
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", () =>
            openModal(modalSelector, modalTimerId)
        );
    });

    modal.addEventListener("click", e => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    window.addEventListener("keydown", e => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
