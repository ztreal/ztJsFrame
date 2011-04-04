var oldValue = new Array();//原来的值
var updateValue;//更改字段对应值
var updateName; //更改字段名称
/*
 *判断是否页面内容是否更改
 *@return boolean
 */
function isUpdate(){
	
  var inputTagNames = document.getElementsByTagName("input");
		  updateName = new Array();
		  updateValue = new Array();
		  checkName = new Array();
		  checkValue = new Array();		  
  var isModfly = false;
  var j=0;
  var u=0
  for (var i = 0; i<inputTagNames.length; i++){
	  	if (inputTagNames[i].type =="radio"){
	  		 if (updateValue[inputTagNames[i].fieldTitle] ==undefined){
	  	  	 for (var k=0;k<document.getElementsByName(inputTagNames[i].name).length;k++){	  	  		
	  	  		   if (document.getElementsByName(inputTagNames[i].name)[k].checked){
	  	  		   		var vt = document.getElementsByName(inputTagNames[i].name)[k].valueTitle;
			  		  	  if (oldValue[inputTagNames[i].fieldTitle] !=vt){
				  			      updateName[j]=inputTagNames[i].fieldTitle;
						  				updateValue[inputTagNames[i].fieldTitle]=vt;
						  				if (!isModfly)
						  					 isModfly=true;
						  				j++;
		  			      }  
	  	  		   }
	  	  		 }	  
	  	  	 }	  
  	  	} else if(inputTagNames[i].type =="checkbox") {	
			  	  if (inputTagNames[i].checked){
					  	  if (checkValue[inputTagNames[i].fieldTitle]==undefined){
					  	  	  checkValue[inputTagNames[i].fieldTitle]="";
					  	  	  checkName[u]=inputTagNames[i].fieldTitle;
					  	  	  u++;
					  	  }else {
					  	  	  checkValue[inputTagNames[i].fieldTitle]=checkValue[inputTagNames[i].fieldTitle]+",";
					  	  }  	  	
			  		    checkValue[inputTagNames[i].fieldTitle] = checkValue[inputTagNames[i].fieldTitle]+inputTagNames[i].valueTitle;  		
	  		     }
  	  		  	  		  		 			
  	  } else if(inputTagNames[i].type =="text") {	  	  		
  		  	if (oldValue[inputTagNames[i].fieldTitle] !=inputTagNames[i].value){
	  			    updateName[j]=inputTagNames[i].fieldTitle;
	  				  updateValue[inputTagNames[i].fieldTitle]=inputTagNames[i].value;
	  				  if (!isModfly)
	  				  	 isModfly=true;
	  				  j++;
			    }  			
  	  }	  
	
  }
  
  for (var r=0;r<checkName.length;r++){
  	  if (oldValue[checkName[r]] !=checkValue[checkName[r]]){
			    updateName[j]=checkName[r];
				  updateValue[checkName[r]]=checkValue[checkName[r]];
				  if (!isModfly)
				  		isModfly=true;
				  j++;
			}
  	}
  
  var textareaTagNames = document.getElementsByTagName("textarea");
  	  for (var t = 0; t<textareaTagNames.length; t++){
	  	    if (oldValue[textareaTagNames[t].fieldTitle] !=textareaTagNames[t].value){
	  			    updateName[j]=textareaTagNames[t].fieldTitle;
	  				  updateValue[textareaTagNames[t].fieldTitle]=textareaTagNames[t].value;
	  				  if (!isModfly)
	  				     isModfly=true;
	  				  j++;
			    }  
	  	}
	  //select控件
	 var selectTagNames = document.getElementsByTagName("select");
	     for (var t = 0; t<selectTagNames.length; t++){
	     		 for (var v=0;v<selectTagNames[t].childNodes.length;v++){
	     		 	   if(selectTagNames[t].childNodes[v].selected){
					  	    if (oldValue[selectTagNames[t].fieldTitle] !=selectTagNames[t].childNodes[v].outerText){
					  			    updateName[j]=selectTagNames[t].fieldTitle;
					  				  updateValue[selectTagNames[t].fieldTitle]=selectTagNames[t].childNodes[v].outerText;
					  				  if (!isModfly)
					  				     isModfly=true;
					  				  j++;
							    }     	     		 	   	
	     		 	   	}		 	
	     		 	}
  	  	  
	  }	  	
	  	
  if (isModfly){
  	  return true;
  	}else {
  		return false;
  	}

}
/**
 *初始化页面数据
 */
function setValue(){
	  var inputTagNames = document.getElementsByTagName("input");
	  for (var i = 0; i<inputTagNames.length; i++){
	  		if(inputTagNames[i].type =="radio"){
	  	  	 for (var j=0;j<document.getElementsByName(inputTagNames[i].name).length;j++){	    	  		 
  	  		  	if(inputTagNames[i].fieldTitle==undefined){
  	  		  	  	alert("单选框『"+inputTagNames[i].name+"』第"+j+"个没有设置fieldTitle！");	  
  	  		  	  	break;	  		  	  
  	  		  	 }	  	  			  		
	  	  		   var inputValue =document.getElementsByName(inputTagNames[i].name)[j].valueTitle;
  	  		  	 if (inputValue==undefined){
  	  		  	  	alert("单选框『"+inputTagNames[i].name+"』第"+j+"个没有设置valueTitle！");	
  	  		  	  	break;	  	  		  	  	
  	  		  	 }
	  	  		   if (document.getElementsByName(inputTagNames[i].name)[j].checked){
	  	  		  		oldValue[inputTagNames[i].fieldTitle] = inputValue;  
	  	  		   }
	  	  	}	  	  
	  	  } else if(inputTagNames[i].type =="checkbox") {
			  		if(inputTagNames[i].fieldTitle==undefined){
			  	  	alert("复选框『"+inputTagNames[i].name+"』没有设置fieldTitle！");
			  	  	continue;
			  	  }	
			  		if(inputTagNames[i].valueTitle==undefined){
			  	  	alert("复选框『"+inputTagNames[i].name+"』没有设置valueTitle！");
			  	  	continue;
			  	  }
			  	  if (inputTagNames[i].checked){			  	  
					  	  if(oldValue[inputTagNames[i].fieldTitle]==undefined){
					  	  	  oldValue[inputTagNames[i].fieldTitle]="";
					  	  }else  {
					  	  	  oldValue[inputTagNames[i].fieldTitle]=oldValue[inputTagNames[i].fieldTitle]+",";
					  	  }  	  	
			  		    oldValue[inputTagNames[i].fieldTitle] = oldValue[inputTagNames[i].fieldTitle]+inputTagNames[i].valueTitle;  		
	  		    }
	  	  } else if(inputTagNames[i].type =="text") {
			  		if(inputTagNames[i].fieldTitle==undefined){
			  	  	alert("文本(text)『"+inputTagNames[i].name+"』没有设置fieldTitle！");
			  	  	continue;
			  	  }	  	  	
	  		   oldValue[inputTagNames[i].fieldTitle] = inputTagNames[i].value;  		
	  	  }
	  }
	  var textareaTagNames = document.getElementsByTagName("textarea");
	  for (var i = 0; i<textareaTagNames.length; i++){
	  		if (textareaTagNames[i].fieldTitle==undefined){
	  	  	 alert("文本域(textarea)『"+textareaTagNames[i].name+"』没有设置fieldTitle！");
	  	  	 continue;
	  	  }
	  	  oldValue[textareaTagNames[i].fieldTitle] = textareaTagNames[i].value;
	  }
	  //select控件
	  var selectTagNames = document.getElementsByTagName("select");
	  for (var i = 0; i<selectTagNames.length; i++){
	     		 for (var v=0;v<selectTagNames[i].childNodes.length;v++){
					  	 if (selectTagNames[i].fieldTitle==undefined){
					  	  	alert("SELECT『"+textareaTagNames[i].name+"』没有设置fieldTitle！");
					  	  	break;
					  	 }	     		 	
	     		 	   if (selectTagNames[i].childNodes[v].selected){
								  oldValue[selectTagNames[i].fieldTitle] = selectTagNames[i].childNodes[v].outerText; 
							 }    		 	
	     		 	}	  	
	  	  
	  }	
	    
}

/**
 *获得原来的值
 */
function getOldValue(p){
	
		var v = oldValue[updateName[p]];
		if (v==undefined){
			   v="";
		}
		return v;
}
/**
 *获得更改后的值
 */
function getUpdateValue(p){
	
		var v = updateValue[updateName[p]];
		if (v==undefined){
			   v="";
		}
		return v;
}

function getUpdateValues(){
	
		var str ="";
		for (var i=0;i<updateName.length;i++){
				if(i>0)
					str=str+"\n";
				str = str + updateName[i]+" 更改成："+getUpdateValue(i);
	 }
	 
	 return str;
}
