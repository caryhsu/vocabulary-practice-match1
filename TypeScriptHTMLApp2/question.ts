enum QuestionType {
    SINGLE_CHOICE, 
    MULTIPLE_CHOICE, 
    FILLING
}

class Question {
    type: QuestionType;
    text: string;
    url: string;
    options: QuestionOption[];
    fillingAnswer: string; // for FILLING
    constructor(type: QuestionType, text: string, url?: string, options?: QuestionOption[]) {
        this.type = type;
        this.text = text;
        this.url = url;
        this.options = options;
        this.fillingAnswer = "";
    }

    shuffleOptions() {
        Arrays.shuffle(this.options);
    }

}

class QuestionOption {
    text: string;
    right: boolean;
    constructor(text: string, right: boolean) {
        this.text = text;
        this.right = right;
    }

}

