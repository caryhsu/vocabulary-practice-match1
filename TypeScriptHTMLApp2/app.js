var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.test = function () {
        var b = new QuestionDefinitionMathBuilder1();
        b.toQuestions();
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var g = new Greeter();
    el.innerText = "AA";
    el.onclick = function () {
        g.test();
    };
};
//# sourceMappingURL=app.js.map