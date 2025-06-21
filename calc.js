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

    deleteAll() {
        this.head = null;
        this.next = null;
    }

    getValue(){
        let current = this.head;
        let result = "";
        while (current) {
        result += current.value;
        current = current.next;
        }
        return result;
    }

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

const buttons = document.querySelectorAll(".button-pushable")
const equation = new LinkedList;
let tokens = [];

//calculations
function calculation() {
    // Edge case
    const signs = ["+", "−", "×", "÷"]
    if (signs.includes(tokens[0])){
        document.getElementById("display").innerText = "SyntaxError";
        tokens = [];
        equation.deleteAll;
    }
}



//display

function update(value) {
    const currentDisplay = document.getElementById("display").innerText;
    if (currentDisplay === ".") {
        document.getElementById("display").innerText = value;
    } else {
       document.getElementById("display").innerText += value; 
    }
}

function clear() {
    const currentDisplay = document.getElementById("display").innerText;
    if (currentDisplay !== ".") {
        document.getElementById("display").innerText = ".";
    }
}

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

function cases(value) {
    if (document.getElementById("display").innerText === "SyntaxError") {
        document.getElementById("display").innerText = "."
    }
    equation.append(value)
    update(value);
}

function click() {
    let value = event.target.innerText;
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
        equation.print();
        calculation();
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
    default:
      console.log("invalid");
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",click )
}