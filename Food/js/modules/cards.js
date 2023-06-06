function cards() {
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
}

module.exports = cards;
