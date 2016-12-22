/// <reference path="vocabulary.ts"/>
var Exam = (function () {
    function Exam(content) {
        this.content = content;
        this.questions = [];
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
    Exam.prototype.initQuestions = function (number, p_questions) {
        var questions = p_questions.slice(0);
        Arrays.shuffle(questions);
        if (number > questions.length)
            number = questions.length;
        for (var index = 0; index < number; index++) {
            var q = questions[index];
            this.questions.push(new Question(q));
        }
    };
    Exam.prototype.shuffleQuestions = function () {
        Arrays.shuffle(this.questions);
    };
    return Exam;
}());
var Question = (function () {
    function Question(q) {
        this.type = q.type;
        this.text = q.text;
        this.options = q.options;
        this.shuffleOptions();
    }
    Question.prototype.shuffleOptions = function () {
        Arrays.shuffle(this.options);
    };
    Question.prototype.right = function () {
        if (this.type == QuestionType.SINGLE_CHOICE) {
            var ans = parseInt(this.answer);
            if (ans == NaN)
                return false;
            if (ans >= 0 && ans <= this.options.length) {
                return this.options[ans].right;
            }
            else {
                return false;
            }
        }
        else if (this.type == QuestionType.MULTIPLE_CHOICE) {
            var anses = this.answer.split(",");
            for (var _i = 0, anses_1 = anses; _i < anses_1.length; _i++) {
                var ans = anses_1[_i];
            }
            return true;
        }
    };
    return Question;
}());
//# sourceMappingURL=exam.js.map