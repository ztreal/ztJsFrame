function initJspPage(json)
{
    var tableCount = json.entities.table.length;
    var allColumnNames = "<select onchange='initConditionValue(this)'><option value='default'>--选择列--</option>";
    for(var i = 0;i < tableCount; i++)
    {
      var tableName = json.entities.table[i].name;
      var columnCount = json.entities.table[i].column.length;      
      for(var j = 0;j<columnCount;j++)
      {
        var columnName = json.entities.table[i].column[j].name;
        var columnAlias = json.entities.table[i].column[j].alias;
        //var columnJavaType = json.entities.table[i].column[j].javaType;
        var validate = json.entities.table[i].column[j].validate;
        var columnId = json.entities.table[i].column[j].id;
        //var validateInfo = "{'type':'"+columnJavaType+"','validate':"+$.toJSON(validate)+"}";
        var validateInfo = {'columnId':columnId,'validate':validate};
        addLiToUl(columnName,columnAlias,"allColumns");
        addLiToUl(columnName,columnAlias,"allColumns2");
        //alert($.toJSON(validateInfo));
        allColumnNames = allColumnNames + "<option value='"+$.toJSON(validateInfo)+"'>" + columnName + "</option>";
      }
    }
    allColumnNames = allColumnNames + "</select>";
    //alert(allColumnNames);
    $("#allColumnNames").attr("value",allColumnNames);
    //将码表字段拿出,转换为字符串放入一个隐藏域中
    $("#codeStr").attr("value",$.toJSON(json.relations.code));     
}

function addLiToUl(columnName,columnAlias,ULId)
{
  //var liValue = "{\"columnName\":" + columnName +",\"columnJavaType\":" + columnJavaType +"}";
  //var addLi = "<LI class='ui-widget-content' onclick='chooseItem(this)' value='" + liValue + "'>" + columnAlias + "</LI>";
  var addLi = "<LI class='ui-widget-content' onclick='chooseItem(this)'>" + columnName + "</LI>";
  $("#"+ULId).append(addLi);
}