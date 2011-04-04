/*
Copyright Scand LLC http://www.scbr.com
This version of Software is free for using in non-commercial applications. 
For commercial use please contact info@scbr.com to obtain license

*/ 

 

 
function dhtmlXTreeObject(htmlObject,width,height,rootId){
 if(_isIE)try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}
 if(typeof(htmlObject)!="object")
 this.parentObject=document.getElementById(htmlObject);
 else
 this.parentObject=htmlObject;

 this._itim_dg=true;
 this.dlmtr=",";
 this.dropLower=false;
 this.xmlstate=0;
 this.mytype="tree";
 this.smcheck=true;
 this.width=width;
 this.height=height;
 this.rootId=rootId;
 this.childCalc=null;
 this.def_img_x="18px";
 this.def_img_y="18px";

 this._dragged=new Array();
 this._selected=new Array();

 this.style_pointer="pointer";
 if(navigator.appName == 'Microsoft Internet Explorer')this.style_pointer="hand";

 this._aimgs=true;
 this.htmlcA=" [";
 this.htmlcB="]";
 this.lWin=window;
 this.cMenu=0;
 this.mlitems=0;
 this.dadmode=0;
 this.slowParse=false;
 this.autoScroll=true;
 this.hfMode=0;
 this.nodeCut=new Array();
 this.XMLsource=0;
 this.XMLloadingWarning=0;
 this._globalIdStorage=new Array();
 this.globalNodeStorage=new Array();
 this._globalIdStorageSize=0;
 this.treeLinesOn=true;
 this.checkFuncHandler=0;
 this._spnFH=0;
 this.dblclickFuncHandler=0;
 this.tscheck=false;
 this.timgen=true;

 this.dpcpy=false;
 this._ld_id=null;

 this.imPath="treeGfx/";
 this.checkArray=new Array("iconUnCheckAll.gif","iconCheckAll.gif","iconCheckGray.gif","iconUncheckDis.gif","iconCheckDis.gif","iconCheckDis.gif");
 this.radioArray=new Array("radio_off.gif","radio_on.gif","radio_on.gif","radio_off.gif","radio_on.gif","radio_on.gif");

 this.lineArray=new Array("line2.gif","line3.gif","line4.gif","blank.gif","blank.gif","line1.gif");
 this.minusArray=new Array("minus2.gif","minus3.gif","minus4.gif","minus.gif","minus5.gif");
 this.plusArray=new Array("plus2.gif","plus3.gif","plus4.gif","plus.gif","plus5.gif");
 this.imageArray=new Array("leaf.gif","folderOpen.gif","folderClosed.gif");
 this.cutImg= new Array(0,0,0);
 this.cutImage="but_cut.gif";

 this.dragger= new dhtmlDragAndDropObject();
 
 this.htmlNode=new dhtmlXTreeItemObject(this.rootId,"",0,this);
 this.htmlNode.htmlNode.childNodes[0].childNodes[0].style.display="none";
 this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[0].className="hiddenRow";
 
 this.allTree=this._createSelf();
 this.allTree.appendChild(this.htmlNode.htmlNode);
 if(_isFF)this.allTree.childNodes[0].width="100%";

 this.allTree.onselectstart=new Function("return false;");
 this.XMLLoader=new dtmlXMLLoaderObject(this._parseXMLTree,this,true,this.no_cashe);
 if(_isIE)this.preventIECashing(true);



 var self=this;
 if(window.addEventListener)window.addEventListener("unload",function(){try{self.destructor();}catch(e){}},false);
 if(window.attachEvent)window.attachEvent("onunload",function(){try{self.destructor();}catch(e){}});

 return this;
};

dhtmlXTreeObject.prototype.destructor=function(){
 for(var i=0;i<this._globalIdStorageSize;i++){
 var z=this.globalNodeStorage[i];
 z.parentObject=null;z.treeNod=null;z.childNodes=null;z.span=null;z.tr.nodem=null;z.tr=null;z.htmlNode.objBelong=null;z.htmlNode=null;
 this.globalNodeStorage[i]=null;
}
 this.allTree.innerHTML="";
 this.XMLLoader.destructor();
 for(var a in this){
 this[a]=null;
}
}

function cObject(){
 return this;
}
cObject.prototype= new Object;
cObject.prototype.clone = function(){
 function _dummy(){};
 _dummy.prototype=this;
 return new _dummy();
}

 
function dhtmlXTreeItemObject(itemId,itemText,parentObject,treeObject,actionHandler,mode){
 this.htmlNode="";
 this.acolor="";
 this.scolor="";
 this.tr=0;
 this.childsCount=0;
 this.tempDOMM=0;
 this.tempDOMU=0;
 this.dragSpan=0;
 this.dragMove=0;
 this.span=0;
 this.closeble=1;
 this.childNodes=new Array();
 this.userData=new cObject();


 this.checkstate=0;
 this.treeNod=treeObject;
 this.label=itemText;
 this.parentObject=parentObject;
 this.actionHandler=actionHandler;
 this.images=new Array(treeObject.imageArray[0],treeObject.imageArray[1],treeObject.imageArray[2]);


 this.id=treeObject._globalIdStorageAdd(itemId,this);
 if(this.treeNod.checkBoxOff)this.htmlNode=this.treeNod._createItem(1,this,mode);
 else this.htmlNode=this.treeNod._createItem(0,this,mode);
 
 this.htmlNode.objBelong=this;
 return this;
};


 
 dhtmlXTreeObject.prototype._globalIdStorageAdd=function(itemId,itemObject){
 if(this._globalIdStorageFind(itemId,1,1)){d=new Date();itemId=d.valueOf()+"_"+itemId;return this._globalIdStorageAdd(itemId,itemObject);}
 this._globalIdStorage[this._globalIdStorageSize]=itemId;
 this.globalNodeStorage[this._globalIdStorageSize]=itemObject;
 this._globalIdStorageSize++;
 return itemId;
};

 
 dhtmlXTreeObject.prototype._globalIdStorageSub=function(itemId){
 for(var i=0;i<this._globalIdStorageSize;i++)
 if(this._globalIdStorage[i]==itemId)
{
 this._globalIdStorage[i]=this._globalIdStorage[this._globalIdStorageSize-1];
 this.globalNodeStorage[i]=this.globalNodeStorage[this._globalIdStorageSize-1];
 this._globalIdStorageSize--;
 this._globalIdStorage[this._globalIdStorageSize]=0;
 this.globalNodeStorage[this._globalIdStorageSize]=0;
}
};
 
 
 dhtmlXTreeObject.prototype._globalIdStorageFind=function(itemId,skipXMLSearch,skipParsing,isreparse){
 
 for(var i=0;i<this._globalIdStorageSize;i++)
 if(this._globalIdStorage[i]==itemId)
{

 return this.globalNodeStorage[i];
}

 return null;
};


 
 dhtmlXTreeObject.prototype._escape=function(str){
 switch(this.utfesc){
 case "none":
 return str;
 break;
 case "utf8":
 return encodeURI(str);
 break;
 default:
 return escape(str);
 break;
}
}



 
 dhtmlXTreeObject.prototype._drawNewTr=function(htmlObject,node)
{
 var tr =document.createElement('tr');
 var td1=document.createElement('td');
 var td2=document.createElement('td');
 td1.appendChild(document.createTextNode(" "));
 td2.colSpan=3;
 td2.appendChild(htmlObject);
 tr.appendChild(td1);tr.appendChild(td2);
 return tr;
};
 
 dhtmlXTreeObject.prototype.loadXMLString=function(xmlString,afterCall){
 var that=this;
 if((this.onXLS)&&(!this.parsCount))that.onXLS(that,null);
 this.xmlstate=1;

 if(afterCall)this.XMLLoader.waitCall=afterCall;
 this.XMLLoader.loadXMLString(xmlString);};
 
 dhtmlXTreeObject.prototype.loadXML=function(file,afterCall){
 var that=this;
 if((this.onXLS)&&(!this.parsCount))that.onXLS(that,this._ld_id);
 this._ld_id=null;
 this.xmlstate=1;
 this.XMLLoader=new dtmlXMLLoaderObject(this._parseXMLTree,this,true,this.no_cashe);

 if(afterCall)this.XMLLoader.waitCall=afterCall;
 this.XMLLoader.loadXML(file);};
 
 dhtmlXTreeObject.prototype._attachChildNode=function(parentObject,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs,beforeNode,afterNode){

 if(beforeNode)parentObject=beforeNode.parentObject;
 if(((parentObject.XMLload==0)&&(this.XMLsource))&&(!this.XMLloadingWarning))
{
 parentObject.XMLload=1;
 this._loadDynXML(parentObject.id);

}

 var Count=parentObject.childsCount;
 var Nodes=parentObject.childNodes;


 if(afterNode){
 if(afterNode.tr.previousSibling.previousSibling){
 beforeNode=afterNode.tr.previousSibling.nodem;
}
 else
 optionStr=optionStr.replace("TOP","")+",TOP";
}

 if(beforeNode)
{
 var ik,jk;
 for(ik=0;ik<Count;ik++)
 if(Nodes[ik]==beforeNode)
{
 for(jk=Count;jk!=ik;jk--)
 Nodes[1+jk]=Nodes[jk];
 break;
}
 ik++;
 Count=ik;
}


 if((!itemActionHandler)&&(this.aFunc))itemActionHandler=this.aFunc;

 if(optionStr){
 var tempStr=optionStr.split(",");
 for(var i=0;i<tempStr.length;i++)
{
 switch(tempStr[i])
{
 case "TOP": if(parentObject.childsCount>0){beforeNode=new Object;beforeNode.tr=parentObject.childNodes[0].tr.previousSibling;}
 parentObject._has_top=true;
 for(ik=Count;ik>0;ik--)
 Nodes[ik]=Nodes[ik-1];
 Count=0;
 break;
}
};
};

 Nodes[Count]=new dhtmlXTreeItemObject(itemId,itemText,parentObject,this,itemActionHandler,1);
 itemId = Nodes[Count].id;

 if(image1)Nodes[Count].images[0]=image1;
 if(image2)Nodes[Count].images[1]=image2;
 if(image3)Nodes[Count].images[2]=image3;

 parentObject.childsCount++;
 var tr=this._drawNewTr(Nodes[Count].htmlNode);
 if((this.XMLloadingWarning)||(this._hAdI))
 Nodes[Count].htmlNode.parentNode.parentNode.style.display="none";


 if((beforeNode)&&(beforeNode.tr.nextSibling))
 parentObject.htmlNode.childNodes[0].insertBefore(tr,beforeNode.tr.nextSibling);
 else
 if(this.parsingOn==parentObject.id){
 this.parsedArray[this.parsedArray.length]=tr;
}
 else
 parentObject.htmlNode.childNodes[0].appendChild(tr);


 if((beforeNode)&&(!beforeNode.span))beforeNode=null;

 if(this.XMLsource)if((childs)&&(childs!=0))Nodes[Count].XMLload=0;else Nodes[Count].XMLload=1;
 Nodes[Count].tr=tr;
 tr.nodem=Nodes[Count];

 if(parentObject.itemId==0)
 tr.childNodes[0].className="hiddenRow";

 if((parentObject._r_logic)||(this._frbtr))
 Nodes[Count].htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0].src=this.imPath+this.radioArray[0];


 if(optionStr){
 var tempStr=optionStr.split(",");

 for(var i=0;i<tempStr.length;i++)
{
 switch(tempStr[i])
{
 case "SELECT": this.selectItem(itemId,false);break;
 case "CALL": this.selectItem(itemId,true);break;
 case "CHILD": Nodes[Count].XMLload=0;break;
 case "CHECKED":
 if(this.XMLloadingWarning)
 this.setCheckList+=this.dlmtr+itemId;
 else
 this.setCheck(itemId,1);
 break;
 case "HCHECKED":
 this._setCheck(Nodes[Count],"unsure");
 break;
 case "OPEN": Nodes[Count].openMe=1;break;
}
};
};

 if(!this.XMLloadingWarning)
{
 if((this._getOpenState(parentObject)<0)&&(!this._hAdI))this.openItem(parentObject.id);

 if(beforeNode)
{
 this._correctPlus(beforeNode);
 this._correctLine(beforeNode);
}
 this._correctPlus(parentObject);
 this._correctLine(parentObject);
 this._correctPlus(Nodes[Count]);
 if(parentObject.childsCount>=2)
{
 this._correctPlus(Nodes[parentObject.childsCount-2]);
 this._correctLine(Nodes[parentObject.childsCount-2]);
}
 if(parentObject.childsCount!=2)this._correctPlus(Nodes[0]);

 if(this.tscheck)this._correctCheckStates(parentObject);

 if(this._onradh){
 if(this.xmlstate==1){
 var old=this.onXLE;
 this.onXLE=function(id){this._onradh(itemId);if(old)old(id);}
}
 else
 this._onradh(itemId);
}

}

 return Nodes[Count];
};




 
 dhtmlXTreeObject.prototype.insertNewItem=function(parentId,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs){
 var parentObject=this._globalIdStorageFind(parentId);
 if(!parentObject)return(-1);
 var nodez=this._attachChildNode(parentObject,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs);

 return nodez;
};
 
 dhtmlXTreeObject.prototype.insertNewChild=function(parentId,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs){
 return this.insertNewItem(parentId,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs);
}
 
 dhtmlXTreeObject.prototype._parseXMLTree=function(dhtmlObject,node,parentId,level,xml_obj,start){
 if(!xml_obj)xml_obj=dhtmlObject.XMLLoader;
 dhtmlObject.skipLock=true;
 if(!dhtmlObject.parsCount)dhtmlObject.parsCount=1;else dhtmlObject.parsCount++;
 dhtmlObject.XMLloadingWarning=1;
 var nodeAskingCall="";
 if(!node){
 node=xml_obj.getXMLTopNode("tree");
 parentId=node.getAttribute("id");
 if(node.getAttribute("radio"))
 dhtmlObject.htmlNode._r_logic=true;
 dhtmlObject.parsingOn=parentId;
 dhtmlObject.parsedArray=new Array();
 dhtmlObject.setCheckList="";
}

 var temp=dhtmlObject._globalIdStorageFind(parentId);

 if((temp.childsCount)&&(!start)&&(!dhtmlObject._edsbps)&&(!temp._has_top))
 var preNode=temp.childNodes[temp.childsCount-1];
 else
 var preNode=0;

 if(node.getAttribute("order"))
 dhtmlObject._reorderXMLBranch(node);

 var npl=0;

 for(var i=start||0;i<node.childNodes.length;i++)
{

 if((node.childNodes[i].nodeType==1)&&(node.childNodes[i].tagName == "item"))
{
 temp.XMLload=1;
 if((dhtmlObject._epgps)&&(dhtmlObject._epgpsC==npl)){
 this._setNextPageSign(temp,npl+1*(start||0),level,node);
 break;
}

 var nodx=node.childNodes[i];
 var name=nodx.getAttribute("text");

 var cId=nodx.getAttribute("id");

 if((typeof(dhtmlObject.waitUpdateXML)=="object")&&(!dhtmlObject.waitUpdateXML[cId])){
 dhtmlObject._parseXMLTree(dhtmlObject,node.childNodes[i],cId,1,xml_obj);
 continue;
}

 var im0=nodx.getAttribute("im0");
 var im1=nodx.getAttribute("im1");
 var im2=nodx.getAttribute("im2");
 
 var aColor=nodx.getAttribute("aCol");
 var sColor=nodx.getAttribute("sCol");
 
 var chd=nodx.getAttribute("child");

 var imw=nodx.getAttribute("imwidth");
 var imh=nodx.getAttribute("imheight");

 var atop=nodx.getAttribute("top");
 var aradio=nodx.getAttribute("radio");
 var topoffset=nodx.getAttribute("topoffset");
 var aopen=nodx.getAttribute("open");
 var aselect=nodx.getAttribute("select");
 var acall=nodx.getAttribute("call");
 var achecked=nodx.getAttribute("checked");
 var closeable=nodx.getAttribute("closeable");
 var tooltip = nodx.getAttribute("tooltip");
 var nocheckbox = nodx.getAttribute("nocheckbox");
 var disheckbox = nodx.getAttribute("disabled");
 var style = nodx.getAttribute("style");

 var locked = nodx.getAttribute("locked");

 var zST="";
 if(aselect)zST+=",SELECT";
 if(atop)zST+=",TOP";
 
 if(acall)nodeAskingCall=cId;

 if(achecked==-1)zST+=",HCHECKED";
 else if(achecked)zST+=",CHECKED";
 if(aopen)zST+=",OPEN";

 if(dhtmlObject.waitUpdateXML){
 if(dhtmlObject._globalIdStorageFind(cId))
 var newNode=dhtmlObject.updateItem(cId,name,im0,im1,im2,achecked);
 else{
 if(npl==0)zST+=",TOP";
 else preNode=temp.childNodes[npl];

 var newNode=dhtmlObject._attachChildNode(temp,cId,name,0,im0,im1,im2,zST,chd,0,preNode);
 preNode=null;
}
}
 else
 var newNode=dhtmlObject._attachChildNode(temp,cId,name,0,im0,im1,im2,zST,chd,0,preNode);
 if(tooltip)

 newNode.span.parentNode.title=tooltip;
 if(style)
 if(newNode.span.style.cssText)
 newNode.span.style.cssText+=(";"+style);
 else
 newNode.span.setAttribute("style",newNode.span.getAttribute("style")+";"+style);

 if(aradio)newNode._r_logic=true;

 if(nocheckbox){
 newNode.span.parentNode.previousSibling.previousSibling.childNodes[0].style.display='none';
 newNode.nocheckbox=true;
}
 if(disheckbox){
 if(achecked!=null)dhtmlObject._setCheck(newNode,convertStringToBoolean(achecked));
 dhtmlObject.disableCheckbox(newNode,1);
}


 newNode._acc=chd||0;

 if(dhtmlObject.parserExtension)dhtmlObject.parserExtension._parseExtension(node.childNodes[i],dhtmlObject.parserExtension,cId,parentId);

 dhtmlObject.setItemColor(newNode,aColor,sColor);
 if(locked=="1")dhtmlObject._lockItem(newNode,true,true);

 if((imw)||(imh))dhtmlObject.setIconSize(imw,imh,newNode);
 if((closeable=="0")||(closeable=="1"))dhtmlObject.setItemCloseable(newNode,closeable);
 var zcall="";
 if(topoffset)this.setItemTopOffset(newNode,topoffset);
 if(!dhtmlObject.slowParse)
 zcall=dhtmlObject._parseXMLTree(dhtmlObject,node.childNodes[i],cId,1,xml_obj);


 if(zcall!="")nodeAskingCall=zcall;





 npl++;
}
 else
 dhtmlObject.checkUserData(node.childNodes[i],parentId);
};

 if(!level){
 if(dhtmlObject.waitUpdateXML){
 dhtmlObject.waitUpdateXML=false;
 for(var i=temp.childsCount-1;i>=0;i--)
 if(temp.childNodes[i]._dmark)
 dhtmlObject.deleteItem(temp.childNodes[i].id);
}

 var parsedNodeTop=dhtmlObject._globalIdStorageFind(dhtmlObject.parsingOn);

 for(var i=0;i<dhtmlObject.parsedArray.length;i++)
 parsedNodeTop.htmlNode.childNodes[0].appendChild(dhtmlObject.parsedArray[i]);

 dhtmlObject.lastLoadedXMLId=parentId;
 dhtmlObject.XMLloadingWarning=0;

 var chArr=dhtmlObject.setCheckList.split(dhtmlObject.dlmtr);
 for(var n=0;n<chArr.length;n++)
 if(chArr[n])dhtmlObject.setCheck(chArr[n],1);

 if((dhtmlObject.XMLsource)&&(dhtmlObject.tscheck)&&(dhtmlObject.smcheck)&&(temp.id!=dhtmlObject.rootId)){
 if(temp.checkstate===0)
 dhtmlObject._setSubChecked(0,temp);
 else if(temp.checkstate===1)
 dhtmlObject._setSubChecked(1,temp);
}


 
 if(navigator.appVersion.indexOf("MSIE")!=-1 && navigator.appVersion.indexOf("5.5")!=-1){
 window.setTimeout(function(){dhtmlObject._redrawFrom(dhtmlObject,null,start)},10);
}else{
 dhtmlObject._redrawFrom(dhtmlObject,null,start)
}

 if(nodeAskingCall!="")dhtmlObject.selectItem(nodeAskingCall,true);

}


 if(dhtmlObject.parsCount==1){

 dhtmlObject.parsingOn=null;
 if((!dhtmlObject._edsbps)||(!dhtmlObject._edsbpsA.length)){
 if(dhtmlObject.onXLE)
 window.setTimeout(function(){dhtmlObject.onXLE(dhtmlObject,parentId)},1);
 dhtmlObject.xmlstate=0;
}
 dhtmlObject.skipLock=false;
}
 dhtmlObject.parsCount--;



 if((dhtmlObject._epgps)&&(start))
 this._setPrevPageSign(temp,(start||0),level,node);

 return nodeAskingCall;
};


 dhtmlXTreeObject.prototype.checkUserData=function(node,parentId){
 if((node.nodeType==1)&&(node.tagName == "userdata"))
{
 var name=node.getAttribute("name");
 if((name)&&(node.childNodes[0]))
 this.setUserData(parentId,name,node.childNodes[0].data);
}
}




 
 dhtmlXTreeObject.prototype._redrawFrom=function(dhtmlObject,itemObject,start,visMode){
 if(!itemObject){
 var tempx=dhtmlObject._globalIdStorageFind(dhtmlObject.lastLoadedXMLId);
 dhtmlObject.lastLoadedXMLId=-1;
 if(!tempx)return 0;
}
 else tempx=itemObject;
 var acc=0;

 for(var i=(start?start-1:0);i<tempx.childsCount;i++)
{
 if((!itemObject)||(visMode==1))tempx.childNodes[i].htmlNode.parentNode.parentNode.style.display="";
 if(tempx.childNodes[i].openMe==1)
{
 this._openItem(tempx.childNodes[i]);
 tempx.childNodes[i].openMe=0;
}

 dhtmlObject._redrawFrom(dhtmlObject,tempx.childNodes[i]);


};

 if((!tempx.unParsed)&&((tempx.XMLload)||(!this.XMLsource)))
 tempx._acc=acc;
 dhtmlObject._correctLine(tempx);
 dhtmlObject._correctPlus(tempx);

};

 
 dhtmlXTreeObject.prototype._createSelf=function(){
 var div=document.createElement('div');
 div.className="containerTableStyle";
 div.style.width=this.width;
 div.style.height=this.height;
 this.parentObject.appendChild(div);
 return div;
};

 
 dhtmlXTreeObject.prototype._xcloseAll=function(itemObject)
{
 if(itemObject.unParsed)return;
 if(this.rootId!=itemObject.id){
 var Nodes=itemObject.htmlNode.childNodes[0].childNodes;
 var Count=Nodes.length;

 for(var i=1;i<Count;i++)
 Nodes[i].style.display="none";

 this._correctPlus(itemObject);
}

 for(var i=0;i<itemObject.childsCount;i++)
 if(itemObject.childNodes[i].childsCount)
 this._xcloseAll(itemObject.childNodes[i]);
};
 
 dhtmlXTreeObject.prototype._xopenAll=function(itemObject)
{
 this._HideShow(itemObject,2);
 for(var i=0;i<itemObject.childsCount;i++)
 this._xopenAll(itemObject.childNodes[i]);
};
 
 dhtmlXTreeObject.prototype._correctPlus=function(itemObject){
 var imsrc=itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[0].lastChild;
 var imsrc2=itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0];

 var workArray=this.lineArray;
 if((this.XMLsource)&&(!itemObject.XMLload))
{
 var workArray=this.plusArray;
 imsrc2.src=this.imPath+itemObject.images[2];
 if(this._txtimg)return(imsrc.innerHTML="[+]");
}
 else
 if((itemObject.childsCount)||(itemObject.unParsed))
{
 if((itemObject.htmlNode.childNodes[0].childNodes[1])&&(itemObject.htmlNode.childNodes[0].childNodes[1].style.display!="none"))
{
 if(!itemObject.wsign)var workArray=this.minusArray;
 imsrc2.src=this.imPath+itemObject.images[1];
 if(this._txtimg)return(imsrc.innerHTML="[-]");
}
 else
{
 if(!itemObject.wsign)var workArray=this.plusArray;
 imsrc2.src=this.imPath+itemObject.images[2];
 if(this._txtimg)return(imsrc.innerHTML="[+]");
}
}
 else
{
 imsrc2.src=this.imPath+itemObject.images[0];
}


 var tempNum=2;
 if(!itemObject.treeNod.treeLinesOn)imsrc.src=this.imPath+workArray[3];
 else{
 if(itemObject.parentObject)tempNum=this._getCountStatus(itemObject.id,itemObject.parentObject);
 imsrc.src=this.imPath+workArray[tempNum];
}
};

 
 dhtmlXTreeObject.prototype._correctLine=function(itemObject){
 var sNode=itemObject.parentObject;
 if(sNode)
 if((this._getLineStatus(itemObject.id,sNode)==0)||(!this.treeLinesOn))
 for(var i=1;i<=itemObject.childsCount;i++)
{
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundImage="";
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundRepeat="";
}
 else
 for(var i=1;i<=itemObject.childsCount;i++)
{
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundImage="url("+this.imPath+this.lineArray[5]+")";
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundRepeat="repeat-y";
}
};
 
 dhtmlXTreeObject.prototype._getCountStatus=function(itemId,itemObject){

 if(itemObject.childsCount<=1){if(itemObject.id==this.rootId)return 4;else return 0;}

 if(itemObject.childNodes[0].id==itemId)if(!itemObject.id)return 2;else return 1;
 if(itemObject.childNodes[itemObject.childsCount-1].id==itemId)return 0;

 return 1;
};
 
 dhtmlXTreeObject.prototype._getLineStatus =function(itemId,itemObject){
 if(itemObject.childNodes[itemObject.childsCount-1].id==itemId)return 0;
 return 1;
}

 
 dhtmlXTreeObject.prototype._HideShow=function(itemObject,mode){
 if((this.XMLsource)&&(!itemObject.XMLload)){
 if(mode==1)return;
 itemObject.XMLload=1;
 this._loadDynXML(itemObject.id);
 return;};

 var Nodes=itemObject.htmlNode.childNodes[0].childNodes;var Count=Nodes.length;
 if(Count>1){
 if(((Nodes[1].style.display!="none")||(mode==1))&&(mode!=2)){
 
 this.allTree.childNodes[0].border = "1";
 this.allTree.childNodes[0].border = "0";
 nodestyle="none";
}
 else nodestyle="";

 for(var i=1;i<Count;i++)
 Nodes[i].style.display=nodestyle;
}
 this._correctPlus(itemObject);
}

 
 dhtmlXTreeObject.prototype._getOpenState=function(itemObject){
 var z=itemObject.htmlNode.childNodes[0].childNodes;
 if(z.length<=1)return 0;
 if(z[1].style.display!="none")return 1;
 else return -1;
}

 
 
 
 dhtmlXTreeObject.prototype.onRowClick2=function(){
 if(this.parentObject.treeNod.dblclickFuncHandler)if(!this.parentObject.treeNod.dblclickFuncHandler(this.parentObject.id,this.parentObject.treeNod))return 0;
 if((this.parentObject.closeble)&&(this.parentObject.closeble!="0"))
 this.parentObject.treeNod._HideShow(this.parentObject);
 else
 this.parentObject.treeNod._HideShow(this.parentObject,2);
};
 
 dhtmlXTreeObject.prototype.onRowClick=function(){
 var that=this.parentObject.treeNod;
 if(that._spnFH)if(!that._spnFH(this.parentObject.id,that._getOpenState(this.parentObject)))return 0;
 if((this.parentObject.closeble)&&(this.parentObject.closeble!="0"))
 that._HideShow(this.parentObject);
 else
 that._HideShow(this.parentObject,2);

 
 if(that._epnFH)
 if(!that.xmlstate)
 that._epnFH(this.parentObject.id,that._getOpenState(this.parentObject));
 else{
 that._oie_onXLE=that.onXLE;
 that.onXLE=that._epnFHe;
}
 
};
 
 dhtmlXTreeObject.prototype._epnFHe=function(that,id){
 if(that._epnFH)
 that._epnFH(id,that.getOpenState(id));
 that.onXLE=that._oie_onXLE;
 if(that.onXLE)that.onXLE(that,id);
}

 

 
 dhtmlXTreeObject.prototype.onRowClickDown=function(e){
 e=e||window.event;
 var that=this.parentObject.treeNod;
 that._selectItem(this.parentObject,e);
};


 

 
 dhtmlXTreeObject.prototype.getSelectedItemId=function()
{
 var str=new Array();
 for(var i=0;i<this._selected.length;i++)str[i]=this._selected[i].id;
 return(str.join(this.dlmtr));
};

 
 dhtmlXTreeObject.prototype._selectItem=function(node,e){

 this._unselectItems();

 this._markItem(node);
}
 dhtmlXTreeObject.prototype._markItem=function(node){
 if(node.scolor)node.span.style.color=node.scolor;
 node.span.className="selectedTreeRow";
 node.i_sel=true;
 this._selected[this._selected.length]=node;
}

 
 dhtmlXTreeObject.prototype.getIndexById=function(itemId){
 var z=this._globalIdStorageFind(itemId);
 if(!z)return null;
 return this._getIndex(z);
};
 dhtmlXTreeObject.prototype._getIndex=function(w){
 var z=w.parentObject;
 for(var i=0;i<z.childsCount;i++)
 if(z.childNodes[i]==w)return i;
};





 
 dhtmlXTreeObject.prototype._unselectItem=function(node){
 if((node)&&(node.i_sel))
{

 node.span.className="standartTreeRow";
 if(node.acolor)node.span.style.color=node.acolor;
 node.i_sel=false;
 for(var i=0;i<this._selected.length;i++)
 if(!this._selected[i].i_sel){
 this._selected.splice(i,1);
 break;
}

}
}

 
 dhtmlXTreeObject.prototype._unselectItems=function(){
 for(var i=0;i<this._selected.length;i++){
 var node=this._selected[i];
 node.span.className="standartTreeRow";
 if(node.acolor)node.span.style.color=node.acolor;
 node.i_sel=false;
}
 this._selected=new Array();
}


 
 dhtmlXTreeObject.prototype.onRowSelect=function(e,htmlObject,mode){
 e=e||window.event;

 var obj=this.parentObject;
 if(htmlObject)obj=htmlObject.parentObject;
 var that=obj.treeNod;

 var lastId=that.getSelectedItemId();
 if((!e)||(!e.skipUnSel))
 that._selectItem(obj,e);

 if(!mode){
 if((e)&&(e.button==2)&&(that.arFunc))that.arFunc(obj.id,e);
 if(obj.actionHandler)obj.actionHandler(obj.id,lastId);
}
};




 
 
dhtmlXTreeObject.prototype._correctCheckStates=function(dhtmlObject){
 if(!this.tscheck)return;
 if(dhtmlObject.id==this.rootId)return;
 
 var act=dhtmlObject.childNodes;
 var flag1=0;var flag2=0;
 if(dhtmlObject.childsCount==0)return;
 for(var i=0;i<dhtmlObject.childsCount;i++){
 if(act[i].dscheck)continue;
 if(act[i].checkstate==0)flag1=1;
 else if(act[i].checkstate==1)flag2=1;
 else{flag1=1;flag2=1;break;}
}

 if((flag1)&&(flag2))this._setCheck(dhtmlObject,"unsure");
 else if(flag1)this._setCheck(dhtmlObject,false);
 else this._setCheck(dhtmlObject,true);

 this._correctCheckStates(dhtmlObject.parentObject);
}

 
 dhtmlXTreeObject.prototype.onCheckBoxClick=function(e){
 if(this.parentObject.dscheck)return true;
 if(this.treeNod.tscheck)
 if(this.parentObject.checkstate==1)this.treeNod._setSubChecked(false,this.parentObject);
 else this.treeNod._setSubChecked(true,this.parentObject);
 else
 if(this.parentObject.checkstate==1)this.treeNod._setCheck(this.parentObject,false);
 else this.treeNod._setCheck(this.parentObject,true);
 this.treeNod._correctCheckStates(this.parentObject.parentObject);

 if(this.treeNod.checkFuncHandler)return(this.treeNod.checkFuncHandler(this.parentObject.id,this.parentObject.checkstate));
 else return true;
};
 
 dhtmlXTreeObject.prototype._createItem=function(acheck,itemObject,mode){
 var table=document.createElement('table');
 table.cellSpacing=0;table.cellPadding=0;
 table.border=0;
 if(this.hfMode)table.style.tableLayout="fixed";
 table.style.margin=0;table.style.padding=0;

 var tbody=document.createElement('tbody');
 var tr=document.createElement('tr');
 
 var td1=document.createElement('td');
 td1.className="standartTreeImage";

 if(this._txtimg){
 var img0=document.createElement("div");
 td1.appendChild(img0);
 img0.className="dhx_tree_textSign";
}
 else
{
 var img0=document.createElement((itemObject.id==this.rootId)?"div":"img");
 img0.border="0";
 if(itemObject.id!=this.rootId)img0.align="absmiddle";
 td1.appendChild(img0);img0.style.padding=0;img0.style.margin=0;
}

 var td11=document.createElement('td');
 
 var inp=document.createElement(((this.cBROf)||(itemObject.id==this.rootId))?"div":"img");
 inp.checked=0;inp.src=this.imPath+this.checkArray[0];inp.style.width="16px";inp.style.height="16px";
 
 if(!acheck)(((_isOpera)||(_isKHTML))?td11:inp).style.display="none";

 
 
 td11.appendChild(inp);
 if((!this.cBROf)&&(itemObject.id!=this.rootId))inp.align="absmiddle";
 inp.onclick=this.onCheckBoxClick;
 inp.treeNod=this;
 inp.parentObject=itemObject;
 td11.width="20px";

 var td12=document.createElement('td');
 td12.className="standartTreeImage";
 var img=document.createElement((itemObject.id==this.rootId)?"div":"img");img.onmousedown=this._preventNsDrag;img.ondragstart=this._preventNsDrag;
 img.border="0";
 if(this._aimgs){
 img.parentObject=itemObject;
 if(itemObject.id!=this.rootId)img.align="absmiddle";
 img.onclick=this.onRowSelect;}
 if(!mode)img.src=this.imPath+this.imageArray[0];
 td12.appendChild(img);img.style.padding=0;img.style.margin=0;
 if(this.timgen)
{img.style.width=this.def_img_x;img.style.height=this.def_img_y;}
 else
{
 img.style.width="0px";img.style.height="0px";
 if(_isOpera)td12.style.display="none";
}


 var td2=document.createElement('td');
 td2.className="standartTreeRow";

 itemObject.span=document.createElement('span');
 itemObject.span.className="standartTreeRow";
 if(this.mlitems){
 itemObject.span.style.width=this.mlitems;
 
 itemObject.span.style.display="block";
}
 else td2.noWrap=true;
 if(!_isKHTML)td2.style.width="100%";

 
 itemObject.span.innerHTML=itemObject.label;
 td2.appendChild(itemObject.span);
 td2.parentObject=itemObject;td1.parentObject=itemObject;
 td2.onclick=this.onRowSelect;td1.onclick=this.onRowClick;td2.ondblclick=this.onRowClick2;
 if(this.ettip)

 td2.title=itemObject.label;

 if(this.dragAndDropOff){
 if(this._aimgs){this.dragger.addDraggableItem(td12,this);td12.parentObject=itemObject;}
 this.dragger.addDraggableItem(td2,this);
}

 itemObject.span.style.paddingLeft="5px";itemObject.span.style.paddingRight="5px";td2.style.verticalAlign="";
 td2.style.fontSize="10pt";td2.style.cursor=this.style_pointer;
 tr.appendChild(td1);tr.appendChild(td11);tr.appendChild(td12);
 tr.appendChild(td2);
 tbody.appendChild(tr);
 table.appendChild(tbody);
 if(this.ehlt){
 tr.onmousemove=this._itemMouseIn;
 tr[(_isIE)?"onmouseleave":"onmouseout"]=this._itemMouseOut;
}

 if(this.arFunc){
 
 tr.oncontextmenu=function(e){this.childNodes[0].parentObject.treeNod.arFunc(this.childNodes[0].parentObject.id,(e||event));return false;};
}
 return table;
};
 

 
 dhtmlXTreeObject.prototype.setImagePath=function(newPath){this.imPath=newPath;};



 
 dhtmlXTreeObject.prototype.setOnRightClickHandler=function(func){if(typeof(func)=="function")this.arFunc=func;else this.arFunc=eval(func);};

 
 dhtmlXTreeObject.prototype.setOnClickHandler=function(func){if(typeof(func)=="function")this.aFunc=func;else this.aFunc=eval(func);};


 
 dhtmlXTreeObject.prototype.setXMLAutoLoading=function(filePath){this.XMLsource=filePath;};

 
 dhtmlXTreeObject.prototype.setOnCheckHandler=function(func){if(typeof(func)=="function")this.checkFuncHandler=func;else this.checkFuncHandler=eval(func);};


 
 dhtmlXTreeObject.prototype.setOnOpenHandler=function(func){if(typeof(func)=="function")this._spnFH=func;else this._spnFH=eval(func);};
 
 dhtmlXTreeObject.prototype.setOnOpenStartHandler=function(func){if(typeof(func)=="function")this._spnFH=func;else this._spnFH=eval(func);};

 
 dhtmlXTreeObject.prototype.setOnOpenEndHandler=function(func){if(typeof(func)=="function")this._epnFH=func;else this._epnFH=eval(func);};

 
 dhtmlXTreeObject.prototype.setOnDblClickHandler=function(func){if(typeof(func)=="function")this.dblclickFuncHandler=func;else this.dblclickFuncHandler=eval(func);};









 
 dhtmlXTreeObject.prototype.openAllItems=function(itemId)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 this._xopenAll(temp);
};
 
 
 dhtmlXTreeObject.prototype.getOpenState=function(itemId){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return "";
 return this._getOpenState(temp);
};

 
 dhtmlXTreeObject.prototype.closeAllItems=function(itemId)
{
 if(itemId===window.undefined)itemId=this.rootId;
 
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 this._xcloseAll(temp);

 
 this.allTree.childNodes[0].border = "1";
 this.allTree.childNodes[0].border = "0";

};
 
 
 
 dhtmlXTreeObject.prototype.setUserData=function(itemId,name,value){
 var sNode=this._globalIdStorageFind(itemId,0,true);
 if(!sNode)return;
 if(name=="hint")

 sNode.htmlNode.childNodes[0].childNodes[0].title=value;
 if(sNode.userData["t_"+name]===undefined){
 if(!sNode._userdatalist)sNode._userdatalist=name;
 else sNode._userdatalist+=","+name;
}
 sNode.userData["t_"+name]=value;
};
 
 
 dhtmlXTreeObject.prototype.getUserData=function(itemId,name){
 var sNode=this._globalIdStorageFind(itemId,0,true);
 if(!sNode)return;
 return sNode.userData["t_"+name];
};




 
 dhtmlXTreeObject.prototype.getItemColor=function(itemId)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;

 var res= new Object();
 if(temp.acolor)res.acolor=temp.acolor;
 if(temp.acolor)res.scolor=temp.scolor;
 return res;
};
 
 dhtmlXTreeObject.prototype.setItemColor=function(itemId,defaultColor,selectedColor)
{
 if((itemId)&&(itemId.span))
 var temp=itemId;
 else
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 else{
 if(temp.i_sel)
{if(selectedColor)temp.span.style.color=selectedColor;}
 else
{if(defaultColor)temp.span.style.color=defaultColor;}

 if(selectedColor)temp.scolor=selectedColor;
 if(defaultColor)temp.acolor=defaultColor;
}
};

 
 dhtmlXTreeObject.prototype.getItemText=function(itemId)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 return(temp.htmlNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML);
};
 
 dhtmlXTreeObject.prototype.getParentId=function(itemId)
{
 var temp=this._globalIdStorageFind(itemId);
 if((!temp)||(!temp.parentObject))return "";
 return temp.parentObject.id;
};



 
 dhtmlXTreeObject.prototype.changeItemId=function(itemId,newItemId)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 temp.id=newItemId;
 temp.span.contextMenuId=newItemId;
 for(var i=0;i<this._globalIdStorageSize;i++)
 if(this._globalIdStorage[i]==itemId)
{
 this._globalIdStorage[i]=newItemId;
}
};


 
 dhtmlXTreeObject.prototype.doCut=function(){
 if(this.nodeCut)this.clearCut();
 this.nodeCut=(new Array()).concat(this._selected);
 for(var i=0;i<this.nodeCut.length;i++){
 var tempa=this.nodeCut[i];
 tempa._cimgs=new Array();
 tempa._cimgs[0]=tempa.images[0];
 tempa._cimgs[1]=tempa.images[1];
 tempa._cimgs[2]=tempa.images[2];
 tempa.images[0]=tempa.images[1]=tempa.images[2]=this.cutImage;
 this._correctPlus(tempa);
}
};

 
 dhtmlXTreeObject.prototype.doPaste=function(itemId){
 var tobj=this._globalIdStorageFind(itemId);
 if(!tobj)return 0;
 for(var i=0;i<this.nodeCut.length;i++){
 if(this._checkPNodes(tobj,this.nodeCut[i]))continue;
 this._moveNode(this.nodeCut[i],tobj);
}
 this.clearCut();
};

 
 dhtmlXTreeObject.prototype.clearCut=function(){
 for(var i=0;i<this.nodeCut.length;i++)
{
 var tempa=this.nodeCut[i];
 tempa.images[0]=tempa._cimgs[0];
 tempa.images[1]=tempa._cimgs[1];
 tempa.images[2]=tempa._cimgs[2];
 this._correctPlus(tempa);
}
 this.nodeCut=new Array();
};
 


 
 dhtmlXTreeObject.prototype._moveNode=function(itemObject,targetObject){

 return this._moveNodeTo(itemObject,targetObject);

}

 

dhtmlXTreeObject.prototype._fixNodesCollection=function(target,zParent){
 var flag=0;var icount=0;
 var Nodes=target.childNodes;
 var Count=target.childsCount-1;

 if(zParent==Nodes[Count])return;
 for(var i=0;i<Count;i++)
 if(Nodes[i]==Nodes[Count]){Nodes[i]=Nodes[i+1];Nodes[i+1]=Nodes[Count];}

 
 for(var i=0;i<Count+1;i++)
{
 if(flag){
 var temp=Nodes[i];
 Nodes[i]=flag;
 flag=temp;
}
 else 
 if(Nodes[i]==zParent){flag=Nodes[i];Nodes[i]=Nodes[Count];}
}
};
 
 
dhtmlXTreeObject.prototype._recreateBranch=function(itemObject,targetObject,beforeNode,level){
 var i;var st="";
 if(beforeNode){
 for(i=0;i<targetObject.childsCount;i++)
 if(targetObject.childNodes[i]==beforeNode)break;

 if(i!=0)
 beforeNode=targetObject.childNodes[i-1];
 else{
 st="TOP";
 beforeNode="";
}
}

 var newNode=this._attachChildNode(targetObject,itemObject.id,itemObject.label,0,itemObject.images[0],itemObject.images[1],itemObject.images[2],st,0,beforeNode);

 
 newNode._userdatalist=itemObject._userdatalist;
 newNode.userData=itemObject.userData.clone();
 newNode.XMLload=itemObject.XMLload;


 for(var i=0;i<itemObject.childsCount;i++)
 this._recreateBranch(itemObject.childNodes[i],newNode,0,1);


 return newNode;
}

 
 dhtmlXTreeObject.prototype._moveNodeTo=function(itemObject,targetObject,beforeNode){
 
 if(itemObject.treeNod._nonTrivialNode)
 return itemObject.treeNod._nonTrivialNode(this,targetObject,beforeNode,itemObject);

 if(targetObject.mytype)
 var framesMove=(itemObject.treeNod.lWin!=targetObject.lWin);
 else
 var framesMove=(itemObject.treeNod.lWin!=targetObject.treeNod.lWin);

 if(this.dragFunc)if(!this.dragFunc(itemObject.id,targetObject.id,(beforeNode?beforeNode.id:null),itemObject.treeNod,targetObject.treeNod))return false;
 if((targetObject.XMLload==0)&&(this.XMLsource))
{
 targetObject.XMLload=1;
 this._loadDynXML(targetObject.id);
}
 this.openItem(targetObject.id);

 var oldTree=itemObject.treeNod;
 var c=itemObject.parentObject.childsCount;
 var z=itemObject.parentObject;

 if((framesMove)||(oldTree.dpcpy)){
 var _otiid=itemObject.id;
 itemObject=this._recreateBranch(itemObject,targetObject,beforeNode);
 if(!oldTree.dpcpy)oldTree.deleteItem(_otiid);
}
 else
{

 var Count=targetObject.childsCount;var Nodes=targetObject.childNodes;
 Nodes[Count]=itemObject;
 itemObject.treeNod=targetObject.treeNod;
 targetObject.childsCount++;

 var tr=this._drawNewTr(Nodes[Count].htmlNode);

 if(!beforeNode)
{
 targetObject.htmlNode.childNodes[0].appendChild(tr);
 if(this.dadmode==1)this._fixNodesCollection(targetObject,beforeNode);
}
 else
{
 targetObject.htmlNode.childNodes[0].insertBefore(tr,beforeNode.tr);
 this._fixNodesCollection(targetObject,beforeNode);
 Nodes=targetObject.childNodes;
}


}

 if((!oldTree.dpcpy)&&(!framesMove)){
 var zir=itemObject.tr;

 if((document.all)&&(navigator.appVersion.search(/MSIE\ 5\.0/gi)!=-1))
{
 window.setTimeout(function(){zir.removeNode(true);},250);
}
 else 

 itemObject.parentObject.htmlNode.childNodes[0].removeChild(itemObject.tr);

 
 if((!beforeNode)||(targetObject!=itemObject.parentObject)){
 for(var i=0;i<z.childsCount;i++){
 if(z.childNodes[i].id==itemObject.id){
 z.childNodes[i]=0;
 break;}}}
 else z.childNodes[z.childsCount-1]=0;

 oldTree._compressChildList(z.childsCount,z.childNodes);
 z.childsCount--;
}


 if((!framesMove)&&(!oldTree.dpcpy)){
 itemObject.tr=tr;
 tr.nodem=itemObject;
 itemObject.parentObject=targetObject;

 if(oldTree!=targetObject.treeNod){if(itemObject.treeNod._registerBranch(itemObject,oldTree))return;this._clearStyles(itemObject);this._redrawFrom(this,itemObject.parentObject);};

 this._correctPlus(targetObject);
 this._correctLine(targetObject);

 this._correctLine(itemObject);
 this._correctPlus(itemObject);

 
 if(beforeNode)
{

 this._correctPlus(beforeNode);
 
}
 else 
 if(targetObject.childsCount>=2)
{

 this._correctPlus(Nodes[targetObject.childsCount-2]);
 this._correctLine(Nodes[targetObject.childsCount-2]);
}
 
 this._correctPlus(Nodes[targetObject.childsCount-1]);
 


 if(this.tscheck)this._correctCheckStates(targetObject);
 if(oldTree.tscheck)oldTree._correctCheckStates(z);

}

 

 if(c>1){oldTree._correctPlus(z.childNodes[c-2]);
 oldTree._correctLine(z.childNodes[c-2]);
}


 
 oldTree._correctPlus(z);
 oldTree._correctLine(z);


 if(this.dropFunc)this.dropFunc(itemObject.id,targetObject.id,(beforeNode?beforeNode.id:null),oldTree,targetObject.treeNod);
 return itemObject.id;
};

 

 
 dhtmlXTreeObject.prototype._clearStyles=function(itemObject){
 var td1=itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[1];
 var td3=td1.nextSibling.nextSibling;

 itemObject.span.innerHTML=itemObject.label;
 itemObject.i_sel=false;

 if(this.checkBoxOff){td1.childNodes[0].style.display="";td1.childNodes[0].onclick=this.onCheckBoxClick;}
 else td1.childNodes[0].style.display="none";
 td1.childNodes[0].treeNod=this;

 itemObject.span.onmousedown=function(){};

 this.dragger.removeDraggableItem(td3);
 if(this.dragAndDropOff)this.dragger.addDraggableItem(td3,this);
 td3.childNodes[0].className="standartTreeRow";
 td3.onclick=this.onRowSelect;td3.ondblclick=this.onRowClick2;
 td1.previousSibling.onclick=this.onRowClick;

 this._correctLine(itemObject);
 this._correctPlus(itemObject);
 for(var i=0;i<itemObject.childsCount;i++)this._clearStyles(itemObject.childNodes[i]);

};
 
 dhtmlXTreeObject.prototype._registerBranch=function(itemObject,oldTree){
 
 itemObject.id=this._globalIdStorageAdd(itemObject.id,itemObject);
 itemObject.treeNod=this;
 if(oldTree)oldTree._globalIdStorageSub(itemObject.id);
 for(var i=0;i<itemObject.childsCount;i++)
 this._registerBranch(itemObject.childNodes[i],oldTree);
 return 0;
};

 
 
 dhtmlXTreeObject.prototype.enableThreeStateCheckboxes=function(mode){this.tscheck=convertStringToBoolean(mode);};


 
 dhtmlXTreeObject.prototype.setOnMouseInHandler=function(func){
 this.ehlt=true;
 if(typeof(func)=="function")this._onMSI=func;else this.aFunc=eval(func);};

 
 dhtmlXTreeObject.prototype.setOnMouseOutHandler=function(func){
 this.ehlt=true;
 if(typeof(func)=="function")this._onMSO=func;else this.aFunc=eval(func);};









 
 dhtmlXTreeObject.prototype.enableTreeImages=function(mode){this.timgen=convertStringToBoolean(mode);};
 

 
 
 dhtmlXTreeObject.prototype.enableFixedMode=function(mode){this.hfMode=convertStringToBoolean(mode);};
 
 
 dhtmlXTreeObject.prototype.enableCheckBoxes=function(mode,hidden){this.checkBoxOff=convertStringToBoolean(mode);this.cBROf=(!(this.checkBoxOff||convertStringToBoolean(hidden)));};
 
 dhtmlXTreeObject.prototype.setStdImages=function(image1,image2,image3){
 this.imageArray[0]=image1;this.imageArray[1]=image2;this.imageArray[2]=image3;};

 
 dhtmlXTreeObject.prototype.enableTreeLines=function(mode){
 this.treeLinesOn=convertStringToBoolean(mode);
}

 
 dhtmlXTreeObject.prototype.setImageArrays=function(arrayName,image1,image2,image3,image4,image5){
 switch(arrayName){
 case "plus": this.plusArray[0]=image1;this.plusArray[1]=image2;this.plusArray[2]=image3;this.plusArray[3]=image4;this.plusArray[4]=image5;break;
 case "minus": this.minusArray[0]=image1;this.minusArray[1]=image2;this.minusArray[2]=image3;this.minusArray[3]=image4;this.minusArray[4]=image5;break;
}
};

 
 dhtmlXTreeObject.prototype.openItem=function(itemId){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 else return this._openItem(temp);
};

 
 dhtmlXTreeObject.prototype._openItem=function(item){
 if((this._spnFH)&&(!this._spnFH(item.id,this._getOpenState(item))))return 0;
 this._HideShow(item,2);
 
 if(this._epnFH)
 if(!this.xmlstate)
 this._epnFH(item.id,this._getOpenState(item));
 else{
 this._oie_onXLE=this.onXLE;
 this.onXLE=this._epnFHe;
}
 

 if((item.parentObject)&&(this._getOpenState(item.parentObject)<0))
 this._openItem(item.parentObject);
};
 
 
 dhtmlXTreeObject.prototype.closeItem=function(itemId){
 if(this.rootId==itemId)return 0;
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 if(temp.closeble)
 this._HideShow(temp,1);
};
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 dhtmlXTreeObject.prototype.getLevel=function(itemId){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 return this._getNodeLevel(temp,0);
};
 
 

 
 dhtmlXTreeObject.prototype.setItemCloseable=function(itemId,flag)
{
 flag=convertStringToBoolean(flag);
 if((itemId)&&(itemId.span))
 var temp=itemId;
 else 
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 temp.closeble=flag;
};

 
 dhtmlXTreeObject.prototype._getNodeLevel=function(itemObject,count){
 if(itemObject.parentObject)return this._getNodeLevel(itemObject.parentObject,count+1);
 return(count);
};
 
 
 dhtmlXTreeObject.prototype.hasChildren=function(itemId){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 else 
{
 if((this.XMLsource)&&(!temp.XMLload))return true;
 else 
 return temp.childsCount;
};
};
 

 
 dhtmlXTreeObject.prototype._getLeafCount=function(itemNode){
 var a=0;
 for(var b=0;b<itemNode.childsCount;b++)
 if(itemNode.childNodes[b].childsCount==0)a++;
 return a;
}

 
 
 dhtmlXTreeObject.prototype.setItemText=function(itemId,newLabel,newTooltip)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 temp.label=newLabel;
 temp.span.innerHTML=newLabel;

 temp.span.parentNode.title=newTooltip||"";
};

 
 dhtmlXTreeObject.prototype.getItemTooltip=function(itemId){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return "";
 return(temp.span.parentNode.title||"");
};

 
 dhtmlXTreeObject.prototype.refreshItem=function(itemId){
 if(!itemId)itemId=this.rootId;
 var temp=this._globalIdStorageFind(itemId);
 this.deleteChildItems(itemId);
 this._loadDynXML(itemId);
};

 
 dhtmlXTreeObject.prototype.setItemImage2=function(itemId,image1,image2,image3){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 temp.images[1]=image2;
 temp.images[2]=image3;
 temp.images[0]=image1;
 this._correctPlus(temp);
};
 
 dhtmlXTreeObject.prototype.setItemImage=function(itemId,image1,image2)
{
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 if(image2)
{
 temp.images[1]=image1;
 temp.images[2]=image2;
}
 else temp.images[0]=image1;
 this._correctPlus(temp);
};


 
 dhtmlXTreeObject.prototype.getSubItems =function(itemId)
{
 var temp=this._globalIdStorageFind(itemId,0,1);
 if(!temp)return 0;

 var z="";
 for(i=0;i<temp.childsCount;i++){
 if(!z)z=temp.childNodes[i].id;
 else z+=this.dlmtr+temp.childNodes[i].id;

}

 return z;
};




 
 dhtmlXTreeObject.prototype._getAllScraggyItems =function(node)
{
 var z="";
 for(var i=0;i<node.childsCount;i++)
{
 if((node.childNodes[i].unParsed)||(node.childNodes[i].childsCount>0))
{
 if(node.childNodes[i].unParsed)
 var zb=this._getAllScraggyItemsXML(node.childNodes[i].unParsed,1);
 else
 var zb=this._getAllScraggyItems(node.childNodes[i])

 if(zb)
 if(z)z+=this.dlmtr+zb;
 else z=zb;
}
 else
 if(!z)z=node.childNodes[i].id;
 else z+=this.dlmtr+node.childNodes[i].id;
}
 return z;
};





 

 dhtmlXTreeObject.prototype._getAllFatItems =function(node)
{
 var z="";
 for(var i=0;i<node.childsCount;i++)
{
 if((node.childNodes[i].unParsed)||(node.childNodes[i].childsCount>0))
{
 if(!z)z=node.childNodes[i].id;
 else z+=this.dlmtr+node.childNodes[i].id;

 if(node.childNodes[i].unParsed)
 var zb=this._getAllFatItemsXML(node.childNodes[i].unParsed,1);
 else
 var zb=this._getAllFatItems(node.childNodes[i])

 if(zb)z+=this.dlmtr+zb;
}
}
 return z;
};


 
 dhtmlXTreeObject.prototype._getAllSubItems =function(itemId,z,node)
{
 if(node)temp=node;
 else{
 var temp=this._globalIdStorageFind(itemId);
};
 if(!temp)return 0;

 z="";
 for(var i=0;i<temp.childsCount;i++)
{
 if(!z)z=temp.childNodes[i].id;
 else z+=this.dlmtr+temp.childNodes[i].id;
 var zb=this._getAllSubItems(0,z,temp.childNodes[i])

 if(zb)z+=this.dlmtr+zb;
}


 return z;
};




 
 
 dhtmlXTreeObject.prototype.selectItem=function(itemId,mode,preserve){
 mode=convertStringToBoolean(mode);
 var temp=this._globalIdStorageFind(itemId);
 if((!temp)||(!temp.parentObject))return 0;


 if(this._getOpenState(temp.parentObject)==-1)
 if(this.XMLloadingWarning)
 temp.parentObject.openMe=1;
 else
 this._openItem(temp.parentObject);

 
 var ze=null;
 if(preserve){
 ze=new Object;ze.ctrlKey=true;
 if(temp.i_sel)ze.skipUnSel=true;
}
 if(mode)
 this.onRowSelect(ze,temp.htmlNode.childNodes[0].childNodes[0].childNodes[3],false);
 else
 this.onRowSelect(ze,temp.htmlNode.childNodes[0].childNodes[0].childNodes[3],true);
};
 
 
 dhtmlXTreeObject.prototype.getSelectedItemText=function()
{
 var str=new Array();
 for(var i=0;i<this._selected.length;i++)str[i]=this._selected[i].span.innerHTML;
 return(str.join(this.dlmtr));
};




 
 dhtmlXTreeObject.prototype._compressChildList=function(Count,Nodes)
{
 Count--;
 for(var i=0;i<Count;i++)
{
 if(Nodes[i]==0){Nodes[i]=Nodes[i+1];Nodes[i+1]=0;}
};
};
 
 dhtmlXTreeObject.prototype._deleteNode=function(itemId,htmlObject,skip){

 if(!skip){
 this._globalIdStorageRecSub(htmlObject);
}
 
 if((!htmlObject)||(!htmlObject.parentObject))return 0;
 var tempos=0;var tempos2=0;
 if(htmlObject.tr.nextSibling)tempos=htmlObject.tr.nextSibling.nodem;
 if(htmlObject.tr.previousSibling)tempos2=htmlObject.tr.previousSibling.nodem;
 
 var sN=htmlObject.parentObject;
 var Count=sN.childsCount;
 var Nodes=sN.childNodes;
 for(var i=0;i<Count;i++)
{
 if(Nodes[i].id==itemId){
 if(!skip)sN.htmlNode.childNodes[0].removeChild(Nodes[i].tr);
 Nodes[i]=0;
 break;
}
}
 this._compressChildList(Count,Nodes);
 if(!skip){
 sN.childsCount--;
}

 if(tempos){
 this._correctPlus(tempos);
 this._correctLine(tempos);
}
 if(tempos2){
 this._correctPlus(tempos2);
 this._correctLine(tempos2);
}
 if(this.tscheck)this._correctCheckStates(sN);
};
 
 dhtmlXTreeObject.prototype.setCheck=function(itemId,state){
 var sNode=this._globalIdStorageFind(itemId,0,1);
 if(!sNode)return;

 if(state==="unsure")
 this._setCheck(sNode,state);
 else
{
 state=convertStringToBoolean(state);
 if((this.tscheck)&&(this.smcheck))this._setSubChecked(state,sNode);
 else this._setCheck(sNode,state);
}
 if(this.smcheck)
 this._correctCheckStates(sNode.parentObject);
};

 dhtmlXTreeObject.prototype._setCheck=function(sNode,state){
 if(((sNode.parentObject._r_logic)||(this._frbtr))&&(state))
 if(this._frbtrs){
 if(this._frbtrL)this._setCheck(this._frbtrL,0);
 this._frbtrL=sNode;
}else
 for(var i=0;i<sNode.parentObject.childsCount;i++)
 this._setCheck(sNode.parentObject.childNodes[i],0);

 var z=sNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];

 if(state=="unsure")sNode.checkstate=2;
 else if(state)sNode.checkstate=1;else sNode.checkstate=0;
 if(sNode.dscheck)sNode.checkstate=sNode.dscheck;
 z.src=this.imPath+((sNode.parentObject._r_logic||this._frbtr)?this.radioArray:this.checkArray)[sNode.checkstate];
};

 
dhtmlXTreeObject.prototype.setSubChecked=function(itemId,state){
 var sNode=this._globalIdStorageFind(itemId);
 this._setSubChecked(state,sNode);
 this._correctCheckStates(sNode.parentObject);
}



 
 dhtmlXTreeObject.prototype._setSubChecked=function(state,sNode){
 state=convertStringToBoolean(state);
 if(!sNode)return;
 if(((sNode.parentObject._r_logic)||(this._frbtr))&&(state))
 for(var i=0;i<sNode.parentObject.childsCount;i++)
 this._setSubChecked(0,sNode.parentObject.childNodes[i]);


 if(sNode._r_logic||this._frbtr)
 this._setSubChecked(state,sNode.childNodes[0]);
 else
 for(var i=0;i<sNode.childsCount;i++)
{
 this._setSubChecked(state,sNode.childNodes[i]);
};
 var z=sNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];

 if(state)sNode.checkstate=1;
 else sNode.checkstate=0;
 if(sNode.dscheck)sNode.checkstate=sNode.dscheck;



 z.src=this.imPath+((sNode.parentObject._r_logic||this._frbtr)?this.radioArray:this.checkArray)[sNode.checkstate];
};

 
 dhtmlXTreeObject.prototype.isItemChecked=function(itemId){
 var sNode=this._globalIdStorageFind(itemId);
 if(!sNode)return;
 return sNode.checkstate;
};







 
 dhtmlXTreeObject.prototype.deleteChildItems=function(itemId)
{
 var sNode=this._globalIdStorageFind(itemId);
 if(!sNode)return;
 var j=sNode.childsCount;
 for(var i=0;i<j;i++)
{
 this._deleteNode(sNode.childNodes[0].id,sNode.childNodes[0]);
};
};

 
dhtmlXTreeObject.prototype.deleteItem=function(itemId,selectParent){
 if((!this._onrdlh)||(this._onrdlh(itemId))){
 var z=this._deleteItem(itemId,selectParent);

}

 
 this.allTree.childNodes[0].border = "1";
 this.allTree.childNodes[0].border = "0";
}
 
dhtmlXTreeObject.prototype._deleteItem=function(itemId,selectParent,skip){
 selectParent=convertStringToBoolean(selectParent);
 var sNode=this._globalIdStorageFind(itemId);
 if(!sNode)return;
 var pid=this.getParentId(itemId);
 if((selectParent)&&(pid!=this.rootId))this.selectItem(pid,1);
 else
 this._unselectItem(sNode);

 if(!skip)
 this._globalIdStorageRecSub(sNode);

 var zTemp=sNode.parentObject;
 this._deleteNode(itemId,sNode,skip);
 this._correctPlus(zTemp);
 this._correctLine(zTemp);
 return zTemp;
};

 
 dhtmlXTreeObject.prototype._globalIdStorageRecSub=function(itemObject){
 for(var i=0;i<itemObject.childsCount;i++)
{
 this._globalIdStorageRecSub(itemObject.childNodes[i]);
 this._globalIdStorageSub(itemObject.childNodes[i].id);
};
 this._globalIdStorageSub(itemObject.id);
};

 
 dhtmlXTreeObject.prototype.insertNewNext=function(itemId,newItemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs){
 var sNode=this._globalIdStorageFind(itemId);
 if((!sNode)||(!sNode.parentObject))return(0);

 var nodez=this._attachChildNode(0,newItemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs,sNode);

 return nodez;
};


 
 
 dhtmlXTreeObject.prototype.getItemIdByIndex=function(itemId,index){
 var z=this._globalIdStorageFind(itemId);
 if((!z)||(index>z.childsCount))return null;
 return z.childNodes[index].id;
};

 
 dhtmlXTreeObject.prototype.getChildItemIdByIndex=function(itemId,index){
 var z=this._globalIdStorageFind(itemId);
 if((!z)||(index>=z.childsCount))return null;
 return z.childNodes[index].id;
};



 

 
 dhtmlXTreeObject.prototype.setDragHandler=function(func){if(typeof(func)=="function")this.dragFunc=func;else this.dragFunc=eval(func);};
 
 
 dhtmlXTreeObject.prototype._clearMove=function(){
 if(this._lastMark){
 this._lastMark.className=this._lastMark.className.replace(/dragAndDropRow/g,"");
 this._lastMark=null;
}

 this.allTree.className=this.allTree.className.replace(" selectionBox","");
};

 
 dhtmlXTreeObject.prototype.enableDragAndDrop=function(mode,rmode){
 if(mode=="temporary_disabled"){
 this.dADTempOff=false;
 mode=true;}
 else
 this.dADTempOff=true;

 this.dragAndDropOff=convertStringToBoolean(mode);
 if(this.dragAndDropOff)this.dragger.addDragLanding(this.allTree,this);
 if(arguments.length>1)
 this._ddronr=(!convertStringToBoolean(rmode));
};

 
 dhtmlXTreeObject.prototype._setMove=function(htmlNode,x,y){
 if(htmlNode.parentObject.span){
 
 var a1=getAbsoluteTop(htmlNode);
 var a2=getAbsoluteTop(this.allTree);

 this.dadmodec=this.dadmode;
 this.dadmodefix=0;


 var zN=htmlNode.parentObject.span;
 zN.className+=" dragAndDropRow";
 this._lastMark=zN;

 if(this.autoScroll)
{
 
 if((a1-a2-parseInt(this.allTree.scrollTop))>(parseInt(this.allTree.offsetHeight)-50))
 this.allTree.scrollTop=parseInt(this.allTree.scrollTop)+20;
 
 if((a1-a2)<(parseInt(this.allTree.scrollTop)+30))
 this.allTree.scrollTop=parseInt(this.allTree.scrollTop)-20;
}
}
};



 
dhtmlXTreeObject.prototype._createDragNode=function(htmlObject,e){
 if(!this.dADTempOff)return null;

 var obj=htmlObject.parentObject;
 if(!obj.i_sel)
 this._selectItem(obj,e);


 var dragSpan=document.createElement('div');

 var text=new Array();
 if(this._itim_dg)
 for(var i=0;i<this._selected.length;i++)
 text[i]="<table cellspacing='0' cellpadding='0'><tr><td><img width='18px' height='18px' src='"+this._selected[i].span.parentNode.previousSibling.childNodes[0].src+"'></td><td>"+this._selected[i].span.innerHTML+"</td></tr><table>";
 else
 text=this.getSelectedItemText().split(this.dlmtr);

 dragSpan.innerHTML=text.join("");
 dragSpan.style.position="absolute";
 dragSpan.className="dragSpanDiv";
 this._dragged=(new Array()).concat(this._selected);
 return dragSpan;
}



 
dhtmlXTreeObject.prototype._focusNode=function(item){
 var z=getAbsoluteTop(item.htmlNode)-getAbsoluteTop(this.allTree);
 if((z>(this.allTree.scrollTop+this.allTree.offsetHeight-30))||(z<this.allTree.scrollTop))
 this.allTree.scrollTop=z;
};




 








 

dhtmlXTreeObject.prototype._preventNsDrag=function(e){
 if((e)&&(e.preventDefault)){e.preventDefault();return false;}
 return false;
}

dhtmlXTreeObject.prototype._drag=function(sourceHtmlObject,dhtmlObject,targetHtmlObject){

 if(this._autoOpenTimer)clearTimeout(this._autoOpenTimer);

 if(!targetHtmlObject.parentObject){
 targetHtmlObject=this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
 this.dadmodec=0;
}

 this._clearMove();
 var z=sourceHtmlObject.parentObject.treeNod;
 if((z)&&(z._clearMove))z._clearMove("");

 if((!this.dragMove)||(this.dragMove()))
{
 if((!z)||(!z._clearMove)||(!z._dragged))var col=new Array(sourceHtmlObject.parentObject);
 else var col=z._dragged;

 for(var i=0;i<col.length;i++){
 var newID=this._moveNode(col[i],targetHtmlObject.parentObject);

 if((newID)&&(!this._sADnD))this.selectItem(newID,0,1);
}

}
 if(z)z._dragged=new Array();


}

dhtmlXTreeObject.prototype._dragIn=function(htmlObject,shtmlObject,x,y){

 if(!this.dADTempOff)return 0;
 var fobj=shtmlObject.parentObject;
 var tobj=htmlObject.parentObject;
 if((!tobj)&&(this._ddronr))return;
 if((this._onDrInFunc)&&(!this._onDrInFunc(fobj.id,tobj?tobj.id:null,fobj.treeNod,this)))
 return 0;


 if(!tobj)
 this.allTree.className+=" selectionBox";
 else
{
 if(fobj.childNodes==null){
 this._setMove(htmlObject,x,y);
 return htmlObject;
}

 var stree=fobj.treeNod;
 for(var i=0;i<stree._dragged.length;i++)
 if(this._checkPNodes(tobj,stree._dragged[i]))
 return 0;

 this._setMove(htmlObject,x,y);
 if(this._getOpenState(tobj)<=0){
 this._autoOpenId=tobj.id;
 this._autoOpenTimer=window.setTimeout(new callerFunction(this._autoOpenItem,this),1000);
}
}

 return htmlObject;

}
dhtmlXTreeObject.prototype._autoOpenItem=function(e,treeObject){
 treeObject.openItem(treeObject._autoOpenId);
};
dhtmlXTreeObject.prototype._dragOut=function(htmlObject){
this._clearMove();
if(this._autoOpenTimer)clearTimeout(this._autoOpenTimer);
}












 
 dhtmlXTreeObject.prototype._loadDynXML=function(id,src){
 src=src||this.XMLsource;
 var sn=(new Date()).valueOf();
 this._ld_id=id;

 this.loadXML(src+getUrlSymbol(src)+"uid="+sn+"&id="+this._escape(id));
};







 
 dhtmlXTreeObject.prototype._checkPNodes=function(item1,item2){
 if(item2==item1)return 1
 if(item1.parentObject)return this._checkPNodes(item1.parentObject,item2);else return 0;
};










 
dhtmlXTreeObject.prototype.preventIECashing=function(mode){
 this.no_cashe = convertStringToBoolean(mode);
 this.XMLLoader.rSeed=this.no_cashe;
}



 



 
 dhtmlXTreeObject.prototype.setEscapingMode=function(mode){
 this.utfesc=mode;
}


 
 dhtmlXTreeObject.prototype.enableHighlighting=function(mode){this.ehlt=true;this.ehlta=convertStringToBoolean(mode);};

 
 dhtmlXTreeObject.prototype._itemMouseOut=function(){
 var that=this.childNodes[3].parentObject;
 var tree=that.treeNod;
 if(tree._onMSO)that.treeNod._onMSO(that.id);
 if(that.id==tree._l_onMSI)tree._l_onMSI=null;
 if(!tree.ehlt)return;
 that.span.className=that.span.className.replace("_lor","");
}
 
 dhtmlXTreeObject.prototype._itemMouseIn=function(){
 var that=this.childNodes[3].parentObject;
 var tree=that.treeNod;

 if((tree._onMSI)&&(tree._l_onMSI!=that.id))tree._onMSI(that.id);
 tree._l_onMSI=that.id;
 if(!tree.ehlt)return;
 that.span.className=that.span.className.replace("_lor","");
 that.span.className=that.span.className.replace(/((standart|selected)TreeRow)/,"$1_lor");
}

 
 dhtmlXTreeObject.prototype.enableActiveImages=function(mode){this._aimgs=convertStringToBoolean(mode);};

 
dhtmlXTreeObject.prototype.focusItem=function(itemId){
 var sNode=this._globalIdStorageFind(itemId);
 if(!sNode)return(0);
 this._focusNode(sNode);
};


 
 dhtmlXTreeObject.prototype.getAllSubItems =function(itemId){
 return this._getAllSubItems(itemId);
}

 
 dhtmlXTreeObject.prototype.getAllChildless =function(){
 return this._getAllScraggyItems(this.htmlNode);
}
 dhtmlXTreeObject.prototype.getAllLeafs=dhtmlXTreeObject.prototype.getAllChildless;


 
 dhtmlXTreeObject.prototype._getAllScraggyItems =function(node)
{
 var z="";
 for(var i=0;i<node.childsCount;i++)
{
 if((node.childNodes[i].unParsed)||(node.childNodes[i].childsCount>0))
{
 if(node.childNodes[i].unParsed)
 var zb=this._getAllScraggyItemsXML(node.childNodes[i].unParsed,1);
 else
 var zb=this._getAllScraggyItems(node.childNodes[i])

 if(zb)
 if(z)z+=this.dlmtr+zb;
 else z=zb;
}
 else
 if(!z)z=node.childNodes[i].id;
 else z+=this.dlmtr+node.childNodes[i].id;
}
 return z;
};





 
 dhtmlXTreeObject.prototype._getAllFatItems =function(node)
{
 var z="";
 for(var i=0;i<node.childsCount;i++)
{
 if((node.childNodes[i].unParsed)||(node.childNodes[i].childsCount>0))
{
 if(!z)z=node.childNodes[i].id;
 else z+=this.dlmtr+node.childNodes[i].id;

 if(node.childNodes[i].unParsed)
 var zb=this._getAllFatItemsXML(node.childNodes[i].unParsed,1);
 else
 var zb=this._getAllFatItems(node.childNodes[i])

 if(zb)z+=this.dlmtr+zb;
}
}
 return z;
};

 
 dhtmlXTreeObject.prototype.getAllItemsWithKids =function(){
 return this._getAllFatItems(this.htmlNode);
}
 dhtmlXTreeObject.prototype.getAllFatItems=dhtmlXTreeObject.prototype.getAllItemsWithKids;



 
 dhtmlXTreeObject.prototype.getAllChecked=function(){
 return this._getAllChecked("","",1);
}
 
 dhtmlXTreeObject.prototype.getAllUnchecked=function(itemId){
 if(itemId)
 itemId=this._globalIdStorageFind(itemId);
 return this._getAllChecked(itemId,"",0);
}


 
 dhtmlXTreeObject.prototype.getAllPartiallyChecked=function(){
 return this._getAllChecked("","",2);
}


 
 dhtmlXTreeObject.prototype.getAllCheckedBranches=function(){
 var temp= this._getAllChecked("","",1);
 if(temp!="")temp+=this.dlmtr;
 return temp+this._getAllChecked("","",2);
}

 
 dhtmlXTreeObject.prototype._getAllChecked=function(htmlNode,list,mode){
 if(!htmlNode)htmlNode=this.htmlNode;

 if(htmlNode.checkstate==mode)
 if(!htmlNode.nocheckbox){if(list)list+=this.dlmtr+htmlNode.id;else list=htmlNode.id;}
 var j=htmlNode.childsCount;
 for(var i=0;i<j;i++)
{
 list=this._getAllChecked(htmlNode.childNodes[i],list,mode);
};


 if(list)return list;else return "";
};

 
dhtmlXTreeObject.prototype.setItemStyle=function(itemId,style_string){
 var temp=this._globalIdStorageFind(itemId);
 if(!temp)return 0;
 if(!temp.span.style.cssText)
 temp.span.setAttribute("style",temp.span.getAttribute("style")+";"+style_string);
 else
 temp.span.style.cssText+=(";"+style_string);
}

 
dhtmlXTreeObject.prototype.enableImageDrag=function(mode){
 this._itim_dg=convertStringToBoolean(mode);
}

 
 dhtmlXTreeObject.prototype.setOnDragIn=function(func){
 if(typeof(func)=="function")this._onDrInFunc=func;else this._onDrInFunc=eval(func);
};

 
 dhtmlXTreeObject.prototype.enableDragAndDropScrolling=function(mode){this.autoScroll=convertStringToBoolean(mode);};

 


