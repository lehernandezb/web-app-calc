// creating linked list to store all values

// listNode class
class listNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Linked list class
class LinkedList {
    constructor() {
        this.head = null
    }

    // addes new value to the list
    append(value) {
        const newlistNode = new listNode(value);
        if (!this.head) {
        this.head = newlistNode;
        return;
        }
        let current = this.head;
        while (current.next) {
        current = current.next;
        }
        current.next = newlistNode;
    }

    // deletes a given value
    delete(value) {
        if (!this.head) return; // empty list

        // If the head needs to be deleted
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }


        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        // If found the listNode to delete
        if (current.next && current.next.value === value) {
            current.next = current.next.next;
        }
    }

    // deletes last value
    pop() {
        if (!this.head) return null; // empty list

        // If only one node
        if (!this.head.next) {
            const value = this.head.value;
            this.head = null;
            return value;
        }

        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;
        }
        const value = current.next.value;
        current.next = null;
        return value;
    }

    // deletes alll values
    deleteAll() {
        this.head = null;
        this.next = null;
    }

    // gets specific values
    getValue(){
        let current = this.head;
        let result = "";
        while (current) {
        result += current.value;
        current = current.next;
        }
        return result;
    }

    // prints the linked list
    print() {
        let current = this.head;
        let result = "";
        while (current) {
        result += current.value + " ";
        current = current.next;
        }
        console.log("Equation:", result.trim());
    }
}

// constents used through out code
const buttons = document.querySelectorAll(".button-pushable")
const equation = new LinkedList;
let tokens = [];
let onOrOff = false;
let answerCheck = false;
let answer = 0;

//calculations

/**
 * Does the actual calcualtions, first it handles edge cases, the moves on to multiplcation and divison,
 * thne handles addition and substraction.
 * @returns calculations to display ID
 */
function calculation() {
    // Edge cases

    // Starting with and operator or ends with operator
    const operators = ["+", "−", "×", "÷"]
    let length = tokens.length;
    if (tokens[0] ===  "−" && length >= 2) {
        tokens[1] = "-" + tokens[1];
        tokens.splice(0,1);
    } else {
        if (operators.includes(tokens[0]) || operators.includes(tokens[length - 1])){
            document.getElementById("display").innerText = "SyntaxError";
            tokens = [];
            equation.deleteAll();
            return;
        }
    }

    // Multiple operators next to each other
    for (let i = 0; i < length - 1; i++){
        if (operators.includes(tokens[i]) && (operators.includes(tokens[i+1]))){
            document.getElementById("display").innerText = "SyntaxError";
            tokens = [];
            equation.deleteAll();
            return;
        }
    }

    // BEDMAS calculations
    // Multiplication and Divison
    const multOrDiv = ["×", "÷"]
    for (let i = length - 1; i > 0; i--){
        if (multOrDiv.includes(tokens[i])){
           let left = tokens[i - 1];
           let right = tokens[i + 1];
           if (tokens[i] === multOrDiv[0]){
                tokens[i] = Number(left) * Number(right);
           } else {
                tokens[i] = Number(left) / Number(right);
           }
           tokens.splice(i + 1, 1); // Remove right operand
           tokens.splice(i - 1, 1); // Remove left operand
           length = tokens.length;
        }
    }

    // Addition and Subtraction
    const addOrMinus = ["+", "−"]
    for (let i = length - 1; i > 0; i--){
        if (addOrMinus.includes(tokens[i])){
           let left = tokens[i - 1];
           let right = tokens[i + 1];
           if (tokens[i] === addOrMinus[0]){
                tokens[i] = Number(left) + Number(right);
           } else {
                tokens[i] = Number(left) - Number(right);
           }
           tokens.splice(i + 1, 1); // Remove right operand
           tokens.splice(i - 1, 1); // Remove left operand
           length = tokens.length;
        }
    }
    tokens[0] = tokens[0].toString();
    document.getElementById("display").innerText = tokens[0];
    equation.deleteAll();
}


/**
 * updates the display with the the buttons being pressed
 * @param {NewType} value 
 */
function update(value) {
    const currentDisplay = document.getElementById("display").innerText;
    if (currentDisplay === ".") {
        document.getElementById("display").innerText = value;
    } else {
       document.getElementById("display").innerText += value; 
    }
}

/**
 * clears display
 */
function clear() {
    const currentDisplay = document.getElementById("display").innerText;
    if (currentDisplay !== ".") {
        document.getElementById("display").innerText = ".";
    }
}

/**
 * deletes the last thing displayed
 */
function deleteLast(){
    const currentDisplay = document.getElementById("display").innerText;
    const length = currentDisplay.length;
    let value = "";
    if (length > 1) {
        for (let i = 0; i < length - 1; i++) {
            value += currentDisplay.charAt(i);
        }
        document.getElementById("display").innerText = value;
    } else {
        document.getElementById("display").innerText = ".";
    }
}

function testLast(equation) {
    if (equation.head === null && tokens.length > 0){
        let length = tokens.length;
        if (tokens[length - 1] !== "÷" && tokens[length - 1] !== "×" && tokens[length - 1] !== "−" && tokens[length - 1] !== "+" ) {
            for (let i = 0; i < tokens[length - 1].length; i++) {
                equation.append(tokens[length - 1].charAt(i));
            }
        } 
        tokens.pop();
    }
    if (
        equation.head &&
        (equation.head.value === "÷" ||
         equation.head.value === "×" ||
         equation.head.value === "−" ||
         equation.head.value === "+")
    ) {
        equation.deleteAll();
    }
}

/**
 * Used to aviod repeat code
 * @param {number} value 
 */
function cases(value) {
    if (document.getElementById("display").innerText === "SyntaxError" || document.getElementById("display").innerText === "NaN") {
        document.getElementById("display").innerText = "."
    }
    if (answerCheck === true ) {
        document.getElementById("display").innerText = "."
        answerCheck = false;
    }
    equation.append(value)
    update(value);
}

function click() {

    const currentDisplay = document.getElementById("display").innerText;
    if (currentDisplay.length > 27) {
        let trimLength = currentDisplay.length - 27;
        document.getElementById("display").innerText = currentDisplay.slice(trimLength);
    }

    let value = event.target.innerText;
    if (onOrOff === false){
        if (value === "ON") {
            onOrOff = true;
            document.getElementById("display").innerText = ".";
        }
    } else {
        switch (value){
        case "1":
            cases("1")
            break;
        case "2":
            cases("2")
            break;
        case "3":
            cases("3")
            break;
        case "4":
            cases("4")
            break;
        case "5":
            cases("5")
            break;
        case "6":
            cases("6")
            break;
        case "7":
            cases("7")
            break;
        case "8":
            cases("8")
            break;
        case "9":
            cases("9")
            break;
        case "0":
            cases("0")
            break;
        case ".":
            cases(".")
            break;
        case "=":
            if (equation.getValue() != '') {
                tokens.push(equation.getValue());
            }
            console.log(tokens);
            equation.print();
            calculation();
            if (tokens.length > 0  && !tokens.includes("NaN")) {
                answer = tokens[0].trim();
                answerCheck = true;
            }
            tokens = [];
            console.log(tokens);
            equation.print();
            break;
        case "+":
            if (equation.getValue() != '') {
                tokens.push(equation.getValue());
            }
            tokens.push("+");
            equation.deleteAll();
            update("+");
            console.log(tokens);
            break;
        case "−":
            if (equation.getValue() != '') {
                tokens.push(equation.getValue());
            }
            tokens.push("−");
            equation.deleteAll();
            update("−");
            console.log(tokens);
            break;
        case "×":
            if (equation.getValue() != '') {
                tokens.push(equation.getValue());
            }
            tokens.push("×");
            equation.deleteAll();
            update("×");
            console.log(tokens);
            break;
        case "÷":
            if (equation.getValue() != '') {
                tokens.push(equation.getValue());
            }
            tokens.push("÷");
            equation.deleteAll();
            update("÷");
            console.log(tokens);
            break;
        case "AC":
            equation.deleteAll();
            clear();
            tokens = [];
            break;
        case "←":
            equation.pop();
            deleteLast();
            testLast(equation);
            break;
        case "ON":
            document.getElementById("display").innerText = " ";
            onOrOff = false;
            equation.deleteAll();
            tokens = [];
            break;
        case "Ans":
            if (answer !== 0){
                cases(answer);
                let currentDisplay = document.getElementById("display").innerText;
                if (currentDisplay.length > 27) {
                    let trimLength = currentDisplay.length - 27;
                    document.getElementById("display").innerText = currentDisplay.slice(trimLength);
                }   
            }
           break;
        default:
        console.log("invalid");
        }
    }
}

/**
 * checks if a button has been pressed
 */
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",click )
}