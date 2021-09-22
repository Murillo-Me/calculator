Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

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
    if (b == 0) return 'ERROR'
    else return a / b
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

function eraseLastDigit() {
    if (display.textContent.length == 1) {
        display.textContent = 0
        return
    }
    display.textContent = display.textContent.slice(0,-1)
}

function makeDecimal() {
    if (display.textContent.includes('.')) return;
    else display.textContent += '.'
}

function invertSign() {
    display.textContent = -1 * parseFloat(display.textContent)
}

function numberToPercentage() {
    display.textContent = parseFloat(display.textContent) / 100
}

// COMPUTES USER INPUT FROM KEYBOARD
function keyboardInput(event) {
    console.log(event.keyCode);

    // IF USER INPUTS 'ENTER', THEN RETURN RESULT
    if (event.keyCode == 13) {
        computeOperation()
        return
    }

    // IF USER INPUTS 'ESC', THEN CLEAR CALCULATOR
    if (event.keyCode == 27) {
        resetDisplay()
        return
    }

    // IF USER INPUTS 'BACKSPACE' THEN CLEAR LAST DIGIT
    if (event.keyCode == 8) {
        eraseLastDigit()
        return
    }

    // IF USER INPUTS A NUMBER FROM 0 TO 9, SHOW ON DISPLAY
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
        // IF USER INPUTS AN OPERATOR, SAVE IT, THEN GET NEXT NUMBER
        if (isOperatorInput(event.keyCode) != undefined) {
            saveOperator(isOperatorInput(event.keyCode).operator)
        }        
        return
    }
}

// CHECKS IF KEY PRESSED IS 0-9, BOTH ON NUMERIC ROW OF KEYBOARD AND NUM PAD
function isNumericInput(keyCode) {
    return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
}

function isOperatorInput(keyCode) {
    const operatorCodes = [{
                                key: 106,
                                operator: 'multiply',
                            },
                            {
                                key: 107,
                                operator: 'add',
                            },
                            {
                                key: 109,
                                operator: 'subtract',
                            },
                            {
                                key: 111,
                                operator: 'divide',
                            }
                        ]

    return (operatorCodes.find(code => {
        return (code.key == keyCode)
    }))
}

let operationOnMemory = null
let receiveSecondDigit = false
let enterFirstNumber = true
let enterSecondNumber = false

let firstNumber = null
let secondNumber = null

function saveOperator(operator) {
    firstNumber = parseFloat(display.textContent)

    if (saveOperator.caller == keyboardInput) operationOnMemory = operator
    else operationOnMemory = this.id

    receiveSecondDigit = true
    enterSecondNumber = true
}

function computeOperation() {
    secondNumber = parseFloat(display.textContent)
    let result = null
    switch (operationOnMemory) {
        case "add":
            result = add(firstNumber, secondNumber);
            break;
        case "subtract":
            result = subtract(firstNumber, secondNumber);
            break;
        case "multiply":
            result = multiply(firstNumber, secondNumber);
            break;
        case "divide":
            result = divide(firstNumber, secondNumber);
            break;
    }

    if (result != 'ERROR' && result.countDecimals() > 2) result = Math.round(result * 100) / 100

    if (result != 'ERROR' && result/10000000 > 1) {
        result = result.toExponential()
        if (result.length > 7) {
            result = result.slice(0,6) + result.slice(-1*(result.length - result.indexOf('e')))
        }
    }
    
    display.textContent = result

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

const decimalBtn = document.querySelector('button#decimal')
decimalBtn.addEventListener('click', makeDecimal)

const signBtn = document.querySelector('button#sign')
signBtn.addEventListener('click', invertSign)

const percentageBtn = document.querySelector('button#percentage')
percentageBtn.addEventListener('click', numberToPercentage)

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', saveOperator))

const equals = document.querySelector('button#equals')
equals.addEventListener('click', computeOperation)

document.addEventListener('keydown', keyboardInput)
