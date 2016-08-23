//input接受输入的分数 
var inputStr = prompt("请输入您的成绩，以便给您的成绩做出评价。");
if(testInputStr(inputStr)){
    alert(accessScore(inputStr));
} else {
    alert("您输入的不是合法的分数");
}

function testInputStr(str){
    //若输入的格式为合法成绩, 整数部分1到3位，小数部分1位
    var pattern = /^\d{1,3}(.\d)?$/; 
    if(pattern.test(str)){
        //如为合法的分数格式，转换为数字
        var score = parseFloat(str);
        //该数字在0到100内为合法数字
        if(score<=100 && score >= 0){
            return true;
        } else{
            return false;
        }
    } else {
        return false;
    }
}
//根据分数判别是几等生，10分为一等。
function accessScore(score) {
    switch (Math.floor(score / 10)) {
        case 10:
        case 9:
            return "您是1等生";
            break;
        case 8:
            return "您是2等生";
            break;
        case 7:
            return "您是3等生";
            break;
        case 6:
            return "您是4等生";
            break;
        case 5:
            return "您是5等生";
            break;
        case 4:
            return "您是6等生";
            break;
        default:
            return "你该找家长了！";
    }
}
