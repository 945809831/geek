$(document).ready(function() {

    // 点击新闻列表Tab标签时从服务器拉取新闻数据
    // 在该页面中显示
    $("#list-news-tab").click(function() {
        //如果已经显示新闻列表标签，再次点击时不再重复拉取数据
        if (!$("#list-news").hasClass("active")) {
            getHtmlByAjax(); //从服务器拉取新闻数据
        }
    });
    //使用jquery ajax方法从服务器拉取全部新闻数据
    //使用服务器的lib/list-news.php程序实现
	function getHtmlByAjax() {
		$.get("news/list", function(data) {
			$("tbody").html(data);
		});
	}

    //定义origin用于保存修改前table中tr行中每一个td的内容；
    var origin;

    $("tbody").click(function(event) {
        console.log("click the button!");
        var btn = $(event.target);
        var id = btn.data('id'); //得到要操作的新闻id
        if(btn.text() ==="删除"){
        	 $.get("news/del?id=" + id, function(data){
        		$("tbody").html(data);
        	});
        } else if(btn.text()==="修改"){
        	// console.log("edit button clicked!");
        	$("#edit-news").modal("show");//显示修改对话框
        	// 获取要修改行的jquery对象
        	var trValues = btn.parents("tr").children();
        	origin = trValues;
        	// 修改对话框的标题显示要修改新闻的ID值
        	$("#news-id").text(trValues.eq(0).text());
        	//获得修改按钮所在行tr的jQuery对象，使用eq(index)索引每个
        	//td中的内容，并提交到修改对话框的input元素中
        	$("#m-id").   val(trValues.eq(0).text());
        	$("#m-title").val(trValues.eq(1).text());
        	$("#m-newsDate").val(trValues.eq(2).text());
        	$("#m-picture").val(trValues.eq(3).text());
        	$("#m-abstract").val(trValues.eq(4).text());
        	$(".m-category input").val([trValues.eq(5).text()]);
        	$("#m-label").val(trValues.eq(6).text());
        	$("#m-likes").val(trValues.eq(7).text());
        }
       
    });

 //点击修改对话款的修改按钮后，以ajax方式向服务器提交修改请求
 	$("#news-edit").submit(function(event){
 		event.preventDefault();
 		//存储将要想服务器提交的新闻信息
 		var newsInfo = $(this).serializeArray();
 		if( ($("#m-title").val() != origin.eq(1).text() ) || 
 			($("#m-newsDate").val() != origin.eq(2).text() ) ||
 			($("#m-picture").val() != origin.eq(3).text() ) ||
 			($("#m-abstract").val() != origin.eq(4).text() ) ||
 			(newsInfo[5].value != origin.eq(5).text() ) ||
 			($("#m-label").val() != origin.eq(6).text() ) ||
 			($("#m-likes").val() != origin.eq(7).text() ) )
 		{
 			$.get("news/edit", newsInfo,
 			    function(data){
 			    		console.log(data);
 						if(data == "Success"){
 							console.log("修改成功");
 							origin.eq(1).text($("#m-title").val());
 							origin.eq(2).text($("#m-newsDate").val());
 							origin.eq(3).text($("#m-picture").val());
 							origin.eq(4).text($("#m-abstract").val());
 							origin.eq(5).text(newsInfo[5].value);
 							origin.eq(6).text($("#m-label").val());
 							origin.eq(7).text($("#m-likes").val());

 					}
 			    });
 		}
 	
 	});

/*
 *  下列方法用于“增加新闻”标签
 */
//表单提交使用ajax异步提交
$("#news-input").submit(function(event) {
    //在submit事件中调用jQuery ajax
    // console.log("submint occur");
    event.preventDefault(); //阻止默认跳转页面事件
    $.get("news/add", $(this).serializeArray(),
        function(data) {
        	// 若返回的结果为错误信息（包含Error），则显示Error
            if (/Error/.test(data)) {
                $("#result").text("Error");
            } else {
            // 否则显示成功信息
				//alert("OK");
                $("#result").text(data).css({"display":"absolute", "top": "100px"}).fadeIn();
            }
        });
    // return false;
});

//显示2s后自动隐藏
   setInterval(function(){ $(".alert").fadeOut(); }, 3000 );

    $("#newsDate").datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
    $("#m-newsDate").datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
});
