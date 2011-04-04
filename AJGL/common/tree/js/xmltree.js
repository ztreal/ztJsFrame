/* JavaScript Document */

/*

xmlTree v1.2
=================================

Infomation
----------------------
Author   : tripleA workteam - Tao Zhen
E-Mail   : tripleA@doworks.cn
WebSite  : http://www.doworks.cn/tripleA/
DateTime : 2006-06-26


Example
----------------------
var tree = new xmlTree('tree'); //生成对象
tree.mode = 1; //设置初始模式，默认全部关闭�??0全部关闭�?1全部展开
tree.createTree(); //输出�?


for Internet Explorer, Mozilla Firefox
*/


function xmlTree(name, xmlFile) {
	this.name         = name;                   //实例名称
	this.xmlFile      = xmlFile;          //默认xml文件
	this.iconPath     = 'images/'               //默认图标路径
	this.iconFolder   = 'tree_icon_folder.gif'; //默认文件夹图�?
	this.iconFile     = 'tree_icon_file.gif';   //默认文件图标
	this.iconOpen     = 'tree_arrow_open.gif';  //默认箭头展开图标
	this.iconOver     = 'tree_arrow_over.gif';  //默认箭头活动图标
	this.iconClose    = 'tree_arrow_close.gif'; //默认箭头关闭图标
	this.mode         = 0;                      //初始模式，默认全部关闭�??0全部关闭�?1全部展开
	this.html         = '';                     //�?终输出html代码
	this.prevTip      = null;                   //上一次被显示的tip的时间编�? (内部使用)
	this.prevSelected = null;                   //上一次被选中的节点的自动编号 (内部使用)
}

xmlTree.prototype.createXMLDOM = function() { //生成XMLDOM对象
	var xmldom;
	if (window.ActiveXObject){
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	} else {
		if (document.implementation && document.implementation.createDocument) {
			var xmldom = document.implementation.createDocument("","doc",null);
		}
	}
	xmldom.async = false;
	xmldom.resolveExternals = false;
	xmldom.validateOnParse = false;
	xmldom.preserveWhiteSpace = true;
	return xmldom;
}

xmlTree.prototype.createTree = function() { //生成并打�?
	var xmldom = this.createXMLDOM();
	document.write('<div id="tree"><\/div>'); // 树所用层
	document.write('<div id="treeTip"><\/div>'); //提示�?用层
	document.getElementById('treeTip').style.visibility = 'visible';
	document.getElementById('treeTip').style.display = 'none';
	if (xmldom.load(this.xmlFile)) {
		this.createNodes(xmldom);
	} else {
		this.html = 'Loading...';
		

	}
	document.getElementById('tree').innerHTML = this.html;
	return;
}

xmlTree.prototype.getFirstChildData = function(obj, name) { //取得指定名称节点的第�?个子节点的数�?
	var result = '';
	if (typeof(obj) == 'object' && name != null && name != '') {
		var node = obj.getElementsByTagName(name);
		if (node != null && node.length > 0) {
			result = node[0].firstChild.data;
		}
	}
	return result;
}

xmlTree.prototype.checkChildNodes = function(obj, id) { //�?测是否有分支
	var result = false;
	var nodes = obj.getElementsByTagName('node');
	if (nodes != null && nodes.length > 0) {
		//var pid;
		for (var i = 0; i < nodes.length; i++) {
			//pid = nodes[i].getAttribute('parentid');
			if (nodes[i].getAttribute('parentid') == id) {
				result = true;
				break;
			}
		}
	}
	return result;
}

xmlTree.prototype.createNodes = function(obj, id) { //生成指定编号节点的树
	if (typeof(id) == 'undefined') id = null; //如果没有id传入则为根节�?
	var nodes = obj.getElementsByTagName('node');
	if (nodes != null && nodes.length > 0) {
		var modeClass, modeSrc, iconClass, iconSrc;
		var nid, npid, nname, nicon, nlink, ntarget, nexplain, hasChildNodes;
		
		//判断模式类型，并应用样式
		modeClass = 'close';
		modeSrc = this.iconPath + this.iconClose;
		if (this.mode == 1) {
			modeSrc = this.iconPath + this.iconOpen;
			modeClass = 'open';
		}
		if (id == null) modeClass = 'open'; //若为根节点则显示
		this.html += '<ul id="tree_' + id + '_c" class="' + modeClass + '">';

		for (var i = 0; i < nodes.length; i++) {
			npid = nodes[i].getAttribute('parentid');
			if (npid == id) {
				//初始�?
				modeClass = 'close'; iconClass = 'icon-file'; iconSrc = this.iconPath + this.iconFile;

				//取得节点编号并检�?
				nid = nodes[i].getAttribute('id');
				this.html += '<li id="tree_' + nid + '"><span onclick="' + this.name + '.action(this,event);" onmouseover="' + this.name + '.action(this,event);" onmouseout="' + this.name + '.action(this,event);">';
				
				//取得节点自定义图�?
				//判断是否含有子节点，并确定箭头和图标的图片及样式
				nicon = this.getFirstChildData(nodes[i], 'icon');
				hasChildNodes = this.checkChildNodes(obj, nid);
				if (hasChildNodes) {
					iconClass = '';
					iconSrc = this.iconPath + this.iconFolder;
					this.html += '<img id="tree_' + nid + '_a" src="' + modeSrc + '" class="arrow" \/>'; //箭头
				}
				if (nicon != '') iconSrc = nicon;
				this.html += '<img id="tree_' + nid + '_i" src="' + iconSrc + '" class="' + iconClass + '" \/>'; //图标

				//取得节点连接
				nlink = this.getFirstChildData(nodes[i], 'link');
				if (nlink != '') {
					nlink = ' href="' + nlink + '"';
				} else {
					nlink = ' href="javascript:;"';
				}

				//取得节点目标
				ntarget = this.getFirstChildData(nodes[i], 'target');
				if (ntarget != '') {
					ntarget = ' target="' + ntarget + '"';
				}

				//取得节点说明
				nexplain = this.getFirstChildData(nodes[i], 'explain');
				if (nexplain != '') {
					nexplain = ' onmouseover="' + this.name + '.treeTips(\'' + nexplain + '\');" onmouseout="' + this.name + '.treeTips();"'
				}

				//取得节点名称
				nname = this.getFirstChildData(nodes[i], 'name');
				this.html += '<a id="tree_' + nid + '_l" onclick="' + this.name + '.action(this,event);"' + nlink + ntarget + nexplain + '>' + nname + '<\/a><\/span>';

				//obj.documentElement.removeChild(nodes[i]);
				if (hasChildNodes) this.createNodes(obj, nid); //迭代子节�?

				this.html += '<\/li>';
			}
		}
		this.html += '<\/ul>';
	}
	return;
}

xmlTree.prototype.action = function(obj, e) { //节点操作
	e = e ? e : (window.event ? window.event : null); //获取操作类型
	e = e.type;
	if (obj.tagName == 'A') {
		try { this.prevSelected.className = '';}
		catch(e) {}
		this.prevSelected = obj;
		obj.className = 'selected';
	}
	if (obj.tagName == 'SPAN') {
		var arrow = obj.firstChild; //取得箭头对象
		var borther = obj;
		while (borther.tagName != 'UL') { //取得分支对象
			borther = borther.nextSibling;
			if (borther == null) break;
		}
		if (borther != null) {
			switch (e) { //�?测操作类型并执行相应代码
				case 'click':
					if (borther.className == 'open') {
						borther.className = 'close';
						arrow.src = this.iconPath + this.iconClose;
					} else {
						borther.className = 'open';
						arrow.src = this.iconPath + this.iconOpen;
					}
					break;
				case 'mouseover':
					if (arrow.tagName == 'IMG' && borther.className == 'close') {
						arrow.src = this.iconPath + this.iconOver;
					}
					break;
				case 'mouseout':
					if (arrow.tagName == 'IMG' && borther.className == 'close') {
						arrow.src = this.iconPath + this.iconClose;
					}
					break;
			}
		}
	}
	return;
}

xmlTree.prototype.treeTips = function(msg) { //提示�?
	if (this.prevTip != null) clearTimeout(this.prevTip);
	var obj = document.getElementById('treeTip');
	if (obj != null) {
		if (this.treeTips.arguments.length < 1) { // hide
			obj.style.display = 'none';
		} else { // show
			obj.innerHTML = msg;
			this.prevTip = setTimeout('document.getElementById("treeTip").style.display = "block"',300);
			document.onmousemove = this.moveToMouseLoc;
		}
	}
	return;
}

xmlTree.prototype.moveToMouseLoc = function(e) { //移动到鼠标所在位�?
	var obj = document.getElementById('treeTip');
	if (obj != null) {
		var offsetX = -10, offsetY = 20;
		var x = 0, y = 0;
		if (window.event) {
			x = event.x + document.body.scrollLeft;
			y = event.y + document.body.scrollTop;
		} else {
			x = e.pageX;
			y = e.pageY;
		}
		obj.style.left = x + offsetX + 'px';
		obj.style.top = y + offsetY + 'px';
	}
	return;
}
