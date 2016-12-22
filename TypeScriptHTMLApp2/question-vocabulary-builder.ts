class QuestionDefinitionVocabularyBuilder {

    vocabularies: Vocabulary[];

    constructor(vocabularies: Vocabulary[]) {
        this.vocabularies = vocabularies;
    }

    toQuestions(): QuestionDefinition[] {
        let r: QuestionDefinition[] = [];
        for (let index = 0; index < vocabularies.length; index++) {
            let v: Vocabulary = vocabularies[index];
            let q: QuestionDefinition = new QuestionDefinition(QuestionType.SINGLE_CHOICE, v.english);
            let o: QuestionOptionDefinition = new QuestionOptionDefinition(v.chinese, true);
            q.options.push(o);
            for (let i = 0; i <= 3; i++) {
                let v: Vocabulary = vocabularies[(index + i) % vocabularies.length];
                let o: QuestionOptionDefinition = new QuestionOptionDefinition(v.chinese, false);
                q.options.push(o);
            }
        }
        return r;
    }

}

