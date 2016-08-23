/*
 * Created by PRO on 2016/8/16 3：30.
 * 单例模式： 使代码逻辑结构更清晰，更便于调试
 */
var scrollBar = {
	isDrag: false,   // 鼠标左键未按下
	x     : 0,       // x为滑块的x坐标
	pos   : 0.5,     // 滑块的百分比位置

	up: function(e){
		isDrag = false;
	},

	down: function(e){
		isDrag = true;
		x = e.clientX;
		pos = parseInt( $(e.target).css("left"));
	},

	move: function(e){
		if(isDrag){
            var SCROLL_RANGE = 80 - 12; //指示条的长度减去滑块的长度      
            var curX = event.clientX;
            var left = pos + (curX - x);
            if( left < 0){
                left = 0;
            } else if(left > SCROLL_RANGE){
                left = SCROLL_RANGE;
            }
            $(this).css( 'left', left+'px' );

             var percentage = left / SCROLL_RANGE;//// 计算百分比
            $(this).children('em').text(parseInt(percentage * 100) + '%');// 设置滑块上方文字指示百分比
            $(".tab-container").css('background', 
            						'rgba(255,255,255,' + percentage+')');         //// 设置透明
        }
	},

	init: function(){
		var me = this;
		me.render();
		me.bind();
	},

	render: function(){
		var me = this;
		me.themePanel = $(".theme-panel");
		me.scrollBlock = $(".scroll-block");
	},

	bind: function(){
		var me = this;
		me.themePanel.mouseup(me.up);
		me.scrollBlock.on({
			'mouseup': me.up,
			'mousedown': me.down,
			'mousemove': me.move });
	},
};
scrollBar.init();