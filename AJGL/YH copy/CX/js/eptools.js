/**
 * @author Dillon
 */
EP = {
	version : "4.0.0",
	g_isMozilla : (typeof document.implementation != 'undefined')
			&& (typeof document.implementation.createDocument != 'undefined')
			&& (typeof HTMLDocument != 'undefined'),
	setRadioValueToHidden : function(hiddenId) {
		var $curRadio = $(EP.getTarget());
		var result = EP.findParent($curRadio, "TR");
		if (!result) {
			result = EP.findParent($curRadio, "FORM");
		}
		$(result).contents().find('#' + hiddenId).each(function() {
			this.value = $curRadio.val();
		});
	},
	setCheckboxValueToHidden : function(hiddenId, symbol) {
		var $curCheckbox = $(EP.getTarget());
		var result = EP.findParent($curCheckbox, "TR");
		if (!result) {
			result = EP.findParent($curCheckbox, "FORM");
		}
		$(result).contents().find('#' + hiddenId).each(function() {
			if ($curCheckbox.attr('checked')) {
				this.value += $curCheckbox.val() + symbol;
			} else {
				this.value = this.value
						.replace($curCheckbox.val() + symbol, "");
			}
		});
	},
	initializeRadio : function(eventStr) {
		if (!eventStr)
			eventStr = "onclick";
		$('input[type=radio]').each(function() {
			var es = eventStr.split(",");
			for (i = 0; i < es.length; i++) {
				if (e = this[es[i]]) {
					var fs = e
							.toString()
							.match(/EP.setRadioValueToHidden\(\s*\'([^\)]*)\'\s*/);
					if (fs != null) {
						var result = EP.findParent(this, "TR");
						var radio = this;
						$(result).contents().find('#' + fs[1]).each(function() {
							if (this.value == radio.value) {
								radio.checked = true;
							} else {
								radio.checked = false;
							}
						});
					}
				}
			}
		});
	},
	initializeCheckbox : function(eventStr) {
		if (!eventStr)
			eventStr = "onclick";
		$('input[type=checkbox]').each(function() {
			var es = eventStr.split(",");
			for (i = 0; i < es.length; i++) {
				if (e = this[es[i]]) {
					var fs = e
							.toString()
							.match(/EP.setCheckboxValueToHidden\(\s*\'([^\)]*)\'\s*,\s*\'([^\)]*)\'\s*/);
					if (fs != null) {
						var result = EP.findParent(this, "TR");
						var checkbox = this;
						$(result).contents().find('#' + fs[1]).each(function() {
							if (EP.isInArray(checkbox.value, this.value
											.split(fs[2]))) {
								checkbox.checked = true;
							} else {
								checkbox.checked = false;
							}
						});
					}
				}
			}
		});
	},
	isInArray : function(value, array) {
		return $.inArray(value, array) != -1;
	},
	findParent : function(src, tagName) {
		return $(src).parentsUntil(tagName).parent().get(0);
	},
	StringBuilder : function() {
		this.__string__ = new Array();
	}
};

EP.StringBuilder.prototype.append = function(str) {
	this.__string__.push(str);
}

EP.StringBuilder.prototype.toString = function() {
	return this.__string__.join("");
}

EP.StringBuilder.prototype.size = function() {
	return this.__string__.length;
}

EP.Calendar = {
	cal_Width : 156,// 定义日历显示的宽度，至少140
	version : "1.0.0",
	show : function(arguments) {
		if (!WebCalendar.iframe)
			WebCalendar.iframe = window.frames["meizzCalendarIframe"]; // 日历的
		// iframe
		// 载体
		if (!WebCalendar.calendar)
			WebCalendar.calendar = document
					.getElementById("meizzCalendarLayer"); // 日历的层
		if (EP.getTarget()['readOnly'])
			return;
		if (arguments) {
			WebCalendar.yearFall = arguments['yearFall']
					|| WebCalendar.yearFall;
			WebCalendar.format = arguments['format'] || WebCalendar.format;
			WebCalendar.timeShow = arguments['timeShow']
					|| WebCalendar.timeShow;
			WebCalendar.drag = arguments['drag'] || WebCalendar.drag;
			WebCalendar.darkColor = arguments['darkColor']
					|| WebCalendar.darkColor;
			WebCalendar.lightColor = arguments['lightColor']
					|| WebCalendar.lightColor;
			WebCalendar.btnBgColor = arguments['btnBgColor']
					|| WebCalendar.btnBgColor;
			WebCalendar.wordColor = arguments['wordColor']
					|| WebCalendar.wordColor;
			WebCalendar.wordDark = arguments['wordDark']
					|| WebCalendar.wordDark;
			WebCalendar.dayBgColor = arguments['dayBgColor']
					|| WebCalendar.dayBgColor;
			WebCalendar.todayColor = arguments['todayColor']
					|| WebCalendar.todayColor;
			WebCalendar.darkBorder = arguments['darkBorder']
					|| WebCalendar.darkBorder;
		}
		if (WebCalendar.timeShow) {
			WebCalendar.calendarHeight = "218px";// 定义日历显示的高度，如果有时间，建议是218
		} else {
			WebCalendar.calendarHeight = "193px";// 定义日历显示的高度，如果只有日期，建议是195
		}
		this.baseCalendar();
	},
	writeIframe : function() {
		var strIframe = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=gb2312'><style>"
				+ "*{font-size: 12px; font-family: 宋体}"
				+ ".bg{  color: "
				+ WebCalendar.lightColor
				+ "; cursor: default; background-color: "
				+ WebCalendar.darkColor
				+ ";}"
				+ "table#tableMain{ width: "
				+ (EP.Calendar.cal_Width + 2).toString()
				+ "px; height: 180px;}"
				+ "table#tableWeek td{ width:14%;color: "
				+ WebCalendar.lightColor
				+ ";}"
				+ "table#tableDay  td{ width:14%;font-weight: bold;}"
				+ "td#meizzYearHead, td#meizzYearMonth{color: "
				+ WebCalendar.wordColor
				+ "}"
				+ ".out { text-align: center; border-top: 1px solid "
				+ WebCalendar.darkBorder
				+ "; border-left: 1px solid "
				+ WebCalendar.darkBorder
				+ ";"
				+ "border-right: 1px solid "
				+ WebCalendar.lightColor
				+ "; border-bottom: 1px solid "
				+ WebCalendar.lightColor
				+ ";}"
				+ ".over{ text-align: center; border-top: 1px solid #FFFFFF; border-left: 1px solid #FFFFFF;"
				+ "border-bottom: 1px solid "
				+ WebCalendar.darkBorder
				+ "; border-right: 1px solid "
				+ WebCalendar.darkBorder
				+ "}"
				+ "input{ border: 1px solid "
				+ WebCalendar.darkColor
				+ "; padding-top: 1px; height: 18px; cursor: pointer;"
				+ "       color:"
				+ WebCalendar.wordColor
				+ "; background-color: "
				+ WebCalendar.btnBgColor
				+ "}"
				+ "</style></head><body onselectstart='return false' style='margin: 0px' oncontextmenu='return false'><form name='meizz'>";

		if (WebCalendar.drag) {
			strIframe += "<scr"
					+ "ipt language=javascript>"
					+ "var drag=false, cx=0, cy=0, o = parent.WebCalendar.calendar; moveFlyBar = function(e){"
					+ "if(!e)e=window.event;if(parent.WebCalendar.drag && drag){if(o.style.left=='')o.style.left=0; if(o.style.top=='')o.style.top=0;"
					+ "o.style.left = parseInt(o.style.left) + e.clientX - cx;"
					+ "o.style.top  = parseInt(o.style.top)  + e.clientY - cy;}};if(parent.EP.g_isMozilla){window.captureEvents(Event.MOUSEMOVE);window.onmousemove = moveFlyBar;}else{document.onmousemove = moveFlyBar;}"
					+ "document.onkeydown = function(e){if(!e)e=window.event;switch(e.keyCode){  case 27 : parent.EP.Calendar.hiddenCalendar(); break;"
					+ "case 37 : parent.EP.Calendar.prevM(); break; case 38 : parent.EP.Calendar.prevY(); break; case 39 : parent.EP.Calendar.nextM(); break; case 40 : parent.EP.Calendar.nextY(); break;"
					+ "case 84 : document.forms[0].today.click(); break;};"
					+ "try{e.keyCode = 0; e.returnValue= false;}catch(ee){}};"
					+ "dragStart = function(e){if(!e)e=window.event;cx=e.clientX; cy=e.clientY; drag=true;};</scr"
					+ "ipt>"
		}

		strIframe += "<table id='tableMain' class='bg' border='0' cellspacing='2' cellpadding='0'>"
				+ "<tr><td width='"
				+ EP.Calendar.cal_Width
				+ "px' height='19px' bgcolor='"
				+ WebCalendar.lightColor
				+ "'>"
				+ "    <table width='"
				+ EP.Calendar.cal_Width
				+ "px' id='tableHead' border='0' cellspacing='1' cellpadding='0'><tr align='center'>"
				+ "    <td width='10%' height='19px' class='bg' title='向前翻 1 月&#13;快捷键：←' style='cursor: pointer' onclick='parent.EP.Calendar.prevM()'><b>&lt;</b></td>"
				+ "    <td width='45%' id='meizzYearHead' "
				+ "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"
				+ "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'>"
				+ "<select name='tmpYearSelect' style='width:100%;'"
				+ "        onchange='parent.WebCalendar.thisYear =this.value; parent.EP.Calendar.writeCalendar();'>";

		strIframe += WebCalendar.yearOption
				+ "</select>"
				+ "</td>"
				+ "    <td width='35%' id='meizzYearMonth' "
				+ "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"
				+ "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'>"
				+ "<select name='tmpMonthSelect' style='width:100%;'"
				+ "        onchange='parent.WebCalendar.thisMonth=this.value; parent.EP.Calendar.writeCalendar();'>";
		for (var i = 1; i < 13; i++)
			strIframe += "<option value='" + i + "'>" + i + "月</option>";
		strIframe += "</select>"
				+ "</td>"
				+ "    <td width='10%' class='bg' title='向后翻 1 月&#13;快捷键：→' onclick='parent.EP.Calendar.nextM()' style='cursor: pointer'><b>&gt;</b></td></tr></table>"
				+ "</td></tr>";

		strIframe += "<tr><td height='20px'>"
				+ "<table id='tableWeek' border='0' width='"
				+ EP.Calendar.cal_Width
				+ "px' cellpadding='0' cellspacing='0' ";
		if (WebCalendar.drag) {
			strIframe += "onmousedown='dragStart(event)' onmouseup='drag=false' ";
		}
		strIframe += ">"
				+ "    <tr align=center><td height='20px'>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table>"
				+ "</td></tr><tr><td valign='top' width='"
				+ EP.Calendar.cal_Width + "px' bgcolor='"
				+ WebCalendar.lightColor + "'>"
				+ "    <table id='tableDay' height='120px' width='"
				+ EP.Calendar.cal_Width
				+ "px' border='0' cellspacing='0' cellpadding='0'>";
		for (var x = 0; x < 5; x++) {
			strIframe += "<tr>";
			for (var y = 0; y < 7; y++)
				strIframe += "<td class='out' id='meizzDay" + (x * 7 + y)
						+ "'></td>";
			strIframe += "</tr>";
		}
		strIframe += "<tr>";
		for (var x = 35; x < WebCalendar.dayShow; x++)
			strIframe += "<td class='out' id='meizzDay" + x + "'></td>";
		strIframe += "<td colspan="
				+ (42 - WebCalendar.dayShow).toString()
				+ " class='out' style='text-align:center;' title='"
				+ WebCalendar.regInfo
				+ "'>"
				+ "<input style=' background-color: "
				+ WebCalendar.btnBgColor
				+ ";cursor: pointer; padding-top: 1px; width: 44%; height: 100%;' onfocus='this.blur()'"
				+ " type='button' value='清空' onclick='parent.WebCalendar.objExport.value=\"\";parent.EP.Calendar.hiddenCalendar()'>"
				+ "&nbsp;"
				+ "<input style=' background-color: "
				+ WebCalendar.btnBgColor
				+ ";cursor: pointer; padding-top: 1px; width: 44%; height: 100%;' onfocus='this.blur()'"
				+ " type='button' value='关闭' onclick='parent.EP.Calendar.hiddenCalendar()'>"
				+ "</td></tr></table></td></tr>";

		if (WebCalendar.timeShow) {
			// 小时
			strIframe += "<tr><td><table width=100%><tr>"
					+ "    <td width='34%' id=meizzHour "
					+ "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"
					+ "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'>"
					+ "<select name=tmpHourSelect style='width:100%;'"
					+ "        onchange='parent.WebCalendar.thisHour=this.value; parent.EP.Calendar.writeCalendar();'>";
			for (var i = 0; i < 24; i++)
				strIframe += "<option value='" + i + "'>" + i + "点</option>";
			strIframe += "</select></td>";

			// 分钟
			strIframe += "<td width='33%' id='meizzMinute' "
					+ "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"
					+ "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'>"
					+ "<select name='tmpMinuteSelect' style='width:100%;'"
					+ "        onchange='parent.WebCalendar.thisMinute=this.value; parent.EP.Calendar.writeCalendar();'>";
			for (var i = 0; i < 60; i++)
				strIframe += "<option value='" + i + "'>" + i + "分</option>";
			strIframe += "</select></td>";

			// 秒
			strIframe += "<td width='33%' id='meizzSecond' "
					+ "        onmouseover='this.bgColor=parent.WebCalendar.darkColor; this.style.color=parent.WebCalendar.lightColor'"
					+ "        onmouseout='this.bgColor=parent.WebCalendar.lightColor; this.style.color=parent.WebCalendar.wordColor'>"
					+ "<select name='tmpSecondSelect' style='width:100%;'"
					+ "        onchange='parent.WebCalendar.thisSecond=this.value; parent.EP.Calendar.writeCalendar();'>";
			for (var i = 0; i < 60; i++)
				strIframe += "<option value='" + i + "'>" + i + "秒</option>";
			strIframe += "</select></td>";

			strIframe += "</tr></table></td></tr>";
		}

		strIframe += "<tr><td height='20px' width='"
				+ EP.Calendar.cal_Width
				+ "px' bgcolor='"
				+ WebCalendar.lightColor
				+ "'>"
				+ "    <table border='0' cellpadding='1' cellspacing='0' width='"
				+ EP.Calendar.cal_Width
				+ "px'>"
				+ "    <tr><td><input name='prevYear' title='向前翻 1 年&#13;快捷键：↑' onclick='parent.EP.Calendar.prevY()' style='width: 20px;' type='button' value='&lt;&lt;'"
				+ "    onfocus='this.blur()'><input"
				+ "    onfocus='this.blur()' name='prevMonth' title='向前翻 1 月&#13;快捷键：←' onclick='parent.EP.Calendar.prevM()' style='width: 16px;' type='button' value='&lt;&nbsp;'>"
				+ "    </td><td align=center><input name='today' type='button' value='当前日期' onfocus='this.blur()' style='width: 72px;' title='当前日期&#13;快捷键：T'"
				+ "    onclick=\"if(parent.WebCalendar.timeShow){parent.WebCalendar.thisHour=new Date().getHours();parent.WebCalendar.thisMinute=new Date().getMinutes();parent.WebCalendar.thisSecond=new Date().getSeconds();parent.EP.Calendar.returnDate(new Date().getDate() +'/'+ (new Date().getMonth() +1) +'/'+ new Date().getFullYear());}else{parent.EP.Calendar.returnDate(new Date().getDate() +'/'+ (new Date().getMonth() +1) +'/'+ new Date().getFullYear())}\">"
				+ "    </td><td align='center'><input title='向后翻 1 月&#13;快捷键：→' name='nextMonth' onclick='parent.EP.Calendar.nextM()' style='width: 16px;' type='button' value='&gt;'"
				+ "    onfocus='this.blur()'><input name='nextYear' title='向后翻 1 年&#13;快捷键：↓' onclick='parent.EP.Calendar.nextY()' style='width: 20px;' type='button' value='&gt;&gt;'"
				+ "    onfocus='this.blur()'></td></tr></table>"
				+ "</td></tr><table></form></body></html>";
		with (WebCalendar.iframe) {
			document.writeln(strIframe);
			document.close();
			for (var i = 0; i < WebCalendar.dayShow; i++) {
				WebCalendar.dayObj[i] = document.getElementById("meizzDay" + i);
				WebCalendar.dayObj[i].onmouseover = this.dayMouseOver;
				WebCalendar.dayObj[i].onmouseout = this.dayMouseOut;
				WebCalendar.dayObj[i].onclick = this.returnDate;
			}
		}
	},
	baseCalendar : function()// 主调函数
	{
		var e = EP.getTarget();
		this.writeIframe();
		WebCalendar.calendar.style.height = WebCalendar.calendarHeight;
		var o = WebCalendar.calendar.style;
		WebCalendar.eventSrc = e;
		WebCalendar.objExport = e;

		WebCalendar.iframe.document.getElementById('tableWeek').style.cursor = WebCalendar.drag
				? "move"
				: "default";

		var pos = $(e).offset();

		var t = pos.top, h = e.clientHeight, l = pos.left, p = e.type;
		// while (e = e.offsetParent) {
		// t += e.offsetTop;
		// l += e.offsetLeft;
		// }
		var cw = $(WebCalendar.calendar).width(), ch = $(WebCalendar.calendar)
				.height();
		var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;

		if (document.body.clientHeight + dt - t - h >= ch)
			o.top = ((p == "image") ? t + h : t + h + 2) + "px";
		else
			o.top = ((t - dt < ch) ? ((p == "image") ? t + h : t + h + 2) : t
					- ch)
					+ "px";
		if (dw + dl - l >= cw)
			o.left = l + "px";
		else
			o.left = ((dw >= cw) ? dw - cw + dl : dl) + "px";
		// if (!WebCalendar.timeShow)
		// WebCalendar.dateReg =
		// /^(\d{1,4})(-|\/|.)(\d{1,2})[-|\/|.](\d{1,2})$/;
		// else
		// WebCalendar.dateReg =
		// /^(\d{1,4})(-|\/|.)(\d{1,2})[-|\/|.](\d{1,2})
		// (\d{1,2}):(\d{1,2}):(\d{1,2})$/;

		try {
			if (WebCalendar.objExport.value.trim() != "") {
				// WebCalendar.dateStyle =
				// WebCalendar.objExport.value.trim().match(WebCalendar.dateReg);
				WebCalendar.dateStyle = Date.valueOfInEp(
						WebCalendar.objExport.value.trim(), WebCalendar.format);
				if (WebCalendar.dateStyle == null) {
					WebCalendar.thisYear = new Date().getFullYear();
					WebCalendar.thisMonth = new Date().getMonth() + 1;
					WebCalendar.thisDay = new Date().getDate();
					alert("原文本框里的日期有错误！\n可能与你定义的显示时分秒有冲突！");
					this.writeCalendar();
					o.display = "";
					WebCalendar.iframe.document.body.focus();
					return false;
				} else {
					// WebCalendar.thisYear =
					// parseInt(WebCalendar.dateStyle[1], 10);
					// WebCalendar.thisMonth =
					// parseInt(WebCalendar.dateStyle[3], 10);
					// WebCalendar.thisDay =
					// parseInt(WebCalendar.dateStyle[4], 10);
					// WebCalendar.thisHour =
					// parseInt(WebCalendar.dateStyle[5], 10);
					// WebCalendar.thisMinute =
					// parseInt(WebCalendar.dateStyle[6], 10);
					WebCalendar.thisYear = WebCalendar.dateStyle.getFullYear();
					WebCalendar.thisMonth = WebCalendar.dateStyle.getMonth()
							+ 1;
					WebCalendar.thisDay = WebCalendar.dateStyle.getDate();
					WebCalendar.thisHour = WebCalendar.dateStyle.getHours();
					WebCalendar.thisMinute = WebCalendar.dateStyle.getMinutes();
					WebCalendar.thisSecond = WebCalendar.dateStyle.getSeconds();
					WebCalendar.inputDate = parseInt(WebCalendar.thisDay, 10)
							+ "/" + parseInt(WebCalendar.thisMonth, 10) + "/"
							+ parseInt(WebCalendar.thisYear, 10);
					this.writeCalendar();
				}
			} else {
				WebCalendar.thisYear = new Date().getFullYear();
				WebCalendar.thisMonth = new Date().getMonth() + 1;
				WebCalendar.thisDay = new Date().getDate();
				WebCalendar.thisHour = new Date().getHours();
				WebCalendar.thisMinute = new Date().getMinutes();
				WebCalendar.thisSecond = new Date().getSeconds();
				this.writeCalendar();
			}
		} catch (e) {
			WebCalendar.thisYear = new Date().getFullYear();
			WebCalendar.thisMonth = new Date().getMonth() + 1;
			WebCalendar.thisDay = new Date().getDate();
			WebCalendar.thisHour = new Date().getHours();
			WebCalendar.thisMinute = new Date().getMinutes();
			WebCalendar.thisSecond = new Date().getSeconds();
			this.writeCalendar();
		}
		o.display = "";
		WebCalendar.iframe.document.body.focus();
		return true;
	},
	funMonthSelect : function() // 月份的下拉框
	{
		var m = isNaN(parseInt(WebCalendar.thisMonth, 10)) ? new Date()
				.getMonth()
				+ 1 : parseInt(WebCalendar.thisMonth);
		var e = WebCalendar.iframe.document.forms[0].tmpMonthSelect;
		e.value = m;
	},
	funYearSelect : function() // 年份的下拉框
	{
		var e = WebCalendar.iframe.document.forms[0].tmpYearSelect;
		var y = isNaN(parseInt(WebCalendar.thisYear, 10)) ? new Date()
				.getFullYear() : parseInt(WebCalendar.thisYear);
		e.value = y;
	},
	funHourSelect : function() // 小时的下拉框
	{
		var e = WebCalendar.iframe.document.forms[0].tmpHourSelect;
		var h = isNaN(parseInt(WebCalendar.thisHour, 10)) ? new Date()
				.getHours() : parseInt(WebCalendar.thisHour);
		e.value = h; // e.focus();
	},
	funMinuteSelect : function() // 分钟的下拉框
	{
		var e = WebCalendar.iframe.document.forms[0].tmpMinuteSelect;
		var m = isNaN(parseInt(WebCalendar.thisMinute, 10)) ? new Date()
				.getMinutes() : parseInt(WebCalendar.thisMinute);
		e.value = m; // e.focus();
	},
	funSecondSelect : function() // 分钟的下拉框
	{
		var e = WebCalendar.iframe.document.forms[0].tmpSecondSelect;
		var m = isNaN(parseInt(WebCalendar.thisSecond, 10)) ? new Date()
				.getSeconds() : parseInt(WebCalendar.thisSecond);
		e.value = m; // e.focus();
	},
	prevM : function() // 往前翻月份
	{
		WebCalendar.thisDay = 1;
		if (WebCalendar.thisMonth == 1) {
			WebCalendar.thisYear--;
			WebCalendar.thisMonth = 13;
		}
		WebCalendar.thisMonth--;
		this.writeCalendar();
	},
	nextM : function() // 往后翻月份
	{
		WebCalendar.thisDay = 1;
		if (WebCalendar.thisMonth == 12) {
			WebCalendar.thisYear++;
			WebCalendar.thisMonth = 0;
		}
		WebCalendar.thisMonth++;
		this.writeCalendar();
	},
	prevY : function() {// 往前翻 Year
		WebCalendar.thisDay = 1;
		WebCalendar.thisYear--;
		this.writeCalendar();
	},
	nextY : function() {// 往后翻 Year
		WebCalendar.thisDay = 1;
		WebCalendar.thisYear++;
		this.writeCalendar();
	},
	getObjectById : function(id) {
		return document.getElementById(id);
	},
	hiddenCalendar : function() {
		this.getObjectById("meizzCalendarLayer").style.display = "none";
	},
	appendZero : function(n) {
		return (("00" + n).substr(("00" + n).length - 2));
	},// 日期自动补零程序
	dayMouseOver : function() {
		this.className = "over";
		this.bgColor = WebCalendar.darkColor;
		if (WebCalendar.day[this.id.substr(8)].split("/")[1] == WebCalendar.thisMonth)
			this.style.color = WebCalendar.lightColor;
	},
	dayMouseOut : function() {
		this.className = "out";
		var d = WebCalendar.day[this.id.substr(8)], a = d.split("/");
		this.bgColor = WebCalendar.dayBgColor;
		if (a[1] == WebCalendar.thisMonth && d != WebCalendar.today) {
			if (WebCalendar.dateStyle
					&& a[0] == WebCalendar.dateStyle.getDate()) {
				// if (WebCalendar.dateStyle && a[0] ==
				// parseInt(WebCalendar.dateStyle[4], 10)) {
				this.bgColor = WebCalendar.lightColor;
			}
			this.style.color = WebCalendar.wordColor;
		}
		if (WebCalendar.inputDate == d) {
			this.bgColor = WebCalendar.darkColor;
			this.style.color = WebCalendar.lightColor;
		}
		if (d == WebCalendar.today) {
			this.bgColor = WebCalendar.todayColor;
			this.style.color = WebCalendar.lightColor;
		}
	},
	writeCalendar : function() // 对日历显示的数据的处理程序
	{
		var y = WebCalendar.thisYear;
		var m = WebCalendar.thisMonth;
		var d = WebCalendar.thisDay;
		WebCalendar.daysMonth[1] = (0 == y % 4 && (y % 100 != 0 || y % 400 == 0))
				? 29
				: 28;
		if (!(y <= 9999 && y >= 1000 && parseInt(m, 10) > 0
				&& parseInt(m, 10) < 13 && parseInt(d, 10) > 0)) {
			alert("对不起，你输入了错误的日期！");
			WebCalendar.thisYear = new Date().getFullYear();
			WebCalendar.thisMonth = new Date().getMonth() + 1;
			WebCalendar.thisDay = new Date().getDate();
		}

		this.funYearSelect();
		this.funMonthSelect();

		WebCalendar.daysMonth[1] = (0 == y % 4 && (y % 100 != 0 || y % 400 == 0))
				? 29
				: 28; // 闰年二月为29天
		var w = new Date(y, m - 1, 1).getDay();
		var prevDays = m == 1
				? WebCalendar.daysMonth[11]
				: WebCalendar.daysMonth[m - 2];
		for (var i = (w - 1); i >= 0; i--) // 这三个 for 循环为日历赋数据源（数组
		// WebCalendar.day）格式是 d/m/yyyy
		{
			WebCalendar.day[i] = prevDays + "/" + (parseInt(m, 10) - 1) + "/"
					+ y;
			if (m == 1)
				WebCalendar.day[i] = prevDays + "/" + 12 + "/"
						+ (parseInt(y, 10) - 1);
			prevDays--;
		}
		for (var i = 1; i <= WebCalendar.daysMonth[m - 1]; i++)
			WebCalendar.day[i + w - 1] = i + "/" + m + "/" + y;
		for (var i = 1; i < WebCalendar.dayShow - w
				- WebCalendar.daysMonth[m - 1] + 1; i++) {
			WebCalendar.day[WebCalendar.daysMonth[m - 1] + w - 1 + i] = i + "/"
					+ (parseInt(m, 10) + 1) + "/" + y;
			if (m == 12)
				WebCalendar.day[WebCalendar.daysMonth[m - 1] + w - 1 + i] = i
						+ "/" + 1 + "/" + (parseInt(y, 10) + 1);
		}
		for (var i = 0; i < WebCalendar.dayShow; i++) // 这个循环是根据源数组写到日历里显示
		{
			var a = WebCalendar.day[i].split("/");

			if (EP.g_isMozilla)
				WebCalendar.dayObj[i].textContent = a[0];
			else
				WebCalendar.dayObj[i].innerText = a[0];

			WebCalendar.dayObj[i].title = a[2] + "-" + this.appendZero(a[1])
					+ "-" + this.appendZero(a[0]);
			WebCalendar.dayObj[i].bgColor = WebCalendar.dayBgColor;
			WebCalendar.dayObj[i].style.color = WebCalendar.wordColor;
			if ((i < 10 && parseInt(WebCalendar.day[i], 10) > 20)
					|| (i > 27 && parseInt(WebCalendar.day[i], 10) < 12))
				WebCalendar.dayObj[i].style.color = WebCalendar.wordDark;
			if (WebCalendar.inputDate == WebCalendar.day[i]) // 设置输入框里的日期在日历上的颜色
			{
				WebCalendar.dayObj[i].bgColor = WebCalendar.darkColor;
				WebCalendar.dayObj[i].style.color = WebCalendar.lightColor;
			}
			if (WebCalendar.day[i] == WebCalendar.today) // 设置今天在日历上反应出来的颜色
			{
				WebCalendar.dayObj[i].bgColor = WebCalendar.todayColor;
				WebCalendar.dayObj[i].style.color = WebCalendar.lightColor;
			}
		}
		if (WebCalendar.timeShow) {
			this.funHourSelect();
			this.funMinuteSelect();
			this.funSecondSelect();
		}
	},
	returnDate : function(today) // 根据日期格式等返回用户选定的日期
	{
		if (WebCalendar.objExport) {
			var returnValue;

			var dateValue;
			if (typeof today === 'string') {
				var a = today.split("/");
				dateValue = today;
			} else {
				var a = WebCalendar.day[this.id.substr(8)].split("/");
				dateValue = WebCalendar.day[this.id.substr(8)];
			}
			if (WebCalendar.timeShow) {
				dateValue += " " + WebCalendar.thisHour + ":"
						+ WebCalendar.thisMinute + ":" + WebCalendar.thisSecond;
				returnValue = Date
						.valueOfInEp(dateValue, "dd/MM/yyyy HH:mm:ss")
						.formatInEp(WebCalendar.format);
			} else {
				returnValue = Date.valueOfInEp(dateValue, "dd/MM/yyyy")
						.formatInEp(WebCalendar.format);
			}
			// var d =
			// WebCalendar.format.match(/^(\w{4})(-|\/|.)(\w{1,2})[-|\/|.](\w{1,2})$/);
			// if (d == null) {
			// alert("你设定的日期输出格式不对！\r\n\r\n请重新定义 WebCalendar.format ！");
			// return false;
			// }
			// var flag = d[3].length == 2 || d[4].length == 2;
			// //判断返回的日期格式是否要补零
			// returnValue = flag ? a[2] + d[2] +
			// EP.Calendar.appendZero(a[1]) + d[2] +
			// EP.Calendar.appendZero(a[0]) : a[2] + d[2] + a[1] + d[2] +
			// a[0];
			// if (WebCalendar.timeShow) {
			// var h = WebCalendar.thisHour, m = WebCalendar.thisMinute, s =
			// 0;
			// returnValue += flag ? " " + EP.Calendar.appendZero(h) + ":" +
			// EP.Calendar.appendZero(m) + ":" + EP.Calendar.appendZero(s) :
			// " " + h + ":" + m + ":" + s;
			// }
			WebCalendar.objExport.value = returnValue;
			EP.Calendar.hiddenCalendar();
		}
	},
	Calendar : function() // 初始化日历的设置
	{
		document
				.write("<div id='meizzCalendarLayer' name='meizzCalendarLayer' style='position: absolute; z-index: 9999; width: "
						+ (EP.Calendar.cal_Width + 4).toString()
						+ "px; display: none'>");
		document
				.write("<iframe id='meizzCalendarIframe' name='meizzCalendarIframe' scrolling='no' frameborder='0' width='100%' height='100%'></iframe></div>");

		this.regInfo = "SinoEp平台日期控件(V" + this.version + ")&#13;关闭的快捷键：[Esc]";

		this.dayShow = 38; // 定义页面上要显示的天数,不能小于35,或大于39
		this.daysMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,
				31);
		this.day = new Array(this.dayShow); // 定义日历展示用的数组
		this.dayObj = new Array(this.dayShow); // 定义日期展示控件数组
		this.dateStyle = null; // 保存格式化后日期数组
		this.objExport = null; // 日历回传的显示控件
		this.eventSrc = null; // 日历显示的触发控件
		this.inputDate = null; // 转化外的输入的日期(d/m/yyyy)
		this.thisYear = new Date().getFullYear(); // 定义年的变量的初始值
		this.thisMonth = new Date().getMonth() + 1; // 定义月的变量的初始值
		this.thisDay = new Date().getDate(); // 定义日的变量的初始值
		this.thisHour = new Date().getHours();
		this.thisMinute = new Date().getMinutes();
		this.thisSecond = new Date().getSeconds();
		this.today = this.thisDay + "/" + this.thisMonth + "/" + this.thisYear; // 今天(d/m/yyyy)
		this.iframe = window.frames["meizzCalendarIframe"]; // 日历的 iframe 载体
		this.calendar = document.getElementById("meizzCalendarLayer"); // 日历的层
		this.dateReg = ""; // 日历格式验证的正则式
		this.yearFall = 50; // 定义显示的年份下拉框的年差值，如果今年是2000年，这里设置为50，就显示1950－2050
		this.format = "yyyy-MM-dd"; // 回传日期的格式
		this.timeShow = false; // 是否返回时间
		this.drag = true; // 是否允许拖动
		this.darkColor = "#95B7F3"; // 控件的暗色
		this.lightColor = "#FFFFFF"; // 控件的亮色
		this.btnBgColor = "#E6E6FA"; // 控件的按钮背景色
		this.wordColor = "#000080"; // 控件的文字颜色
		this.wordDark = "#DCDCDC"; // 控件的暗文字颜色
		this.dayBgColor = "#F5F5FA"; // 日期数字背景色
		this.todayColor = "#FF9900"; // 今天在日历上的标示背景色
		this.darkBorder = "#D4D0C8"; // 日期显示的立体表达色
		this.yearOption = "";
		var yearNow = new Date().getFullYear();
		yearNow = (yearNow <= 1000) ? 1000 : ((yearNow >= 9999)
				? 9999
				: yearNow);
		var yearMin = (yearNow - this.yearFall >= 1000) ? yearNow
				- this.yearFall : 1000;
		var yearMax = (yearNow + this.yearFall <= 9999) ? yearNow
				+ this.yearFall : 9999;
		yearMin = (yearMax == 9999) ? yearMax - this.yearFall * 2 : yearMin;
		yearMax = (yearMin == 1000) ? yearMin + this.yearFall * 2 : yearMax;
		for (var i = yearMin; i <= yearMax; i++)
			this.yearOption += "<option value='" + i + "'>" + i + "年</option>";
	},
	__onclick : function(evt) {
		if (evt)
			window.event = evt;
		if (WebCalendar.eventSrc != window.event.srcElement)
			EP.Calendar.hiddenCalendar();
	}
}

var WebCalendar = new EP.Calendar.Calendar();

EP.getTarget = function() {
	var evt = EP.getEvent();
	var obj = evt.srcElement ? evt.srcElement : evt.target;
	return obj;
}

EP.getEvent = function() {
	if (document.all) {
		return window.event;
	}
	func = EP.getEvent.caller;
	while (func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if (arg0.constructor == Event
					|| arg0.constructor == MouseEvent
					|| (typeof(arg0) == "object" && arg0.preventDefalut && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

Date.prototype.formatInEp = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
		// 毫秒
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
						? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468")
						: "")
						+ week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
							? (o[k])
							: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

Date.valueOfInEp = function(value, fmt) {
	var o = {
		"d+" : "setDate", // 日
		"M+" : "setMonth", // 月份
		"y+" : "setFullYear", // 月份
		"h+" : "", // 小时
		"H+" : "setHours", // 小时
		"m+" : "setMinutes", // 分
		"s+" : "setSeconds", // 秒
		"q+" : "", // 季度
		"S" : "setMilliseconds" // 毫秒
	};
	var dateValue = fmt, result;
	for (var k in o) {
		if (result = (new RegExp("(" + k + ")").exec(fmt))) {
			if (result[1].length == 1) {
				fmt = fmt.replace(result[1], "(\\d)");
			} else {
				fmt = fmt.replace(result[1], "(\\d{1," + result[1].length
								+ "})");
				dateValue = dateValue.replace(result[1], "{" + o[k] + "}");
			}
		}
	}
	result = value.match(new RegExp("^" + fmt + "$"));
	if (result == null) {
		return null;
	} else {
		var i = 1, tmp;
		var funName;
		var date = new Date();
		var reg = /{([^}]+)}/g;
		while ((funName = reg.exec(dateValue)) != null) {
			tmp = parseInt(result[i++], 10);
			if (funName[1] == "setMonth")
				tmp--;
			eval("date." + funName[1] + "(" + tmp + ");");
		}
		return date;
	}
}

if (EP.g_isMozilla) {
	window.document.addEventListener('click', EP.Calendar.__onclick, true);
} else {
	document.onclick = EP.Calendar.__onclick;
}

jQuery.fn.extend({

    outerHtml: function(replacement){
        // We just want to replace the entire node and contents with
        // some new html value
        if (replacement) {
            return this.each(function(){
                $(this).replaceWith(replacement);
            });
        }
        
        /*
         * Now, clone the node, we want a duplicate so we don't remove
         * the contents from the DOM. Then append the cloned node to
         * an anonymous div.
         * Once you have the anonymous div, you can get the innerHtml,
         * which includes the original tag.
         */
        var tmp_node = $("<div></div>").append($(this).clone());
        var markup = tmp_node.html();
        
        // Don't forget to clean up or we will leak memory.
        tmp_node.remove();
        return markup;
    }
});
// -->
