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
        for (var index = 0; index < this.cards.length; index++) {
            this.createButton(this.cards[index]);
        }
        this.startTimer();
    }

    startTimer() : void {
        this.timePlayedTimerToken = setInterval(() => {
            this.timePlayed += 0.1;
            var timeerSpendLabel = document.getElementById('timeerSpendLabel');
            timeerSpendLabel.innerText = this.timePlayed.toFixed(1).toString();
        }, 100);
    }

    createButton(card: Card): void {
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
        var button: HTMLButtonElement = document.createElement('button');

        card.button = button;
        this.refreshButtonClasName(card);
        button.innerText = card.text;
        button.style.width = "25%";
        button.style.fontSize = "30px";

        this.content.appendChild(button);

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

class Vocabulary {
    english: string;
    chinese: string;
    url: string;

    constructor(english: string, chinese: string, url: string) {
        this.english = english;
        this.chinese = chinese;
        this.url = url;
    }
}

var vocabularies = [];
/*
vocabularies.push(new Vocabulary("mountain",  "山", null));
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
vocabularies.push(new Vocabulary("button", "按鈕", null));
vocabularies.push(new Vocabulary("search", "搜尋", null));
vocabularies.push(new Vocabulary("trap", "困住", null));
vocabularies.push(new Vocabulary("stair", "階梯", null));
vocabularies.push(new Vocabulary("lazy", "懶惰", null));
vocabularies.push(new Vocabulary("climb", "爬", null));
vocabularies.push(new Vocabulary("save", "搭救", null));
vocabularies.push(new Vocabulary("secret", "秘密", null));
vocabularies.push(new Vocabulary("wrap", "包裝", null));
vocabularies.push(new Vocabulary("idea", "點子", null));
vocabularies.push(new Vocabulary("hobby", "嗜好", null));
vocabularies.push(new Vocabulary("small", "小的", null));
*/

vocabularies.push(new Vocabulary("Christmas", "聖誕節", null));
vocabularies.push(new Vocabulary("size", "尺寸", null));
vocabularies.push(new Vocabulary("probably", "可能", null));
vocabularies.push(new Vocabulary("soap", "香皂", null));
vocabularies.push(new Vocabulary("middle", "中間", null));
vocabularies.push(new Vocabulary("light", "輕的", null));
vocabularies.push(new Vocabulary("improve", "改進", null));
vocabularies.push(new Vocabulary("famous", "有名的", null));
vocabularies.push(new Vocabulary("plant", "植物", null));
vocabularies.push(new Vocabulary("cloth", "衣物", null));
vocabularies.push(new Vocabulary("special", "特別", null));
vocabularies.push(new Vocabulary("court", "球場", null));
vocabularies.push(new Vocabulary("shower", "淋浴間", null));
vocabularies.push(new Vocabulary("service", "服務", null));
vocabularies.push(new Vocabulary("gym", "健身房", null));
vocabularies.push(new Vocabulary("arm", "手臂", null));
vocabularies.push(new Vocabulary("stretch", "伸展", null));
vocabularies.push(new Vocabulary("reach", "伸出手臂", null));
vocabularies.push(new Vocabulary("personal", "私人的", null));
vocabularies.push(new Vocabulary("badminton", "羽毛球", null));
vocabularies.push(new Vocabulary("work out", "鍛鍊", null));
vocabularies.push(new Vocabulary("TV", "電視", null));
vocabularies.push(new Vocabulary("water", "水", null));
vocabularies.push(new Vocabulary("either", "也", null));
vocabularies.push(new Vocabulary("leave", "離開", null));
vocabularies.push(new Vocabulary("wrong", "不對的", null));
vocabularies.push(new Vocabulary("simple", "簡單的", null));
vocabularies.push(new Vocabulary("main", "主要的", null));

/*
vocabularies.push(new Vocabulary("ham", "火腿", null));
vocabularies.push(new Vocabulary("sause", "醬料", null));
vocabularies.push(new Vocabulary("gartic", "大蒜", null));
vocabularies.push(new Vocabulary("nut", "堅果", null));
vocabularies.push(new Vocabulary("salad", "(蔬菜(沙拉", null));
vocabularies.push(new Vocabulary("shrimp", "蝦子", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
vocabularies.push(new Vocabulary("", "", null));
*/

window.onload = () => {
    var content = document.getElementById('content');
    var game = new CardGame(content);
    var startButton = document.getElementById('startButton');
    var action = () => {
        setTimeout(() => startGame(game), 10);
    };
    startButton.onclick = action;
    startButton.ontouchstart = action;
};

function startGame(game: CardGame) : void {
    var startButton = document.getElementById('startButton');
    startButton.style.display = "none";
    game.initCards(8, vocabularies);
    game.start();
}

