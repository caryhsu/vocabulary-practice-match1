var CardGame = (function () {
    function CardGame(content) {
        this.content = content;
        this.isHideAll = true;
        this.timePlayed = 0;
        this.selectedCards = [];
    }
    CardGame.prototype.initCards = function (cardNumber, p_vocabularies) {
        this.cards = [];
        var vocabularies = p_vocabularies.slice(0);
        CardGame.shuffle(vocabularies);
        var number;
        if (cardNumber > p_vocabularies.length)
            cardNumber = p_vocabularies.length;
        for (var i = 0; i < cardNumber; i++) {
            var index = i % vocabularies.length;
            var v = vocabularies[index];
            var card = new Card(i, v.chinese);
            this.cards.push(card);
            var card = new Card(i, v.english);
            this.cards.push(card);
        }
        CardGame.shuffle(this.cards);
    };
    CardGame.prototype.start = function () {
        for (var index = 0; index < this.cards.length; index++) {
            this.createButton(this.cards[index]);
        }
        this.startTimer();
    };
    CardGame.prototype.startTimer = function () {
        var _this = this;
        this.timePlayedTimerToken = setInterval(function () {
            _this.timePlayed += 0.1;
            var timeerSpendLabel = document.getElementById('timeerSpendLabel');
            timeerSpendLabel.innerText = _this.timePlayed.toFixed(1).toString();
        }, 100);
    };
    CardGame.prototype.createButton = function (card) {
        var _this = this;
        /*
        var divRow: HTMLDivElement = document.createElement('div');
        divRow.className = "row";
        var divCell: HTMLDivElement = document.createElement('div');
        divCell.className = "col-md-1";
        divRow.appendChild(divCell);
        var button: HTMLButtonElement = document.createElement('button');
        button.innerText = card.text;
        button.style.width = "100%";
        divCell.appendChild(button);
        this.content.appendChild(divRow);
        */
        var button = document.createElement('button');
        card.button = button;
        this.refreshButtonClasName(card);
        button.innerText = card.text;
        //button.style.width = "150px";
        this.content.appendChild(button);
        button.onclick = function () {
            if (card.isRight != null)
                return;
            card.isSelected = !card.isSelected;
            if (card.isSelected) {
                _this.selectedCards.push(card);
            }
            if (_this.selectedCards.length == 2) {
                var right = _this.selectedCards[0].number == _this.selectedCards[1].number;
                _this.selectedCards[0].isRight = right;
                _this.selectedCards[1].isRight = right;
                _this.selectedCards[0].isSelected = false;
                _this.selectedCards[1].isSelected = false;
                _this.refreshButtonClasName(_this.selectedCards[0]);
                _this.refreshButtonClasName(_this.selectedCards[1]);
                var c0_1 = _this.selectedCards[0];
                var c1_1 = _this.selectedCards[1];
                _this.selectedCards = [];
                if (!right) {
                    setTimeout(function () {
                        c0_1.isRight = null;
                        c1_1.isRight = null;
                        _this.refreshButtonClasName(c0_1);
                        _this.refreshButtonClasName(c1_1);
                    }, 1000);
                }
                if (right) {
                    if (_this.isLastPairSelection()) {
                        _this.setAllCardsRight();
                    }
                    if (_this.isFinished()) {
                        clearInterval(_this.timePlayedTimerToken);
                    }
                }
            }
            _this.refreshButtonClasName(card);
        };
    };
    CardGame.prototype.isLastPairSelection = function () {
        var unSelectedCount = 0;
        for (var index = 0; index < this.cards.length; index++) {
            var card = this.cards[index];
            if (card.isRight == null || card.isRight == false) {
                unSelectedCount++;
            }
            if (unSelectedCount > 2) {
                return false;
            }
        }
        return unSelectedCount == 2;
    };
    CardGame.prototype.setAllCardsRight = function () {
        for (var index = 0; index < this.cards.length; index++) {
            var card = this.cards[index];
            card.isRight = true;
            this.refreshButtonClasName(card);
        }
    };
    CardGame.prototype.isFinished = function () {
        for (var index = 0; index < this.cards.length; index++) {
            var card = this.cards[index];
            if (card.isRight == null || card.isRight == false) {
                return false;
            }
        }
        return true;
    };
    CardGame.prototype.refreshButtonClasName = function (card) {
        var className;
        if (card.isRight == null) {
            if (card.isSelected) {
                className = "btn btn-info btn-lg col-md-3";
            }
            else {
                className = "btn btn-default btn-lg col-md-3";
            }
        }
        else {
            if (card.isRight) {
                className = "btn btn-success btn-lg col-md-3";
            }
            else {
                className = "btn btn-danger btn-lg col-md-3";
            }
        }
        card.button.className = className;
    };
    CardGame.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    return CardGame;
}());
var Card = (function () {
    function Card(number, text) {
        this.number = number;
        this.text = text;
        this.isSelected = false;
        this.isRight = null;
    }
    return Card;
}());
var Vocabulary = (function () {
    function Vocabulary(english, chinese, url) {
        this.english = english;
        this.chinese = chinese;
        this.url = url;
    }
    return Vocabulary;
}());
var vocabularies = [];
vocabularies.push(new Vocabulary("mountain", "山", null));
vocabularies.push(new Vocabulary("ski", "滑雪", null));
vocabularies.push(new Vocabulary("chocolate", "巧克力", null));
vocabularies.push(new Vocabulary("melt", "融化", null));
vocabularies.push(new Vocabulary("town", "城鎮", null));
vocabularies.push(new Vocabulary("excellent", "傑出的", null));
vocabularies.push(new Vocabulary("watch", "手錶", null));
vocabularies.push(new Vocabulary("tunnel", "山洞", null));
vocabularies.push(new Vocabulary("bridge", "橋", null));
vocabularies.push(new Vocabulary("valley", "山谷", null));
vocabularies.push(new Vocabulary("building", "建築物", null));
vocabularies.push(new Vocabulary("lake", "湖", null));
vocabularies.push(new Vocabulary("problem", "問題", null));
vocabularies.push(new Vocabulary("wait", "等待", null));
vocabularies.push(new Vocabulary("elevator", "電梯", null));
window.onload = function () {
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    startButton.onclick = function () {
        game.initCards(10, vocabularies);
        game.start();
        startButton.style.display = "none";
    };
};
//# sourceMappingURL=app.js.map