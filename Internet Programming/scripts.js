class Calculator {
    constructor(prevOperandTextElement , currOperandTextElement )
    {
        this.prevOperandTextElement  = prevOperandTextElement;
        this.currOperandTextElement= currOperandTextElement; 
        this.clear();
    }

    clear(){
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete()
    { 
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number)
    {
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation)
    {
        if(this.currOperand === '') return;
        if(this.prevOperand !== '')
        {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';

    }

    compute()
    {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation)
        {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number)
    {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;

        if(isNaN(integerDigit))
        {
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }
    }


    updateDisplay()
    {
        this.currOperandTextElement.innerText = this.currOperand;
        if(this.operation != null)
        {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} 
            ${this.operation}`;
        }
        else{
            this.prevOperandTextElement.innerText = '';
        }

    }
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const prevTextElement = document.querySelector('[data-previous-operand]');
const currTextElement  = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevTextElement, currTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
})