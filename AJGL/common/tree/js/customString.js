//系统定义的特殊字符集
var specialChars = /[!@#\$%\^&\*\(\)\{\}\[\]<>_\+\|~`-]|[=\/\\\?;:,！·#￥%……—*（）——、《》，。？'"]/g;
/******************************************************
*以下是对字符串对象（String）的扩展函数，任何String对象都可
*使用这些函数，例如：
var str = " dslf dsf  sfd  ";
alert(str.trim());  //显示这样的字符串"dslf dsf  sfd"
alert(str.deleteSpace());  //显示这样的字符串"dslfdsfsfd"
******************************************************/
 
/*
        function:在字符串左边补指定的字符串
        parameter：
                countLen:结果字符串的长度
                addStr:要附加的字符串
        return:处理后的字符串
*/
String.prototype.lpad = function(countLen,addStr)
{
        // 如果countLen不是数字，不处理返回
        if(isNaN(countLen))return this;

        // 初始字符串长度大于指定的长度，则不需处理
        if(initStr.length >= countLen)return this;

        var initStr = this;        // 初始字符串
        var tempStr = new String();        // 临时字符串

        for(;;)
        {
                tempStr += addStr;
                if(tempStr.length >= countLen - initStr.length)
                {
                        tempStr = tempStr.substring(0,countLen - initStr.length);
                        break;
                }
        }
        return tempStr + initStr;
}


/*
        function:在字符串右边补指定的字符串
        parameter：
                countLen:结果字符串的长度
                addStr:要附加的字符串
        return:处理后的字符串
*/
String.prototype.rpad = function(countLen,addStr)
{
        // 如果countLen不是数字，不处理返回
        if(isNaN(countLen))return this;

        // 初始字符串长度大于指定的长度，则不处理返回
        if(initStr.length >= countLen)return this;

        var initStr = this;        // 初始字符串

        for(;;)
        {
                initStr += addStr;
                if(initStr.length >= countLen)
                {
                        initStr = initStr.substring(0,countLen);
                        break;
                }
        }
        return initStr;
}

/*
        function: 去掉字符串中所有的空格
        return: 处理后的字符串
*/
String.prototype.atrim = function()
{
    // 用正则表达式将右边空格用空字符串替代。
    return this.replace(/(\s+)|(　+)/g, "");
}

// 增加一个名为 trim 的函数作为
// String 构造函数的原型对象的一个方法。
String.prototype.trim = function()
{
    // 用正则表达式将前后空格用空字符串替代。
    return this.replace(/(^\s+)|(\s+$)|(^　+)|(　+$)/g, "");
}

/*
        function:去掉字符串左边的空格
        return:处理后的字符串
*/
String.prototype.ltrim = function()
{
        return this.replace(/(^\s+)|(^　+)/g,"");
}


/*
        function:去掉字符串右边的空格
        return:处理后的字符串
*/
String.prototype.rtrim = function()
{
        return this.replace(/(\s+$)|(　+$)/g,"");
}


/*
        function:获得字符串的字节数
        return:字节数
        example:"test测试".getByte值为8
*/
String.prototype.getByte = function()
{
        var intCount = 0;
        for(var i = 0;i < this.length;i ++)
        {
            // Ascii码大于255是双字节的字符
            var ascii = this.charCodeAt(i).toString(16);
            var byteNum = ascii.length / 2.0;
            intCount += (byteNum + (ascii.length % 2) / 2);
        }
        return intCount;
}

/*
        function: 指定字符集半角字符全部转变为对应的全角字符
        parameter:
                dbcStr: 要转换的半角字符集合
        return: 转换后的字符串
*/
String.prototype.dbcToSbc = function(dbcStr)
{
        var resultStr = this;

        for(var i = 0;i < this.length;i ++)
        {
                switch(dbcStr.charAt(i))
                {
                        case ",":
                                resultStr = resultStr.replace(/\,/g,"，"); 
                                break;
                        case "!":
                                resultStr = resultStr.replace(/\!/g,"！"); 
                                break;
                        case "#":
                                resultStr = resultStr.replace(/\#/g,"＃"); 
                                break;
                        case "|":
                                resultStr = resultStr.replace(/\|/g,"|"); 
                                break;
                        case ".":
                                resultStr = resultStr.replace(/\./g,"。"); 
                                break;
                        case "?":
                                resultStr = resultStr.replace(/\?/g,"？"); 
                                break;
                        case ";":
                                resultStr = resultStr.replace(/\;/g,"；"); 
                                break;
                }
        }
        return resultStr;
}

//获取字符串按字节数指定的字串
String.prototype.bytesubstr = function(index1,index2)
{
        var resultStr = "";
        var byteCount = 0;
        for(var i = index1;i < index2;i ++)
        {
                if(i > this.length)break;
                if(this.charCodeAt(i) > 255)byteCount += 2;
                else byteCount += 1;
                if(byteCount > (index2 - index1))break;
                resultStr += this.charAt(i);
        }
        return resultStr;
}

//判断字符串是否是数字字符串，若是则返回true，否则返回false
String.prototype.isNumber = function() {
	return (this.isInt() || this.isFloat());
}
//判断字符串是否是浮点数字符串，若是则返回true，否则返回false
String.prototype.isFloat = function() {
	return /^(?:-?|\+?)\d*\.\d+$/g.test(this);
}
//判断字符串是否是整数字符串，若是则返回true，否则返回false
String.prototype.isInt = function() {
	return /^(?:-?|\+?)\d+$/g.test(this);
}
//判断字符串是否是正数字符串，若是正数则返回true，否则返回false
String.prototype.isPlus = function() {
	return this.isPlusInt() || this.isPlusFloat();
}
//判断字符串是否是正浮点数字符串，若是正数则返回true，否则返回false
String.prototype.isPlusFloat = function() {
	return /^\+?\d*\.\d+$/g.test(this);
}
//判断字符串是否是正整数字符串，若是正数则返回true，否则返回false
String.prototype.isPlusInt = function() {
	return /^\+?\d+$/g.test(this);
}
//判断字符串是否是负数字符串，若是正数则返回true，否则返回false
String.prototype.isMinus = function() {
	return this.isMinusInt() || this.isMinusFloat();
}
//判断字符串是否是负浮点数字符串，若是正数则返回true，否则返回false
String.prototype.isMinusFloat = function() {
	return /^-\d*\.\d+$/g.test(this);
}
//判断字符串是否是负整数字符串，若是正数则返回true，否则返回false
String.prototype.isMinusInt = function() {
	return /^-\d+$/g.test(this);
}

//判断字符串是否只包含单词字符，若是则返回true，否则返回false
String.prototype.isLeastCharSet = function() {
	return !(/[^A-Za-z0-9_]/g.test(this));
}
//判断字符串是否是Email字符串，若是则返回true，否则返回false
String.prototype.isEmail = function() {
	return /^\w+@.+\.\w+$/g.test(this);
}
//判断字符串是否是邮政编码字符串，若是则返回true，否则返回false
String.prototype.isZip = function() {
	return /^\d{6}$/g.test(this);
}
//判断字符串是否是固定电话号码字符串，若是则返回true，否则返回false
String.prototype.isFixedTelephone = function() {
	return /^(\d{2,4}-)?((\(\d{3,5}\))|(\d{3,5}-))?\d{3,18}(-\d+)?$/g.test(this);
}
//判断字符串是否是手机电话号码字符串，若是则返回true，否则返回false
String.prototype.isMobileTelephone = function() {
	return this.isBaseMobileTelephone() || this.is3GMobileTelephone();
}
//判断字符串是否是13号码段手机电话号码字符串，若是则返回true，否则返回false
String.prototype.isBaseMobileTelephone = function() {
	return /^13\d{9}$/g.test(this);
}
//判断字符串是否是3G-159号码段手机电话号码字符串，若是则返回true，否则返回false
String.prototype.is3GMobileTelephone = function() {
	return /^159$/g.test(this);
}
//判断字符串是否是电话号码字符串，若是则返回true，否则返回false
String.prototype.isTelephone = function() {
	return this.isMobileTelephone() || this.isFixedTelephone();
}
//判断字符串是否是日期字符串，若是则返回true，否则返回false
String.prototype.isDate = function() {
	return /^\d{1,4}-(?:(?:(?:0?[1,3,5,7,8]|1[0,2])-(?:0?[1-9]|(?:1|2)[0-9]|3[0-1]))|(?:(?:0?[4,6,9]|11)-(?:0?[1-9]|(?:1|2)[0-9]|30))|(?:(?:0?2)-(?:0?[1-9]|(?:1|2)[0-9])))$/g.test(this);
}
//判断字符串是否是时间字符串，若是则返回true，否则返回false
String.prototype.isTime = function() {
	return /^(?:(?:0?|1)[0-9]|2[0-3]):(?:(?:0?|[1-5])[0-9]):(?:(?:0?|[1-5])[0-9])(?:\.(?:\d{1,3}))?$/g.test(this);
}
//判断字符串是否是日期时间字符串，若是则返回true，否则返回false
String.prototype.isDateTime = function() {
	return /^\d{1,4}-(?:(?:(?:0?[1,3,5,7,8]|1[0,2])-(?:0?[1-9]|(?:1|2)[0-9]|3[0-1]))|(?:(?:0?[4,6,9]|11)-(?:0?[1-9]|(?:1|2)[0-9]|30))|(?:(?:0?2)-(?:0?[1-9]|(?:1|2)[0-9]))) +(?:(?:0?|1)[0-9]|2[0-3]):(?:(?:0?|[1-5])[0-9]):(?:(?:0?|[1-5])[0-9])(?:\.(?:\d{1,3}))?$/g.test(this);
}
//比较日期字符串，若相等则返回0，否则返回当前日期字符串和目标字符串之间相差的毫秒数，若其中一个字符串不符合日期或日期时间格式，则返回null
String.prototype.compareDate = function(target) {
	var thisDate = this.toDate();
	var targetDate = target.toDate();
	if (thisDate == null || targetDate == null) {
		return null;
	}
	else {
		return thisDate.getTime() - targetDate.getTime();
	}
}
//判断日期字符串指定的时期是否是当前日期，若是则返回true，否则返回false
String.prototype.isToday = function() {
	return this.trim().split(' ')[0].compareDate(getSysDate()) == 0;
}
//判断日期字符串指定的时期是否是当前日期之前，若是则返回true，否则返回false
String.prototype.isBeforeDate = function(baseDate) {
	if (baseDate == null || !baseDate.isDate()) {
		return false;
	}
	return this.trim().split(' ')[0].compareDate(baseDate.trim().split(' ')[0]) < 0;
}
//判断日期字符串指定的时期是否是当前日期之后，若是则返回true，否则返回false
String.prototype.isAfterDate = function(baseDate) {
	if (baseDate == null || !baseDate.isDate()) {
		return false;
	}
	return this.trim().split(' ')[0].compareDate(baseDate.trim().split(' ')[0]) > 0;
}

//判断日期时间字符串指定的时期是否是指定日期时间之前，若是则返回true，否则返回false
String.prototype.isBeforeDateTime = function(baseDateTime) {
	if (baseDateTime == null || !baseDateTime.isDateTime()) {
		return false;
	}
	return this.trim().compareDate(baseDateTime.trim()) < 0;
}
//判断日期时间字符串指定的时期是否是指定日期时间之后，若是则返回true，否则返回false
String.prototype.isAfterDateTime = function(baseDateTime) {
	if (baseDateTime == null || !baseDateTime.isDateTime()) {
		return false;
	}
	return this.trim().compareDate(baseDateTime.trim()) > 0;
}



//判断字符串中是否含有特殊字符，若有则返回true，否则返回false
String.prototype.hasSpecialChar = function() {
	specialChars.test('');
	return specialChars.test(this);
}
//删除字符串中的空格
String.prototype.deleteSpace = function() {
	return this.replace(/( +)|(　+)/g, '');
}
//删除字符串中指定的字符串
String.prototype.remove = function(str) {
	if (str == null || str == '') {
		return this;
	}
	return this.replace(str.toRegExp('g'), '');
}
//将字符串中包含的find字符串替换成target字符串，返回替换后的结果字符串
String.prototype.replaceByString = function(find, target) {
	return this.replace(find.toRegExp('g'), target);
}
//将字符串转换成相应的正则表达式
String.prototype.toRegExp = function(regType) {
	var find = ['\\\\', '\\$', '\\(', '\\)', '\\*', '\\+', '\\.', '\\[', '\\]', '\\?', '\\^', '\\{', '\\}', '\\|', '\\/'];
	var str = this;
	for (var i = 0; i < find.length; i++) {
		str = str.replace(new RegExp(find[i], 'g'), find[i]);
	}
	if (regType == null || regType.trim() == '') {
		return new RegExp(str);
	}
	return new RegExp(str, regType);
}
//将字符串转换成Date对象，要求字符串必须符合日期或日期时间格式，否则返回null
String.prototype.toDate = function() {
	if (this.isDate()) {
		var data = this.split('-');
		return new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
	}
	else if (this.isDateTime()) {
		var data = this.split(' ');
		var date = data[0].split('-');
		var time = data[1].split(".")[0].split(':');
		return new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), 
			parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
	}
	else {
		alert("ge shi");
		return null;
	}
}
//判断字符串是否以指定的前缀开始，prefix为前缀的正则表达式或字符串
String.prototype.startsWith = function(prefix) {
	if (prefix instanceof RegExp) {
		return new RegExp("^" + prefix.source).test(this);
	}
	else {
		return new RegExp("^" + prefix).test(this);
	}
}
//判断字符串是否以指定的后缀结束，suffix为后缀的正则表达式或字符串
String.prototype.endsWith = function(suffix) {
	if (suffix instanceof RegExp) {
		return new RegExp(suffix.source + "$").test(this);
	}
	else {
		return new RegExp(suffix + "$").test(this);
	}
}
//将字符串按HTML需要的编码方式编码
String.prototype.encodeHtml = function() {
	var strToCode = this.replace(/</g,"&lt;");
	strToCode = strToCode.replace(/>/g,"&gt;");
	return strToCode;
}
//将字符串按HTML需要的编码方式解码
String.prototype.decodeHtml = function() {
	var strToCode = this.replace(/&lt;/g,"<");
	strToCode = strToCode.replace(/&gt;/g,">");
	return strToCode;
}
/*********************************************
*字符串对象（String）扩展函数结束
*********************************************/

//获取系统日期字符串
function getSysDate() {
	var today  = new Date();
	var nYear  = today.getFullYear();
	var nMonth = today.getMonth() + 1;
	var nDay   = today.getDate();
	var sToday = "";
	sToday += (nYear < 1000) ? "" + (1900 + nYear) : nYear;
	sToday += "-";
	sToday += (nMonth < 10) ? "0" + nMonth : nMonth;
	sToday += "-"
	sToday += (nDay < 10) ? "0" + nDay : nDay;
	return sToday;
}
//获取系统日期时间字符串
function getSysDateTime() {
	var today  = new Date();
	var nYear  = today.getFullYear();
	var nMonth = today.getMonth() + 1;
	var nDay   = today.getDate();
	var nHours = today.getHours();
	var nMinutes = today.getMinutes();
	var nSeconds = today.getSeconds();
	var nMilliSeconds = today.getMilliseconds();
	var sToday = "";
	sToday += (nYear < 1000) ? "" + (1900 + nYear) : nYear;
	sToday += "-";
	sToday += (nMonth < 10) ? "0" + nMonth : nMonth;
	sToday += "-"
	sToday += (nDay < 10) ? "0" + nDay : nDay;
	sToday += " ";
	sToday += (nHours < 10) ? "0" + nHours : nHours;
	sToday += ":"
	sToday += (nMinutes < 10) ? "0" + nMinutes : nMinutes;
	sToday += ":"
	sToday += (nSeconds < 10) ? "0" + nSeconds : nSeconds;
	if (nMilliSeconds < 10) {
		sToday += "00" + nMilliSeconds;
	}
	else if (nMilliSeconds < 100) {
		sToday += "0" + nMilliSeconds;
	}
	else {
		sToday += nMilliSeconds;
	}
	return sToday;
}
