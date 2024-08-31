// global variables

let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function() {

    // create variables for display: previous and current screen.
    const previousScreen = document.querySelector(".previous");
    const currentScreen = document.querySelector(".current");

    // add functionality so I can use keyboard to operate calculator.
    window.addEventListener('keydown', handleKeyPress) // add an event listener to the window that handles any key press.

    // create variables for equals, operators, clear, decimal and number buttons.
    const equals = document.querySelector(".btn-equals");
    equals.addEventListener("click", () => { // add an event listener to equals button.
        if (currentValue != "" && previousValue != "") { // equals will not calculate unless the user inputs a number, operator, and number.
            operate();
        }
    });

    const decimal = document.querySelector(".btn-decimal");
    decimal.addEventListener("click", () => { // add an event listener to decimal button.
        addDecimal();
    })

    const clear = document.querySelector(".btn-clear");
    clear.addEventListener("click", clearCalculator); // add an event listener to clear button.

    const numbers = document.querySelectorAll(".btn-number"); // querySelectorAll to take in all number buttons.

    const operators = document.querySelectorAll(".btn-operator"); // querySelectorAll to take in all operator buttons.

    // Update display. Get the value of the number button clicked. 
    numbers.forEach((btn) => {
        btn.addEventListener("click", (e) => { // add an event listener to all numbers buttons
            handleNumber(e.target.textContent);
        });
    });

    function handleNumber(number) {
        // add a check to enable the user to enter more values after the initial calculation.
        if (previousValue !== "" && currentValue !== "" && operator === "") {
            previousValue = ""
            currentScreen.textContent = currentValue
        }
        // Limit the lenth of digits user can input in the display to 12.
        if (currentValue.length <= 12) { 
            currentValue += number; // Here's how to get the value of the number button clicked.
            currentScreen.textContent = currentValue; // Display it.
        } 
    }

    // Function for operator buttons. 
    operators.forEach((btn) => {
        btn.addEventListener("click", (e) => { // add an event listener to all operator buttons.
            handleOperators(e.target.textContent);
        });
    });

    function handleOperators(op) {
        if (previousValue === "") {
            previousValue = currentValue;
            operatorCheck(op);
        } else if (currentValue === "") {
            operatorCheck(op);
        } else {
            operate();
            operator = op;
            currentScreen.textContent = "0"; // default display is 0.
            previousScreen.textContent = previousValue + " " + operator; // display the previous value as well as the operator.
        }
    }

    // add a function that allows the user to evaluate a pair of numbers e.g (12 + 7), display the result if an operator is selected (19), and use that result as the first number in a new calculation.
    function operatorCheck(text) {
        operator = text;
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = "0";
        currentValue = "";
    }

    // Function to handle the equals. Needs to take an operator and 2 numbers.
    // Created a variable for each number(PreviousValue = Number and currentValue = Number).
    function operate() {
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);
        // if conditions for basic calculator.
        if (operator === "+") {
            previousValue = previousValue + currentValue;
        } else if (operator === "-") {
            previousValue = previousValue - currentValue;
        } else if (operator === "X") {
            previousValue = previousValue * currentValue;
        } else if (operator === "/") {
            if (currentValue <= 0) { // snarky error message when user tries to divide by 0.
                previousValue = "Ah ah ah! Can't divide by 0!";
                displayResult();
                return;
            }
            previousValue = previousValue / currentValue;
        }
        previousValue = roundNumber(previousValue); 
        previousValue = previousValue.toString();
        displayResult();
    }

    function roundNumber(num) {
        return Math.round(num * 1000000) / 1000000; // round number to a maximum number of digits after.
    }

    function displayResult() {  
        if(previousValue.length <= 12 ) {
            currentScreen.textContent = previousValue;
        } else {
            currentScreen.textContent = previousValue.slice(0, 12) + "..."; // display 3 dots after 12 digits
        }
        previousScreen.textContent = "";
        operator = "";
        currentValue = "";
    }

    // add clear function. Essentially reverts everything to an empty string. 
    function clearCalculator() {
        currentValue = "";
        previousValue = "";
        operator = "";
        currentScreen.textContent = "0"; // default value of 0.
        previousScreen.textContent = "";
    }

    // add decimal function. Allows user to include a decimal only once when entering a value.
    function addDecimal() {
        if (!currentValue.includes('.')) {
            currentValue += ".";
            currentScreen.textContent = currentValue;
        }
    }

    // Function to handle the keyboard. Allows user to interact with calculator using numbers, decimal, operators, and enter key (for equals).
    function handleKeyPress(e) {
        e.preventDefault();
        if (e.key >= 0 && e.key <= 9) {
            handleNumber(e.key)
        }
        if (
            e.key === "Enter" || 
            (e.key === "-" && currentValue != "" && previousValue != "")
        ) {
            operate();
        }
        if (e.key === "+" || e.key === "-" || e.key === "/") {
            handleOperators(e.key);
        }
        if (e.key === "*") {
            handleOperators("X");
        }
        if (e.key === ".") {
            addDecimal();
        }

    }
})

