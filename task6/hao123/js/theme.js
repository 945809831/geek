/*
    改变网站的主题
    该函数为每个点击的颜色圆圈设置事件监听器chagneTheme，当
    点击事件发生时，调用changeTheme函数改变导航栏颜色及底部
    链接的颜色
 */
var list = document.getElementsByClassName("theme-btn");
for(var i = 0; i < list.length; i++) {
    var color = getComputedStyle(list[i]).backgroundColor;
    list[i].addEventListener("click",changeTheme);
}
var gColor = getCookie("hao123-color");
if(gColor){
    changeTheme(gColor);
}
/*
    从cookie中读取Color的值
 */
function setCookie(color) {
    var d = new Date();
    var days = 2; //设置2天为有效期
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "hao123-color=" + color + ";" + expires;
}

function getCookie() {
    var name = "hao123-color=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function changeTheme(event){
    var color = getComputedStyle(event.target).backgroundColor;
    setCookie(color);
    var sites = document.getElementsByClassName("web-link");
    var n = sites.length;
    for(var i = 0; i < 6; i++){
        sites[n-i-1].children[0].style.color = color;
    }
    document.getElementsByClassName("menu")[0].children[0].style.borderTopColor = color;
    document.getElementsByClassName("menu")[0].children[0].children[0].style.backgroundColor = color;
}