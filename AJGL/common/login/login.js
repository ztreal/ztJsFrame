function G(id){
    return document.getElementById(id);
};
function GC(t){
   return document.createElement(t);
};
String.prototype.trim = function(){
          return this.replace(/(^\s*)|(\s*$)/g, '');
};
function isIE(){
      return (document.all && window.ActiveXObject && !window.opera) ? true : false;
} 
     var loginDivWidth = 300;
var sign_in_flow = '<div style="background:#FF9900;">Login</div><div>e-mail:*</div><div>'
       + '<input type="text" id="sign_email" maxlength="64" size="30"/>'
       + '</div><div>password:*</div><div><input type="password" id="sign_pwd" size="30"/>'
        + '</div><div><input type="button" value="login" onclick="signFlow(1);" id="sign_button"/>   '
        + '   <input type="button" value="cancel" onclick="cancelSign();"/></div>'
        + '<p><a href="javascript:loadSignUpFlow();">creat account</a>   '
        + 'or   <a href="javascript:loadForgetPwdFlow();">forget password</a></p>';
function loadSignInFlow(){
   G("sign_div").innerHTML = sign_in_flow;
    G("sign_email").focus();
};
var sign_up_flow = '<div style="background:#CCFF00;">Create New Account</div><div>e-mail:*</div><div>'
       + '<input type="text" id="sign_email" maxlength="64" size="30"/>'
       + '</div><div>password:*</div><div><input type="password" id="sign_pwd" size="30"/>'
        + '</div><div>password again:*</div><div><input type="password" id="sign_repwd" size="30"/>'
        + '</div><div><input type="button" value="creat account" onclick="signFlow(0);" id="sign_button"/> '
        + ' <input type="button" value="cancel" onclick="cancelSign();"/></div>'
        + '<p><a href="javascript:loadSignInFlow();">login</a></p>';
function loadSignUpFlow(){
   G("sign_div").innerHTML = sign_up_flow;
    G("sign_email").focus();
};
function cancelSign(){
    G("sign_div").style.display = 'none';
    G("cover_div").style.display = 'none';
   document.body.style.overflow = '';
};
var forget_pwd_flow = '<div style="background:#FF99FF;">Forget Password</div><div>e-mail:*</div><div>'
       + '<input type="text" id="sign_email" maxlength="64" size="30"/>'
        + '</div><div><input type="button" value="sent pwd to e_mail" onclick="signFlow(2);" id="sign_button"/>   '
        + '   <input type="button" value="cancel" onclick="cancelSign();"/></div>';
function loadForgetPwdFlow(){
   G("sign_div").innerHTML = forget_pwd_flow;
    G("sign_email").focus();
};
function checkEmail(){
   if((G("sign_email").value.indexOf('@')<=0)||(G("sign_email").value.indexOf('.')<=0)){
    return '<div style="color:#FF0000";">Sorry, unrecognized e_mail.</div>';
   }
   return '';
}
function checkPwd(){
   if(G("sign_pwd").value.trim() == ''){
    return '<div style="color:#FF0000";">Password field is required.</div>';
   }
   return '';
}
function checkRePwd(){
   if(G("sign_pwd").value.trim() != G("sign_repwd").value.trim()){
    return '<div style="color:#FF0000";">The specified passwords do not match.</div>';
   }
   return '';
}
function signFlow(isSignIn){
    var error = checkEmail();
    var htmlText = null;
    if (isSignIn == 1) {
     if (error == ''){
      error = checkPwd();
     }
     htmlText = sign_in_flow;
    } else if (isSignIn == 0) {
     if (error == ''){
      error = checkPwd();
      if (error == ''){
       error = checkRePwd();
      }
     }
     htmlText = sign_up_flow;
    } else if (isSignIn == 2) {
    htmlText = forget_pwd_flow;
    }
    var eMailValue = G("sign_email").value.trim();
   if (error == '') {
    } else {
    G("sign_div").innerHTML = error + htmlText;
    G("sign_email").value = eMailValue; 
    }
};
function popCoverDiv(){
   if (G("cover_div")) {
    G("cover_div").style.display = '';
   } else {
    var coverDiv = GC('div');
    document.body.appendChild(coverDiv);
    coverDiv.id = 'cover_div';
    with(coverDiv.style) {
     position = 'absolute';
     background = '#CCCCCC';
     left = '0px';
     top = '0px';
     var bodySize = getBodySize();
     width = bodySize[0] + 'px'
     height = bodySize[1] + 'px';
     zIndex = 98;
     if (isIE()) {
      filter = "Alpha(Opacity=60)";
     } else {
      opacity = 0.6;
     }
    }
   }
}
function getBodySize(){
   var bodySize = [];
   with(document.documentElement) {
    bodySize[0] = (scrollWidth>clientWidth)?scrollWidth:clientWidth;
    bodySize[1] = (scrollHeight>clientHeight)?scrollHeight:clientHeight;
   }
   return bodySize;
} 
function popSign(isLogin){
   if (G("sign_div")) {
    G("sign_div").style.display = '';
   } else {
    var signDiv = GC('div');
    document.body.appendChild(signDiv);
    signDiv.id = 'sign_div';
    signDiv.align = "center";
    signDiv.onkeypress = function(evt){
          var e = window.event?window.event:evt;
          if (e.keyCode==13 || e.which==13) {
           if (G("sign_button")) {
            G("sign_div").focus();
            G("sign_button").click();
           }
          }
         };
    with (signDiv.style) {
     position = 'absolute';
     left = (document.documentElement.clientWidth - loginDivWidth)/2 + 'px';
     top = (document.documentElement.clientHeight - 300)/2 + 'px';
     width = loginDivWidth + 'px';
     zIndex = 99;
     background = '#FFFFFF';
     border = '#66CCFF solid 1px';
    }
   }
   if(isLogin) {
    G("sign_div").innerHTML = sign_in_flow;
   } else {
    G("sign_div").innerHTML = change_pwd_flow;
   }
  
}
function popSignFlow(isLogin) {
   popCoverDiv();  
   popSign(isLogin);  
   document.body.style.overflow = "hidden";
     
      if(isLogin) {
       G("sign_email").focus();
      } else {
       G("old_pwd").focus();
      }
}
function changePwd(){
    var error = checkOldPwd();
    if (error == ''){
     error = checkPwd();
    }
   if (error == ''){
    error = checkRePwd();
   }

    var oldPwd = G("old_pwd").value.trim();
    var newPwd = G("sign_pwd").value.trim();
   if (error == '') {
     var url = basePath + "?q=tripuser/tripuser_change_pwd_ajax/" + oldPwd + "/" + newPwd;
     exeRequest(url, getSignText, null);
    } else {
    G("sign_div").innerHTML = error + change_pwd_flow;
    }
};
function checkOldPwd(){
   if(G("old_pwd").value.trim() == ''){
    return '<div style="color:#FF0000";">Old Password field is required.</div>';
   }
   return '';
}
var change_pwd_flow = '<div style="background:#33FFFF;">Change Your Password</div><div>old password:*</div><div>'
       + '<input type="password" id="old_pwd" size="30"/>'
       + '</div><div>new password:*</div><div><input type="password" id="sign_pwd" size="30"/>'
        + '</div><div>new password again:*</div><div><input type="password" id="sign_repwd" size="30"/>'
        + '</div><div><input type="button" value="change password" onclick="changePwd();" id="sign_button"/> '
        + ' <input type="button" value="cancel" onclick="cancelSign();"/></div>';
