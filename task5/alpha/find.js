 function main() {
     //预先定义的查找字符串
     var str = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];
     //存储出现最多的字母
     var max = findChar(str);
     //存贮字母出现的位置
     var position = findPosition(max, str);
     document.getElementById("result").innerHTML="出现频率最高的字母为：" 
                                                 + max + "。位置分别为："
                                                  + position.join();
 }

 //寻找出现的字母及记录字母出现的个数
 function findChar(str) {
     // charSet对象存储字母及出现个数的对象o[字母]=出现的个数
     var charSet = {};
     for (var i = 0; i < str.length; i++) {
         if (str[i] in charSet) {
             charSet[str[i]]++;
         } else {
             charSet[str[i]] = 0;
         }
     }
     var max = 0;
     var char; //存储出现频率最高的字母
     for (var key in charSet) {

         if (charSet[key] > max) {
             max = charSet[key];
             char = key;
         }
     }
     return char;
 }
 //查找字母ch在字符串str中出现的个数
 function findPosition(ch, str) {
     var position = []; //存储位置的数组，每个元素代表ch出现的位置
     for (var i = 0; i < str.length; i++) {
         if (str[i] == ch) {
             position.push(i);
         }
     }
     return position;
 }
