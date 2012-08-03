//标签切换
function showSelectTab(count,num)
{
  for(var i = 0;i<count;i++)
  {
    if(i==num)
	{
	  $("#tabPage"+i).css("display","inline");
	  $("#tabButton"+i).attr("src","img/tabImage_o"+i+".gif");
	  //document.getElementById(same+i).style.display = 'inline';
	}
	else
	{
	  $("#tabPage"+i).css("display","none");
	  $("#tabButton"+i).attr("src","img/tabImage_c"+i+".gif");
	  //document.getElementById(same+i).style.display = 'none';
	}    
  }  
}
//showColumn.html
  function chooseItem(li){        
		$(li).attr("class")=="ui-widget-content"?$(li).attr("class","ui-widget-selected"):$(li).attr("class","ui-widget-content");
  }
  function switchRL(source,target){
        var addLi = "";
        $("#"+source+" .ui-widget-selected").each(function(i){
		        $(this).remove();
				addLi = addLi + "<LI class=ui-widget-content onClick='chooseItem(this)'>" + $(this).html() +"</LI>";		
		});
		$("#"+target).append(addLi);
  }
  function switchRL2(source,target){
        var addLi = "";
		if(source=="selectedColumns")
		{
		  $("#"+source+" .ui-widget-selected").each(function(i){
		        //liValue = {"alias":$(this).val(),"statistics":""};
				addLi = addLi + "<LI class=ui-widget-content onClick='chooseItem(this)'>" + $(this).html() +"<select onchange='setParentValue(this)'><option value='count'>总和</option><option value='sum'>总数</option><option value='average'>平均数</option></select></LI>";		
		  });
		}
		else
		{
		  $("#"+source+" .ui-widget-selected").each(function(i){
		        $(this).remove();
		});
		}        
		$("#"+target).append(addLi);
  }
  function setParentValue(selectEntity,part)
  {
        var selectValue = selectEntity.val();         
        var liValue = $.parseJSON(selectEntity.parent().val());
        if(part=="statistics")
        {
          liValue.statistics = selectValue;
        }
        else if(part == "order")
        {
          liValue.order = selectValue;
        }
        selectEntity.parent().attr("value",$.toJSON(liValue));
  }
  //searchCondition.html
  //function leftToRight(source,target){
        //var addLi = "";
		//var ascOrDesc= "";
	    //$(":radio").each(function (){
	       // if($(this).attr("checked"))
	       // {
	         // ascOrDesc = $(this).val();
	        //}
	   // });
        //$("#"+source+" .ui-widget-selected").each(function(i){
		        //$(this).remove();
				///addLi = addLi + "<LI class=ui-widget-content onClick='chooseItem(this)'>" + $(this).html()+ ((ascOrDesc == "") ? "" : ("("  +ascOrDesc +")"))+"</LI>";		
		//});
		//$("#"+target).append(addLi);
//}
function leftToRight(source,target){
        var addLi = "";
        var liValue = {"alias":$(this).val(),"order":""};
        $("#"+source+" .ui-widget-selected").each(function(i){
		        $(this).remove();
		        //var liValue ={}
				addLi = addLi + "<LI class=ui-widget-content value='"+$.toJSON(liValue)+"' onClick='chooseItem(this)'>" + $(this).html() + "<select onchange='setParentValue(this)'><option value='noOrder'>不排序</option><option value='asc'>升序</option><option value='desc'>降序</option></select></LI>";		
		});
		$("#"+target).append(addLi);
}
function rightToLeft(source,target){
        var addLi = "";
        $("#"+source+" .ui-widget-selected").each(function(i){
		        var text = $(this).html();
				var index = text.indexOf("<SELECT")==-1?text.indexOf("<select"):text.indexOf("<SELECT");
				addLi = addLi + "<LI class=ui-widget-content onClick='chooseItem(this)'>" + text.substring(0,index) +"</LI>";	
				$(this).remove();	
		});
		$("#"+target).append(addLi);
}
//鏌ヨ鏉′欢鐨勫鍔狅紝閫夋嫨锛屽垹闄わ紝娓呯┖
function add()
{
  var operator = "<select><option>&gt;</option>"
                        +"<option>&lt;</option>"
                        +"<option>&gt;=</option>"
                        +"<option>&lt;=</option>"
                        +"<option>&lt;&gt;</option>"
                        +"<option>like</option>"
                        +"<option>not like</option>"
                 "</select>";
  var relation = "<select><option>and</option>"
                        +"<option>or</option>"
                 "</select>"
  var value = "<input id='conditionValue' type='text'>";
  var addTR = "<tr id='conditionContent' class='tr-content' onclick='chooseCondition(this)'>"
               + "<td align='center'><input type='checkbox'/></td>"
               + "<td align='center'>"+$("#allColumnNamess").val()+"</td>"
               + "<td align='center'>"+operator+"</td>"
               + "<td align='center'>"+value+"</td>"
               + "<td align='center'>"+relation+"</td>"
               + "<td align='center'><input type='checkbox'/></td>"
               +"</tr>"
  $("#conditionTitle").after(addTR);
}
function chooseCondition(tr){        
  $(tr).attr("class")=="tr-content"?$(tr).attr("class","tr-selected"):$(tr).attr("class","tr-content");
}
function del()
{
  $(".tr-selected").remove();
}
function clear()
{
  $("#conditonContent").remove();
}
