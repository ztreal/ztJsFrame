/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2011-1-17
 * 动态生成表格
 * @version 1.0.4(2011-1-17)
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

    //存放变动前表格的行列条件和值
    function value(x, y, y2, v) {
        this.x = x;
        this.y2 = y2;
        this.y = y;
        this.v = v;
    }

    $.fn.createTable = function(options) {
        ///<summary>
        /// create table by row and line use div[id=line,row] in div[id=target]
        ///</summary>
        options = $.extend(defaults, options);
        var row = $("#" + options.row).find("input[type=checkbox][checked=true]");
        var line = $("#" + options.line).find("input[type=checkbox][checked=true]");
        var valueList = [];
        //如果表格内容有值，获取其条件和值，放入数组中。
        var tempvalue = $("#" + options.target).find("input[value]").each(function(iii) {
            var y = $(this).parent().parent().prevAll("tr").length + 1;
            var x = $(this).parent("td").prevAll("td").length;
            if ($.browser.mozilla) {
                valueList[iii] = new value($("#" + options.target).find("tr").eq(0).find("th").eq(x).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(0).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(1).html(),'<input type="text" value='+$(this).val()+'><\/input>'+$(this).parent().text());
            } else {
                valueList[iii] = new value($("#" + options.target).find("tr").eq(0).find("th").eq(x).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(0).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(1).html(), $(this).parent().html());
            }
        });

        var title = [];
        if (row.length >= 1) {
            title[0] = $("#" + options.row).find("span[istitle]").html();
        }
        if (line.length >= 1) {
            title[title.length] = $("#" + options.line).find("span[istitle]").html();
        }
        //根据是否为虚拟产品判断是否加入京东价折扣库存等内容。
        if (options.isXvNi === false) {
            title[title.length] = '*京东价';
            title[title.length] = '折扣';
            title[title.length] = '*库存';
        }else{
            title[title.length] = '*云网产品编号';
            title[title.length] = '成本价';
            title[title.length] = '*市场价';
            title[title.length] = '*京东价';
            title[title.length] = '折扣';
            title[title.length] = '*最大购买数量';
        }
        var head = "";
        var tr = "";
        $.each(row, function(i) {
            $.each(line, function(ii) {
                var td = "";
                td = td + "<td>" + $(line[ii]).next("label").html() + "</td>";
                td = td + "<td>" + $(row[i]).next("label").html() + "</td>";
                if (options.isXvNi === false) {
                    td = td + '<td><input type="text"><\/input>元</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>件</td>';
                }else{
                    td = td + '<td><input type="text"><\/input></td><td><input type="text"><\/input>元</td><td><input type="text"><\/input>元</td> <input type="text"><\/input>元</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>张</td>';
                }
                tr = tr + "<tr>" + td + "</tr>";
            });
        });
        //生成表格第一行表头
        for (var t = 0;t<title.length;t++) {
            head = head + "<th>" + title[t] + "</th>";
        }
        title = "<table><thead><tr>" + head + "</tr></thead></table>";
        $(this).empty();
        $(this).append(title);
        $(this).append(tr);
        var newValueList = [];
        //还原原来已经有的值
        for (var val=0;val<valueList.length;val++) {
            for (var i = 1; i <= $("#" + options.target).find("tr").eq(0).find("th").length; i++) {
                if (valueList[val].x == $("#" + options.target).find("tr").eq(0).find("th").eq(i).html()) {
                    var xx = i;
                    for (var a = 1; a < $("#" + options.target).find("tr").length; a++) {
                        if ($("#" + options.target).find("tr").eq(a).find("td").eq(0).html() == valueList[val].y && $("#" + options.target).find("tr").eq(a).find("td").eq(1).html() == valueList[val].y2) {
                            $("#" + options.target).find("tr").eq(a).find("td").eq(xx).html(valueList[val].v);
                        }
                    }
                }
            }
        }

    };


})(jQuery);