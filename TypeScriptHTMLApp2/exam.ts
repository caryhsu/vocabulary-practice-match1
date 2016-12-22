/// <reference path="vocabulary.ts"/>

class Exam {

    content: HTMLElement;
    questions: Question[];
    currentIndex: number;

    constructor(content: HTMLElement) {
        this.content = content;
        this.questions = [];
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

    initQuestions(number: number, p_questions: QuestionDefinition[]): void {

        let questions: QuestionDefinition[] = p_questions.slice(0);
        Arrays.shuffle(questions);

        if (number > questions.length)
            number = questions.length;

        for (let index: number = 0; index < number; index++) {
            let q = questions[index];
            this.questions.push(new Question(q));
        }
    }

    shuffleQuestions() {
        Arrays.shuffle(this.questions);
    }
}

class Question {

    type: QuestionType;
    text: string;
    answer: string;
    options: QuestionOptionDefinition[];

    constructor(q: QuestionDefinition) {
        this.type = q.type;
        this.text = q.text;
        this.options = q.options;
        this.shuffleOptions();
    }

    shuffleOptions() {
        Arrays.shuffle(this.options);
    }

    right(): boolean {
        if (this.type == QuestionType.SINGLE_CHOICE) {
            let ans: number = parseInt(this.answer);
            if (ans == NaN) return false;
            if (ans >= 0 && ans <= this.options.length) {
                return this.options[ans].right;
            }
            else {
                return false;
            }
        }
        else if (this.type == QuestionType.MULTIPLE_CHOICE) {
            let anses: string[] = this.answer.split(",");
            for (let ans of anses) {
            }
            return true;
        }
    }
}

