/**
 * Created by PRO on 2016/5/26.
 */
$("document").ready( function(){
    $(".tab-content").children().eq(1).show();
    //实现鼠标点击导航菜单后Tba切换功能
    $(".tab-menu").children().each(function (index) {
       $(this).click( function(){
           $(this).addClass("menu-focus");
           $(this).siblings().removeClass("menu-focus");
           //同时显示Tab面板内容区域
           var content = $(".tab-content").children().eq(index);
           content.show();
           content.siblings().hide();
       });
    });
    //显示换肤面面板
    $("#change-theme-btn").click(function(){
        $(".theme-panel").show();
    });
    //侧边栏显示、隐藏
    $(".more").mouseenter(function(){
        $(".sidebar").show();
    }).mouseleave( function(){
        $(".sidebar").hide();
    });
    $(".sidebar").mousemove(function(){
        $(this).show();
    }).mouseleave(function(){
        $(this).hide();
    });

    //设置对话框显示及隐藏
    $("#search-config").mouseenter(function(){
        $(".config").show();
    }).mouseleave( function(){
        $(".config").hide();
    });
    $(".config").mousemove(function(){
        $(this).show();
    }).mouseleave(function(){
        $(this).hide();
    });

    $("#user-login").mouseenter(function(){
        $(".user-login").show();
    }).mouseleave( function(){
        $(".user-login").hide();
    });
    $(".user-login").mousemove(function(){
        $(this).show();
    }).mouseleave(function(){
        $(this).hide();
    });

    //影视收藏图标隐藏及显示
    $(".video-intro").mouseenter(function(){
        $(this).find(".video-category").hide();
        $(this).find(".video-tool").show();
    }).mouseleave(function(){
        $(this).find(".video-category").show();
        $(this).find(".video-tool").hide();
    });
});