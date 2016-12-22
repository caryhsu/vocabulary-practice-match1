enum QuestionType {
    SINGLE_CHOICE, 
    MULTIPLE_CHOICE
}

class QuestionDefinition {
    type: QuestionType;
    text: string;
    url: string;
    options: QuestionOptionDefinition[];
    constructor(type: QuestionType, text: string, url?: string, options?: QuestionOptionDefinition[]) {
        this.type = type;
        this.text = text;
        this.url = url;
        this.options = options;
    }
}

class QuestionOptionDefinition {
    text: string;
    right: boolean;
    constructor(text: string, right: boolean) {
        this.text = text;
        this.right = right;
    }

}

