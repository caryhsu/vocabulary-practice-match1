/// <reference path="vocabulary.ts"/>
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
            var card = new Card(i, false, v.chinese);
            this.cards.push(card);
            var card = new Card(i, true, v.english);
            this.cards.push(card);
        }
        CardGame.shuffle(this.cards);
    };
    CardGame.prototype.start = function () {
        var divRow;
        for (var index = 0; index < this.cards.length; index++) {
            if (index % 4 == 0) {
                divRow = document.createElement('div');
                this.content.appendChild(divRow);
                divRow.className = "row";
            }
            this.createButton(divRow, this.cards[index]);
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
    CardGame.prototype.createButton = function (divRow, card) {
        var _this = this;
        var divCell = document.createElement('div');
        divCell.className = "col-xs-3 col-md-3 col-sm-3";
        divRow.appendChild(divCell);
        var button = document.createElement('button');
        card.button = button;
        this.refreshButtonClasName(card);
        button.innerText = card.text;
        button.style.width = "100%";
        button.style.fontSize = "24px";
        divCell.appendChild(button);
        var separator = document.createElement('span');
        separator.style.width = "10%";
        divRow.appendChild(separator);
        var buttonOnClickAction = function () {
            if (card.isRight != null)
                return;
            card.isSelected = !card.isSelected;
            if (card.isSelected && _this.checkToAddSelectedCards(card)) {
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
        button.onclick = buttonOnClickAction;
        button.ontouchstart = buttonOnClickAction;
    };
    CardGame.prototype.checkToAddSelectedCards = function (card) {
        if (this.selectedCards.length == 0)
            return true;
        var card0 = this.selectedCards[0];
        if (card0 == card)
            return false;
        return true;
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
                className = "btn btn-info btn-lg";
            }
            else {
                className = "btn btn-default btn-lg";
            }
        }
        else {
            if (card.isRight) {
                className = "btn btn-success btn-lg";
            }
            else {
                className = "btn btn-danger btn-lg";
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
    function Card(number, isEnglish, text) {
        this.number = number;
        this.isEnglish = isEnglish;
        this.text = text;
        this.isSelected = false;
        this.isRight = null;
    }
    return Card;
}());
//# sourceMappingURL=card-game.js.map