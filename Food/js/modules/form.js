import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function form(formSelector, modalTimerId, modalSelector) {
	const forms = document.querySelectorAll(formSelector);
	// Обьект сообщений со статусом запроса для вывода пользователю на разных этапах запроса
	const message = {
		loading: "img/form/spinner.svg",
		succes: "Спасибо мы скоро с Вами свяжемся...",
		failure: "Что-то пошло не так...",
	};
	forms.forEach(item => {
		bindPostData(item);
	});
	//Модифицировали запросы на fetch с использованием async/await

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
		openModal(modalSelector, modalTimerId);

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
			closeModal(modalSelector);
		}, 3000);
	}
}
export default form;
