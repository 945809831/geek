$(document).ready(function(){
	// 页面加载时切换到第一个tab（热门课程）
	var fistLi = $(".course-category").children().eq(0);
	fistLi.css("border-bottom-color","#35b558" );
	fistLi.children('.up-angle').show();
	$(".course-category-content ul:nth-child(1)").css("display", "block");
	//鼠标移动到【热门课程、最新课程、免费课程、项目实战】后
	//切换显示相应的tab面板内容
	$(".course-category li").mouseenter( function( event ){
		$(this).css("border-bottom-color", "#35b558");           //当前li底边为绿色
		$(this).siblings().css("border-bottom-color", "#e4e4e4");//其它li底边显示为灰色
		$(this).children(".up-angle").show();  //显示当前底边的尖角
		$(this).siblings().children(".up-angle").hide();
		// 当前激活的li序列号（data-order属性）
		var order = $(event.target).attr("data-order"); 
		// 选择第order个content
		var selectorDisplay = ".course-category-content ul:nth-child(" + order + ")";
		$(selectorDisplay).show()      // 显示第order个tab-content
						  .siblings().hide();   // 其它的tabcontent不显示
	});

	// 鼠标移动到问答、wiki、课程及社群tab组件上面时切换
	// 到底部相应面板
	$(".start-list li[node-type='recommend-move-event']").mouseenter(function(event){
		$(this).parent().css("display", "none"); //隐藏功能分类的前面板
		$(this).parent().children("move-list").show();
		console.log("mouseenter occur on.start-list li");
	});
	

	// 实现底部面板的内容切换功能
	$(".move-list-title li").mouseenter(function(event){
		var order = $(this).attr("data-order");
		var select = ".move-list-content li:nth-child(" + order + ")";
		$(select).show()
				 .siblings().hide();
	});
////////////////////////////////////////////////////////////////////////////////////////
	$(".move-list-content").mouseenter(function(){
		console.log("mouseenter in .move-list-content");
	});
	$(".move-list-content").click(function(){
		console.log("click in .move-list-content");
	});
//////////////////////////////////////////////////////////////////////////////////////
});