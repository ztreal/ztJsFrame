var success = "SUCCESS"; //校验通过的返回值
var title = "formTitle"; //校验域的域标题属性名称
/****************************************************************************
** 表单域内容校验函数，要求所有的校验函数必须以formVerify的格式编写
** 返回值为字符串，"SUCCESS"表示校验通过，否则为校验不通过的提示信息
** 函数名可更改，但必须和formConfig文件中配置的函数名一致
** 函数的第一个参数为要校验的域的IHTMLElement对象，后面为自定义参数列表
** 注意: 所有自定义参数均以字符串类型传递。
*****************************************************************************/

function formVerify(field) {
	return "SUCCESS";
}


//数字校验
function numberVerify(field) {
	if (field.value.isNumber()) {
		return success;
	}
	return "只能填数字！";
}

//整数校验
function intVerify(field) {
	if (field.value.isInt()) {
		return success;
	}
	return "只能填半角型整数！";
}

//浮点数校验
function floatVerify(field) {
	if (field.value.isFloat()) {
		return success;
	}
	return "只能填半角型浮点数！";
}

//正数校验
function plusVerify(field) {
	if (field.value.isPlus()) {
		return success;
	}
	return "只能填半角型正数！";
}

//正整数校验
function plusIntVerify(field) {
	if (field.value.isPlusInt()) {
		return success;
	}
	return "只能填半角型正整数！";
}

//正浮点数校验
function plusFloatVerify(field) {
	if (field.value.isPlusFloat()) {
		return success;
	}
	return "只能填半角型正浮点数！";
}

//负数校验
function minusVerify(field) {
	if (field.value.isMinus()) {
		return success;
	}
	return "只能填半角型负数！";
}

//负整数校验
function minusIntVerify(field) {
	if (field.value.isMinusInt()) {
		return success;
	}
	return "只能填半角型负整数！";
}

//负浮点数校验
function minusFloatVerify(field) {
	if (field.value.isMinusFloat()) {
		return success;
	}
	return "只能填半角型负浮点数！";
}

//电子邮件校验
function emailVerify(field) {
	if (field.value.isEmail()) {
		return success;
	}
	return "不是合法的电子邮件地址！";
}

//单词字符校验
function wordcharVerify(field) {
	if (field.value.isLeastCharSet()) {
		return success;
	}
	return "只能填半角型大小写字母、数字和下划线！";
}

//邮政编码校验
function zipVerify(field) {
	if (field.value.isZip()) {
		return success;
	}
	return "不符合邮政编码标准！";
}

//手机号校验
function mobileVerify(field) {
	if (field.value.isMobileTelephone()) {
		return success;
	}
	return "不符合手机号格式！";
}

//电话号码校验
function telephoneVerify(field) {

	if (field.value.isTelephone()) {
		return success;
	}
	return "不符合电话号码格式！标准格式为：(xxxx)xxxxxxxx或者xxxx-xxxxxxxx或者手机号";
}

//日期格式校验
function dateVerify(field) {
	if (field.value.isDate()) {
		return success;
	}
	return "不符合日期格式标准！例如：2004-04-23";
}

//时间格式校验
function timeVerify(field) {
	if (field.value.isTime()) {
		return success;
	}
	return "不符合时间格式标准！例如：09:30:50";
}

//日期时间格式校验
function dateTimeVerify(field) {
	if (field.value.isDateTime()) {
		return success;
	}
	return "不符合日期时间格式标准！例如：2004-04-23 09:30:50";
}

//特殊字符校验
function hasSpecialCharVerify(field) {
	if (field.value.hasSpecialChar()) {
		return success;
	}
	return "不允许包含特殊字符！以下字符集为特殊字符集：" + specialChars.source;
}

//校验域日期必须在特定域日期之后
function afterDateVerify(field, compFieldName) {
	var field = field;
	var compField = document.getElementsByName(compFieldName);
	var compValue;
	if (compField != null && compField.length > 0) {
		compValue = compField[0].value;
	}
	if (field.value.isAfterDate(compValue)) {
		return success;
	}
	return "必须在\"" + compField[0].getAttribute(title) + "\"之后！";
}

//校验域日期必须在特定域日期之前
function beforeDateVerify(field, compFieldName) {
	var field = field;
	var compField = document.getElementsByName(compFieldName);
	var compValue;
	if (compField != null && compField.length > 0) {
		compValue = compField[0].value;
	}
	if (field.value.isBeforeDate(compValue)) {
		return success;
	}
	return "必须在\"" + compField[0].getAttribute(title) + "\"之前！";
}

//校验域日期时间必须在特定域日期时间之后
function afterDateTimeVerify(field, compFieldName) {
	var field = field;
	var compField = document.getElementsByName(compFieldName);
	var compValue;
	if (compField != null && compField.length > 0) {
		compValue = compField[0].value;
	}
	if (field.value.isAfterDateTime(compValue)) {
		return success;
	}
	return "必须在\"" + compField[0].getAttribute(title) + "\"之后！";
}

//校验域日期时间必须在特定域日期时间之前
function beforeDateTimeVerify(field, compFieldName) {
	var field = field;
	var compField = document.getElementsByName(compFieldName);
	var compValue;
	if (compField != null && compField.length > 0) {
		compValue = compField[0].value;
	}
	if (field.value.isBeforeDateTime(compValue)) {
		return success;
	}
	return "必须在\"" + compField[0].getAttribute(title) + "\"之前！";
}

//在某两个值之间校验
function inValueVerify(field, lower, high, includeLower, includeHigher) {
	var value = field.value;
	if (value.isNumber() && lower.isNumber() && high.isNumber()) {
		value = parseFloat(value);
		lower = parseFloat(lower);
		high = parseFloat(high);
	}
	if (lower >= high) {
		return "参数错误，小值必须小于大值！";
	}
	if (value > lower && value < high) {
		return success;
	}
	if (includeLower == "true" && value == lower) {
		return success;
	}
	if (includeHigher == "true" && value == high) {
		return success;
	}
	return "必须在\"" + lower + "\"和\"" + high + "\"之间！";
}

//在某两个值之外校验
function outValueVerify(field, lower, high, includeLower, includeHigher) {
	var value = field.value;
	if (value.isNumber() && lower.isNumber() && high.isNumber()) {
		value = parseFloat(value);
		lower = parseFloat(lower);
		high = parseFloat(high);
	}
	if (lower >= high) {
		return "参数错误，小值必须小于大值！";
	}
	if (value < lower || value > high) {
		return success;
	}
	if (includeLower == "true" && value == lower) {
		return success;
	}
	if (includeHigher == "true" && value == high) {
		return success;
	}
	return "必须在\"" + lower + "\"和\"" + high + "\"之外！";
}

//某两个域之间校验
function inFieldVerify(field, lowerField, highField, includeLower, includeHigher) {
	var lower = document.getElementsByName(lowerField)[0].value;
	var high = document.getElementsByName(highField)[0].value;
	if (lower == null || lower.trim() == "") {
		return "\"" + document.getElementsByName(lowerField)[0].getAttribute(title) + "\"作为小值不可为空！";
	}
	if (high == null || high.trim() == "") {
		return "\"" + document.getElementsByName(highField)[0].getAttribute(title) + "\"作为大值不可为空！";
	}
	return inValueVerify(field, lower, high, includeLower, includeHigher);
}

//某两个域之外校验
function outFieldVerify(field, lowerField, highField, includeLower, includeHigher) {
	var lower = document.getElementsByName(lowerField)[0].value;
	var high = document.getElementsByName(highField)[0].value;
	if (lower == null || lower.trim() == "") {
		return "\"" + document.getElementsByName(lowerField)[0].getAttribute(title) + "\"作为小值不可为空！";
	}
	if (high == null || high.trim() == "") {
		return "\"" + document.getElementsByName(highField)[0].getAttribute(title) + "\"作为大值不可为空！";
	}
	return outValueVerify(field, lower, high, includeLower, includeHigher);
}

//大于某个值校验
function uperValueVerify(field, compValue, canEquals) {
	var value = field.value;
	if (value.isNumber() && compValue.isNumber()) {
		value = parseFloat(value);
		compValue = parseFloat(compValue);
	}
	if (value > compValue) {
		return success;
	}
	if (canEquals == "true" && value == compValue) {
		return success;
	}
	return "必须大于" + (canEquals == "true" ? "或等于\"" : "\"") + compValue + "\"！";
}

//小于某个值校验
function lowerValueVerify(field, compValue, canEquals) {
	var value = field.value;
	if (value.isNumber() && compValue.isNumber()) {
		value = parseFloat(value);
		compValue = parseFloat(compValue);
	}
	if (value < compValue) {
		return success;
	}
	if (canEquals == "true" && value == compValue) {
		return success;
	}
	return "必须小于" + (canEquals == "true" ? "或等于\"" : "\"") + compValue + "\"！";
}

//大于某个域值校验
function uperFieldVerify(field, compField, canEquals) {
	var compValue = document.getElementsByName(compField)[0].value;
	if (compValue == null) {
		compValue = "";
	}
	return uperValueVerify(field, compValue, canEquals);
}

//小于某个域值校验
function lowerFieldVerify(field, compField, canEquals) {
	var compValue = document.getElementsByName(compField)[0].value;
	if (compValue == null) {
		compValue = "";
	}
	return lowerValueVerify(field, compValue, canEquals);
}
