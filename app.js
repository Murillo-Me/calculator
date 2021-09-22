function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function testOperations(a,b) {
    console.log(`Adding operation: ${a} + ${b} = ${add(a,b)}`);
    console.log(`Subtracting operation: ${a} - ${b} = ${subtract(a,b)}`);
    console.log(`Multiplying operation: ${a} * ${b} = ${multiply(a,b)}`);
    console.log(`Dividing operation: ${a} / ${b} = ${divide(a,b)}`);
}

function resetDisplay() {
    display.textContent = 0
    operationOnMemory = null
    receiveSecondDigit = false
    enterFirstNumber = true
    enterSecondNumber = false
}

function invertSign() {
    display.textContent = -1 * parseFloat(display.textContent)
}

function numberToPercentage() {
    display.textContent = parseFloat(display.textContent) / 100
}

function keyboardInput(event) {
    if (isNumericInput(event.keyCode)) {
        if (display.textContent.length > 8) return

        if (!receiveSecondDigit) {
            if (display.textContent == 0) display.textContent = event.key
            else display.textContent += event.key
        } else {
            receiveSecondDigit = false
            display.textContent = event.key
        }
    } else {
        return
    }
}

function isNumericInput(keyCode) {
    return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
}

let operationOnMemory = null
let receiveSecondDigit = false
let enterFirstNumber = true
let enterSecondNumber = false

let firstNumber = null
let secondNumber = null

function saveOperator() {
    firstNumber = parseFloat(display.textContent)
    operationOnMemory = this.id
    receiveSecondDigit = true
    enterSecondNumber = true
}

function computeOperation() {
    secondNumber = parseFloat(display.textContent)
    switch (operationOnMemory) {
        case "add":
            display.textContent = add(firstNumber, secondNumber);
            break;
        case "subtract":
            display.textContent = subtract(firstNumber, secondNumber);
            break;
        case "multiply":
            display.textContent = multiply(firstNumber, secondNumber);
            break;
        case "divide":
            display.textContent = divide(firstNumber, secondNumber);
            break;
    }
    operationOnMemory = null
    firstNumber = null
    secondNumber = null
    enterFirstNumber = true
    enterSecondNumber = false
}

const display = document.querySelector('span#display')
display.textContent = 0

const resetBtn = document.querySelector('button#AC')
resetBtn.addEventListener('click', resetDisplay)

const digits = document.querySelectorAll('.digit')
digits.forEach(digitBtn => digitBtn.addEventListener('click', e => {
    if (display.textContent.length > 8) return

    if (!receiveSecondDigit) {
        if (display.textContent == 0) display.textContent = e.target.textContent
        else display.textContent += e.target.textContent
    } else {
        receiveSecondDigit = false
        display.textContent = e.target.textContent
    }
}))

const signBtn = document.querySelector('button#sign')
signBtn.addEventListener('click', invertSign)

const percentageBtn = document.querySelector('button#percentage')
percentageBtn.addEventListener('click', numberToPercentage)

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', saveOperator))

const equals = document.querySelector('button#equals')
equals.addEventListener('click', computeOperation)

document.addEventListener('keydown', keyboardInput)
