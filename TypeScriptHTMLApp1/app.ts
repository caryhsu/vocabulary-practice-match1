/// <reference path="vocabulary.ts"/>
/// <reference path="card-game.ts"/>

window.onload = () => {
    Vocabulary.init();
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    var action = () => {
        setTimeout(() => startGame(game), 10);
    };
    startButton.onclick = action;
    startButton.ontouchstart = action;
};

function startGame(game: CardGame): void {
    var startButton = document.getElementById('startButton');
    startButton.style.display = "none";
    game.initCards(8, vocabularies);
    game.start();
}

