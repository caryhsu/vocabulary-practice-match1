/// <reference path="vocabulary.ts"/>
var CardGame = (function () {
    function CardGame(content) {
        this.ui = new DefaultCardGameUI(this, content);
        this.isHideAll = true;
        this.selectedCards = [];
    }
    CardGame.prototype.initCards = function (cardNumber, p_vocabularies) {
        this.cards = [];
        var vocabularies = p_vocabularies.slice(0);
        Arrays.shuffle(vocabularies);
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
        Arrays.shuffle(this.cards);
    };
    CardGame.prototype.start = function () {
        this.ui.start();
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
            this.ui.refresh(card);
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
    CardGame.prototype.toggleCard = function (card) {
        var _this = this;
        if (card.isRight != null)
            return;
        card.isSelected = !card.isSelected;
        if (card.isSelected && this.checkToAddSelectedCards(card)) {
            this.selectedCards.push(card);
        }
        if (this.selectedCards.length == 2) {
            var right = this.selectedCards[0].number == this.selectedCards[1].number;
            this.selectedCards[0].isRight = right;
            this.selectedCards[1].isRight = right;
            this.selectedCards[0].isSelected = false;
            this.selectedCards[1].isSelected = false;
            this.ui.refresh(this.selectedCards[0]);
            this.ui.refresh(this.selectedCards[1]);
            var c0_1 = this.selectedCards[0];
            var c1_1 = this.selectedCards[1];
            this.selectedCards = [];
            if (!right) {
                c0_1.isSelected = false;
                c1_1.isSelected = false;
                this.ui.refresh(c0_1);
                this.ui.refresh(c1_1);
                setTimeout(function () {
                    c0_1.isRight = null;
                    c1_1.isRight = null;
                    _this.ui.refresh(c0_1);
                    _this.ui.refresh(c1_1);
                }, 200);
            }
            if (right) {
                if (this.isLastPairSelection()) {
                    this.setAllCardsRight();
                }
                if (this.isFinished()) {
                    this.ui.stopTimer();
                }
            }
        }
        this.ui.refresh(card);
    };
    return CardGame;
}());
var Card = (function () {
    //button: HTMLButtonElement;
    function Card(number, isEnglish, text) {
        this.number = number;
        this.isEnglish = isEnglish;
        this.text = text;
        this.isSelected = false;
        this.isRight = null;
    }
    return Card;
}());
var DefaultCardGameUI = (function () {
    function DefaultCardGameUI(cardGame, content) {
        this.cardGame = cardGame;
        this.content = content;
        this.timePlayed = 0;
        this.buttons = [];
    }
    DefaultCardGameUI.prototype.start = function () {
        var divRow;
        for (var index = 0; index < this.cardGame.cards.length; index++) {
            if (index % DefaultCardGameUI.COLUMNS == 0) {
                divRow = document.createElement('div');
                this.content.appendChild(divRow);
                divRow.className = "row";
            }
            this.createButton(divRow, this.cardGame.cards[index]);
        }
        this.startTimer();
    };
    DefaultCardGameUI.prototype.startTimer = function () {
        var _this = this;
        this.timePlayedTimerToken = setInterval(function () {
            _this.timePlayed += 0.1;
            var timeerSpendLabel = document.getElementById('timeerSpendLabel');
            timeerSpendLabel.innerText = _this.timePlayed.toFixed(1).toString();
        }, 100);
    };
    DefaultCardGameUI.prototype.stopTimer = function () {
        clearInterval(this.timePlayedTimerToken);
    };
    DefaultCardGameUI.prototype.createButton = function (divRow, card) {
        var _this = this;
        var divCell = document.createElement('div');
        divCell.className = "col-xs-3 col-md-3 col-sm-3";
        divRow.appendChild(divCell);
        var button = document.createElement('button');
        this.buttons.push(button);
        //card.button = button;
        this.refresh(card);
        button.innerText = card.text;
        button.style.width = "100%";
        button.style.fontSize = "24px";
        divCell.appendChild(button);
        var separator = document.createElement('span');
        separator.style.width = "10%";
        divRow.appendChild(separator);
        var buttonOnClickAction = function () {
            _this.cardGame.toggleCard(card);
        };
        button.onclick = buttonOnClickAction;
        button.ontouchstart = buttonOnClickAction;
    };
    DefaultCardGameUI.prototype.refresh = function (card) {
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
        var index = this.cardGame.cards.indexOf(card);
        this.buttons[index].className = className;
        //card.button.className = className;
    };
    DefaultCardGameUI.COLUMNS = 4;
    return DefaultCardGameUI;
}());
var Arrays = (function () {
    function Arrays() {
    }
    Arrays.shuffle = function (array) {
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
    return Arrays;
}());
//# sourceMappingURL=card-game.js.map