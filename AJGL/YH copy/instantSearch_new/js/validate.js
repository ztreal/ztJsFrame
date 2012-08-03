function initConditionValue(selectEntity)
{
  //alert($(selectEntity).val());
  var conditionValueTD = $(selectEntity).parent().parent().children()[3];
  var conditionValue = $(conditionValueTD).children();
    if($(selectEntity).val()!='defalut')
    {
      //先判断该是否包含在码表源字段集合中，如果是，将文本框换成对应码表的下拉列表框（验证先暂时不考虑）
      //判断
      var json = $.parseJSON($(selectEntity).val());
      //alert($("#codeStr").val());
      var codesJSON = $.parseJSON($("#codeStr").val());//码表信息JSON对象，是个集合。
      var columnId = json.columnId;//所选字段的id
      var codeJson = getCodeJson(columnId,codesJSON);
      if(codeJson != null)
      {
        //说明该字段是一个码表字段
        var sourceId = codeJson.sourceId;
        //alert(sourceId);
        var targetId = codeJson.targetId;
        var labelColumn =codeJson.labelColumn;
        var url = "/instantSearch/servlet/ProduceCode?sourceId="+sourceId+"&targetId="+targetId+"&labelColumn="+labelColumn;
        $.getJSON(url,function(resultJson){
            //alert($.toJSON(resultJson));    
            //alert(resultJson.code[0].codeDisplay);   
            var selectStr = produceCodeSelect(resultJson);
            //alert(selectStr);
            $(conditionValueTD).html(selectStr);
        });       
      }
      else
      {
      conditionValue.blur(function (){validate(conditionValue.val(),$(selectEntity).val())});
      }
    }
    //如果该字段是日期类型，要加click事件
     //var json = $.parseJSON($(selectEntity).val());
    if(json.validate.type=="dateValidate")
    {
      var format = json.validate.format;
      conditionValue.click(function(){
        if(format.match("HH")!=null||format.contains("mm")!=null||format.contains("ss")!=null)
        {
            timeShow = true;
        }
        EP.Calendar.show({'format':format,'timeShow':timeShow}); 
      });
    }
  //$(conditionValue).b = "validate(this.value,"+selectEntity.value+")";
}
//从codeJSON中找出columnId所对应的码表信息
//如果有，返回一个JSON对象
//如果没有，返回null
function getCodeJson(columnId,codesJSON)
{
  var result = null;
  for(var k=0;k<codesJSON.length;k++)
  {
    if(codesJSON[k].sourceId == columnId)
    {
      var result = codesJSON[k];
      break;
    }    
  }
  return result;
}
function produceCodeSelect(json)
{
  //alert(111);
  var selectStr = "<select>";
  //alert(json.code.length);
  for(var i=0;i<json.code.length;i++)
  {
    var codeDisplay = json.code[i].codeDisplay;
    //alert(codeDispaly);
    var codeValue = json.code[i].codeValue;
    //alert(codeValue);
    selectStr = selectStr + "<option value='"+codeValue+"'>"+codeDisplay+"</option>";
    //alert(selectStr);
  }
  selectStr= selectStr + "</select>";
  //alert(selectStr);
  return selectStr;
}
function validate(str,validateInfo)
{
	//alert("aaaaaaaaaaaaaaa");
	//var v = {'type':'java.lang.String','validate':{"maxLength":0,"minLength":0}};
	//alert(v.type);
	//alert(validateInfo);
    var validate = $.parseJSON(validateInfo).validate;
    //alert(json);
   // var type = json.type;
    //alert(type);
    //var validate = json.validate;
    var type = validate.type;
    //alert(type);
  if(type=="stringValidate")
  {
        var notNull = validate.notNull;
        //var notNull = true;
        var containsSpace =validate.containsSpace;
        //var maxLength = 100;//假设条件
        //var maxLength = validate.maxLength;
        var minLength = validate.minLength;
        var length = validate.length;
        //alert(1);
        if(notNull&&!isNotNull(str))
        {
        	alert("str can not be empty and contain space characters!");
        	return;
        }
        if(!isNotOutOfLimit(str,minLength,length))
        {
        	alert("the length of your input string's length must between"+ minLength + "and " + length);
        	return;
        }    
  } 
  else if(type=="dateValidate")//date validate
  {
        alert(2);
        //var format = validate.format;
        var notNull = validate.notNull;
        //var timeShow = false;
        //alert(format);
        if(notNull&&!isNotNull(str))    
        {
          alert("date can't be empty!");
          return;
        }
        //if(format.match("HH")!=null||format.contains("mm")!=null||format.contains("ss")!=null)
        //{
          //timeShow = true;
        //}
        //EP.Calendar.show({'format':format,'timeShow':timeShow}); 
  }
  else if(type == "numberValidate")//validate number
  {
    //alert(3);
    var length = validate.length;
    var maxValue = validate.maxValue;
    var minValue = validate.minValue;
    var notNull = validate.notNull;
    if(notNull &!isNotNull(str))
    {
    	alert("number can not be empty！");
    	return;
    }
    if(!isNumberStr(str))
    {
    	alert("Please input number");
    	return;
    }    
    if(!isInLimit(Number(str),minValue,maxValue))
    {
    	alert("Out of range");
    	return;
    }
  }
  //alert(111111111);
}
function isNotNull(str)
{  
  //验证是否为空
  if (str=="") 
  {
     return false;
  }
  //验证是否包含空格
  var reg = new RegExp('^( )+|^[\s　]+|( )+$|[\s　]+$/g|\s');
  if(reg.exec(str) != null)
  {
	return false;
  }
  return true;
}
//验证字符串长度是否超标
function isNotOutOfLimit(str,minLength,maxLength)
{
  if(str.length>maxLength||str.length<minLength)
  {
    return false;
  }
  return true;
}

//验证输入的值是否是合法数字
function isNumberStr(str)
{
   var a = Number(str);
   if(isNaN(a))
   {
     //alert(false);
     return false;
   }
   //alert(true);
   return true;  
}
//验证精度
//验证小数个数
//验证最大值,最小值
function isInLimit(a,min,max)
{
  if(a>=min&&a<=max)
  {
    return true;
  } 
  return false;
}