/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2011-1-17
 * ��̬���ɱ��
 * @version 1.0.4(2011-1-17)
 * @jquery  1.4.2
 */
(function($) {
    //��������  ������2��div�ڵ�checkbox���Ǹ�div������table
    //������Դ�����ɱ��Ŀ��
    var defaults = {
        row: 'row',
        line: 'line',
        target: 'target',
        isXvNi:true

    };

    //��ű䶯ǰ��������������ֵ
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
        //������������ֵ����ȡ��������ֵ�����������С�
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
        //�����Ƿ�Ϊ�����Ʒ�ж��Ƿ���뾩�����ۿۿ������ݡ�
        if (options.isXvNi === false) {
            title[title.length] = '*������';
            title[title.length] = '�ۿ�';
            title[title.length] = '*���';
        }else{
            title[title.length] = '*������Ʒ���';
            title[title.length] = '�ɱ���';
            title[title.length] = '*�г���';
            title[title.length] = '*������';
            title[title.length] = '�ۿ�';
            title[title.length] = '*���������';
        }
        var head = "";
        var tr = "";
        $.each(row, function(i) {
            $.each(line, function(ii) {
                var td = "";
                td = td + "<td>" + $(line[ii]).next("label").html() + "</td>";
                td = td + "<td>" + $(row[i]).next("label").html() + "</td>";
                if (options.isXvNi === false) {
                    td = td + '<td><input type="text"><\/input>Ԫ</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>��</td>';
                }else{
                    td = td + '<td><input type="text"><\/input></td><td><input type="text"><\/input>Ԫ</td><td><input type="text"><\/input>Ԫ</td> <input type="text"><\/input>Ԫ</td><td><input type="text"><\/input>%</td><td><input type="text"><\/input>��</td>';
                }
                tr = tr + "<tr>" + td + "</tr>";
            });
        });
        //���ɱ���һ�б�ͷ
        for (var t = 0;t<title.length;t++) {
            head = head + "<th>" + title[t] + "</th>";
        }
        title = "<table><thead><tr>" + head + "</tr></thead></table>";
        $(this).empty();
        $(this).append(title);
        $(this).append(tr);
        var newValueList = [];
        //��ԭԭ���Ѿ��е�ֵ
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