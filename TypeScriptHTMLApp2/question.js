var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["SINGLE_CHOICE"] = 0] = "SINGLE_CHOICE";
    QuestionType[QuestionType["MULTIPLE_CHOICE"] = 1] = "MULTIPLE_CHOICE";
})(QuestionType || (QuestionType = {}));
var QuestionDefinition = (function () {
    function QuestionDefinition(type, text, url, options) {
        this.type = type;
        this.text = text;
        this.url = url;
        this.options = options;
    }
    return QuestionDefinition;
}());
var QuestionOptionDefinition = (function () {
    function QuestionOptionDefinition(text, right) {
        this.text = text;
        this.right = right;
    }
    return QuestionOptionDefinition;
}());
//# sourceMappingURL=question.js.map