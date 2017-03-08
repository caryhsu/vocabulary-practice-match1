/// <reference path="vocabulary.ts"/>
/// <reference path="card-game.ts"/>
var vocabularies = [];
vocabularies.push(new Vocabulary("news", "新聞", null));
vocabularies.push(new Vocabulary("tournament", "錦標賽", null));
vocabularies.push(new Vocabulary("team", "團隊", null));
vocabularies.push(new Vocabulary("move", "移動", null));
vocabularies.push(new Vocabulary("hit", "打擊", null));
vocabularies.push(new Vocabulary("hand", "手", null));
vocabularies.push(new Vocabulary("ground", "地面", null));
vocabularies.push(new Vocabulary("touch", "碰觸", null));
vocabularies.push(new Vocabulary("crowd", "人群", null));
vocabularies.push(new Vocabulary("serve", "發球", null));
vocabularies.push(new Vocabulary("return", "回擊球", null));
vocabularies.push(new Vocabulary("dislike", "不喜歡", null));
vocabularies.push(new Vocabulary("hate", "恨", null));
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