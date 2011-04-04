/**
* bodyonload用来设置页面需要在BODY的onload事件里执行的程序，
* 当页面引入此js文件时，要求页面的BODY标签中不能设置onload事件，
* 需要在此事件中执行的JS程序请设置到此变量中。程序将在页面的onload事件中执行这些代码。
* 例如：
* <script language="javascript" src="runFormVerify.js"></script>
* <script language="javascript">
* 	bodyonload = "alert('onload事件中运行的程序！')";
* </script>
*/
var allHtml = "B,BIG,APPLET,ABBR,ACRONYM,ADDRESS,BASEFONT,BDO,BGSOUND,BIG,BLINK,BLOCKQUOTE,BR,BUTTON,CENTER,CITE,CITE,CODE,DEL,DFN,DIR,DIV,DL,EM,EMBED,FIELDSET,FONT,H1,H6,H2,H3,H4,H5,HR,I,IFRAME,IMG,INS,,KBD,LABEL,MAP,MARQUEE,MENU,NOBR,NOFRAMES,NOSCRIPT,OBJECT,OL,P,PRE,Q,S,SAMP,SCRIPT,SELECT,SMALL,SPAN,STRIKE,STRONG,SUB,SUP,TABLEtrtd,TEXTAREA,TT,U,UL,VAR,WBR";
var allHtml1 = "INPUT,ISINDEX";
 	var htmlChar1 = allHtml1.split(",");
	var htmlChar = allHtml.split(",");
var formTitle = "formTitle"; 
var allMsg="";
var allHtmlMsg="";
//为了提示错误以后移向第一个不符合规则的页面
var errObj = null;
var gifResource = new Array();
gifResource["info"] = "/source/style/images/MessageInfo.gif";
gifResource["infoColor"] = "#009900";
gifResource["debug"] = "/source/style/images/MessageDebug.gif";
gifResource["debugColor"] = "#0066FF";
gifResource["warn"] = "/source/style/images/MessageWarn.gif";
gifResource["warnColor"] = "#0066FF";
gifResource["error"] = "/source/style/images/MessageError.gif";
gifResource["errorColor"] = "#FF0000";
gifResource["fatal"] = "/source/style/images/MessageFatal.gif";
gifResource["fatalColor"] = "#0066FF";
var gifPath=gifResource["info"];
var color=gifResource["infoColor"];

/**
 * 所有页面默认的onload内容
 */
function _load(){

}
/*
var exp = window.onload;
window.onload = function() {
	var submit = new Array();
	for (var i = 0; i < document.forms.length; i++) {
		submit[i] = document.forms(i).submit;
		document.forms(i).submit[i] = function(verify,index) {
			if (verify == false || runFormVerify(this)) {
				submit();
				return true;
			}
			return false;
		};

		
		var onsubmit = document.forms(i).onsubmit;
		document.forms(i).onsubmit = function() {
			if (runFormVerify(this)) {
				if (onsubmit == null) {
					return true;
				}
				return onsubmit();
				
			}
			return false;
		};
	}
	if (exp != null) {
		exp();
	}
	if (bodyonload != null && bodyonload.trim() != "") {
		eval(bodyonload);
	}
};
*/
/**
 * 页面提交
 */
function pageshow(form,verify){
	allHtmlMsg = "";
	allMsg = "";
//不管验证不验证，将input的text和textarea
	//判断input
	if (verify == false){
		if (isHtml){
			outputMsg();
			onFocus();
			return false;
		}
		form.submit();
		return true;
	}else{
		if (_check(form)){
			form.submit();
			return true;
		}
		onFocus();
		return false;
	}
}
function _check(form){
	allHtmlMsg = "";
	allMsg = "";
//不管验证不验证，将input的text和textarea
	//判断input
	var els = form.tags("input");
	var isHtml = false;
	for (var i = 0; i < els.length; i++) {
		var inputValue = els[i].value.toUpperCase();
		var inputValueNoSpace = inputValue.atrim();
		for (var j=0;j<htmlChar1.length;j++){
			if(htmlChar1[j].atrim() != ""){
				if (inputValueNoSpace.indexOf("<" + htmlChar1[j] + ">")!=-1 || inputValue.indexOf(htmlChar1[j] + " ") != -1 || inputValueNoSpace.indexOf(htmlChar[j] + ">")!=-1 || (inputValueNoSpace.indexOf("<" + htmlChar1[j]) + htmlChar1[j].length + 1 == inputValueNoSpace.length)){
					if (inputValueNoSpace.indexOf("<" + htmlChar1[j])!=-1){
						showCheckInfo(els[i],"不能包含<" + htmlChar1[j] + ">节点");
						isHtml = true;
						if (errObj == null){
							errObj = els[i];
						}
					}
				}
			}
		}
		for (var j=0;j<htmlChar.length;j++){
			if(htmlChar[j].atrim() != ""){
				if (inputValueNoSpace.indexOf("<" + htmlChar[j] + ">")!=-1 || inputValue.indexOf(htmlChar[j] + " ") != -1 || inputValueNoSpace.indexOf(htmlChar[j] + ">")!=-1 || (inputValueNoSpace.indexOf("<" + htmlChar[j]) + htmlChar[j].length + 1 == inputValueNoSpace.length)){
					if (inputValueNoSpace.indexOf("<" + htmlChar[j])!=-1){
						showCheckInfo(els[i],"不能包含<" + htmlChar[j] + ">节点");
						isHtml = true;
						if (errObj == null){
							errObj = els[i];
						}
					}
				}
				if (inputValueNoSpace.indexOf("</" + htmlChar[j] + ">")!=-1){
					showCheckInfo(els[i],"不能包含</" + htmlChar[j] + ">节点");
					isHtml = true;
					if (errObj == null){
						errObj = els[i];
					}
				}
			}
		}
	}
	//判断textarea
	var els = form.tags("textarea");
	for (var i = 0; i < els.length; i++) {
		var inputValue = els[i].value.toUpperCase();
		var inputValueNoSpace = inputValue.atrim();
		if (inputValue.indexOf("TEXTAREA ") != -1 || inputValueNoSpace.indexOf("TEXTAREA>") != -1){
			if (inputValueNoSpace.indexOf("<TEXTAREA") != -1){
				showCheckInfo(els[i],"不能包含<textArea>节点");
				isHtml = true;
				if (errObj == null){
					errObj = els[i];
				}
			}
		}
		if (inputValueNoSpace.indexOf("</TEXTAREA>") != -1){
			showCheckInfo(els[i],"不能包含</textArea>节点");
			isHtml = true;
			if (errObj == null){
				errObj = els[i];
			}
		}
	}
	if (runFormVerify(form,isHtml)){
		_checkButton(form);
		return true;
	}
	onFocus();
	return false;

}
/**
 * 设置页面上所有按钮的状态
 * @param form 要执行的标单
 * @param disabled 是否为不可操作 true 不可操作，fasle 可操作
 */
function _checkButton(form,disabled){
	if (disabled==null){
		disabled = true;
	}else if (!disabled){
		disabled = false;
	}
	var els = form.tags("button");
	for (var i = 0; i < els.length; i++) {
		els[i].disabled = true;
	}
	els = form.tags("input");
	for (var i = 0; i < els.length; i++) {
		if (els[i].type=="button"){
			els[i].disabled = true;
		}
	}
}
function onFocus(){
	try{
		if (errObj == null){
			return false;
		}
		var tagName = errObj.tagName.toLowerCase();
		if ((tagName == "input" && (errObj.type == "text" || errObj.type == "password")) || tagName == "textarrea") {
			//errObj.focus();
			errObj.select();
		}
	}catch(e){}
}
function pageClose(form,winObj){
		
		if (runFormVerify(form)){
			winObj.close();
		}
}
function runFormVerify(form,isHtml) {
	//allMsg="";
	//var form = document.forms.item(formI);
	var result = true;
	var els = form.tags("input");
	for (var i = 0; i < els.length; i++) {

		if (!checkVerify(els[i])) {
			result = false;
		}
	}
	var els = form.tags("textarea");
	for (var i = 0; i < els.length; i++) {

		if (!checkVerify(els[i])) {
			result = false;
		}
	}
	var els = form.tags("select");
	for (var i = 0; i < els.length; i++) {

		if (!checkVerify(els[i])) {
			result = false;
		}
	}
	if (isHtml){
		result = false;
	}
	if (result == false) {
		outputMsg();
	}
	return result;
}

function checkVerify(el) {

	var tagName = el.tagName.toLowerCase();
	var _className = el.className;
	if (_className == "input02" && el.value.trim() == "") {
			showCheckInfo(el, "不能为空!");
			if (errObj == null){
				errObj = el;
			}
			return false;		
	}
	
	/*
	var notNull = el.getAttribute("notnull");
	if (notNull != null && notNull.trim() != "") {
		if (el.value == null || el.value.trim() == "") {
			showCheckInfo(el, notNull);
			if (errObj == null){
				errObj = el;
			}
			return false;
		}
	}
	*/
	
	if ((tagName == "input" && el.type == "text") || tagName == "textarea") {
		var len = el.getAttribute("maxlength");
		if (len != null && !isNaN(parseInt(len)) && parseInt(len) > 0) {
			if (el.value.getByte() > parseInt(len)) {
				showCheckInfo(el, "输入的内容过长！最大长度为：" + len + "字符");
				if (errObj == null){
					errObj = el;
				}
				return false;
			}
		}
	}
	var reValue = true;
	var verifys = el.getAttribute("fieldType");
	if (verifys!=null && verifys != ""){
		var vver = verifys.split(";");
		
		for(var i=0;i<vver.length;i++){
			var checkResult;
			var verify = vver[i];
			if (tagName == "select" 
				|| verify == null 
				|| verify.trim() == "" 
				|| el.value == null
				|| el.value.trim() == "") {
				if (errObj == null){
					errObj = el;
				}
				return true;
			}
			var paras = verify.split(",");
			var program = paras[0] + "Verify(el";
			for (var i = 1; i < paras.length; i++) {
				var para = paras[i];
				program += (", \"" + para + "\"");
			}
			program += ");";
			try{
				checkResult = eval(program);
				if (reValue){
					if (success != checkResult) {
						reValue = false;
					}
				}
			}catch(e){
				alert("校验错误，请检查restriction输入的校验类型是否正确，注意大小写：" + verify + "\n错误：" + e);
			}
			if(success != checkResult)
				showCheckInfo(el, checkResult);
		}
		
	}
	if (reValue) {
		return true;
	}
	if (errObj == null){
		errObj = el;
	}
	return false;
}

function showCheckInfo(el, msg) {
	var atitle = el.getAttribute("fieldTitle");
	if (atitle == null){
		atitle = el.title;
	}
	if (atitle == null){
		atitle = "";
	}
	if (allMsg!=""){
		allMsg+="\n";
	}
	if (allHtmlMsg!=""){
		allHtmlMsg+="<br>";
	}
	if (atitle==""){
		allMsg+=atitle + msg;
		allHtmlMsg+= "&nbsp;&nbsp;<IMG  src="+gifPath+" ><font color="+color+">" + atitle + msg.encodeHtml()+"</font>";
	}else{
		allMsg+="[" + atitle + "]" + msg;
		allHtmlMsg+= "&nbsp;&nbsp;<IMG  src="+gifPath+" ><font color="+color+">["+atitle + "]" + msg.encodeHtml()+"</font>";
	}
}



function msgClick(msgdiv) {
	var msgname = msgdiv.id.replace(new RegExp("^(.*)" + SUF_MSGDIV_ID + "$"), "$1");
	var index = 0;

	msgdiv.style.display = "none";
	try {
		document.getElementsByName(msgname)[index].focus();
	}
	catch (e) {}
}

//获取某个Html元素在运行时的绝对位置信息
function GetAbsoluteLocationEx(element) 
{ 
	if ( arguments.length != 1 || element == null ) { 
		return null; 
	} 
	var elmt = element; 
	var offsetTop = elmt.offsetTop; 
	var offsetLeft = elmt.offsetLeft; 
	var offsetWidth = elmt.offsetWidth; 
	var offsetHeight = elmt.offsetHeight; 
	while( elmt = elmt.offsetParent ) { 
		// add this judge 
		if ( elmt.style.position == 'absolute' || elmt.style.position == 'relative'  
			|| ( elmt.style.overflow != 'visible' && elmt.style.overflow != '' ) ) { 
			break; 
		}  
		offsetTop += elmt.offsetTop; 
		offsetLeft += elmt.offsetLeft; 
	} 
	return { absoluteTop: offsetTop, absoluteLeft: offsetLeft, 
		offsetWidth: offsetWidth, offsetHeight: offsetHeight }; 
}
/**
 * 校验信息的输出
 */ 
function outputMsg(){

	try{
		document.getElementById("msg").innerHTML=allHtmlMsg;
		document.getElementById("msg").style.display="";
		setClick(document.getElementById("msg"));
		window.location="#";
	}catch(e){
		alert(allMsg);
	}
	allHtmlMsg = "";
	allMsg = "";
}
function setClick(obj){
	obj.onclick = function(){
		removeMsg();
	}
	obj.title="点击此处隐藏提示信息";
}
/**
 * 页面的特殊校验
 */ 
function outputOtherMsg(msg,msgType){
	try{
		var gifMsgPath;
		var colorMsg;
		if (msgType == null){ 
			gifMsgPath = gifResource["info"];
			colorMsg = gifResource["infoColor"];
		}else{
			gifMsgPath = gifResource[msgType];
			colorMsg = gifResource[msgType + "Color"];
		}

		var htmlMsg = "&nbsp;&nbsp;<IMG  src="+gifMsgPath+" ><font color="+colorMsg+">" + msg+"</font>";
		document.getElementById("msg").innerHTML=htmlMsg;
		document.getElementById("msg").style.display="";
		setClick(document.getElementById("msg"));
		window.location="#";
	}catch(e){
		alert(msg);
	}
}
function _alert(msg,msgType){
	outputOtherMsg(msg,msgType);
}
/**
 * 除去所有错误
 */ 
function removeMsg(){
	try{
		document.getElementById("msg").innerHTML="";
		document.getElementById("msg").style.display="none";
		window.location="#";
	}catch(e){
	}
}
/**
 * 输出所有的错误
 */ 
function outputMsgs(msg,msgType){
	try{
		var gifMsgPath;
		var colorMsg;
		if (msgType == null){ 
			gifMsgPath = gifResource["info"];
			colorMsg = gifResource["infoColor"];
		}else{
			gifMsgPath = gifResource[msgType];
			colorMsg = gifResource[msgType + "Color"];
		}

		var htmlMsg = "&nbsp;&nbsp;<IMG  src="+gifMsgPath+" ><font color="+colorMsg+">" + msg+"</font>";
		 
		var msgObj=document.getElementById("msg");
		if (msgObj.innerHTML==""){
			msgObj.innerHTML=htmlMsg;
		}else{
			msgObj.innerHTML+="<br>" + htmlMsg;
		}
		document.getElementById("msg").style.display="";
		setClick(document.getElementById("msg"));
		window.location="#";
	}catch(e){
		alert(msg);
	}
}
/**
 * 判断用户是否在页面上选择指定名称的复选框
 * @param name 单选和复选框的名称（name）
 * @param return 有一个或以上选中返回true 否则返回false
 */
function hasSelected(name,char) {
	var selectValue = "";
	var selElements = document.getElementsByName(name);
	var isSel = false;
	for (var i = 0; i < selElements.length; i++) {
		if (selElements[i].tagName.toLowerCase() == "input") {
			if (selElements[i].type.toLowerCase() == "checkbox" || selElements[i].type.toLowerCase() == "radio") {
				if (selElements[i].checked) {
					if (char==null){
						return true;
					}else{
						if(selElements[i].value.indexOf(char)==-1){
							return false;
						}else{
							isSel=true;
						}
					}
				}
			}
			
		}
	}
	
	if (char==null){
		return false;
	}else{
		return isSel;
	}
}
/**
 * 判断用户是否在页面上选择了一个且仅有一个指定名称的复选框
 * @param name 单选和复选框的名称（name）
 * @param return 只有一个选中返回true 否则返回false
 */
function hasSelectedOne(name) {
	var selElements = document.getElementsByName(name);
	var selected = false;
	for (var i = 0; i < selElements.length; i++) {
		if (selElements[i].tagName.toLowerCase() == "input") {
			if (selElements[i].type.toLowerCase() == "checkbox" || selElements[i].type.toLowerCase() == "radio") {
				if (selElements[i].checked) {
					if (selected == false) {
						selected = true;
					}
					else {
						return false;
					}
				}
			}
		}
	}
	return selected;
}
/**
 * 判断用户是否选中一个记录，如果选中1个记录，返回选中的值，如果没有选中或者选中多个记录，返回false
 * @param name 单选和复选框的名称（name）
 * @param return 只有一个选中返回选择的值 否则返回false
 */
function selectValue(name){
	var selElements = document.getElementsByName(name);
	var selected = false;
	var selValue = "";
	for (var i = 0; i < selElements.length; i++) {
		if (selElements[i].tagName.toLowerCase() == "input") {
			if (selElements[i].type.toLowerCase() == "checkbox" || selElements[i].type.toLowerCase() == "radio") {
				if (selElements[i].checked) {
					if (selected == false) {
						selected = true;
						selValue = selElements[i].value;
					}
					else {
						return false;
					}
				}
			}
		}
	}
	if (selected){
		return selValue;
	}else{
		return false;
	}
}

