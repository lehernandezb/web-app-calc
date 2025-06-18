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


function update(value) {
    let curr = document.getElementById("display").innerText;
    
    if (curr === ".") {
        document.getElementById("display").innerText = value;
    } else {
       document.getElementById("display").innerText += value; 
    }
}

function click() {
    let value = event.target.innerText;
    switch (value){
        case "1":
        update("1")
        equation.append("1")
        break;
    case "2":
        equation.append("2")
        update("2")
        break;
    case "3":
        equation.append("3")
        update("3");
        break;
    case "4":

        equation.append("4")
        update("4");
        break;
    case "5":
        equation.append("5")
        update("5");
        break;
    case "6":
        console.log("6");
        equation.append("6")
        update("6");
        break;
    case "7":
        equation.append("7")
        update("7");
        break;
    case "8":
        equation.append("8")
        update("8");
        break;
    case "9":
        equation.append("9")
        update("9");
        break;

    case "=":
        equation.print();
        break;

    case "+":
        tokens.push(equation.getValue());
        tokens.push("+");
        equation.deleteAll();
        update("+");
        console.log(tokens);
        break;
    case "−":
        tokens.push(equation.getValue());
        tokens.push("−");
        equation.deleteAll();
        update("−");
        console.log(tokens);
        break;
    case "×":
        tokens.push(equation.getValue());
        tokens.push("×");
        equation.deleteAll();
        update("×");
        console.log(tokens);
        break;
    case "÷":
        tokens.push(equation.getValue());
        tokens.push("÷");
        equation.deleteAll();
        update("÷");
        console.log(tokens);
        break;

    default:
      console.log("invalid");
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",click )
}