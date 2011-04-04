function check()
{
  var cardId=document.getElementById('cardId');
  var bool=false;
  if(cardId){
     if(cardId.length)
     {
        for(var i=0;i<cardId.length;i++)
        {
           if(cardId[i].checked==true)
           {
             bool=true;
             break;
           }
        }
     }
  }
  if(cardId){
      if(!cardId.length&&cardId.checked==true)
      {
        bool=true;
      }
  }
  if(bool==true)
  {
    //alert('发布成功！');
  }
  else
  {
    alert("请选择复选框！");
  }
}

function _afterEnter(){
	if (window.event.keyCode==13) window.event.keyCode=9;
}

function _selectAll(){
	var sa = document.getElementById("selectall");
	var sl = document.getElementsByName("selecteditem");
	if(sl!=null){
		if(sl.length>0){
			if(sa.checked==true){
				for(var i=0; i<sl.length; i++){
					sl[i].checked=true;
				}
			}
			else{
				for(var i=0; i<sl.length; i++){
					sl[i].checked=false;
				}
			}
		}
	}
}

function _resizeprimarydata() {
	if (window.screen) 	document.getElementById('primarydata').style.width = screen.availWidth - 161;
}

function _hideNavigationMenu(){
	var posimg = document.getElementById('positionimg');
	posimg.src='../images/opennavigationmenu.gif';
	posimg.width=15;
	posimg.height=15;
	posimg.title="点击打开左侧导航菜单";
	posimg.alt="点击打开左侧导航菜单";
	
	document.getElementById('navigation').style.display="none";
	document.getElementById('primary').style.padding="0px";
	//document.getElementById('navigation').attachEvent("onclick", alert(3));
	document.getElementById('positionimg').onclick=function(){
		document.getElementById('navigation').style.display="";
		var posimg0 = document.getElementById('positionimg')
		posimg0.src='../images/currentpositionbg.jpg';
		posimg0.width=8;
		posimg0.height=18;
		posimg0.onclick=null;
		//document.getElementById('primary').style.padding="0px 0px 0px 10px";
	};
	
	if (window.screen) 	document.getElementById('primarydata').style.width = screen.availWidth;
}
function _showNavigationMenu(){
	document.getElementById('navigation').style.display="";
	
	_resizeprimarydata();
}
function _showQueryAdvance(){	
	if(document.getElementById('queryadvance').style.display=="none") {
		document.getElementById('queryadvance').style.display="";
		document.getElementById('querytypebutton').value="简单(D)";
	}else {
		document.getElementById('queryadvance').style.display="none";
		document.getElementById('querytypebutton').value="高级(D)";
	}
}
function sendURL(i)
{
	
	if(i==1)
	{
		
		window.location.href="domesticverification_index.html"
    }
	if(i==2)
	{
		window.location.href="domesticverification_hexiaoxinxixiugai.html"
	}
	if(i==3)
	{
		window.location.href="domesticverification_shenheyiwenfankui.html"
	}
	if(i==4)
	{
		window.location.href="domesticverification_hexiaoyiwenfankui.html"
	}	
	if(i==5)
	{
		window.location.href="domesticverification_hexiaoxinxishanchu.html"
	}	
	if(i==6)
	{
		window.location.href="domesticverification_hexiaoxinxichaxun.html"
	}	
	if(i==7)
	{
		window.location.href="domesticverification_yuqishujuchaxun.html"
	}	
	if(i==8)
	{
		window.location.href="domesticverification_tuihuishujuchaxun.html"
	}				
}
function startList() {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav1");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav2");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}	
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav3");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}	
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav4");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}	
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav5");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}				
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav6");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}		
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav7");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}		
	
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav8");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}		
}

function _Delete(URLstr){	
	var delID = document.getElementById("selecteditem");
	if(delID==null){
		alert("请选择要请示删除的记录！");
		return;
	}
	if(delID.length == null){
		delID = new Array(delID);
	}
	var bDelFlag = false;
	for(var i=0; i<delID.length; i++) {
        if(delID[i].checked == true) {
            bDelFlag = true;
            break;
        }
	}
	if(bDelFlag == false) {
        alert("请选择要请示删除的记录！");
        return;
   }
	
	if(confirm("您确定要进行请示删除吗?")==false){
		return;
		}

	window.location.href=URLstr;
}
function _reject(URLstr){	
	var delID = document.getElementById("selecteditem");
	if(delID==null){
		alert("请选择要进行拒绝操作的记录！");
		return;
	}
	if(delID.length == null){
		delID = new Array(delID);
	}
	var bDelFlag = false;
	for(var i=0; i<delID.length; i++) {
        if(delID[i].checked == true) {
            bDelFlag = true;
            break;
        }
	}
	if(bDelFlag == false) {
        alert("请选择要进行拒绝操作的记录！");
        return;
   }
	
	if(confirm("您确定要进行拒绝操作吗?")==false){
		return;
		}

	window.location.href=URLstr;
}
function _exporttoexcel(para) {
	if(para=="") {
		alert("请首先检索数据，再进行导出操作！");
		return;	
	}
	
	window.open('abroadreceipts.xls', '_blank');
}

function _exit() {
	
	window.close();
}

function _getCurrentDate(){
	var obj = new Date();
	var _month = obj.getMonth() + 1;
	var _date = obj.getDate() + 1;
	var _year = obj.getYear();
	return _year + "-" + _month + "-" + _date;
	}