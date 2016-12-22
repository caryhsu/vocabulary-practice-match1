/// <reference path="vocabulary.ts"/>
/// <reference path="card-game.ts"/>

window.onload = () => {
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    var action = () => {
        setTimeout(() => {
            var startButton = document.getElementById('startButton');
            startButton.style.display = "none";
            game.initCards(8, vocabularies);
            game.start();
        }, 10);
    };
    startButton.onclick = action;
    startButton.ontouchstart = action;
};


