const calculator = document.querySelector('.calculator')

const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

keys.addEventListener('click', event => {

    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    // Is this a number key?
    if (type == 'number') {
        if (displayValue == '0') {
            display.textContent = keyValue
        } else if (previousKeyType == 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }

    }


    // Is this an operator key?
    if (type == 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        //change below to a map
        operatorKeys.forEach(e => { e.dataset.state = '' })
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type == 'equal') {
        // perform a calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        // console.log(firstNumber, operator, secondNumber)
        display.textContent = calculate(firstNumber, operator, secondNumber)
    }

    if (type == 'clear') {
        display.textContent = '0'  
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)
    
    if (operator == 'plus') return firstNumber + secondNumber
    if (operator == 'minus') return firstNumber - secondNumber
    if (operator == 'times') return firstNumber * secondNumber
    if (operator == 'divide') return firstNumber / secondNumber
  
}

// TESTING ============================================ //

function clearCalculator () {
    const clearKey = document.querySelector('[data-type="clear"]')
    clearKey.click()
}

function testClearKey () {
    clearCalculator()
    console.assert(display.textContent == '0', 'Clear key. Display should be 0') 
    console.assert(!calculator.dataset.firstNumber, 'Clear key. No first number')
    console.assert(!calculator.dataset.operator, 'Clear key. No operator')
}

const one = document.querySelector('.one')
const five = document.querySelector('.five')
const nine = document.querySelector('.nine')

//one test

one.click()
console.assert(display.textContent == '1', 'Clicked one')
clearCalculator()
testClearKey()

// 15 test
one.click()
five.click()
console.assert(display.textContent == '15', 'Clicked 1 and 5')
clearCalculator()
testClearKey()

// 159 test
one.click()
five.click()
nine.click()
console.assert(display.textContent == '159', 'Clicked 1, 5 and 9')
clearCalculator()
testClearKey()