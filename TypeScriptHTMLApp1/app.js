/// <reference path="vocabulary.ts"/>
/// <reference path="card-game.ts"/>
var vocabularies = [];
vocabularies.push(new Vocabulary("mango", "芒果", null));
vocabularies.push(new Vocabulary("banana", "香蕉", null));
vocabularies.push(new Vocabulary("super", "極好的", null));
vocabularies.push(new Vocabulary("pear", "梨子", null));
vocabularies.push(new Vocabulary("grape", "葡萄", null));
vocabularies.push(new Vocabulary("stand", "攤位", null));
vocabularies.push(new Vocabulary("watermelon", "西瓜", null));
vocabularies.push(new Vocabulary("pineapple", "鳳梨", null));
vocabularies.push(new Vocabulary("papaya", "木瓜", null));
vocabularies.push(new Vocabulary("guava", "芭樂", null));
vocabularies.push(new Vocabulary("honey", "蜂蜜", null));
vocabularies.push(new Vocabulary("produce", "生產", null));
vocabularies.push(new Vocabulary("female", "雌的;母的", null));
window.onload = function () {
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    var action = function () {
        setTimeout(function () {
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
//# sourceMappingURL=app.js.map