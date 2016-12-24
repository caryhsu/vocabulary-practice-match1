/// <reference path="vocabulary.ts"/>
/// <reference path="card-game.ts"/>

var vocabularies = [];
vocabularies.push(new Vocabulary("TV", "電視", null));
vocabularies.push(new Vocabulary("water", "水", null));
vocabularies.push(new Vocabulary("either", "也", null));
vocabularies.push(new Vocabulary("leave", "離開", null));
vocabularies.push(new Vocabulary("wrong", "不對的", null));
vocabularies.push(new Vocabulary("simple", "簡單的", null));
vocabularies.push(new Vocabulary("main", "主要的", null));
vocabularies.push(new Vocabulary("ham", "火腿", null));
vocabularies.push(new Vocabulary("sause", "醬料", null));
vocabularies.push(new Vocabulary("gartic", "大蒜", null));
vocabularies.push(new Vocabulary("nut", "堅果", null));
vocabularies.push(new Vocabulary("salad", "(蔬菜)沙拉", null));
vocabularies.push(new Vocabulary("shrimp", "蝦子", null));

window.onload = () => {
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    var action = () => {
        setTimeout(() => {
            var startButton = document.getElementById('startButton');
            startButton.style.display = "none";
            console.log(vocabularies);
            game.initCards(8, vocabularies);
            game.start();
        }, 10);
    };
    startButton.onclick = action;
    startButton.ontouchstart = action;
};


