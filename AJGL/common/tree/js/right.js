
//var mplay = document.getElementById("mplay");
/*******以下内容可以修改***************/ 
var mname=new Array( 
	"添加子集", 
	"添加实体", 
	"添加元素"
); 
//mname是菜单对应的名称，数组的个数必须与下面murl对应 

var murl=new Array( 
	"window.open('http://www.cn5.cn','_blank','');", 
	"alert('添加实体');", 
	"alert('download');"
); 
//murl是菜单对应的操作，可以是任意javascript代码但是要注意不要在里面输入\"，只能用' 
//如果要实现跳转可以这样window.location='url'; 
var ph=18,mwidth=50;//每条选项的高度,菜单的总宽度 
var bgc="#eee",txc="blue";//菜单没有选中的背景色和文字色 
var cbgc="darkblue",ctxc="white";//菜单选中的选项背景色和文字色 

/****************以下代码请不要修改******************/ 
var mover="this.style.background='"+cbgc+"';this.style.color='"+ctxc+"';" 
var mout="this.style.background='"+bgc+"';this.style.color='"+txc+"';" 

document.oncontextmenu=function() 
{ 
	mlay.style.display=""; 
	mlay.style.pixelTop=event.clientY; 
	mlay.style.pixelLeft=event.clientX; 
	return false; 
} 
function showoff() 
{ 
mlay.style.display="none"; 
} 

function fresh() 
{ 
	mlay.style.background=bgc; 
	mlay.style.color=txc; 
	mlay.style.width=mwidth; 
	mlay.style.height=mname.length*ph; 
	var h="<table width=100% height="+mname.length*ph+"px cellpadding=0 cellspacing=0 border=0>"; 
	var i=0; 
	for(i=0;i<mname.length;i++) 
	{ 
	h+="<tr align=center height="+ph+" onclick=\""+murl[i]+"\" onMouseover=\""+mover+"\" onMouseout=\""+mout+"\"><td style='font-size:9pt;'>"+mname[i]+"</td></tr>"; 
	} 
	h+="</table>"; 
	mlay.innerHTML=h; 
}