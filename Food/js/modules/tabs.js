function tabs(
	tabsSelector,
	tabsContentSelector,
	tabsParentSelector,
	classActive
) {
	//Создаем логику по переключению табов !

	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideContent() {
		tabs.forEach(item => {
			item.classList.remove(classActive);
		});

		tabsContent.forEach(item => {
			item.classList.add("hide");
		});
	}

	function showContent(i = 0) {
		tabs[i].classList.add(classActive);
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
	}

	hideContent();
	showContent();

	tabsParent.addEventListener("click", e => {
		let target = e.target;
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideContent();
					showContent(i);
				}
			});
		}
	});
}

export default tabs;
