/**
 * @author zhangtan
 * @email ztreal@gmail.com
 * @since  2010-10-21
 * У��ҳ��ƽ���ϵ
 * @version 1.0.0(2010-10-21)
 * @jquery  1.3.2
 */
(function($) {
    //��������  У����ʾ����
    /** $.fn.print.default = {
     greater: "greater than"
     };

     // ��ҪУ������ݲ�������
     *   var valicontent=new Array({c1tr:0,c1td:1,c2tr:0,c2td:3,symbol:'<'},{c1tr:1,c1td:1,c2tr:1,c2td:3,symbol:'<'},{c1tr:2,c1td:'1+3',c2tr:2,c2td:5,symbol:'<'});
     $("#test").check(valicontent);  **/
    $.fn.check = function(options) {
        ///<summary>
        /// validate div table cell ֮���ƽ���ϵ
        ///</summary>
        var va1namelist = '';
        var va1 = 0;
        var va2 = "";
        var va2name = "";
        var symbol = "";
        var error = [];
        $("#jsshowerror").empty();
        for (var i = 0; i < options.length; i++) {
            //var opts = $.extend({}, $.fn.check.defaults, options);
            var temptdlist = options[i].c1td.toString().split('+');
            if (options[i].c1td.toString().indexOf('+') > -1) {

                for (var ii = 0; ii < temptdlist.length; ii++) {
                    va1 = Number(va1) + Number($(this).find("tr").eq(options[i].c1tr).children("td").eq(temptdlist[ii]).find("input[type='text'],select").val());
                    va1namelist = va1namelist + '��' + $(this).find("tr").eq(options[i].c1tr).children("td").eq(temptdlist[ii] - 1).html();
                }
                va1namelist = va1namelist.substring(1, va1namelist.length);
                va2 = $(this).find("tr").eq(options[i].c2tr).children("td").eq(options[i].c2td).find("input[type='text'],select").val();
                va2name = $(this).find("tr").eq(options[i].c2tr).children("td").eq(options[i].c2td - 1).html();
                symbol = options[i].symbol;
                if (eval(va1 + symbol + va2)) {
                    //alert("����ɹ���");
                }
                else {
                      error[error.length]=  va1namelist + $.fn.check.defaults[symbol] + va2name;
                    //alert(va1namelist + $.fn.check.defaults[symbol] + va2name);
                }
            }
            else {
                va1 = $(this).find("tr").eq(options[i].c1tr).children("td").eq(options[i].c1td).find("input[type='text'],select").val();
                var va1name = $(this).find("tr").eq(options[i].c1tr).children("td").eq(options[i].c1td - 1).html();
                va2 = $(this).find("tr").eq(options[i].c2tr).children("td").eq(options[i].c2td).find("input[type='text'],select").val();
                va2name = $(this).find("tr").eq(options[i].c2tr).children("td").eq(options[i].c2td - 1).html();
                symbol = options[i].symbol;
                if (eval(va1 + symbol + va2)) {
                    //alert("����ɹ���");
                }
                else {
                    error[error.length]=  va1name + $.fn.check.defaults[symbol] + va2name;
                   // alert(va1name + $.fn.check.defaults[symbol] + va2name);
                }
            }
        }
        if($("#jsshowerror").length>=1){
            var errorhtml="";
            for(var i =0;i<error.length;i++){
                errorhtml = errorhtml+ "<div>"+error[i]+"</div>";
            }
              $("#jsshowerror").append(errorhtml);
        }
    };

    //У�鵯������ʾ��
    $.fn.check.defaults = {
        '>': 'Ӧ����',
        '<': 'ӦС��'
    };
})(jQuery);