class Greeter {
    test() {
        let b = new QuestionDefinitionMathBuilder1();
        b.toQuestions();
    }
}

window.onload = () => {
    let el = document.getElementById('content');
    let g = new Greeter();
    el.innerText = "AA";
    el.onclick = () => {
        g.test();
    };
};