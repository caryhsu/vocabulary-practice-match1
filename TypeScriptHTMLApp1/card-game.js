var CardGame = (function () {
    function CardGame(rows, columns, vocabularies) {
        this.rows = rows;
        this.columns = columns;
        this.initCards(vocabularies);
        this.isHideAll = true;
        this.timePlayed = 0;
    }
    CardGame.prototype.initCards = function (vocabularies) {
        var number;
        for (var _i = 0, vocabularies_1 = vocabularies; _i < vocabularies_1.length; _i++) {
            var v = vocabularies_1[_i];
            var card = new Card(number, v.chinese);
            this.cards.push(card);
            var card = new Card(number, v.english);
            this.cards.push(card);
        }
    };
    CardGame.prototype.start = function () {
        var _this = this;
        this.isHideAll = false;
        this.timePlayedTimerToken = setInterval(function () { return _this.timePlayed += 0.1; }, 100);
    };
    CardGame.prototype.onSelect = function () {
    };
    return CardGame;
}());
var Card = (function () {
    function Card(number, text) {
        this.number = number;
        this.text = text;
        this.isSelected = false;
    }
    return Card;
}());
var Vocabulary = (function () {
    function Vocabulary(english, chinese) {
        this.english = english;
        this.chinese = chinese;
    }
    return Vocabulary;
}());
vocabularies = [{ english: 'game', chinese: '遊戲' }, { english: 'play', chinese: '玩' }];
//# sourceMappingURL=card-game.js.map