/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2011-1-17
 * 动态生成表格,目前表格变化的时候不能保存值。
 * @version 1.0.1(2011-1-17)
 * @jquery  1.4.2
 */
 (function($) {
   //基本参数  根据哪2个div内的checkbox在那个div内生成table
   	//行列来源和生成表格目标
    var defaults = {
          row: 'row',
          line: 'line',
          target: 'target',
          isXvNi:true

	};
     function value(x,y,v){
         this.x = x;
         this.y = y;
         this.v = v;
     }
      $.fn.createTable=function(options) {
        ///<summary>
        /// create table by row and line use div[id=line,row] in div[id=target]
        ///</summary>
        var options = $.extend(defaults,options);
		var row = $("#"+options['row']).find("input[type=checkbox][checked=true]");
        var line = $("#"+options['line']).find("input[type=checkbox][checked=true]");
        var valueList = new Array();
        var tempvalue =  $("#"+options['target']).find("input[value]").each(function(iii){
               var y =  $(this).parent().parent().prevAll("tr").length+1;
               var x =  $(this).parent("td").prevAll("td").length;
               valueList[iii]=new value($(this).parent().parent().parent().find("tr").eq(y).find("td").eq(0).html(), $("#"+options['target']).find("tr").eq(0).find("th").eq(x).html(),$(this).val());
          })

        var title  = new Array();
        if(row.length>=1){
            title[0]=  $("#"+options['row']).find("span[istitle]").html();
        }
        if(line.length>=1){
            title[1]=$("#"+options['line']).find("span[istitle]").html();
        }
        if(options['isXvNi']==false){
            title[2] ='*京东价';
            title[3] ='折扣';
            title[4] ='*库存';
        }
        var head = "";
        var tr = "";
        $.each(row,function(i){
                $.each(line,function(ii){
                    var td = "";
                    td=td+ "<td>"+$(line[ii]).next("label").html()+"</td>";
                    td=td+ "<td>"+$(row[i]).next("label").html()+"</td>";
                     if(options['isXvNi']==false){
                        td=td+ '<td><input type="text"><\/input>元</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>件</td>';
                      }
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
    

})(jQuery);