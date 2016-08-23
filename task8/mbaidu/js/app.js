/**
 * Created by PRO on 2016/6/1.
 */
//单击更多显示隐藏的菜单
$(".less").click(function () {
   $(".can-hidden").hide();
    $("#more").html("更多<div class=\"up-triangle\"></div>");
});
//单击收起隐藏导航菜单
$("#more").click(function () {
    $(".can-hidden").show();
    $("#more").html("互联网");
});

