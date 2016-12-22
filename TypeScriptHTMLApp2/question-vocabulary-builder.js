var QuestionDefinitionVocabularyBuilder = (function () {
    function QuestionDefinitionVocabularyBuilder(vocabularies) {
        this.vocabularies = vocabularies;
    }
    QuestionDefinitionVocabularyBuilder.prototype.toQuestions = function () {
        var r = [];
        for (var index = 0; index < vocabularies.length; index++) {
            var v = vocabularies[index];
            var q = new QuestionDefinition(QuestionType.SINGLE_CHOICE, v.english);
            var o = new QuestionOptionDefinition(v.chinese, true);
            q.options.push(o);
            for (var i = 0; i <= 3; i++) {
                var v_1 = vocabularies[(index + i) % vocabularies.length];
                var o_1 = new QuestionOptionDefinition(v_1.chinese, false);
                q.options.push(o_1);
            }
        }
        return r;
    };
    return QuestionDefinitionVocabularyBuilder;
}());
//# sourceMappingURL=question-vocabulary-builder.js.map