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
    this.head = null;
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


function click() {
    let value = event.target.innerText;
    switch (value){
        case "1":
        console.log("1");
        equation.append(1)
        break;
    case "2":
        console.log("2");
        equation.append(2)
        break;
    case "3":
        console.log("3");
        equation.append(3)
        break;
    case "4":
        console.log("4");
        equation.append(4)
        break;
    case "5":
        console.log("5");
        equation.append(5)
        break;
    case "6":
        console.log("6");
        equation.append(6)
        break;
    case "7":
        console.log("7");
        equation.append(7)
        break;
    case "8":
        console.log("8");
        equation.append(8)
        break;
    case "9":
        console.log("9");
        equation.append(9)
        break;

    case "=":
        equation.print();
    default:
      console.log("invalid");
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",click )
}