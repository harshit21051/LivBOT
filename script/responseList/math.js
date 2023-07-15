// import puzzle module
import * as puzzle from './puzzle.js';

// Helper function to perform the calculation of two operands
function calculate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        case '^':
            return Math.pow(operand1, operand2);
        case '%':
            return operand1 % operand2;
        default:
            throw new Error(`Invalid operator: ${operator}`);
    }
}

// function to simplify big expressions
function evaluateExpression(expression) {
    // Tokenize the expression by separating numbers and operators
    const tokens = expression.match(/(\d+(\.\d)?|\.\d+|[+\-*/()%^])/g);
    if (!tokens) return "Invalid expression";

    // Define the precedence order of operators
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
        '%': 3
    };

    const outputQueue = [];   // to return output
    const operatorStack = []; // to check for paranthesis

    // Process each token in the expression
    for (const token of tokens) {
        // Token is a number, add it to the output queue
        if (!isNaN(token))
            outputQueue.push(parseFloat(token));

        // Token is an opening parenthesis, push it to the operator stack
        else if (token === '(')
            operatorStack.push(token);

        else if (token === ')') {
            // Token is a closing parenthesis, evaluate operators until an opening parenthesis is encountered
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                const operator = operatorStack.pop();
                const operand2 = outputQueue.pop();
                const operand1 = outputQueue.pop();
                const result = calculate(operator, operand1, operand2);
                outputQueue.push(result);
            }
            if (operatorStack.length === 0 || operatorStack[operatorStack.length - 1] !== '(')
                return "Mismatched parentheses";
            // Pop the opening parenthesis from the operator stack
            operatorStack.pop();
        }

        else {
            // Token is an operator, evaluate operators with higher precedence and push it to the operator stack
            while (operatorStack.length > 0 && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
                const operator = operatorStack.pop();
                const operand2 = outputQueue.pop();
                const operand1 = outputQueue.pop();
                const result = calculate(operator, operand1, operand2);
                outputQueue.push(result);
            }
            operatorStack.push(token);
        }
    }

    // Evaluate any remaining operators
    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const operand2 = outputQueue.pop();
        const operand1 = outputQueue.pop();
        const result = calculate(operator, operand1, operand2);
        outputQueue.push(result);
    }

    if (outputQueue.length !== 1)
        return "Invalid expression";

    // Return the final result
    return `Answer is ${outputQueue[0]}`;
}

// Function to sort numbers
function sortNumbers(numbers) {
    if (numbers && numbers.length >= 2) {
        const sortedNumbers = numbers.map(num => parseFloat(num)).sort((a, b) => a - b);
        return sortedNumbers.join(' ');
    }
    else return "Sorry, I couldn't find two or more numbers to perform the sorting.";
}

// Function to calculate the median
function calculateMedian(numbers) {
    if (numbers && numbers.length >= 2) {
        const sortedNumbers = numbers.map(num => parseFloat(num)).sort((a, b) => a - b);
        const length = sortedNumbers.length;
        let median;

        if (length % 2 === 0) {
            const midIndex1 = length / 2 - 1;
            const midIndex2 = length / 2;
            median = (sortedNumbers[midIndex1] + sortedNumbers[midIndex2]) / 2;
        } else {
            const midIndex = Math.floor(length / 2);
            median = sortedNumbers[midIndex];
        }

        return median;
    }
    else return "Sorry, I couldn't find two or more numbers to calculate the median.";
}

// Random number generator
function generateRandomNumber(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number')
        return 'Both arguments must be numbers';

    if (min >= max)
        return 'The minimum number must be less than the maximum number';

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

export function responseList(filter, responseBox) {
    // bodmas expression evaluation
    if (/eval|simplify|calc/.test(filter))
        responseBox.textContent = evaluateExpression(filter);

    // sum of n numbers given as an input
    else if (/sum|\+/.test(filter)) {
        const sumNumbers = filter.match(/\d+(\.\d+)?/g);
        if (sumNumbers && sumNumbers.length >= 2) {
            const sum = sumNumbers.reduce((acc, num) => acc + parseFloat(num), 0);
            responseBox.textContent = `${sumNumbers.join(' + ')} = ${sum}`;
        }
        else responseBox.textContent = "Sorry, I couldn't find two or more numbers to perform the sum.";
    }

    // product of n numbers given as an input
    else if (/prod|\*/.test(filter)) {
        const prodNumbers = filter.match(/\d+(\.\d+)?/g);
        if (prodNumbers && prodNumbers.length >= 2) {
            const product = prodNumbers.reduce((acc, num) => acc * parseFloat(num), 1);
            responseBox.textContent = `${prodNumbers.join(' * ')} = ${product}`;
        }
        else responseBox.textContent = "Sorry, I couldn't find two or more numbers to perform the product.";
    }

    // average of n numbers given as an input
    else if (/avg|average/.test(filter)) {
        const avgNumbers = filter.match(/\d+(\.\d+)?/g);
        if (avgNumbers && avgNumbers.length >= 2) {
            const sum = avgNumbers.reduce((acc, num) => acc + parseFloat(num), 0);
            const average = sum / avgNumbers.length;
            responseBox.textContent = `Average = ${average}`;
        }
        else responseBox.textContent = "Sorry, I couldn't find two or more numbers to calculate the average.";
    }

    // Sort n numbers
    else if (/sort/.test(filter)) {
        const numbers = filter.match(/\d+(\.\d+)?/g);
        const result = sortNumbers(numbers);
        responseBox.textContent = `Sorted numbers: ${result}`;
    }

    // Median of n numbers
    else if (/median/.test(filter)) {
        const numbers = filter.match(/\d+(\.\d+)?/g);
        const result = calculateMedian(numbers);
        responseBox.textContent = `Median: ${result}`;
    }

    // get min from n numbers
    else if (/min/.test(filter)) {
        const numbers = filter.match(/\d+(\.\d+)?/g);
        if (numbers && numbers.length >= 1) {
            const minNumber = Math.min(...numbers.map(num => parseFloat(num)));
            responseBox.textContent = `Minimum number is ${minNumber}`;
        }
        else responseBox.textContent = "Sorry, I couldn't find any numbers to determine the minimum.";
    }

    // get max from n numbers
    else if (/max/.test(filter)) {
        const numbers = filter.match(/\d+(\.\d+)?/g);
        if (numbers && numbers.length >= 1) {
            const maxNumber = Math.max(...numbers.map(num => parseFloat(num)));
            responseBox.textContent = `Maximum number is ${maxNumber}`;
        }
        else responseBox.textContent = "Sorry, I couldn't find any numbers to determine the maximum.";
    }

    // generate a random number
    else if (/rand/.test(filter)) {
        const numbers = filter.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
            const min = parseInt(numbers[0]);
            const max = parseInt(numbers[1]);
            if (!isNaN(min) && !isNaN(max)) {
                const minValue = Math.min(min, max);
                const maxValue = Math.max(min, max);
                const randomNumber = generateRandomNumber(minValue, maxValue);
                responseBox.textContent = `Random number: ${randomNumber}`;
            }
            else responseBox.textContent = 'Invalid input. Please provide two numbers.';
        }
        else responseBox.textContent = 'Invalid input. Please provide two numbers.';
    }

    else puzzle.responseList(filter, responseBox);
}