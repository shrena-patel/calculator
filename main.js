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
        const firstNumber = Number(calculator.dataset.firstNumber)
        const operator = calculator.dataset.operator
        const secondNumber = Number(displayValue)
        // console.log(firstNumber, operator, secondNumber)


        let result = ''
        if (operator == 'plus') result = firstNumber + secondNumber
        if (operator == 'minus') result = firstNumber - secondNumber
        if (operator == 'times') result = firstNumber * secondNumber
        if (operator == 'divide') result = firstNumber / secondNumber
        // console.log(result)

        display.textContent = result


    }

    calculator.dataset.previousKeyType = type
})

