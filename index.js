const input = document.getElementById('calculate');
const btn = document.getElementById('get-result');
const area = document.getElementById('result');

btn.addEventListener('click', () => {
    let expression = input.value;
  
    for (let elem of expression) {
        if (elem == '(') {
            expression = simplificationExpression(expression);
        }
    }
    
    for (let i = 0; i < expression.length; i++) {
        console.log(expression);
        if (expression[i] == '*' || expression[i] == '/' || expression[i] == '+' || expression[i] == '-') {
            for (let k = 0; k < expression.length; k++) {
                if(expression[k] == expression[k+1] && expression[k] == '-') {
                    let arr = expression.split('') 
                    arr.splice(k+1, 1)
                    expression = arr.join('')
                }
            }
            expression = mathLogic(expression);
        }
    }
    
    area.innerHTML = expression

})

function simplificationExpression(string) {
    let indexLastSkob = string.lastIndexOf('(');
    let indexCloseSkob = string.indexOf(')', indexLastSkob);
    let intervalScobs = indexCloseSkob - indexLastSkob + 1;
    
    let newString = string.split('');
    let option = newString.splice(indexLastSkob, intervalScobs);
    
    option.pop();
    option.shift();
    
    const result = mathLogic(option.join(''));
    
    newString.splice(indexLastSkob, 0, result);
    return newString.join('');
}

function mathLogic(string) {
    for (let elem of string) {
        if(elem == '*') {
            string = mathOperations(string, '*')       
        }
    }
    for (let elem of string) {
        if(elem == '/') {
            string = mathOperations(string, '/')        
        }
    }
    for (let elem of string) {
        if(elem == '+') {
            string = mathOperations(string, '+')        
        }
    }
    for (let elem of string) {
        if(elem == '-') {
            string = mathOperations(string, '-')        
        }
    }
    return string;
}

function mathOperations (string, mathSign) {
    const indexMathSign = string.lastIndexOf(mathSign);
    
    // Find number before math sign
    let beforeNum = '';
    let befK = indexMathSign - 1;
    while(+string.charAt(befK) && befK >= 0 || +string.charAt(befK) === 0 && befK >= 0) {
        beforeNum += +string.charAt(befK)
        befK = befK - 1
    }
    beforeNum = Number(beforeNum.split('').reverse().join(''))
    
    // Find number after math sign
    let afterNum = '';
    let aftK = indexMathSign + 1;
    while(+string.charAt(aftK) && aftK < string.length || +string.charAt(aftK) === 0 && aftK < string.length) {
        afterNum += +string.charAt(aftK)
        aftK = aftK + 1
    }
    afterNum = Number(afterNum)
    
    let result = 0;
   
    switch(mathSign) {
        case '*':
            result = beforeNum * afterNum;
            break;
        case '/':
            result = beforeNum / afterNum;
            break;
        case '+':
            result = beforeNum + afterNum;
            break;
        case '-':
            result = beforeNum - afterNum;
            break;
    }

    const int = aftK - befK - 1;
    let arr = string.split('');
    arr.splice(befK + 1, int, result);

    return arr.join('');
}
