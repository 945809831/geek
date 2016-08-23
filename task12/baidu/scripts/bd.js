/*
 * Created by PRO on 2016/8/16 3：30.
 * 单例模式： 使代码逻辑结构更清晰，更便于调试
 */
var index = {
    init: function() {
        var me = this;
        me.render();
        me.bind();
        me.tabContent.children().eq(1).show();
    },

    render: function() {
        var me = this;
        me.configBtn = $("#search-config"); // 设置按钮
        me.moreBtn   = $(".more");          // 更多产品按钮
        me.userBtn   = $("#user-login");    // 用户按钮
        me.themeSettingBtn = $("#change-theme-btn"); // 点击显示主题设置面板

        me.configPanel       = $(".config");      // 设置面板
        me.userSettingPanel  = $(".user-login");  // 用户登录面板
        me.themeSettingPanel = $(".theme-panel"); // 主题设置面板
        me.sidebarPanel      = $(".sidebar");     // 侧边栏

        me.tabBtn = $(".tab-menu"); // 我的关注、推荐、导航、视频集购物Tab切换按钮
        me.tabContent = $(".tab-content"); // 面板内容部分；
    },

    bind: function() {
        var me = this;
        // 点击我的关注、推荐、导航、视频集购物Tab切换按钮时
        // 切换显示的内容
        me.tabBtn.children().each(function(index) {
            $(this).click(function() {
                $(this).addClass('menu-focus')
                    .siblings().removeClass('menu-focus');
                var content = me.tabContent.children().eq(index);
                content.show()
                    .siblings().hide();
            });
        });

        me.themeSettingBtn.click(function() {
            me.themeSettingPanel.slideDown();
        });

        me.showPanel(me.moreBtn, me.sidebarPanel);
        me.showPanel(me.configBtn, me.configPanel);
        me.showPanel(me.userBtn, me.userSettingPanel);
    },

    showPanel: function(button, panel) {
        button.on({
            mouseenter: function() {
                panel.show();
            },
            mouseleave: function() {
                panel.hide();
            },
        });
        panel.on({
            mouseover: function() {
                $(this).show();
            },
            mouseleave: function() {
                $(this).hide();
            },
        });
    }
};
index.init();
