const calculator = document.querySelector('.calculator')

const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

keys.addEventListener('click', event => {

    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type

    // Is this a number key?
    if (type == 'number') {
        if (displayValue == '0') {
            display.textContent = keyValue
        } else if (previousKeyType == 'operator') {

        } else {
            display.textContent = displayValue + keyValue
        }
    }


    // Is this an operator key?
    if (type == 'operator') {
        console.log(key)


        calculator.dataset.previousKeyType = 'operator'
    }




})
