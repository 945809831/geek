/**
 * Created by PRO on 2016/7/1.
 */
$("document").ready(function(){
    //点击“收起” 隐藏主题面板
    $("#hide-theme-btn").click(function(){
        $(".theme-panel").hide();
    });
    //每个目录存储的图片文件
    var picturePaths={"hot":["1.jpg","2.jpg","3.jpg","8.jpg","5.jpg","6.jpg","7.jpg","4.jpg","9.jpg","10.jpg","11.jpg", "12.jpg"],
                       "game" :["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg"],
                       "cartoon":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","9.jpg","8.jpg","10.jpg","11.jpg","12.jpg"],
                       "goddess":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","9.jpg","11.jpg","10.jpg","8.jpg","12.jpg"],
                       "star":   ["1.jpg","2.jpg","3.jpg","4.jpg","6.jpg","5.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg"],
                       "scenery": ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","12.jpg","9.jpg","10.jpg","11.jpg","8.jpg"],
                       "concise":["1.jpg","2.jpg","3.jpg","4.jpg","7.jpg","6.jpg","5.jpg","11.jpg","9.jpg","10.jpg","8.jpg","12.jpg"],
                       "fresh": ["1.jpg","2.jpg","8.jpg","3.jpg","5.jpg","6.jpg","7.jpg","3.jpg","9.jpg","10.jpg","11.jpg","12.jpg"]
                    };
    /*  container中的图片可看做从上到下，从左至右排列的小方块。其中小的图片占一个格子，
     *大图片占4个格子。
     *  _______________
     * |0|0|6|9 |12|15|
     * |0|0|7|10|10|16|
     * |2|5|8|10|10|17|
     * ----------------
     *  position数组存放的为图片在container所占格子的位置
     */
    var positions = [0, 2, 5, 6, 7, 8, 9, 10, 12, 15, 16, 17];
    var WIDTH = 97;
    var HEIGHT = 59;
    //点击主题面板标签时切换各个主题选择页面
    $(".theme-selector").click(function(){
        var index = $(this).attr("index");
        if(index >=0 && index <= 7){
            loadPictures($("#theme-pictures"), $(this).attr("id"));
        }
    });
    // 辅助函数 加载预留图片框内显示的图片
    function  loadPictures(container, id){
        container.html("");
        for(var i=0; i <= 11; i++){
            var file = "images/theme/" + id + "/" + picturePaths[id][i];
            var left =  Math.floor(positions[i]/3) * (WIDTH+1);
            var top  =  (positions[i]%3) * (HEIGHT+1);
            var width, height;
            if(i===0 || i === 7){
                width  = 2 * WIDTH;
                height = 2 * HEIGHT;
            } else {
                width  = WIDTH;
                height = HEIGHT;
            }
            var pic = $("<img>").attr({"src":file, "width": width, "height": height})
                                .css({"position":"absolute", "left":left, "top": top });
            pic.on({ "mouseenter": setPreview,
                          "click": setBackgroundPicture
                   });
            container.append(pic);
        }

    }
    // 设置预览效果
    function setPreview(event){
        var src = $(event.target).attr("src");
        $("#theme-preview-picture").css("background-image", "url(" + src + ")");
    }
    // 更换背景图片
    function setBackgroundPicture(event){
        var src = $(event.target).attr("src");
        var pos = src.lastIndexOf("/");
        var path = src.substr(0, pos) + "/big" + src.substr(pos);
        $("#container").css("background-image", "url(" + path + ")");
    }

    // 调整主题透明度
    var isDrag = false;   // 鼠标左键是否按下
    var x;                // 滑块的x坐标
    var pos;              // 滑块的left百分比位置
    function up(e){
        isDrag = false;   // 释放鼠标左键
    }
    function down(e){
        isDrag = true;    // 鼠标左键被按下
        x = e.clientX;    // 保存鼠标按下时的滑块x坐标
        pos = parseInt($(e.target).css("left")); // 目前滑块ccs left值，转化成数字
    }
    function move(event){
        if(isDrag){
            console.log(event.clientX + "+" + event.clientY);
            var curX = event.clientX;
            dx = curX - x;   //将滑动过的距离转化成百分比形式；
            var left = pos + dx;
            if( left < 0){
                left = 0;
            } else if(left > 80){
                left = 80;
            }
            $(this).css( "left", left+"px" );
            $(this).children("em").text(parseInt((left/80) * 100) + "%");
            $(".tab-container").css("background", "rgba(255, 255, 255," + left / 80 + ")");
        }
    }
    $(".theme-panel").mouseup(up);
    $(".scroll-block").on({ "mouseup": up,
                          "mousedown": down,
                          "mousemove": move });

    //加载主题面板时显示热点类别下的主题
    loadPictures($("#theme-pictures"), "hot");
});