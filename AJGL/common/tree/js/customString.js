//ϵͳ����������ַ���
var specialChars = /[!@#\$%\^&\*\(\)\{\}\[\]<>_\+\|~`-]|[=\/\\\?;:,����#��%������*��������������������'"]/g;
/******************************************************
*�����Ƕ��ַ�������String������չ�������κ�String���󶼿�
*ʹ����Щ���������磺
var str = " dslf dsf  sfd  ";
alert(str.trim());  //��ʾ�������ַ���"dslf dsf  sfd"
alert(str.deleteSpace());  //��ʾ�������ַ���"dslfdsfsfd"
******************************************************/
 
/*
        function:���ַ�����߲�ָ�����ַ���
        parameter��
                countLen:����ַ����ĳ���
                addStr:Ҫ���ӵ��ַ���
        return:�������ַ���
*/
String.prototype.lpad = function(countLen,addStr)
{
        // ���countLen�������֣���������
        if(isNaN(countLen))return this;

        // ��ʼ�ַ������ȴ���ָ���ĳ��ȣ����账��
        if(initStr.length >= countLen)return this;

        var initStr = this;        // ��ʼ�ַ���
        var tempStr = new String();        // ��ʱ�ַ���

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
        function:���ַ����ұ߲�ָ�����ַ���
        parameter��
                countLen:����ַ����ĳ���
                addStr:Ҫ���ӵ��ַ���
        return:�������ַ���
*/
String.prototype.rpad = function(countLen,addStr)
{
        // ���countLen�������֣���������
        if(isNaN(countLen))return this;

        // ��ʼ�ַ������ȴ���ָ���ĳ��ȣ��򲻴�����
        if(initStr.length >= countLen)return this;

        var initStr = this;        // ��ʼ�ַ���

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
        function: ȥ���ַ��������еĿո�
        return: �������ַ���
*/
String.prototype.atrim = function()
{
    // ��������ʽ���ұ߿ո��ÿ��ַ��������
    return this.replace(/(\s+)|(��+)/g, "");
}

// ����һ����Ϊ trim �ĺ�����Ϊ
// String ���캯����ԭ�Ͷ����һ��������
String.prototype.trim = function()
{
    // ��������ʽ��ǰ��ո��ÿ��ַ��������
    return this.replace(/(^\s+)|(\s+$)|(^��+)|(��+$)/g, "");
}

/*
        function:ȥ���ַ�����ߵĿո�
        return:�������ַ���
*/
String.prototype.ltrim = function()
{
        return this.replace(/(^\s+)|(^��+)/g,"");
}


/*
        function:ȥ���ַ����ұߵĿո�
        return:�������ַ���
*/
String.prototype.rtrim = function()
{
        return this.replace(/(\s+$)|(��+$)/g,"");
}


/*
        function:����ַ������ֽ���
        return:�ֽ���
        example:"test����".getByteֵΪ8
*/
String.prototype.getByte = function()
{
        var intCount = 0;
        for(var i = 0;i < this.length;i ++)
        {
            // Ascii�����255��˫�ֽڵ��ַ�
            var ascii = this.charCodeAt(i).toString(16);
            var byteNum = ascii.length / 2.0;
            intCount += (byteNum + (ascii.length % 2) / 2);
        }
        return intCount;
}

/*
        function: ָ���ַ�������ַ�ȫ��ת��Ϊ��Ӧ��ȫ���ַ�
        parameter:
                dbcStr: Ҫת���İ���ַ�����
        return: ת������ַ���
*/
String.prototype.dbcToSbc = function(dbcStr)
{
        var resultStr = this;

        for(var i = 0;i < this.length;i ++)
        {
                switch(dbcStr.charAt(i))
                {
                        case ",":
                                resultStr = resultStr.replace(/\,/g,"��"); 
                                break;
                        case "!":
                                resultStr = resultStr.replace(/\!/g,"��"); 
                                break;
                        case "#":
                                resultStr = resultStr.replace(/\#/g,"��"); 
                                break;
                        case "|":
                                resultStr = resultStr.replace(/\|/g,"|"); 
                                break;
                        case ".":
                                resultStr = resultStr.replace(/\./g,"��"); 
                                break;
                        case "?":
                                resultStr = resultStr.replace(/\?/g,"��"); 
                                break;
                        case ";":
                                resultStr = resultStr.replace(/\;/g,"��"); 
                                break;
                }
        }
        return resultStr;
}

//��ȡ�ַ������ֽ���ָ�����ִ�
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

//�ж��ַ����Ƿ��������ַ����������򷵻�true�����򷵻�false
String.prototype.isNumber = function() {
	return (this.isInt() || this.isFloat());
}
//�ж��ַ����Ƿ��Ǹ������ַ����������򷵻�true�����򷵻�false
String.prototype.isFloat = function() {
	return /^(?:-?|\+?)\d*\.\d+$/g.test(this);
}
//�ж��ַ����Ƿ��������ַ����������򷵻�true�����򷵻�false
String.prototype.isInt = function() {
	return /^(?:-?|\+?)\d+$/g.test(this);
}
//�ж��ַ����Ƿ��������ַ��������������򷵻�true�����򷵻�false
String.prototype.isPlus = function() {
	return this.isPlusInt() || this.isPlusFloat();
}
//�ж��ַ����Ƿ������������ַ��������������򷵻�true�����򷵻�false
String.prototype.isPlusFloat = function() {
	return /^\+?\d*\.\d+$/g.test(this);
}
//�ж��ַ����Ƿ����������ַ��������������򷵻�true�����򷵻�false
String.prototype.isPlusInt = function() {
	return /^\+?\d+$/g.test(this);
}
//�ж��ַ����Ƿ��Ǹ����ַ��������������򷵻�true�����򷵻�false
String.prototype.isMinus = function() {
	return this.isMinusInt() || this.isMinusFloat();
}
//�ж��ַ����Ƿ��Ǹ��������ַ��������������򷵻�true�����򷵻�false
String.prototype.isMinusFloat = function() {
	return /^-\d*\.\d+$/g.test(this);
}
//�ж��ַ����Ƿ��Ǹ������ַ��������������򷵻�true�����򷵻�false
String.prototype.isMinusInt = function() {
	return /^-\d+$/g.test(this);
}

//�ж��ַ����Ƿ�ֻ���������ַ��������򷵻�true�����򷵻�false
String.prototype.isLeastCharSet = function() {
	return !(/[^A-Za-z0-9_]/g.test(this));
}
//�ж��ַ����Ƿ���Email�ַ����������򷵻�true�����򷵻�false
String.prototype.isEmail = function() {
	return /^\w+@.+\.\w+$/g.test(this);
}
//�ж��ַ����Ƿ������������ַ����������򷵻�true�����򷵻�false
String.prototype.isZip = function() {
	return /^\d{6}$/g.test(this);
}
//�ж��ַ����Ƿ��ǹ̶��绰�����ַ����������򷵻�true�����򷵻�false
String.prototype.isFixedTelephone = function() {
	return /^(\d{2,4}-)?((\(\d{3,5}\))|(\d{3,5}-))?\d{3,18}(-\d+)?$/g.test(this);
}
//�ж��ַ����Ƿ����ֻ��绰�����ַ����������򷵻�true�����򷵻�false
String.prototype.isMobileTelephone = function() {
	return this.isBaseMobileTelephone() || this.is3GMobileTelephone();
}
//�ж��ַ����Ƿ���13������ֻ��绰�����ַ����������򷵻�true�����򷵻�false
String.prototype.isBaseMobileTelephone = function() {
	return /^13\d{9}$/g.test(this);
}
//�ж��ַ����Ƿ���3G-159������ֻ��绰�����ַ����������򷵻�true�����򷵻�false
String.prototype.is3GMobileTelephone = function() {
	return /^159$/g.test(this);
}
//�ж��ַ����Ƿ��ǵ绰�����ַ����������򷵻�true�����򷵻�false
String.prototype.isTelephone = function() {
	return this.isMobileTelephone() || this.isFixedTelephone();
}
//�ж��ַ����Ƿ��������ַ����������򷵻�true�����򷵻�false
String.prototype.isDate = function() {
	return /^\d{1,4}-(?:(?:(?:0?[1,3,5,7,8]|1[0,2])-(?:0?[1-9]|(?:1|2)[0-9]|3[0-1]))|(?:(?:0?[4,6,9]|11)-(?:0?[1-9]|(?:1|2)[0-9]|30))|(?:(?:0?2)-(?:0?[1-9]|(?:1|2)[0-9])))$/g.test(this);
}
//�ж��ַ����Ƿ���ʱ���ַ����������򷵻�true�����򷵻�false
String.prototype.isTime = function() {
	return /^(?:(?:0?|1)[0-9]|2[0-3]):(?:(?:0?|[1-5])[0-9]):(?:(?:0?|[1-5])[0-9])(?:\.(?:\d{1,3}))?$/g.test(this);
}
//�ж��ַ����Ƿ�������ʱ���ַ����������򷵻�true�����򷵻�false
String.prototype.isDateTime = function() {
	return /^\d{1,4}-(?:(?:(?:0?[1,3,5,7,8]|1[0,2])-(?:0?[1-9]|(?:1|2)[0-9]|3[0-1]))|(?:(?:0?[4,6,9]|11)-(?:0?[1-9]|(?:1|2)[0-9]|30))|(?:(?:0?2)-(?:0?[1-9]|(?:1|2)[0-9]))) +(?:(?:0?|1)[0-9]|2[0-3]):(?:(?:0?|[1-5])[0-9]):(?:(?:0?|[1-5])[0-9])(?:\.(?:\d{1,3}))?$/g.test(this);
}
//�Ƚ������ַ�����������򷵻�0�����򷵻ص�ǰ�����ַ�����Ŀ���ַ���֮�����ĺ�������������һ���ַ������������ڻ�����ʱ���ʽ���򷵻�null
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
//�ж������ַ���ָ����ʱ���Ƿ��ǵ�ǰ���ڣ������򷵻�true�����򷵻�false
String.prototype.isToday = function() {
	return this.trim().split(' ')[0].compareDate(getSysDate()) == 0;
}
//�ж������ַ���ָ����ʱ���Ƿ��ǵ�ǰ����֮ǰ�������򷵻�true�����򷵻�false
String.prototype.isBeforeDate = function(baseDate) {
	if (baseDate == null || !baseDate.isDate()) {
		return false;
	}
	return this.trim().split(' ')[0].compareDate(baseDate.trim().split(' ')[0]) < 0;
}
//�ж������ַ���ָ����ʱ���Ƿ��ǵ�ǰ����֮�������򷵻�true�����򷵻�false
String.prototype.isAfterDate = function(baseDate) {
	if (baseDate == null || !baseDate.isDate()) {
		return false;
	}
	return this.trim().split(' ')[0].compareDate(baseDate.trim().split(' ')[0]) > 0;
}

//�ж�����ʱ���ַ���ָ����ʱ���Ƿ���ָ������ʱ��֮ǰ�������򷵻�true�����򷵻�false
String.prototype.isBeforeDateTime = function(baseDateTime) {
	if (baseDateTime == null || !baseDateTime.isDateTime()) {
		return false;
	}
	return this.trim().compareDate(baseDateTime.trim()) < 0;
}
//�ж�����ʱ���ַ���ָ����ʱ���Ƿ���ָ������ʱ��֮�������򷵻�true�����򷵻�false
String.prototype.isAfterDateTime = function(baseDateTime) {
	if (baseDateTime == null || !baseDateTime.isDateTime()) {
		return false;
	}
	return this.trim().compareDate(baseDateTime.trim()) > 0;
}



//�ж��ַ������Ƿ��������ַ��������򷵻�true�����򷵻�false
String.prototype.hasSpecialChar = function() {
	specialChars.test('');
	return specialChars.test(this);
}
//ɾ���ַ����еĿո�
String.prototype.deleteSpace = function() {
	return this.replace(/( +)|(��+)/g, '');
}
//ɾ���ַ�����ָ�����ַ���
String.prototype.remove = function(str) {
	if (str == null || str == '') {
		return this;
	}
	return this.replace(str.toRegExp('g'), '');
}
//���ַ����а�����find�ַ����滻��target�ַ����������滻��Ľ���ַ���
String.prototype.replaceByString = function(find, target) {
	return this.replace(find.toRegExp('g'), target);
}
//���ַ���ת������Ӧ��������ʽ
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
//���ַ���ת����Date����Ҫ���ַ�������������ڻ�����ʱ���ʽ�����򷵻�null
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
//�ж��ַ����Ƿ���ָ����ǰ׺��ʼ��prefixΪǰ׺��������ʽ���ַ���
String.prototype.startsWith = function(prefix) {
	if (prefix instanceof RegExp) {
		return new RegExp("^" + prefix.source).test(this);
	}
	else {
		return new RegExp("^" + prefix).test(this);
	}
}
//�ж��ַ����Ƿ���ָ���ĺ�׺������suffixΪ��׺��������ʽ���ַ���
String.prototype.endsWith = function(suffix) {
	if (suffix instanceof RegExp) {
		return new RegExp(suffix.source + "$").test(this);
	}
	else {
		return new RegExp(suffix + "$").test(this);
	}
}
//���ַ�����HTML��Ҫ�ı��뷽ʽ����
String.prototype.encodeHtml = function() {
	var strToCode = this.replace(/</g,"&lt;");
	strToCode = strToCode.replace(/>/g,"&gt;");
	return strToCode;
}
//���ַ�����HTML��Ҫ�ı��뷽ʽ����
String.prototype.decodeHtml = function() {
	var strToCode = this.replace(/&lt;/g,"<");
	strToCode = strToCode.replace(/&gt;/g,">");
	return strToCode;
}
/*********************************************
*�ַ�������String����չ��������
*********************************************/

//��ȡϵͳ�����ַ���
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
//��ȡϵͳ����ʱ���ַ���
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
