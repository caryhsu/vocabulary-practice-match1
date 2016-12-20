/// <reference path="vocabulary.ts"/>

class CardGame {
    content: HTMLElement;
    cards: Card[];
    isHideAll: boolean;
    timePlayedTimerToken: number;
    timePlayed: number;
    selectedCards: Card[];

    constructor(content: HTMLElement) {
        this.content = content;
        this.isHideAll = true;
        this.timePlayed = 0;
        this.selectedCards = [];
    }

    initCards(cardNumber: number, p_vocabularies: Vocabulary[]): void {
        this.cards = [];
        var vocabularies = p_vocabularies.slice(0);
        CardGame.shuffle(vocabularies);
        let number: number;
        if (cardNumber > p_vocabularies.length)
            cardNumber = p_vocabularies.length;

        for (let i: number = 0; i < cardNumber; i++) {
            var index: number = i % vocabularies.length;
            var v: Vocabulary = vocabularies[index];

            var card: Card = new Card(i, false, v.chinese);
            this.cards.push(card);

            var card: Card = new Card(i, true, v.english);
            this.cards.push(card);
        }
        CardGame.shuffle(this.cards);
    }

    start(): void {
        var divRow: HTMLDivElement;
        for (var index = 0; index < this.cards.length; index++) {
            if (index % 4 == 0) {
                divRow = document.createElement('div');
                this.content.appendChild(divRow);
                divRow.className = "row";
            }
            this.createButton(divRow, this.cards[index]);
            
            //            if (index % 4 == 3) {
            //                let divRow0: HTMLDivElement = document.createElement('div');
            //                divRow0.style.height = "3px";
            //                this.content.appendChild(divRow0);
            //            }

        }
        this.startTimer();
    }

    startTimer(): void {
        this.timePlayedTimerToken = setInterval(() => {
            this.timePlayed += 0.1;
            var timeerSpendLabel = document.getElementById('timeerSpendLabel');
            timeerSpendLabel.innerText = this.timePlayed.toFixed(1).toString();
        }, 100);
    }

    createButton(divRow: HTMLDivElement, card: Card): void {
        var divCell: HTMLDivElement = document.createElement('div');
        divCell.className = "col-xs-3 col-md-3 col-sm-3";
        divRow.appendChild(divCell);
        var button: HTMLButtonElement = document.createElement('button');

        card.button = button;
        this.refreshButtonClasName(card);
        button.innerText = card.text;
        button.style.width = "100%";
        button.style.fontSize = "24px";

        divCell.appendChild(button);

        var separator: HTMLSpanElement = document.createElement('span');
        separator.style.width = "10%";
        divRow.appendChild(separator);


        var buttonOnClickAction = () => {
            if (card.isRight != null) return;
            card.isSelected = !card.isSelected;
            if (card.isSelected && this.checkToAddSelectedCards(card)) {
                this.selectedCards.push(card);
            }
            if (this.selectedCards.length == 2) {
                var right: boolean = this.selectedCards[0].number == this.selectedCards[1].number;
                this.selectedCards[0].isRight = right;
                this.selectedCards[1].isRight = right;
                this.selectedCards[0].isSelected = false;
                this.selectedCards[1].isSelected = false;
                this.refreshButtonClasName(this.selectedCards[0]);
                this.refreshButtonClasName(this.selectedCards[1]);
                let c0: Card = this.selectedCards[0];
                let c1: Card = this.selectedCards[1];
                this.selectedCards = [];
                if (!right) {
                    setTimeout(() => { // clear error after 1 second
                        c0.isRight = null;
                        c1.isRight = null;
                        this.refreshButtonClasName(c0);
                        this.refreshButtonClasName(c1);
                    }, 1000);
                }
                if (right) {
                    if (this.isLastPairSelection()) {
                        this.setAllCardsRight();
                    }
                    if (this.isFinished()) {
                        clearInterval(this.timePlayedTimerToken);
                    }
                }
            }
            this.refreshButtonClasName(card);
        };
        button.onclick = buttonOnClickAction;
        button.ontouchstart = buttonOnClickAction;
    }

    checkToAddSelectedCards(card: Card): boolean {
        if (this.selectedCards.length == 0) return true;
        var card0: Card = this.selectedCards[0];
        if (card0 == card) return false;
        return true;
    }

    isLastPairSelection(): boolean {
        let unSelectedCount: number = 0;
        for (var index: number = 0; index < this.cards.length; index++) {
            let card: Card = this.cards[index];
            if (card.isRight == null || card.isRight == false) {
                unSelectedCount++;
            }
            if (unSelectedCount > 2) {
                return false;
            }
        }
        return unSelectedCount == 2;
    }

    setAllCardsRight(): void {
        for (var index: number = 0; index < this.cards.length; index++) {
            let card: Card = this.cards[index];
            card.isRight = true;
            this.refreshButtonClasName(card);
        }
    }

    isFinished(): boolean {
        for (var index: number = 0; index < this.cards.length; index++) {
            let card: Card = this.cards[index];
            if (card.isRight == null || card.isRight == false) {
                return false;
            }
        }
        return true;
    }

    refreshButtonClasName(card: Card): void {
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
    }

    static shuffle(array) {
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
    }
}

class Card {
    number: number;
    isEnglish: boolean;
    text: string;
    isSelected: boolean;
    isRight: Boolean;
    button: HTMLButtonElement;

    constructor(number: number, isEnglish: boolean, text: string) {
        this.number = number;
        this.isEnglish = isEnglish;
        this.text = text;
        this.isSelected = false;
        this.isRight = null;
    }
}



