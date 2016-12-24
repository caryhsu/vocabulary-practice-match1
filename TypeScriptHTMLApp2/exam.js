/// <reference path="vocabulary.ts"/>
var Exam = (function () {
    function Exam(content) {
        this.content = content;
        this.questions = [];
        this.answers = [];
    }
    Exam.prototype.start = function () {
        this.currentIndex = 0;
        this.showQuestion(this.currentIndex);
    };
    Exam.prototype.showQuestion = function (index) {
        // clear content
        while (this.content.firstChild)
            this.content.removeChild(this.content.firstChild);
        var question = this.questions[index];
        var p = document.createElement('p');
        p.innerText = question.text;
        this.content.appendChild(p);
        for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
            var question_1 = _a[_i];
            var b = document.createElement('button');
            b.innerText = question_1.text;
            this.content.appendChild(b);
        }
    };
    Exam.prototype.initAnswers = function (number, p_questions) {
        var questions = p_questions.slice(0);
        Arrays.shuffle(questions);
        if (number > questions.length)
            number = questions.length;
        for (var index = 0; index < number; index++) {
            var q = questions[index];
            this.questions.push(q);
            this.answers.push(new Answer(q));
        }
    };
    Exam.prototype.shuffleQuestions = function () {
        Arrays.shuffle(this.questions);
    };
    return Exam;
}());
var Answer = (function () {
    function Answer(question) {
        this.question = question;
        this.selectedOption = null;
        this.selectedOptions = [];
        this.fillingText = "";
    }
    Answer.prototype.toString = function () {
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
    };
    Answer.prototype.isRight = function () {
        switch (this.question.type) {
            case QuestionType.SINGLE_CHOICE:
                if (this.selectedOption == null)
                    return false;
                return this.selectedOption.right;
            case QuestionType.MULTIPLE_CHOICE:
                for (var _i = 0, _a = this.question.options; _i < _a.length; _i++) {
                    var option = _a[_i];
                    if (this.selectedOptions.indexOf(option) >= 0) {
                        if (option.right == false)
                            return false;
                    }
                    else {
                        if (option.right == true)
                            return false;
                    }
                }
                return true;
            case QuestionType.FILLING:
                return this.fillingText == this.question.fillingAnswer;
        }
    };
    return Answer;
}());
//# sourceMappingURL=exam.js.map