import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import form from "./modules/form";
import modal from "./modules/modal";
import calc from "./modules/calc";
import slider from "./modules/slider";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(
		() => openModal(".modal", modalTimerId),
		30000
	);

	tabs(
		".tabheader__item",
		".tabcontent",
		".tabheader__items",
		"tabheader__item_active"
	);
	timer();
	cards();
	form("form", modalTimerId, ".modal");
	modal("[data-modal]", ".modal", modalTimerId);
	calc();
	slider();
});
