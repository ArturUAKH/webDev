"use strict";

console.log("Запрос данных...");
//Создание промиса . Resolve - promise выполнился.reject - что-то пошло не так .
//В коллбэке можно использовать и стрелочную функцию .
const req = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("Подготовка данных...");
        const product = {
            name: "TV",
            price: 2000
        };
        resolve(product);
    }, 2000);
});
//Метод then() обрабатывает положительный результат
req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = "Order";
            resolve(product);
        }, 2000);
    });
})
    .then((data) => {
        data.modify = true;
        return data;
    })
    .then((data) => {
        console.log(data);
    })
    //Блок catch() обрабатывает ошибку и пропускает все последующие блоки then()
    .catch(() => {
        console.log("Ошибка");
    })
    //Блок  finally() выполнится при любом исходе промиса !
    .finally(() => {
        console.log("Я выполнюсь 100%");
    });

//Методы промисов race() и all()

const test = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

test(1000).then(() => {
    console.log("1000 ms");
});
test(3000).then(() => {
    console.log("3000 ms");
});

//Метод Promise.all() ждет завершения всех промисов
Promise.all([test(1000), test(5000)]).then(() => {
    console.log("All");
});

//Метод Promise.race() ждет первый выполнившийся промис
//В этом примере All выведется через 1 секунду не ожидаю остальных
Promise.race([test(1000), test(5000)]).then(() => {
    console.log("All");
});
