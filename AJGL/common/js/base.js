/*!
 *需要jquery 1.3.2以上版本
 * Copyright 2010, Zhang Tan
 * @E-mail:ztreal@gmail.com
 * since: 2010-10-14
 */


/**since 2010-10-14 17:48
 * 按钮点击效果。需要实现此效果的dom结构为div[class='clbutton']>table>tr>td*3。css配套为style.css中的按钮效果部分
 */
jQuery(document).ready(function(){
	//蓝色背景的图片
$(".clbutton").children().bind({
 		mousedown:function(){
			$(this).removeClass().addClass('blue_1_d');
			$(this).children().find(".blue_2_o").removeClass().addClass('blue_2_d');
			$(this).children().find(".blue_4_o").removeClass().addClass('blue_4_d');
			$(this).children().find(".blue_3_o").removeClass().addClass('blue_3_d');
		},mouseout:function(){
			$(this).removeClass().addClass('blue_1_j');
			$(this).children().find(".blue_2_o").removeClass().addClass('blue_2_j');
			$(this).children().find(".blue_4_o").removeClass().addClass('blue_4_j');
			$(this).children().find(".blue_3_o").removeClass().addClass('blue_3_j');
		},mouseup:function(){
			$(this).removeClass().addClass('blue_1_o');
			$(this).children().find(".blue_2_d").removeClass().addClass('blue_2_o');
			$(this).children().find(".blue_4_d").removeClass().addClass('blue_4_o');
			$(this).children().find(".blue_3_d").removeClass().addClass('blue_3_o');
		},mousemove:function(){
			$(this).removeClass().addClass('blue_1_o');
			$(this).children().find(".blue_2_j").removeClass().addClass('blue_2_o');
			$(this).children().find(".blue_4_j").removeClass().addClass('blue_4_o');
			$(this).children().find(".blue_3_j").removeClass().addClass('blue_3_o');
		}
	});
	
	//灰色背景的图片
$(".graybutton").children().bind({
 		mousedown:function(){
			$(this).removeClass().addClass('gray_1_d');
			$(this).children().find(".gray_2_o").removeClass().addClass('gray_2_d');
			$(this).children().find(".gray_4_o").removeClass().addClass('gray_4_d');
			$(this).children().find(".gray_3_o").removeClass().addClass('gray_3_d');
		},mouseout:function(){
			$(this).removeClass().addClass('gray_1_j');
			$(this).children().find(".gray_2_o").removeClass().addClass('gray_2_j');
			$(this).children().find(".gray_4_o").removeClass().addClass('gray_4_j');
			$(this).children().find(".gray_3_o").removeClass().addClass('gray_3_j');
		},mouseup:function(){
			$(this).removeClass().addClass('gray_1_o');
			$(this).children().find(".gray_2_d").removeClass().addClass('gray_2_o');
			$(this).children().find(".gray_4_d").removeClass().addClass('gray_4_o');
			$(this).children().find(".gray_3_d").removeClass().addClass('gray_3_o');
		},mousemove:function(){
			$(this).removeClass().addClass('gray_1_o');
			$(this).children().find(".gray_2_j").removeClass().addClass('gray_2_o');
			$(this).children().find(".gray_4_j").removeClass().addClass('gray_4_o');
			$(this).children().find(".gray_3_j").removeClass().addClass('gray_3_o');
		}
	});

	//设置默认初始值
		 $('.form-field').each( function () {
		    $(this).val($(this).attr('defaultVal'));
		    $(this).css({color:'#ccc'});
		      });

		  $('.form-field').focus(function(){
		    if ( $(this).val() == $(this).attr('defaultVal') ){
		      $(this).val('');
		      $(this).css({color:'#000'});
		    }
		    });
		  $('.form-field').blur(function(){
		    if ($(this).val() == '' ){
		      $(this).val($(this).attr('defaultVal'));
		      $(this).css({color:'#ccc'});
		    }
           });

	//gqgridlist 列表页面删除信息判断
	$(".gldel").click(function(){
    var num=$("input[name*='jqg_list']:checked").length;
	if(num==0){
	   alert("请选择您要删除的信息项！");
	}else{
	   confirm("您确认删除吗?")
	}
	});

	//gqgridlist 列表页面修改信息判断
	$(".glmodi").click(function(){
    var num=$("input[name*='jqg_list']:checked").length;
	if(num==0){
	   alert("请选择您要修改的信息项！");
	}else if(num>1){
	   confirm("一次只能修改一条数据")
	}
	});
})

