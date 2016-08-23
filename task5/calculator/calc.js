
function main() {
    //input1，input2为两个数字，input3为操作符（+-*/)之一
    var input1 = document.getElementById("op1").value;
    var input2 = document.getElementById("op2").value;
    var input3 = document.getElementById("operator").value;
    var real = /^\d*\.?\d*$/; //匹配实数的规则
    var op = /^[\+\-\*\/]$/;  //匹配计算符(+-*/)的正则规则

    if ( !real.test(input1)) {
        alert("第一个数格式错误 ");
    } else if( !real.test(input2)){
        alert("第二个数格式错误 ");
    } else if ( ! op.test(input3)){
        alert("第三个数格式错误 ");
    } else {
        var result = calc(parseFloat(input1), parseFloat(input2), input3);
        document.getElementById("result").innerHTML="<h4>计算结果是：" + result + "</h4>";
    }
}
//计算表达式op1 operator op2 的值，operator可以是+ - * /运算
function calc(op1, op2, operator) {
    switch (operator) {
        case '+':
            return op1 + op2;
            break;
        case '-':
            return op1 - op2;
            break;
        case '*':
            return op1 * op2;
            break;
        case '/':
            return op1 / op2;
            break;
    }
}
