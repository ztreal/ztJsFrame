/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2011-1-17
 * 动态生成表格  修正火狐下问题
 * @version 1.0.0(2011-1-17)
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
        var options = $.extend(defaults, options);
        var row = $("#" + options['row']).find("input[type=checkbox][checked=true]");
        var line = $("#" + options['line']).find("input[type=checkbox][checked=true]");
        var valueList = new Array();
        var tempvalue = $("#" + options['target']).find("input[value]").each(function(iii) {
            var y = $(this).parent().parent().prevAll("tr").length + 1;
            var x = $(this).parent("td").prevAll("td").length;
            if ($.browser.mozilla) {
                valueList[iii] = new value($("#" + options['target']).find("tr").eq(0).find("th").eq(x).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(0).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(1).html(),'<input type="text" value='+$(this).val()+'><\/input>'+$(this).parent().text());
            } else {
                valueList[iii] = new value($("#" + options['target']).find("tr").eq(0).find("th").eq(x).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(0).html(), $(this).parent().parent().parent().find("tr").eq(y).find("td").eq(1).html(), $(this).parent().html());
            }

        })

        var title = new Array();
        if (row.length >= 1) {
            title[0] = $("#" + options['row']).find("span[istitle]").html();
        }
        if (line.length >= 1) {
            title[1] = $("#" + options['line']).find("span[istitle]").html();
        }
        if (options['isXvNi'] == false) {
            title[2] = '*京东价';
            title[3] = '折扣';
            title[4] = '*库存';
        }
        var head = "";
        var tr = "";
        $.each(row, function(i) {
            $.each(line, function(ii) {
                var td = "";
                td = td + "<td>" + $(line[ii]).next("label").html() + "</td>";
                td = td + "<td>" + $(row[i]).next("label").html() + "</td>";
                if (options['isXvNi'] == false) {
                    td = td + '<td><input type="text"><\/input>元</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>件</td>';
                }
                tr = tr + "<tr>" + td + "</tr>";
            })
        })
        for (var t in title) {
            head = head + "<th>" + title[t] + "</th>";
        }

        title = "<table><thead><tr>" + head + "</tr></thead></table>";
        $(this).empty();
        $(this).append(title);
        $(this).append(tr);
        var newValueList = new Array();
        for (var val in valueList) {
            for (var i = 1; i <= $("#" + options['target']).find("tr").eq(0).find("th").length; i++) {
                if (valueList[val].x == $("#" + options['target']).find("tr").eq(0).find("th").eq(i).html()) {
                    var xx = i;
                    for (var a = 1; a < $("#" + options['target']).find("tr").length; a++) {
                        if ($("#" + options['target']).find("tr").eq(a).find("td").eq(0).html() == valueList[val].y && $("#" + options['target']).find("tr").eq(a).find("td").eq(1).html() == valueList[val].y2) {
                            $("#" + options['target']).find("tr").eq(a).find("td").eq(xx).html(valueList[val].v);
                        }
                    }
                }
            }
        }

    };


})(jQuery);