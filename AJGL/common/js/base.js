/*!
 *��Ҫjquery 1.3.2���ϰ汾
 * Copyright 2010, Zhang Tan
 * @E-mail:ztreal@gmail.com
 * since: 2010-10-14
 */


/**since 2010-10-14 17:48
 * ��ť���Ч������Ҫʵ�ִ�Ч����dom�ṹΪdiv[class='clbutton']>table>tr>td*3��css����Ϊstyle.css�еİ�ťЧ������
 */
jQuery(document).ready(function(){
	//��ɫ������ͼƬ
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
	
	//��ɫ������ͼƬ
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

	//����Ĭ�ϳ�ʼֵ
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

	//gqgridlist �б�ҳ��ɾ����Ϣ�ж�
	$(".gldel").click(function(){
    var num=$("input[name*='jqg_list']:checked").length;
	if(num==0){
	   alert("��ѡ����Ҫɾ������Ϣ�");
	}else{
	   confirm("��ȷ��ɾ����?")
	}
	});

	//gqgridlist �б�ҳ���޸���Ϣ�ж�
	$(".glmodi").click(function(){
    var num=$("input[name*='jqg_list']:checked").length;
	if(num==0){
	   alert("��ѡ����Ҫ�޸ĵ���Ϣ�");
	}else if(num>1){
	   confirm("һ��ֻ���޸�һ������")
	}
	});
})

