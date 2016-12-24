class QuestionDefinitionMathBuilder1 {

    // format ax+b=cx+d, solve x

    prefix: string = 'Solve x for following equation:';
    signRange1: string[] = ["+", "-"]; 
    signRange2: string[] = ["+", "-"];
    minNumber: number = -10;
    maxNumber: number = 10;
    containsA: boolean = true; 
    containsB: boolean = false; 
    containsC: boolean = false; 
    containsD: boolean = true; 

    ZERO_RANGE: number[] = [0];

    toQuestions(): Question[] {
        let r: Question[] = [];
                
        let rangeA: number[] = this.ZERO_RANGE;
        if (this.containsA) rangeA = this.buildArray(this.minNumber, this.maxNumber, false);
        let rangeB: number[] = this.ZERO_RANGE;
        if (this.containsB) rangeB = this.buildArray(this.minNumber, this.maxNumber, false);
        let rangeC: number[] = this.ZERO_RANGE;
        if (this.containsC) rangeC = this.buildArray(this.minNumber, this.maxNumber, false);
        let rangeD: number[] = this.ZERO_RANGE;
        if (this.containsD) rangeD = this.buildArray(this.minNumber, this.maxNumber, false);

        for (let index = 0; index < 200; index++) {
            let a: number = getRandomValueInArray(rangeA);
            let b: number = getRandomValueInArray(rangeB);
            let c: number = getRandomValueInArray(rangeC);
            let d: number = getRandomValueInArray(rangeD);
            let sign1: string = getRandomValueInArray(this.signRange1);
            let sign2: string = getRandomValueInArray(this.signRange2);
            let e = new Equation(a, sign1, b, c, sign2, d);

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
    }

    buildArray(min: number, max: number, allowZero: boolean): number[] {
        let result: number[] = [];
        for (let value = min; value <= max; value++) {
            if (allowZero == false && value == 0) continue;
            result.push(value);
        }
        return result;
    }

}

class Equation {
    a: number;
    sign1: string; // '+', '-', ''
    b: number;
    c: number;
    sign2: string; // '+', '-', ''
    d: number;

    constructor(a: number, sign1: string, b: number, c: number, sign2: string, d: number) {
        this.a = a;
        this.sign1 = sign1;
        this.b = b;
        this.c = c;
        this.sign2 = sign2;
        this.d = d;
    }

    toString(): string {
        let text: string = '';
        text += this.generatePart(this.a, this.sign1, this.b);
        text += ' = ';
        text += this.generatePart(this.c, this.sign2, this.d);
        return text;
    }

    isAnySolution(): boolean {
        let v1 = this.a - this.getSignValue(this.sign1) * this.c;
        let v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 == 0 && v2 == 0;
    }

    isOnlyOneSolution(): boolean {
        let v1 = this.a - this.getSignValue(this.sign1) * this.c;
        let v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 != 0;
    }

    isNoneSolution(): boolean {
        let v1 = this.a - this.getSignValue(this.sign1) * this.c;
        let v2 = this.b - this.getSignValue(this.sign2) * this.d;
        return v1 == 0 && v2 != 0;
    }

    answer(): Fraction {
        let v1 = this.a - this.getSignValue(this.sign1) * this.c;
        let v2 = this.b - this.getSignValue(this.sign2) * this.d;
        let f1 = new Fraction(1, v2, v1);
        let f2 = f1.simply();
        return f2;
    }

    getSignValue(sign: string): number {
        if (sign == '-') {
            return -1;
        }
        else {
            return 1;
        }
    }

    generatePart(a: number, sign: string, b: number): string {
        let text: string = '';
        if (a != 0)
            text += (a + 'x');
        if (b != 0) {
            let sign2 = b > 0 ? '+' : '-';
            if (sign == '-' && sign2 == '+') {
                sign = '+';
                sign2 = '-';
            }
            if (sign == '+' && sign == sign2) sign = '';
            if (sign == '+' && a == 0) sign = '';
            let parentheses: boolean = false;
            if (sign != '' && (sign != sign2 || sign == '-'))
                parentheses = true;
            text += sign;
            if (parentheses) 
                text += '(';
            if (sign2 == '+') sign2 = '';
            if (sign2 == '-') b = Math.abs(b);
            text += sign2;
            text += ('' + b);
            if (parentheses)
                text += ')';
            text;
        }
        if (text == '') text = '0';
        return text;
    }

}

class MathHelper {
    static gcd(a: number, b: number) {
        if (!b) {
            return a;
        }
        return this.gcd(b, a % b);
    }
}

const x = 3;

class MathMLHelper {
    static toMathMLBody(n: number): string {
        let result: string = '';
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
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValueInArray(array) {
    var index = getRandomInt(0, array.length - 1);
    return array[index];
}

class Fraction {
    sign: number; // -1, 1, 0
    molecular: number;
    denominator: number;

    constructor(sign: number, molecular: number, denominator: number) {
        this.sign = sign;
        this.molecular = molecular;
        this.denominator = denominator;
    }

    toMathML(): string {
        let mathML = '';
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
    }

    simply(): Fraction {
        let v1 = this.denominator;
        let v2 = this.molecular;
        if (v1 == 0) return this;
        if (v2 == 0) return new Fraction(0, 0, 1);
        let sign: number;
        if (this.sign * v1 * v2 > 0)
            sign = 1;
        else
            sign = -1
        v1 = Math.abs(v1);
        v2 = Math.abs(v2);
        let g: number = MathHelper.gcd(v1, v2);
        if (g != 1) {
            v1 = v1 / g;
            v2 = v2 / g;
        }
        let result: Fraction = new Fraction(sign, v2, v1);
        return result;
    }

    toString(): string {
        let v1 = this.denominator;
        let v2 = this.molecular;
        if (v1 == 0) return "NaN";
        if (this.sign == 0 || v2 == 0) return "0";
        let sign: string;
        if (this.sign > 0) 
            sign = '+';
        else
            sign = '-'
        let result: string = '';
        if (sign == '-') result += '-';
        result = "" + v2;
        if (v1 != 1) result += "/" + v1;
        return result;
    }
}
