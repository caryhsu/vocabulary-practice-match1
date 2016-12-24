var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["SINGLE_CHOICE"] = 0] = "SINGLE_CHOICE";
    QuestionType[QuestionType["MULTIPLE_CHOICE"] = 1] = "MULTIPLE_CHOICE";
    QuestionType[QuestionType["FILLING"] = 2] = "FILLING";
})(QuestionType || (QuestionType = {}));
var Question = (function () {
    function Question(type, text, url, options) {
        this.type = type;
        this.text = text;
        this.url = url;
        this.options = options;
        this.fillingAnswer = "";
    }
    Question.prototype.shuffleOptions = function () {
        Arrays.shuffle(this.options);
    };
    return Question;
}());
var QuestionOption = (function () {
    function QuestionOption(text, right) {
        this.text = text;
        this.right = right;
    }
    return QuestionOption;
}());
//# sourceMappingURL=question.js.map