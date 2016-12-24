/// <reference path="vocabulary.ts"/>

class Exam {

    content: HTMLElement;
    questions: Question[];
    answers: Answer[];
    currentIndex: number;

    constructor(content: HTMLElement) {
        this.content = content;
        this.questions = [];
        this.answers = [];
    }

    start(): void {
        this.currentIndex = 0;
        this.showQuestion(this.currentIndex);
    }

    showQuestion(index : number): void {
        // clear content
        while (this.content.firstChild)
            this.content.removeChild(this.content.firstChild);
        let question = this.questions[index];
        let p = document.createElement('p');
        p.innerText = question.text; 
        this.content.appendChild(p);

        for (let question of this.questions) {
            let b = document.createElement('button');
            b.innerText = question.text;
            this.content.appendChild(b);
        }
    }

    initAnswers(number: number, p_questions: Question[]): void {
        let questions: Question[] = p_questions.slice(0);
        Arrays.shuffle(questions);
        if (number > questions.length)
            number = questions.length;
        for (let index: number = 0; index < number; index++) {
            let q = questions[index];
            this.questions.push(q);
            this.answers.push(new Answer(q));
        }
    }

    shuffleQuestions() {
        Arrays.shuffle(this.questions);
    }
}

class Answer {

    question: Question;

    selectedOption: QuestionOption; // for SINGLE_CHOICE

    selectedOptions: QuestionOption[]; // MULTIPLE_CHOICE

    fillingText: string; // for FILLING

    constructor(question: Question) {
        this.question = question;
        this.selectedOption = null;
        this.selectedOptions = [];
        this.fillingText = "";
    }

    toString(): string {
        switch (this.question.type) {
            case QuestionType.SINGLE_CHOICE:
                if (this.selectedOption == null)
                    return "";
                return this.selectedOption.text;
            case QuestionType.MULTIPLE_CHOICE:
                return this.selectedOptions.toString();
            case QuestionType.FILLING:
                return this.fillingText;
        }
    }

    isRight(): boolean {
        switch (this.question.type) {
            case QuestionType.SINGLE_CHOICE:
                if (this.selectedOption == null)
                    return false;
                return this.selectedOption.right;
            case QuestionType.MULTIPLE_CHOICE:
                for (let option of this.question.options) {
                    if (this.selectedOptions.indexOf(option) >= 0) {
                        if (option.right == false) return false;
                    }
                    else {
                        if (option.right == true) return false;
                    }
                }
                return true;
            case QuestionType.FILLING:
                return this.fillingText == this.question.fillingAnswer;
        }
    }
}

