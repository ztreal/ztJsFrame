var oldValue = new Array();//ԭ����ֵ
var updateValue;//�����ֶζ�Ӧֵ
var updateName; //�����ֶ�����
/*
 *�ж��Ƿ�ҳ�������Ƿ����
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
	  //select�ؼ�
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
 *��ʼ��ҳ������
 */
function setValue(){
	  var inputTagNames = document.getElementsByTagName("input");
	  for (var i = 0; i<inputTagNames.length; i++){
	  		if(inputTagNames[i].type =="radio"){
	  	  	 for (var j=0;j<document.getElementsByName(inputTagNames[i].name).length;j++){	    	  		 
  	  		  	if(inputTagNames[i].fieldTitle==undefined){
  	  		  	  	alert("��ѡ��"+inputTagNames[i].name+"����"+j+"��û������fieldTitle��");	  
  	  		  	  	break;	  		  	  
  	  		  	 }	  	  			  		
	  	  		   var inputValue =document.getElementsByName(inputTagNames[i].name)[j].valueTitle;
  	  		  	 if (inputValue==undefined){
  	  		  	  	alert("��ѡ��"+inputTagNames[i].name+"����"+j+"��û������valueTitle��");	
  	  		  	  	break;	  	  		  	  	
  	  		  	 }
	  	  		   if (document.getElementsByName(inputTagNames[i].name)[j].checked){
	  	  		  		oldValue[inputTagNames[i].fieldTitle] = inputValue;  
	  	  		   }
	  	  	}	  	  
	  	  } else if(inputTagNames[i].type =="checkbox") {
			  		if(inputTagNames[i].fieldTitle==undefined){
			  	  	alert("��ѡ��"+inputTagNames[i].name+"��û������fieldTitle��");
			  	  	continue;
			  	  }	
			  		if(inputTagNames[i].valueTitle==undefined){
			  	  	alert("��ѡ��"+inputTagNames[i].name+"��û������valueTitle��");
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
			  	  	alert("�ı�(text)��"+inputTagNames[i].name+"��û������fieldTitle��");
			  	  	continue;
			  	  }	  	  	
	  		   oldValue[inputTagNames[i].fieldTitle] = inputTagNames[i].value;  		
	  	  }
	  }
	  var textareaTagNames = document.getElementsByTagName("textarea");
	  for (var i = 0; i<textareaTagNames.length; i++){
	  		if (textareaTagNames[i].fieldTitle==undefined){
	  	  	 alert("�ı���(textarea)��"+textareaTagNames[i].name+"��û������fieldTitle��");
	  	  	 continue;
	  	  }
	  	  oldValue[textareaTagNames[i].fieldTitle] = textareaTagNames[i].value;
	  }
	  //select�ؼ�
	  var selectTagNames = document.getElementsByTagName("select");
	  for (var i = 0; i<selectTagNames.length; i++){
	     		 for (var v=0;v<selectTagNames[i].childNodes.length;v++){
					  	 if (selectTagNames[i].fieldTitle==undefined){
					  	  	alert("SELECT��"+textareaTagNames[i].name+"��û������fieldTitle��");
					  	  	break;
					  	 }	     		 	
	     		 	   if (selectTagNames[i].childNodes[v].selected){
								  oldValue[selectTagNames[i].fieldTitle] = selectTagNames[i].childNodes[v].outerText; 
							 }    		 	
	     		 	}	  	
	  	  
	  }	
	    
}

/**
 *���ԭ����ֵ
 */
function getOldValue(p){
	
		var v = oldValue[updateName[p]];
		if (v==undefined){
			   v="";
		}
		return v;
}
/**
 *��ø��ĺ��ֵ
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
				str = str + updateName[i]+" ���ĳɣ�"+getUpdateValue(i);
	 }
	 
	 return str;
}
