/*ʾ����
if (Is_Null(sForm.seamile)) {
    sForm.seamile.value = "0.000";
}

if (Is_Null(sForm.seamile, 1, "��������Ϊ�գ�")) {
	sForm.seamile.focus();
    sForm.seamile.select();
    return false;
}

if ( !is_numeric(sForm.bankday) ) {
    alert("����ʱ�ޱ���Ϊ������ֵ��");
	sForm.bankday.focus();
	sForm.seamile.select();
	return false;
}
*/
 // �ж��Ƿ��ǿ�
function Is_Null(field)
{
	Text=""+field.value;
	if(Text.length)
	{
		for(var i=0;i<Text.length;i++)
		if(Text.charAt(i)!=" ")
		break;
		if(i>=Text.length){
		    Ret=true;
		} else { 
		    Ret=false;
		}
	}
	else
		Ret=true;
	return(Ret);
}

function IsNull(field,crit,msg)
{
	Text=""+field.value;
	if(Text.length)
	{
		for(var i=0;i<Text.length;i++)
		if(Text.charAt(i)!=" ")
		break;
		if(i>=Text.length)
			Ret=true;
		else
			Ret=false;
	}
	else
		Ret=true;
	if (Ret)
		doMSG(field,crit,msg);  
	return(Ret);
}

//Trim����ȥ��һ�ַ������ߵĿո�
function Trim(his)
{
   //�ҵ��ַ�����ʼλ��
   Pos_Start = -1;
   for(var i=0;i<his.length;i++)
   {
     if(his.charAt(i)!=" ")
      {
         Pos_Start = i;
         break; 
      }
   }
   //�ҵ��ַ�������λ��
   Pos_End = -1;
   for(var i=his.length-1;i>=0;i--)
   {
     if(his.charAt(i)!=" ")
      {
         Pos_End = i; 
         break; 
      }
   }
   //���ص��ַ���
   Str_Return = ""
   if(Pos_Start!=-1 && Pos_End!=-1)
   {   
		for(var i=Pos_Start;i<=Pos_End;i++)
		{
			   Str_Return = Str_Return + his.charAt(i); 
		}
   }
   return Str_Return;
}  

// �ж��Ƿ�������
function is_int(field){
	var Ret = true;
	var NumStr="0123456789";
	var chr;
	
	for (i=0;i<field.length;++i)
	{
		chr=field.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			Ret=false;
		}
	}
    if (Number(field) > 2147483647) {
        Ret = false;
    }
	return(Ret);
}

// �ж��Ƿ�������
function is_date(field){

	var Ret = false;
	var mark1;
	var mark2;
	var month_n;
	var year_n;
	
	if(Trim(field.value)=="")
		return true;
		
	vDate1 = field.value.split("-");

	if (vDate1.length != 3) {
		return false;	    
	}

    if (vDate1[1].length == 1) {
        vDate1[1] = "0" + vDate1[1]
    }

    if (vDate1[2].length == 1) {
        vDate1[2] = "0" + vDate1[2]
    }

	 if (vDate1[0].length != 4) {
	     return false;
	 }
	 if (vDate1[1].length != 2) {
	     return false;
	 }
	 if (vDate1[2].length != 2) {
	     return false;
	 }
	 
	cd=new Date();

	if ( (mark1 = field.value.indexOf('-'))==-1)
		mark1=field.value.indexOf('-')
	if (mark1>-1)
	{
		if ( (mark2 = field.value.indexOf('-',mark1+1)) ==-1)
			mark2=field.value.indexOf('-',mark1+1);
		if ((mark2>-1)&&(mark2+1<field.value.length) )
		{
			year_n=field.value.substring(0,mark1);
			year = new var_to_obj(year_n);
			month_n=field.value.substring(mark1+1,mark2);
			month = new var_to_obj(month_n);
			day = new var_to_obj(field.value.substring(mark2+1,field.value.length));
			if ((is_greater(day,0))&&(is_less(day,32))&&(is_greater(month,0))&&(is_less(month,13))&&(is_greater(year,1900))&&(is_less(year,2500))){
			
			month_n = month_n.replace("0", " ");
			month_n = Trim(month_n);

			     	  switch(month_n){
			    		case "4":
			   		case "6":
			   		case "9":
			   		case "11":
			   			if(is_less(day,31))
			   			    Ret=true;
							
			   			break;		
			   				
			   		case "2":
			   			if((year_n%4==0 && year_n%100!=0)||(year_n%400==0)){
			   			    if(is_less(day,30))
			   			    	 Ret=true;
						}else{
						   if(is_less(day,29))
			   			    	 Ret=true;   		
						}			   			       			    
						 break;	
					default:
						Ret=true;
				  }  
			     }
		        
		}
	}
    return(Ret);
}

//IsEmpty�����ж�һ���ַ����Ƿ�Ϊ��
function IsEmpty(his)
{
   flag = true;
   for(var i=0;i<his.length;i++)
   {
      if(his.charAt(i)!=" ")
      { 
         flag = false; 
         break;
      }
   }
   return flag;
}

//IsDigital�����ж�һ���ַ����Ƿ�������(int or long)��� 
function isDigital(str)   
{
  for(ilen=0;ilen<str.length;ilen++)
  {
    if(str.charAt(ilen) < '0' || str.charAt(ilen) > '9' )
    {
       return false;
    }   
  }
  return true;
}
//IsFloat�����ж�һ���ַ����Ƿ�������(int or long or float)��� 
function IsFloat(str)   
{
  flag_Dec = 0
  for(ilen=0;ilen<str.length;ilen++)
  {
    if(str.charAt(ilen) == '.')
    {
       flag_Dec++;
	   if(flag_Dec > 1)
          return false;
       else
          continue;
    }         
    if(str.charAt(ilen) < '0' || str.charAt(ilen) > '9' )
    {
       return false;
    }   
  }
  return true;
}
//IsTelephone�����ж�һ���ַ����Ƿ������ֻ�'-','*'��� 
function IsTelephone(str) {
  for(ilen=0;ilen<str.length;ilen++)
  {
    if(str.charAt(ilen) < '0' || str.charAt(ilen) > '9' )
    {
	if((str.charAt(ilen)!='-')&&(str.charAt(ilen)!='*')&&(str.charAt(ilen)!='(')&&(str.charAt(ilen)!=')'))
        return false;
    }   
  }
  return true;
}

// The following added by liyin
// 2000-09-29
//is_IDCard�����ж�һ���ַ����Ƿ�������֤�ĳ������ƺ��������� 
function is_IDCard(str)   
{
  if((str.length!=15)&&(str.length!=18))
  	return false;
  for(ilen=0;ilen<str.length;ilen++)
  {
    if(str.charAt(ilen) < '0' || str.charAt(ilen) > '9' )
    {
	if((str.charAt(ilen)!='-')&&(str.charAt(ilen)!='*'))
        return false;
    }   
  }
  return true;
}

// ��һ������ת��Ϊ����
function var_to_obj(val)
{
	this.value=val;
}
// �ж��Ƿ����ĳ����
function is_greater(field,limit)
{
	var Ret = (is_numeric(field,-1) ) ? (field.value > parseInt(limit) )  : false;
	return(Ret);
}
// �ж��Ƿ�С��ĳ����
function is_less(field,limit)
{
	var Ret = (is_numeric(field,-1) ) ? (field.value < parseInt(limit) )  : false;
	return(Ret);
}

function is_numeric(field)
{
	var Ret = true;
	var NumStr="0123456789";
	var decUsed=false;
	var chr;
	if(field.value.length<1)
		return false;
    if (field.value == ".")
    {
        Ret = false;
    }
	for (i=0;i<field.value.length;++i)
	{
		chr=field.value.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			if ( (!decUsed) && chr==".")
			{
				decUsed=true;
			}
			else
			{
				Ret=false;
			}
		}
	}
	return(Ret);
} 
 // �ж��Ƿ��Ǽ۸�
function is_price(field)
{
	var Ret = true;
	var NumStr="0123456789";
	var decUsed=false;
	var chr;
    if (field.value == ".")
    {
        Ret = false;
    }
	for (i=0;i<field.value.length;++i)
	{
		chr=field.value.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			if ( (!decUsed) && chr==".")
			{
				decUsed=true;
			}
			else
			{
				Ret=false;
			}
		}
	}
	if(Ret)
	{
		if(decUsed&&(field.value.length-field.value.indexOf('.')<4))
		;
		else if(decUsed)
			Ret=false;
	}
	return(Ret);
} 

 // �ж��Ƿ��Ǽ۸�
function isPrice(field,crit,msg)
{
	var Ret = true;
	var NumStr="0123456789";
	var decUsed=false;
	var chr;
	var tempStr = field.value;
	if ( tempStr.charAt(0) == "-" )
	{ 
	    tempStr = field.value.substring(1);
	}
    if (tempStr == ".")
    {
        Ret=false;
    }
	for (i=0;i<tempStr.length;++i)
	{
		chr=tempStr.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			if ( (!decUsed) && chr==".")
			{
				decUsed=true;
			}
			else
			{
				Ret=false;
			}
		}
	}
	if(Ret)
	{
		if(decUsed&&(tempStr.length-tempStr.indexOf('.')<4)) {
		    if ((tempStr-1)>(99999999999.99-1)) {
                Ret=false;
			}
		} else if(decUsed) {
			Ret=false;
		} else if ((tempStr-1)>(99999999999.99-1)) {
		    Ret=false;
	    }
	}
	if (!Ret)
		doMSG(field,crit,msg);
	return(Ret);
} 
 // �ж��Ƿ�������
function isDecimal(field,crit,msg)
{
	var Ret = true;
	var NumStr="0123456789";
	var decUsed=false;
	var chr;
	var tempStr = field.value;
	if ( tempStr.charAt(0) == "-" )
	{ 
	    tempStr = tempStr.substring(1);
	}
    if (tempStr == ".")
    {
        Ret=false;
    }
	for (i=0;i<tempStr.length;++i)
	{
		chr=tempStr.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			if ( (!decUsed) && chr==".")
			{
				decUsed=true;
			}
			else
			{
				Ret=false;
			}
		}
	}
	if(Ret)
	{
		if(decUsed&&(tempStr.length-tempStr.indexOf('.')<5)) {
		    if( (tempStr-1+1) > (9999999999.999-1+1) ) {
                 Ret=false;
			}
		} else if(decUsed) {
			Ret=false;
		} else if( (tempStr-1+1) > (9999999999.999-1+1) ) 
		    Ret=false;
	}
	if (!Ret)
		doMSG(field,crit,msg);
	return(Ret);
} 

function is_decimal(field,crit,msg)
{
	var Ret = true;
	var NumStr="0123456789";
	var decUsed=false;
	var chr;
    if (field.value == ".")
    {
        Ret=false;
    }
	for (i=0;i<field.value.length;++i)
	{
		chr=field.value.charAt(i);
		if (NumStr.indexOf(chr,0)==-1)
		{
			if ( (!decUsed) && chr==".")
			{
				decUsed=true;
			}
			else
			{
				Ret=false;
			}
		}
	}
	if(Ret)
	{
		if(decUsed&&(field.value.length-field.value.indexOf('.')<5)) {
		    if( (field.value-1+1) > (9999999999.999-1+1) ) {
                 Ret=false;
			}
		} else if(decUsed) {
			Ret=false;
		} else if( (field.value-1+1) > (9999999999.999-1+1) ) 
		    Ret=false;
	}
	if (!Ret)
		doMSG(field,crit,msg);
	return(Ret);
} 



function doMSG(field,crit,msg)
{
	if ( (-1!=crit) )
	{
		alert(msg)
		if (crit==1)
		{
			field.focus();  // focus does not work on certain netscape versions
			field.select();
		}
	}
}
function IsSpace(field)
{
	var Text=""+field.value;
	if(Text.length)
	{
		for(var i=0;i<Text.length;i++)
			if(Text.charAt(i)!=" ")
				break;
		if(i>=Text.length)
			field.value="";
	}
}
 

  
// �ж��Ƿ�����Ч���ݱ�ѡ��
function IsSelected(field) {
    return (field.selectedIndex >= 0);
}

function isLoginIDCharacter(cCharacter) {

	var sFormat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    if (sFormat.indexOf(cCharacter, 0) == -1) {
	    return false;
    }
	return true;
}

function isLoginID(sValue) {
	if (sValue == null)	{
		return false;
	}
	
	for (var i=0;i<sValue.length;i++) {
		var cCharacter = sValue.charAt( i );
		if (isLoginIDCharacter(cCharacter) == false) {
			return false;
		}
	}
	
	return true;
}

// ����Ƿ����ַ�
// cCharacter������ֵ
function isCharacter( cCharacter )
{
	var sFormat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	
	if( sFormat.indexOf( cCharacter, 0 ) == -1 )
	{
		return false;
	}
	
	return true;
}

// ����Ƿ��������ַ�
// cCharacter������ֵ
function isDigitalCharacter( cCharacter )
{
	var sFormat = "0123456789";
	
	if( sFormat.indexOf( cCharacter, 0 ) == -1 )
	{
		return false;
	}
	
	return true;
}

// ����Ƿ����������������Ƶ��ַ�
// cCharacter������ֵ
function isOtherNameCharacter( cCharacter )
{
	var sFormat = "_";
	
	if( sFormat.indexOf( cCharacter, 0 ) == -1 )
	{
		return false;
	}
	
	return true;
}

// ����Ƿ��ǿ��������Ƶ��ַ�
// sValue������ֵ
function isNameCharacter( sValue ) {
/*
	if( sValue == null )
	{
		return false;
	}
	
	for( i = 0; i < sValue.length; i ++ )
	{
		var cCharacter = sValue.charAt( i );
		if( isCharacter( cCharacter ) == false && isOtherNameCharacter( cCharacter ) == false )
		{
			return false;
		}
	}
*/	
	return true;
}

// ����Ƿ�������ַ�������
// sValue������ֵ
function isCharacterAndDigital( sValue ) {

/*
	if( sValue == null )
	{
		return false;
	}
	
	for( i = 0; i < sValue.length; i ++ )
	{
		var cCharacter = sValue.charAt( i );
		if( isCharacter( cCharacter ) == false && isDigitalCharacter( cCharacter ) == false )
		{
			return false;
		}
	}
*/	
	return true;
}

function isCharacterAndDigitalAndSpaceCharacter(cCharacter) {
/*
	var sFormat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789  ";
    if (sFormat.indexOf(cCharacter, 0) == -1) {
	    return false;
    }
*/
	return true;
}

function isCharacterAndDigitalAndSpace(sValue) {

/*	
	if (sValue == null)	{
		return false;
	}
	
	for (var i=0;i<sValue.length;i++) {
		var cCharacter = sValue.charAt( i );
		if (isCharacterAndDigitalAndSpaceCharacter(cCharacter) == false) {
			return false;
		}
	}
*/	
	return true;
}

// ����Ƿ���Email
// sValue������ֵ���Ϸ���ʽΪa@b.c.d������ʽ
function isEmail( sValue ) {
	var iFirstIndex = 0;
	var iSecondIndex = sValue.indexOf( '@' );
	if( iSecondIndex == -1 )
	{
		return false;
	}
	return true;
}

// ����Ƿ����ʱ�
// sValue������ֵ���Ϸ���ʽΪ��λ����
function isZIP( sValue ) {
	if( sValue == null )
	{
		return false;
	}
	
	if( sValue.length != 6 )
	{
		return false;
	}
	else
	{
		for( i = 0; i < 6; i ++ )
		{
			if( isDigital( sValue.charAt( i ) ) == false )
			{
				return false;
			}
		}
	}
	return true;
} 

// ����Ƿ��������ַ���
// sValue������ֵ
function isDigitalString( sValue )
{
	if( sValue == null )
	{
		return false;
	}

	for( i = 0; i < sValue.length; i ++ )
	{
		if( isDigital( sValue.charAt( i ) ) == false )
		{
			return false;
		}
	}
}

//The following code is for input validate
//Code by James Wang
//2000-07-22
function doCritCode(item) {
	if (Trim(item[3])!="") window.alert(item[3]);	
	eval(item[1]).focus();
	eval(item[1]).select();  
}


// The following added by Zhenghao
// 2000-09-29
//���ж�һ���ַ��Ƿ���ASCIIֵ
//cValue������ֵ
function isASCII( cValue )
{
	var sFormat = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
	var iLocation = sFormat.indexOf( cValue );
	return( iLocation != -1 );
}

//��һ���ַ����еĺ��ּ�Ϊ2���ַ������������ݿ�����ȷ����
//sString�����������ַ���
function calcRealLength( sString )
{
	var iLength = 0;	// ��ʵ���ȼ�����
	for( i = 0; i < sString.length; i ++ )
	{
		if( isASCII( sString.charAt( i ) ) )
		{
			iLength += 1;
		}
		else
		{
			iLength += 2;
		}
	}
	
	return( iLength );
}


//�����ַ����ĳ��ȣ�Ӣ�ĺͺ�����ͬ�Դ�
//sString�����������ַ���
function calcLength(sString) {
	var iLength = 0;	// ���ȼ�����
	for( i = 0; i < sString.length; i ++ )	{
		iLength += 1;
	}
	
	return iLength;
}

//�жϳ����Ƿ�������ݿ�ĳ���Ҫ��
//iLimition����������
//field�������ֶ�����
//crit���Ƿ���ʾ��ʾ��Ϣ���ûؽ���
//msg����ʾ��Ϣ
function Is_InLengthLimit(iLimition,Fieldvalue)
{	  	
	if( calcRealLength( Fieldvalue ) > iLimition )
		return false;
	return true;
}

function Is_OverLength_ex(iLimition,field,crit,msg,type)
{
    Text = "" + field.value;
	if(type==0){
		if (calcRealLength( Text ) > iLimition  ){
			doMSG(field,crit,msg);  
			return true;
		}
	}else{
	    if ( calcLength( Text ) > iLimition  ){
	    doMSG(field,crit,msg);  
	    return true;
		}
	}
	return false;
}



function Is_InLengthMin(iLimition,Fieldvalue)
{	  	
	if( calcRealLength( Fieldvalue ) < iLimition )
		return false;
	return true;
}

//function Is_InLengthLimit(iLimition,Fieldvalue)
//{	  
//	alert( "Flag=" + isInLengthLimit( iLimition,Fieldvalue ) );
//}

//���ַ���ASCIIֵ�������ֵ���ַ�
//iFlag��1ʱ������ַ���ASCIIֵ��0ʱ�����ֵ��ASCII�ַ�
//cValue������ֵ
function asciiXvalue( iFlag, cValue )
{
	var sFormat = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
	if( iFlag == 1 )
	{
		var iLocation = sFormat.indexOf( cValue ) + 32;
		//document.write( "ASCII Value=" + iLocation );
		return iLocation;
	}
	else if( iFlag == 0 )
	{
		if( cValue > 126 || cValue < 32 )
		{
			document.write( "����ASCIIֵ������32��126֮�䣡" );
		}
		else
		{
			var cChar = sFormat.charAt( cValue - 32 );
			//document.write( "ASCII Code=" + cChar );
			return cChar;
		}
	}
	else
	{
		document.write( "�Ƿ�������" );
	}
}

//���ܽ���ת��
//iFlag��1ʱ������ַ���ASCIIֵ��0ʱ�����ֵ��ASCII�ַ�
//sSource������ֵ
function changePassword( iFlag, sSource )
{
	var sSourceFormat = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
	var sTargetFormat = " #$!\"'%&+,)*/0-.1423(58679:;<A?@B=>EFCJDHQGIPLMKUNTOWS[RZVXY\\]^_`abefciqdgomvhjkn~lzut{rpysx|w}";
	var sTarget = "";
	if( iFlag == 1 )
	{
		for( i = 0; i < sSource.length; i ++ )
		{
			sTarget += sTargetFormat.charAt( sSourceFormat.indexOf( sSource.charAt( i ) ) );
		}
		return sTarget;
	}
	else if( iFlag == 0 )
	{
		for( i = 0; i < sSource.length; i ++ )
		{
			sTarget += sSourceFormat.charAt( sTargetFormat.indexOf( sSource.charAt( i ) ) );
		}
		return sTarget;
	}
	else
	{
		document.write( "�Ƿ�������" );
	}
}

// Compare two date
// ���_Date2����_Date1������true
function _compareTwoDate(_Date1, _Date2) {
     vDate1 = _Date1.value.split("-")
	 vDate2 = _Date2.value.split("-")
	 
	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

     if (_Year1 > _Year2) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 > _Month2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 > _Day2)) {
	    return false
	 }

	 return true
}

function _compareTwoDate_ex(_Date1, _Hour1, _Min1, _Date2, _Hour2, _Min2) {
     vDate1 = _Date1.value.split("-")
	 vDate2 = _Date2.value.split("-")
	 
	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

     H1 = parseInt(_Hour1.value-0)
	 H2 = parseInt(_Hour2.value-0)
	 M1 = parseInt(_Min1.value-0)
     M2 = parseInt(_Min2.value-0)
	 
	 if (_Year1 > _Year2) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 > _Month2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 > _Day2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 == _Day2) && (H1>H2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 == _Day2) && (H1 == H2) && (M1>M2) ) {
	    return false
	 }

	 return true
}


function _compareTwoDateForString(_Date1, _Date2) {
     vDate1 = _Date1.split("-")
	 vDate2 = _Date2.split("-")
	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

     if (_Year1 > _Year2) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 > _Month2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 > _Day2)) {
	    return false
	 }

	 return true
}

// get current date
function _getCurrentDate() {
     _newDate = new Date()
	 _Year = _newDate.getYear()
	 _Month = 1 + _newDate.getMonth()
	 _Day = _newDate.getDate()

	 if (_Month.toString().length == 1) {
	     _Month = "0" + _Month;
     }

	 if (_Day.toString().length == 1) {
	     _Day = "0" + _Day;
	 }

	 _sDate = _Year + "-" + _Month + "-" + _Day
	 return _sDate
     }

// compare date with current date
function _biggerThanToday(_Date2) {
     vDate1 = _getCurrentDate().split("-")
	 vDate2 = _Date2.value.split("-")
	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

		alert(_Date2.value);
		alert(_getCurrentDate());
	
         if (_Year1 > _Year2) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 > _Month2)) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 == _Month2) && (_Day1 >= _Day2)) {
	    return false
	 }

	 return true

}

// compare date with current year&&month
function _biggerThanTodayMonth(_Date2) {
     vDate1 = _getCurrentDate().split("-")
	 vDate2 = _Date2.value.split("-")

	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

         if (_Year1 > _Year2) {
	    return false
	 }

	 if ((_Year1 == _Year2) && (_Month1 > _Month2)) {
	    return false
	 }

     return true

}

function _getDate(periodType, year, period) {

	var dates = new Array(_getCurrentDate(), _getCurrentDate());

	// Validate
	if (periodType != 0 && periodType != 1) {
		// Error period type
		alert("Error period type.\nPeriod type(0-1):" + periodType);
		return dates;
	}

	var intYear = 2000;
	if (isNaN(year) == true) {
		alert("Invalid year.\nYear:" + year);
		return dates;
	}
	intYear = parseInt(year);
	if (intYear < 1900 || intYear > 2100) {
		alert("Invalid year.\nYear(1900-2100):" + year);
		return dates;
	}

	var intPeriod = 1;
	if (isNaN(period) == true) {
	    alert("Invalid period.\nPeriod:" + period);
		return dates;
    }
	intPeriod = parseInt(period);
	if (periodType == 0) {
		// Season
		if (intPeriod < 1 || intPeriod > 4) {
			alert("Invalid season.\nSeason(1-4):" + period);
			return dates;
		}
	} else {
		// Month
		if (intPeriod < 1 || intPeriod > 12) {
			alert("Invalid month.\nMonth(1-12):" + period);
			return dates;
		}
	}

	if (periodType == 0) {
		// Season
		switch (intPeriod) {
			case 1 :
				dates[0] = year + "-1-1";
				dates[1] = year + "-3-31";
				break;
			case 2 :
				dates[0] = year + "-4-1";
				dates[1] = year + "-6-30";
				break;
			case 3 :
				dates[0] = year + "-7-1";
				dates[1] = year + "-9-30";
				break;
			case 4 :
				dates[0] = year + "-10-1";
				dates[1] = year + "-12-31";
				break;
		}
	} else {
		// Month
		switch (intPeriod) {
			case 1 :
				dates[0] = year + "-1-1";
				dates[1] = year + "-1-31";
				break;
			case 2 :
				dates[0] = year + "-2-1";
				if ((intYear % 400 == 0) || ((intYear % 4 == 0) && (intYear % 100 != 0))) {
					dates[1] = year + "-2-29";
				} else {
					dates[1] = year + "-2-28";
				}
				break;
			case 3 :
				dates[0] = year + "-3-1";
				dates[1] = year + "-3-31";
				break;
			case 4 :
				dates[0] = year + "-4-1";
				dates[1] = year + "-4-30";
				break;
			case 5 :
				dates[0] = year + "-5-1";
				dates[1] = year + "-5-31";
				break;
			case 6 :
				dates[0] = year + "-6-1";
				dates[1] = year + "-6-30";
				break;
			case 7 :
				dates[0] = year + "-7-1";
				dates[1] = year + "-7-31";
				break;
			case 8 :
				dates[0] = year + "-8-1";
				dates[1] = year + "-8-31";
				break;
			case 9 :
				dates[0] = year + "-9-1";
				dates[1] = year + "-9-30";
				break;
			case 10 :
				dates[0] = year + "-10-1";
				dates[1] = year + "-10-31";
				break;
			case 11 :
				dates[0] = year + "-11-1";
				dates[1] = year + "-11-30";
				break;
			case 12 :
				dates[0] = year + "-12-1";
				dates[1] = year + "-12-31";
				break;
		}
	}

	// Return
	return dates;
}

function _getFinanceDate(financeDay, periodType, year, period) {

	var dates = new Array(_getCurrentDate(), _getCurrentDate());

	// Validate
	if (financeDay < 0 || financeDay > 28) {
		// Error finance type
		alert("Error finance day.\nFinance type(0-28):" + financeDay);
		return dates;
	}

	if (periodType != 0 && periodType != 1) {
		// Error period type
		alert("Error period type.\nPeriod type(0-1):" + periodType);
		return dates;
	}

	var intYear = 2000;
	if (isNaN(year) == true) {
	    alert("Invalid year.\nYear:" + year);
		return dates;
	}
	intYear = parseInt(year);
	if (intYear < 1900 || intYear > 2100) {
	    alert("Invalid year.\nYear(1900-2100):" + year);
		return dates;
	}

	var intPeriod = 1;
	if (isNaN(period) == true) {
	    alert("Invalid period.\nPeriod:" + period);
		return dates;
	}
	intPeriod = parseInt(period);
	if (periodType == 0) {
		// Season
		if (intPeriod < 1 || intPeriod > 4) {
		    alert("Invalid season.\nSeason(1-4):" + period);
			return dates;
		}
	} else {
		// Month
		if (intPeriod < 1 || intPeriod > 12) {
		    alert("Invalid month.\nMonth(1-12):" + period);
			return dates;
		}
	}

	if (financeDay == 0) {
		return _getDate(periodType, year, period);
	}

	if (periodType == 0) {
		// Season
		switch (intPeriod) {
			case 1 :
				dates[0] = year + "-1-1";
				dates[1] = year + "-3-" + financeDay;
				break;
			case 2 :
				dates[0] = year + "-3-" + (financeDay + 1);
				dates[1] = year + "-6-" + financeDay;
				break;
			case 3 :
				dates[0] = year + "-6-" + (financeDay + 1);
				dates[1] = year + "-9-" + financeDay;
				break;
			case 4 :
				dates[0] = year + "-9-" + (financeDay + 1);
				dates[1] = year + "-12-31";
				break;
		}
	} else {
		// Month
		switch (intPeriod) {
			case 1 :
				dates[0] = year + "-1-1";
				dates[1] = year + "-1-" + financeDay;
				break;
			case 2 :
				dates[0] = year + "-1-" + (financeDay + 1);
				dates[1] = year + "-2-" + financeDay;
				break;
			case 3 :
				if (((intYear % 400 == 0) || ((intYear % 4 == 0) && (intYear % 100 != 0)))
					&& (financeDay == 28)) {
					dates[0] = year + "-2-" + (financeDay + 1);
				} else {
					dates[0] = year + "-3-1";
				}
				dates[1] = year + "-3-" + financeDay;
				break;
			case 4 :
				dates[0] = year + "-3-" + (financeDay + 1);
				dates[1] = year + "-4-" + financeDay;
				break;
			case 5 :
				dates[0] = year + "-4-" + (financeDay + 1);
				dates[1] = year + "-5-" + financeDay;
				break;
			case 6 :
				dates[0] = year + "-5-" + (financeDay + 1);
				dates[1] = year + "-6-" + financeDay;
				break;
			case 7 :
				dates[0] = year + "-6-" + (financeDay + 1);
				dates[1] = year + "-7-" + financeDay;
				break;
			case 8 :
				dates[0] = year + "-7-" + (financeDay + 1);
				dates[1] = year + "-8-" + financeDay;
				break;
			case 9 :
				dates[0] = year + "-8-" + (financeDay + 1);
				dates[1] = year + "-9-" + financeDay;
				break;
			case 10 :
				dates[0] = year + "-9-" + (financeDay + 1);
				dates[1] = year + "-10-" + financeDay;
				break;
			case 11 :
				dates[0] = year + "-10-" + (financeDay + 1);
				dates[1] = year + "-11-" + financeDay;
				break;
			case 12 :
				dates[0] = year + "-11-" + (financeDay + 1);
				dates[1] = year + "-12-31";
				break;
		}
	}

	// Return
	return dates;
}


function _formatNumber(myField){
    if ( myField.value != "") {
    	if ( myField.value.indexOf(".") == -1) {
    	    myField.value = myField.value + ".000";	
    	} else if ( (myField.value.length-myField.value.indexOf("."))<4 )  {
    	    for (var i=0;i<4-(myField.value.length-myField.value.indexOf("."));i++) {
    	    	alert(i);
    	    	myField.value += "0";
    	    }    	
    	}
    }
}
	
function _compareDate(sDate1, sDate2) {

     var vDate1 = sDate1.split("-")
	 var vDate2 = sDate2.split("-")
	 
	 _Year1 = parseInt(vDate1[0]-0)
	 _Month1 = parseInt(vDate1[1]-0)
	 _Day1 = parseInt(vDate1[2]-0)

	 _Year2 = parseInt(vDate2[0]-0)
	 _Month2 = parseInt(vDate2[1]-0)
	 _Day2 = parseInt(vDate2[2]-0)

	var date1 = new Date(_Year1, _Month1, _Day1);
	var date2 = new Date(_Year2, _Month2, _Day2);

	var dif = 0;

	var lDate2 = date2.getTime();
	var lDate1 = date1.getTime();

	dif = (lDate2 - lDate1) / 1000 / 60 / 60 / 24;

	return dif;
}

/**
 * Format number
 * parameter:
 *     _express: double
 *     iSize:    int
 *
 * _changeNumber(12.3456, 3) = 12.346
 */
function _changeNumber(_express, iSize) {
	_express = _express - 1 + 1;
	iSize = iSize - 1 + 1;
	
	iKey1 = Math.pow(10, 10);
	dTemp = Math.round(_express * iKey1);
	sTemp = "" + dTemp;
	iEndNum = sTemp.substring(sTemp.length - 1, sTemp.length) - 1 + 1
	if (iEndNum = 9) {
		dTemp = dTemp + 1;
	} else {
		dTemp = dTemp + 2;
	}
	
	dTemp = dTemp / iKey1;

	iKey = Math.pow(10, iSize);
	dTemp = Math.round(dTemp * iKey);
	
	return dTemp / iKey;
}

//format float data as:*****.**
//decplaces:С��λ��
function FloatFormat(expr,decplaces) {

	// judge if it is a valid number
	if (isNaN(expr)) {
		alert("Invalid number:" + expr);
		return 0;
	}

	// change to number
	nExpr = Number(expr);

	// multiple
	nExpr = nExpr * Math.pow(10, decplaces);

	// round
	nExpr = Math.round(nExpr);

	// division
	nExpr = nExpr / Math.pow(10, decplaces);

	var sExpr = nExpr.toString();

	// decimal point location
	var pointIndex = sExpr.indexOf('.');

	// patch zero
	var loop;
	if (pointIndex == -1) {
		sExpr = sExpr + ".";
		loop = decplaces - 1;
	} else {
		loop = decplaces - (sExpr.length - pointIndex);
	}
	for (var i=0;i<=loop;i++)	{
		sExpr = sExpr + "0";
	}

	// return
	return sExpr;
}

//��ʽ����ѯʱ��
function getFormatTime(iYear, sTime, iKey) {
    //iYear---2001
    //sTime---1,2,3,4
	//iKey---1:����;2:�·�

	var _str = null;
    var aTime = new Array();
	var iFlag = true;
	aTime = sTime.split(",")

	if (aTime.length < 2) {
	    iFlag = false;
	} else {
		for (i = 0; i < aTime.length - 1; i++) {
			 iPre = aTime[i] - 1 + 1;
			 iLast = aTime[i + 1] - 1 + 1;
			 if (iLast - iPre != 1) {
				 iFlag = false;
				 break;
			 }
		}
	}
	if (iFlag == true){
	    _str = iYear + "��" + aTime[0] + "-" + aTime[aTime.length - 1];
	} else {
	    _str = iYear + "��" + sTime;
	}

	if (iKey == 1) {
	    _str = _str + "����";
	} else {
	    _str = _str + "��";
	}

	return _str;
}

function html2text(htmlValue) {
	var tt = new Option("", "");
	tt.innerHTML = htmlValue;
	return tt.innerText;
}

// ��ӡ
// Ҫ��ӡ��ҳ����Ҫ����һ�����֣�����head��
// <OBJECT id=WebBrowser classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 height=0 width=0></OBJECT>
function doPrint() {
	// ȥ��ҳü��ҳ��
    pagesetup_null();
    document.all.WebBrowser.ExecWB(6,6);
}

//������ҳ��ӡ��ҳüҳ��Ϊ��
function pagesetup_null() {
	var hkey_root,hkey_path,hkey_key
	hkey_root="HKEY_CURRENT_USER"
	hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\"
	try {
		var RegWsh = new ActiveXObject("WScript.Shell")
	    hkey_key="header"    
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"")
	    hkey_key="footer"
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"")
	}catch(e) {
	}
}

//������ҳ��ӡ��ҳüҳ��ΪĬ��ֵ
function pagesetup_default(){
	var hkey_root,hkey_path,hkey_key
	hkey_root="HKEY_CURRENT_USER"
	hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\"
	try {
		var RegWsh = new ActiveXObject("WScript.Shell")
		hkey_key="header"    
		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&w&bҳ�룬&p/&P")
		hkey_key="footer"
	    RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&u&b&d")
	} catch(e){
	}
}
// ��ҳ�浼���Excel
 function exportPageToExcel(but)
{
	but.blur();
	document.execCommand('selectAll');
	document.execCommand('copy');
	document.execCommand('unselect');
	var oExcel = new ActiveXObject("Excel.Application");
	var oBook = oExcel.Workbooks.Add;
	var oSheet = oBook.Worksheets(1);
	oSheet.Paste();
    	oSheet.Shapes("Picture 1").Select();
    	oExcel.Selection.Delete;
	oExcel.Visible = true;
	oExcel.UserControl = true;
   
}
// ��������Excel
function exportToExcel(TableId) {
	var oExcel = new ActiveXObject("Excel.Application");
	var oBook = oExcel.Workbooks.Add;
	var oSheet = oBook.Worksheets(1);
	var rows = 1,cols = 1;
	var i = 0,j = 0,k = 0,m = 0;
	var rowspans = new Array(100);
	var rowitems = new Array(100);
	var colspans = new Array(100);
	var colitems = new Array(100);
	
	//oSheet.Cells.NumberFormatLocal = "@";
		
	for (var y=0;y<TableId.rows.length;y++)
	// detailsTable is the table where the content to be exported is
	{	
	
		for (var x=0;x<TableId.rows(y).cells.length;x++)
		{
				for(ii=0;ii<m;ii++){
					if(x==rowspans[ii]){
						oSheet.Cells(j+1,i+1) = '';
						rowitems[ii] = rowitems[ii] - 1;
						var sm1 = oSheet.Cells(j,i+1);
						var sm2 = oSheet.Cells(j+1,i+1);
						oSheet.Range(sm1,sm2).Select
						oExcel.Selection.VerticalAlignment = 1;
						oExcel.Selection.MergeCells = true;
						i++;
					}
				}
				for(ii=0;ii<k;ii++){
					if(y==colspans[ii]){
						//var sm1 = j+1+":"+i;
						var sm1 = oSheet.Cells(j+1,i);
						while(colitems[ii] > 1){
							oSheet.Cells(j+1,i+1) = '';
							i++;
							colitems[ii] = colitems[ii] - 1;
						}
						var sm2 = oSheet.Cells(j+1,i);
						oSheet.Range(sm1,sm2).Select
						oExcel.Selection.MergeCells = true;
					}
				}
				cols = TableId.rows(y).cells(x).colSpan;
				rows = TableId.rows(y).cells(x).rowSpan;
				if(cols > 1){
					colspans[k] = y;
					colitems[k] = cols;	
					k++;        	
				}
				if(rows > 1){
					rowspans[m] = x;
					rowitems[m] = rows;	
					m++;        	
				}	        
			oSheet.Cells(j+1,i+1) = TableId.rows(y).cells(x).innerText;		
			i ++;
		}
		i = 0;
		j ++;
	}
	oExcel.Visible = true;
	oExcel.UserControl = true;
}
//�������񵹵�excel
function exportMutilToExcel(TableIds)
{
	var oExcel = new ActiveXObject("Excel.Application");
	var oBook = oExcel.Workbooks.Add;
	var oSheet = oBook.Worksheets(1);
	var rows = 1,cols = 1;
	var i = 0,j = 0,k = 0,m = 0;
	var rowspans = new Array(100);
	var rowitems = new Array(100);
	var colspans = new Array(100);
	var colitems = new Array(100);
	var newTableId = new Array(1);
	if( isNaN(TableIds.length)){
		newTableId[0] = TableIds;
	}else{
		newTableId = new Array(TableIds.length);
		newTableId = TableIds;
	}
	for(var num=0;num<newTableId.length;num++){
		TableId = newTableId[num];
		
		
		rowspans = new Array(100);
		rowitems = new Array(100);
		colspans = new Array(100);
		colitems = new Array(100);
		for (var y=0;y<TableId.rows.length;y++)
		// detailsTable is the table where the content to be exported is
		{	
		
			for (var x=0;x<TableId.rows(y).cells.length;x++)
			{
					for(ii=0;ii<m;ii++){
						if(x==rowspans[ii]){
							oSheet.Cells(j+1,i+1) = '';
							rowitems[ii] = rowitems[ii] - 1;
							var sm1 = oSheet.Cells(j,i+1);
							var sm2 = oSheet.Cells(j+1,i+1);
							oSheet.Range(sm1,sm2).Select
							oExcel.Selection.VerticalAlignment = 1;
							oExcel.Selection.MergeCells = true;
							i++;
						}
					}
					for(ii=0;ii<k;ii++){
						if(y==colspans[ii]){
							//var sm1 = j+1+":"+i;
							var sm1 = oSheet.Cells(j+1,i);
							while(colitems[ii] > 1){
								oSheet.Cells(j+1,i+1) = '';
								i++;
								colitems[ii] = colitems[ii] - 1;
							}
							var sm2 = oSheet.Cells(j+1,i);
							oSheet.Range(sm1,sm2).Select
							oExcel.Selection.MergeCells = true;
						}
					}
					cols = TableId.rows(y).cells(x).colSpan;
					rows = TableId.rows(y).cells(x).rowSpan;
					if(cols > 1){
						colspans[k] = y;
						colitems[k] = cols;	
						k++;        	
					}
					if(rows > 1){
						rowspans[m] = x;
						rowitems[m] = rows;	
						m++;        	
					}	        
				oSheet.Cells(j+1,i+1) = TableId.rows(y).cells(x).innerText;		
				i ++;
			}
			i = 0;
			j ++;
		}
	}
	oExcel.Visible = true;
	oExcel.UserControl = true;
}


function exportToExcel(TableId,title1,title2,footer) {
	var oExcel = new ActiveXObject("Excel.Application");
	var oBook = oExcel.Workbooks.Add;
	var oSheet = oBook.Worksheets(1);
	var rows = 1,cols = 1;
	var i = 0,j = 0,k = 0,m = 0;
	var rowspans = new Array(100);
	var rowitems = new Array(100);
	var colspans = new Array(100);
	var colitems = new Array(100);
	
	for (var y=0;y<TableId.rows.length;y++)
	// detailsTable is the table where the content to be exported is
	{	
	
		for (var x=0;x<TableId.rows(y).cells.length;x++)
		{
				for(ii=0;ii<m;ii++){
					if(x==rowspans[ii]){
						oSheet.Cells(j+1,i+1) = '';
						rowitems[ii] = rowitems[ii] - 1;
						var sm1 = oSheet.Cells(j,i+1);
						var sm2 = oSheet.Cells(j+1,i+1);
						oSheet.Range(sm1,sm2).Select
						oExcel.Selection.VerticalAlignment = 1;
						oExcel.Selection.MergeCells = true;
						i++;
					}
				}
				for(ii=0;ii<k;ii++){
					if(y==colspans[ii]){
						//var sm1 = j+1+":"+i;
						var sm1 = oSheet.Cells(j+1,i);
						while(colitems[ii] > 1){
							oSheet.Cells(j+1,i+1) = '';
							i++;
							colitems[ii] = colitems[ii] - 1;
						}
						var sm2 = oSheet.Cells(j+1,i);
						oSheet.Range(sm1,sm2).Select
						oExcel.Selection.MergeCells = true;
					}
				}
				cols = TableId.rows(y).cells(x).colSpan;
				rows = TableId.rows(y).cells(x).rowSpan;
				if(cols > 1){
					colspans[k] = y;
					colitems[k] = cols;	
					k++;        	
				}
				if(rows > 1){
					rowspans[m] = x;
					rowitems[m] = rows;	
					m++;        	
				}	        
			oSheet.Cells(j+1,i+1) = TableId.rows(y).cells(x).innerText;		
			i ++;
		}
		i = 0;
		j ++;
	}
	oExcel.Visible = true;
	oExcel.UserControl = true;
}

// �������js�ַ�����ת�崦��
// �磬��'ת����\'
function escapeJSSpecialChar(_in) {
	if (_in == null || _in == "") {
		return "";
	}

	var sc = new Array();
	sc[sc.length] = "\\"; // "\\"������ڵ�һ��
	sc[sc.length] = "\'";
	sc[sc.length] = "\"";

	for (var i = 0; i < sc.length; i++) { // ѭ����ι��˲�ͬ�������ַ�
		var ret = new String("");
		for (var j = 0; j < _in.length; j++) {
			if (_in.charAt(j) == sc[i]) {
				ret += "\\";
			}
			ret += _in.charAt(j);
		}
		_in = ret; // ��һ�ι��˵������Ϊ�´ι��˵�����
	}

	return ret;
}
//formid��ʾ:���form�ǵڼ���form����form���� from��ʾ:������ѡ����Ŀ��select��������
//to��ʾ:�г���ѡ����Ŀ��select�������� limit��ʾ:����ѡ��ֵ,NotremoveFrom�Ƿ�ɾ��from��
//��ֵ,NotAddTo����ֵ�ӵ�to��
//��ѡ��Ԫ�ص�textname��������
function copyToList(formid,from,to,limit,NotRemoveFrom,NotAddTo)
{

	fromList = eval('document.forms[' + formid + '].' + from);
	toList = eval('document.forms[' + formid + '].' + to);
//	if(toList.options.length > 0 && toList.options[0].value == '0')
//	{
//		toList.options.length = 0;
//	}
	var sel = false;
	for (i=0;i<fromList.options.length;i++)
	{
		var current = fromList.options[i];
		if(current.selected)
		{
			sel = true;
			if(current.value == '0' || current.value == limit)
			{
				alert (current.text+"����ѡ��");
//				return;
			}
			else
			{
				txt = current.text;
				val = current.value;
        addFlag = true;
        for(m=0;m<toList.options.length;m++)
        {
          if(txt == toList.options[m].text)
          {
            addFlag = false;
            break;
          }
        }
        if(addFlag)
  				if(!NotAddTo) toList.options[toList.length] = new Option(txt,val);
  				if(!NotRemoveFrom){
  					fromList.options[i] = null;
					i--;
				}
			}
		}
	}
	if(!sel) alert ('��ѡ�����Ԫ�أ�');
}
//���ǵ��û������ύ��ťʱ�����г�ѡ���select����ִ��ȫѡ�������õݽ����ĺ�̨������ȡ���������
//formid��ʾ:form����; item��ʾ:selectԪ������; pro��ʾ:���ص��ַ���ֵ����Դvalue��text;
function allSelect(formid,item,pro,sign)
{
	List = eval('document.forms[' + formid + '].' + item);
	str = "";
	for (i=0;i<List.length;i++)
	{
		if(List.options[i].value!=0)
		{
			List.options[i].selected = true;
			str += sign + eval('List.options[i].' + pro) + sign + ',';
		}
		else
		{
			List.options[i].selected = false;
		}
	}
	if(str.length > 0)
		str = str.substring(0,str.length-1);
	return str;
}
/*
//selectNameΪ�����б��������document.frm.sex,selectedValueΪ��ѡ�е�ֵ
//�÷���Ӧ������֪�б����ѡ�е�ֵ,�������б�򲢽���ѡ��
function selected(selectName,selectedValue)
{
    List = selectName;
    //List = eval('document.forms[' + formName + '].' + selectName);

	for (i=0;i<List.length;i++)
	{
		if(List.options[i].value==selectedValue)
		{
			List.options[i].selected = true;
		}
		else
		{
			List.options[i].selected = false;
		}
	}
}
*/
//����Ȩ����������Ȩ����
//Ro_person����id����id�á�;������
//����ҳ���е�Ȩ�����鴫����ҳ��,��ҳ��ֱ�ӵ�������������ܵõ�Ȩ������
//0:personid;1:��������
function selectRight(personId){
    selectRightByCustomize(personId,"acceptRightCode","0");
}
//ֻѡ��һ���˵����
function selectOnlyOneRight(personId,funName){
    if (""==funName)
        funName="acceptRightCode";
    selectRightByCustomize(personId,funName,"1");
}
function selectRightByCustomize(personId,funName,isOnlyOne){
    //personid����Ϊ��
    //�����Ϊ�գ�������";"��β�����ұ���ȫ��Ϊ����
    if (""!=personId){
        var lastChar=personId.substring(personId.length-1);
        if ( ";"!=lastChar){
            alert("personId������\";\"��β");
            return false;
        }

        var id=personId.split(";");
        for (var i=0;i<id.length;i++){
            if (!is_int(id[i])){
                alert("personId�ַ����б���ȫΪ����:"+id[i]+"����");
                return false;
            }
        }
    }

    window.open("/action/pub/selectright/EnterSelectRightController?personId="+personId+"&funName="+funName+"&isOnlyOne="+isOnlyOne,"Ȩ���б�","height=410,width=800,top=50,left=100,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no");
}
function selectOrg(orgId,isOnlyOne){
    selectOrgByCustomize(orgId,isOnlyOne,"acceptOrgCode");
}
function selectOrgByCustomize(orgId,isOnlyOne,funName){
    //orgId����Ϊ��
    //�����Ϊ�գ�������";"��β�����ұ���ȫ��Ϊ����
    if (""==isOnlyOne)
        isOnlyOne=0;
    if (""!=orgId){
        var lastChar=orgId.substring(orgId.length-1);
        if ( ";"!=lastChar){
            alert("orgId������\";\"��β");
            return false;
        }

        var id=orgId.split(";");
        for (var i=0;i<id.length;i++){
            if (!is_int(id[i])){
                alert("orgId�ַ����б���ȫΪ����:\""+id[i]+"\"����");
                return false;
            }
        }
    }

    window.open("/action/pub/selectright/EnterSelectOrgController?orgId="+orgId+"&isOnlyOne="+isOnlyOne+"&funName="+funName,"Ȩ���б�","height=350,width=600,top=50,left=100,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no");
}
//�������в�ֳ�Сʱ�ͷ���,�����ʱ���ʽΪ"yyyy-MM-dd hh:mm:ss"
var date;
var hour;
var minute;
function getDate(dd){
    if (!getFromDate(dd))
        return "";
    else
        return date;
}
function getHour(date){
    if (!getFromDate(date))
        return 0;
    else
        return parseInt(hour,10);
}
function getMinute(date){
    if (!getFromDate(date))
        return 0;
    else
        return parseInt(minute,10);
}
function getFromDate(dd){
    if (""==dd)
        return false;
    if (dd.length<=10)
        return false;
    if (dd.length>=19){
        date=dd.substring(0,10);
        hour=dd.substring(11,13);
        minute=dd.substring(14,16);
        return true;
    }else
        return false;
}

function _formatForm(){
	//��select���滻���ı�
	var es = document.all.tags("select");
	var n = es.length;
	for (var i=n-1; i >= 0; i--) {
		var e = es[i];
		e.outerHTML = e.options[e.selectedIndex].text;
	}

	es = document.all.tags("input");
	n = es.length;
	for (var i=n-1; i >= 0; i--) {
		var e = es[i];
		if(e.type == "text")
		  e.outerHTML = e.value;
	}
	
	es = document.all.tags("textarea");
	n = es.length;
	for (var i=n-1; i >= 0; i--) {
		var e = es[i];
		e.outerHTML = e.innerText;
	}
}

	//����Ƿ���radio��ѡ�� field:form1.appid
	function IsChecked(field,msg)
	{
		   l = field.length;
		   if(l==undefined){
		 if(!field.checked){
		  alert(msg);
		  return false
		 }
		 else{
		  return true
		 }
		   }
		   else{
			 flag=0;
			 for(i=0;i<l;i++){
		   if(field[i].checked==true){
		   flag++;
		   }
			 }

			 if(flag==0){
		   alert(msg);
		   return false
			 }
			 else{
		   return true
			 }
		   }
	}
