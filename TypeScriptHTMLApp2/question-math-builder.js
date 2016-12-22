var QuestionDefinitionMathBuilder1 = (function () {
    function QuestionDefinitionMathBuilder1() {
        // format ax+b=cx+d, solve x
        this.prefix = 'Solve x for following equation:';
        this.signRange1 = ["+", "-"];
        this.signRange2 = ["+", "-"];
        this.minNumber = -10;
        this.maxNumber = 10;
        this.containsA = true;
        this.containsB = false;
        this.containsC = false;
        this.containsD = true;
        this.ZERO_RANGE = [0];
    }
    QuestionDefinitionMathBuilder1.prototype.toQuestions = function () {
        var r = [];
        var rangeA = this.ZERO_RANGE;
        if (this.containsA)
            rangeA = this.buildArray(this.minNumber, this.maxNumber, false);
        var rangeB = this.ZERO_RANGE;
        if (this.containsB)
            rangeB = this.buildArray(this.minNumber, this.maxNumber, false);
        var rangeC = this.ZERO_RANGE;
        if (this.containsC)
            rangeC = this.buildArray(this.minNumber, this.maxNumber, false);
        var rangeD = this.ZERO_RANGE;
        if (this.containsD)
            rangeD = this.buildArray(this.minNumber, this.maxNumber, false);
        for (var index = 0; index < 200; index++) {
            var a = getRandomValueInArray(rangeA);
            var b = getRandomValueInArray(rangeB);
            var c = getRandomValueInArray(rangeC);
            var d = getRandomValueInArray(rangeD);
            var sign1 = getRandomValueInArray(this.signRange1);
            var sign2 = getRandomValueInArray(this.signRange2);
            var e = new Equation(a, sign1, b, c, sign2, d);
            console.log(e.toString() + ":" + e.answer());
        }
        /*
        for (let a of rangeA) {
            for (let sign1 of this.signRange1) {
                for (let b of rangeB) {
                    for (let c of rangeC) {
                        for (let sign2 of this.signRange2) {
                            for (let d of rangeD) {
                                let e = new Equation(a, sign1, b, c, sign2, d);
                                console.log(e.toString() + ":" + e.answer());
                            }
                        }
                    }
                }
            }
        }
        */
        return r;
    };
    QuestionDefinitionMathBuilder1.prototype.buildArray = function (min, max, allowZero) {
        var result = [];
        for (var value = min; value <= max; value++) {
            if (allowZero == false && value == 0)
                continue;
            result.push(value);
        }
        return result;
    };
    return QuestionDefinitionMathBuilder1;
}());
var Equation = (function () {
    function Equation(a, sign1, b, c, sign2, d) {
        this.a = a;
        this.sign1 = sign1;
        this.b = b;
        this.c = c;
        this.sign2 = sign2;
        this.d = d;
    }
    Equation.prototype.toString = function () {
        var text = '';
        text += this.generatePart(this.a, this.sign1, this.b);
        text += ' = ';
        text += this.generatePart(this.c, this.sign2, this.d);
        return text;
    };
    Equation.prototype.isAnySolution = function () {
        var v1 = this.a - this.getSignValue(this.sign1) * this.c;
        var v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 == 0 && v2 == 0;
    };
    Equation.prototype.isOnlyOneSolution = function () {
        var v1 = this.a - this.getSignValue(this.sign1) * this.c;
        var v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 != 0;
    };
    Equation.prototype.isNoneSolution = function () {
        var v1 = this.a - this.getSignValue(this.sign1) * this.c;
        var v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 == 0 && v2 != 0;
    };
    Equation.prototype.answer = function () {
        var v1 = this.a - this.getSignValue(this.sign1) * this.c;
        var v2 = this.b - this.getSignValue(this.sign2) * this.d;
        var f1 = new Fraction(1, v2, v1);
        var f2 = f1.simply();
        return f2;
    };
    Equation.prototype.getSignValue = function (sign) {
        if (sign == '-') {
            return -1;
        }
        else {
            return 1;
        }
    };
    Equation.prototype.generatePart = function (a, sign, b) {
        var text = '';
        if (a != 0)
            text += (a + 'x');
        if (b != 0) {
            var sign2 = b > 0 ? '+' : '-';
            if (sign == '-' && sign2 == '+') {
                sign = '+';
                sign2 = '-';
            }
            if (sign == '+' && sign == sign2)
                sign = '';
            if (sign == '+' && a == 0)
                sign = '';
            var parentheses = false;
            if (sign != '' && (sign != sign2 || sign == '-'))
                parentheses = true;
            text += sign;
            if (parentheses)
                text += '(';
            if (sign2 == '+')
                sign2 = '';
            if (sign2 == '-')
                b = Math.abs(b);
            text += sign2;
            text += ('' + b);
            if (parentheses)
                text += ')';
            text;
        }
        if (text == '')
            text = '0';
        return text;
    };
    return Equation;
}());
var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.gcd = function (a, b) {
        if (!b) {
            return a;
        }
        return this.gcd(b, a % b);
    };
    return MathHelper;
}());
var x = 3;
var MathMLHelper = (function () {
    function MathMLHelper() {
    }
    MathMLHelper.toMathMLBody = function (n) {
        var result = '';
        if (n < 0) {
            result += '<mrow>';
            result += '<mo>-</mo>';
            result += '<mu>' + n + '</mu>';
            result += '</mrow>';
        }
        else {
            result += '<mu>' + n + '</mu>';
        }
        return result;
    };
    return MathMLHelper;
}());
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomValueInArray(array) {
    var index = getRandomInt(0, array.length - 1);
    return array[index];
}
var Fraction = (function () {
    function Fraction(sign, molecular, denominator) {
        this.sign = sign;
        this.molecular = molecular;
        this.denominator = denominator;
    }
    Fraction.prototype.toMathML = function () {
        var mathML = '';
        mathML += '<math xmlns="http://www.w3.org/1998/Math/MathML" >';
        if (this.sign == 0) {
            mathML += '<mn>0</mn>';
        }
        else {
            mathML += '<mfrac>';
            mathML += MathMLHelper.toMathMLBody(this.molecular);
            mathML += MathMLHelper.toMathMLBody(this.denominator);
            mathML += '</mfrac>';
        }
        mathML += '</math>';
        return mathML;
    };
    Fraction.prototype.simply = function () {
        var v1 = this.denominator;
        var v2 = this.molecular;
        if (v1 == 0)
            return this;
        if (v2 == 0)
            return new Fraction(0, 0, 1);
        var sign;
        if (this.sign * v1 * v2 > 0)
            sign = 1;
        else
            sign = -1;
        v1 = Math.abs(v1);
        v2 = Math.abs(v2);
        var g = MathHelper.gcd(v1, v2);
        if (g != 1) {
            v1 = v1 / g;
            v2 = v2 / g;
        }
        var result = new Fraction(sign, v2, v1);
        return result;
    };
    Fraction.prototype.toString = function () {
        var v1 = this.denominator;
        var v2 = this.molecular;
        if (v1 == 0)
            return "NaN";
        if (this.sign == 0 || v2 == 0)
            return "0";
        var sign;
        if (this.sign > 0)
            sign = '+';
        else
            sign = '-';
        var result = '';
        if (sign == '-')
            result += '-';
        result = "" + v2;
        if (v1 != 1)
            result += "/" + v1;
        return result;
    };
    return Fraction;
}());
//# sourceMappingURL=question-math-builder.js.map