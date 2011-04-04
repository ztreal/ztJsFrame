/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2011-1-15
 * 动态生成表格
 * @version 1.0.0(2011-1-15)
 * @jquery  1.4.2
 */
 (function($) {
   //基本参数  根据哪2个div内的checkbox在那个div内生成table
 

   
      $.fn.createTable=function(options) {
        ///<summary>
        /// create table by row and line use div[id=line,row] in div[id=target]
        ///</summary>
		var row = $("#"+$.fn.createTable.defaults['row']).find("input[type=checkbox][checked=true]");
        var line = $("#"+$.fn.createTable.defaults['line']).find("input[type=checkbox][checked=true]");
        var title  = new Array();
        if(row.length>=1){
            title[0]=  $("#"+$.fn.createTable.defaults['row']).find("span[istitle]").html();
        }
        if(line.length>=1){
            title[1]=$("#"+$.fn.createTable.defaults['line']).find("span[istitle]").html();
        }
        var head = "";
        var tr = "";
        $.each(row,function(i){
                $.each(line,function(ii){
                    var td = "";
                    td=td+ "<td>"+$(line[ii]).next("label").html()+"</td>";
                    td=td+ "<td>"+$(row[i]).next("label").html()+"</td>";
                    tr=tr+ "<tr>"+td+"</tr>";
             })
        })
       for(var t in title){
             head=head+ "<th>"+title[t]+"</th>";
          }

		title="<table><thead><tr>"+head+"</tr></thead></table>";
        $(this).empty();
        $(this).append(title);
        $(this).append(tr);
    };
    
	//行列来源和生成表格目标
    $.fn.createTable.defaults = {
          'row': 'row',
          'line': 'line',
          'target': 'target'
	};
})(jQuery);