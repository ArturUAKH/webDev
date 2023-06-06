function modal() {
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
}

module.exports = modal;
