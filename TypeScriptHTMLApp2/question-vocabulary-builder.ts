class QuestionDefinitionVocabularyBuilder {

    vocabularies: Vocabulary[];

    constructor(vocabularies: Vocabulary[]) {
        this.vocabularies = vocabularies;
    }

    toQuestions(): Question[] {
        let r: Question[] = [];
        for (let index = 0; index < vocabularies.length; index++) {
            let v: Vocabulary = vocabularies[index];
            let q: Question = new Question(QuestionType.SINGLE_CHOICE, v.english);
            let o: QuestionOption = new QuestionOption(v.chinese, true);
            q.options.push(o);
            for (let i = 0; i <= 3; i++) {
                let v: Vocabulary = vocabularies[(index + i) % vocabularies.length];
                let o: QuestionOption = new QuestionOption(v.chinese, false);
                q.options.push(o);
            }
        }
        return r;
    }

}

