"use strict";

const inputUSD = document.querySelector("#usd"),
    inputUAH = document.querySelector("#uah");

inputUAH.addEventListener("input", function () {
    const req = new XMLHttpRequest();

    req.open("GET", "js/current.json");
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.send();
    //Обработка ответа через readyStateChange
    //     req.addEventListener("readystatechange", () => {
    //         //Срабатывает при каждом изменении readyState
    //         if (req.readyState === 4 && req.status === 200) {
    //             const data = JSON.parse(req.response);
    //             inputUSD.value = (+inputUAH.value / data.current.usd).toFixed(2);
    //         } else {
    //             inputUSD.value = "Error";
    //         }
    //     });
    // });

    //Те же действия через обработчик load

    req.addEventListener("load", () => {
        //Load срабатівает один раз когда запрос полностью загрузился
        if (req.status === 200) {
            const data = JSON.parse(req.response);
            inputUSD.value = (+inputUAH.value / data.current.usd).toFixed(2);
        } else {
            inputUSD.value = "Error";
        }
    });
});
