/*
 *  单例模式
 *  2016-8-16 20：00
 *
     container中的图片可看做从上到下，从左至右排列的小方块。
     其中小的图片占一个格子，大图片占4个格子。
      ----------------
      |0  |6|9 |12|15|
      |   |7|10   |16|
      |2|5|8|     |17|
      ----------------
     position数组存放的为图片在container所占格子的位置
     0和10的放置大图片，占据4个小格子的位置
 */

 var themeSeletor = {
 	//每个目录存储的图片文件
 	picturePaths:   {  'hot':    ['1.jpg','2.jpg','3.jpg','8.jpg','5.jpg','6.jpg','7.jpg','4.jpg','9.jpg','10.jpg','11.jpg','12.jpg'],
                       'game':   ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg'],
                       'cartoon':['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','9.jpg','8.jpg','10.jpg','11.jpg','12.jpg'],
                       'goddess':['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','9.jpg','11.jpg','10.jpg','8.jpg','12.jpg'],
                       'star':   ['1.jpg','2.jpg','3.jpg','4.jpg','6.jpg','5.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg'],
                       'scenery':['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','12.jpg','9.jpg','10.jpg','11.jpg','8.jpg'],
                       'concise':['1.jpg','2.jpg','3.jpg','4.jpg','7.jpg','6.jpg','5.jpg','11.jpg','9.jpg','10.jpg','8.jpg','12.jpg'],
                       'fresh':  ['1.jpg','2.jpg','8.jpg','3.jpg','5.jpg','6.jpg','7.jpg','3.jpg','9.jpg','10.jpg','11.jpg','12.jpg']
                    },

     positions : [0, 2, 5, 6, 7, 8, 9, 10, 12, 15, 16, 17],
     NUMBER    : 12,  // 每个主题背景图片有12张
     WIDTH     : 97,  // 每张图片的宽度和
     HEIGHT    : 59,  // 高度

 	init: function(){
 		this.render();
 		this.bind();
 		this.loadPictures(this.container, 'hot'); // 默认加载的主题
 	},

 	render: function() {
 		var me = this;
 		me.hideBtn    = $("#hide-theme-btn");  // 按钮： 隐藏主题选择面板
 		me.themePanel = $(".theme-panel");     // 主题选择器面板
 		me.themeTitle = $(".theme-selector");  // 主题分类按钮
 		me.container  = $(".theme-pictures");  // 主题图片框
 	},

 	bind: function() {
 		var me = this;
 		// 点击按钮时隐藏主题选择器面板
 		me.hideBtn.click( function(){
 			me.themePanel.slideUp();
 		});
 		// 点击分类标题时切换不同的选择器内容
 		me.themeTitle.click( function() {
 			var id = $(this).attr('id');
 			me.createContent(me.container, id);
 		});
 	},
 	/*
 	 *  根据不同的id指示的分类信息生成不同的
 	 *  主题图片选择器内容
 	 */
    createContent : function(container, id){
        if( id === 'custom'){           /// 动态生成自定义主题的.theme-picture内容
            $('.theme-preview').show();
            this.customizedTheme(container);
        } else if( id === 'recently'){
            this.recentUsedTheme(container); /// 动态生成最近使用的.theme-picture内容
        } else {
            $('.theme-preview').show(); /// 动态生成系统预定义的.theme-picture内容
            this.loadPictures(container, id);
        }
    },
 	 /*
     *  自定义的主题框的内容
     */
    customizedTheme: function(container){
        container.html('');
        var selectImageBtn = $('<div>').css({'margin': '56px auto 20px',
                                              'width': '200px', 
                                             'height': '33px',
                                        'margin-left':"215px",
                                         'background': 'url(images/theme/skin_icon.png) no-repeat -30px -45px'});
        
        var p = $('<p>').html('仅支持JPEG、PNG图片，图片尺寸不小于1600*1000像素、10兆以内（高质量图片效果更加')
                        .css({'text-align': 'center',
                            'margin-left' : "-245px",
                                   'color': '#aaa'});
        container.append(selectImageBtn);
        container.append(p);
    },

     /*
     *  最近使用过的主题框的内容
     */
    recentUsedTheme: function(container){
        $('.theme-preview').hide();
        container.html('');
        container.css({'position':'absolute', 'top':'0px', 'left':'0px', 'width':'918px', 'height':'186px', 'background':'white'});
        for(var i=0; i < 27; i++){
            var imgFrame = $('<div>').css({'float':'left', 
                                          'margin':'0 5px 4px 0',
                                      'background':'#f5f5f5', 
                                           'width':'97px', 
                                          'height':'59px'
                                         });
            container.append(imgFrame);
        }  
    },


    /*
     *加载预留图片框内显示的图片
     */
    loadPictures: function (container, id) {
        container.html('');
        for(var i=0; i < this.NUMBER; i++){
            var file = 'images/theme/' + id + '/' + this.picturePaths[id][i];
            var left =  Math.floor(this.positions[i] / 3) * (this.WIDTH + 1);
            var top  =  ( this.positions[i] % 3 ) * (this.HEIGHT + 1);
            var width, height;
            // 如果时放置大图片的格子，则增大图片的高度及宽度
            // 0和10的位置对应的数组位置为0和7，放置大图片
            if(i===0 || i === 7){
                width  = 2 * this.WIDTH  + 1;
                height = 2 * this.HEIGHT + 1;
            } else {
                width  = this.WIDTH;
                height = this.HEIGHT;
            }
            // 创建图片
            var pic = $('<img>').attr({'src':file, 'width': width, 'height': height})
                                .css({'position':'absolute', 'left':left, 'top': top });
            // 为鼠标设置mouseenter函数，当鼠标移入图片时，更换背景图片
            pic.on({ 'mouseenter': this.setPreview,
                          'click': this.setBackgroundPicture
                   });
            container.append(pic);// 加入到图片的容器中
        }
    },
  	
  	   // 调用时设置预览效果
    setPreview: function(event){
        var src = $(event.target).attr('src');
        $('#theme-preview-picture').css('background-image', 'url(' + src + ')');
    },
    // 调用时更换背景图片
    setBackgroundPicture: function (event){
        var src = $(event.target).attr('src');
        var pos = src.lastIndexOf('/');
        var path = src.substr(0, pos) + '/big' + src.substr(pos);

        $('#container').css('background-image', 'url(' + path + ')');
    }
 };

 themeSeletor.init();
