/* First things I want my calculator to do:

- When the user clicks a number or operator button,the display should update with the value
of the button.

- When the clear button is clicked, the display should reset/clear.

- When the equals button is clicked, the display should update with the result of the
equation that is displayed but also display the previous equation.
*/

//  Update the display when a number or operator button is clicked

let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function() {
    const clear = document.querySelector(".btn-clear");
    const equals = document.querySelector(".btn-equals");
    const decimal = document.querySelector(".btn-decimal");

    const numbers = document.querySelectorAll(".btn-number");
    const operators = document.querySelectorAll(".btn-operator");

    const previousScreen = document.querySelector(".previous");
    const currentScreen = document.querySelector(".current");

// add an eventListener to each of the number buttons

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent)
        // get the value of the number button clicked. Update the display.
        currentScreen.textContent = currentValue; 
    }))

// add an eventListener to each of the operator buttons

operators.forEach((op) => op.addEventListener("click", function(e) {
    handleOperator(e.target.textContent)
    }))
})

function handleNumber(num) {
    if(currentValue.length <= 15) { // limit the lenth of digits user can input in the display to 15.
        currentValue += num; // get the value of the number button clicked.
    }
}

function handleOperator(op) {
    console.log(op);
}





