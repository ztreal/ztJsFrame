//Change Cell Content - By SiC/CYAN
function switchCell(n, hash) {
	if(navcell.length==undefined||tb.length==undefined){
		return;
	}
	for(i=0;i<navcell.length;i++){
		navcell[i].className="tab-off";
		tb[i].style.display="none";
	}
	navcell[n-1].className="tab-on";
	tb[n-1].style.display="block";
	if(hash){
		document.location="#"+hash;
	}else{
		window.scroll(0,0);
	}
}

previous_index=0;
previous_src=0;


function over_change(index,src,clrOver){
	if(previous_index!=parseInt(index))
		if (!src.contains(event.fromElement))
	 		{
	 		src.style.cursor = 'hand';
	 		src.bgColor = clrOver;
	 		}
}

function out_change(index,src,clrIn){
	if(previous_index!=index)
		if (!src.contains(event.toElement))
			{
			src.style.cursor = 'default';
			src.bgColor = clrIn;
			}
}

function click_change(index,src,clrIn,URL){
	if(previous_src.contains)
		{
			if (!previous_src.contains(event.toElement))
	 			{
	 			previous_src.style.cursor = 'hand';
	 			previous_src.bgColor = "";
	 			}
		}
	if (!src.contains(event.toElement))
		{
		src.style.cursor = 'default';
		src.bgColor = clrIn;
		}

	previous_index=index;
	previous_src=src;
	window.top.mainFrame.location=URL;
}
function onerror(aa,bb,cc)
{
alert(aa+"\n"+bb+"\n"+cc);
}

function mOvr(src,clrOver) { if (!src.contains(event.fromElement)) {
src.style.cursor = 'hand'; src.bgColor = clrOver; }}
function mOut(src,clrIn) { if (!src.contains(event.toElement)) {
src.style.cursor = 'default'; src.bgColor = clrIn; }}
function mClk(src) { if(event.srcElement.tagName=='TD'){;} }

//zt 保持选中状态
$(function(){
	$("a").click(function(){
		$("a").each(function(i){
  		    $(this).css("color","#003399"); 
	     });
		$("table div").each(function(i){
			if($(this).hasClass("hover")){
  		    $(this).removeClass("hover");
		 	$(this).parent().find("img").replaceWith('<img height="10" src="../images/function.gif" border="0" complete="complete"/>');
			}
	     });
		 $(this).parent().addClass("hover");
		 $(this).parent().find("img").replaceWith('<img height="10" src="../images/leftdian_o.jpg" border="0" complete="complete"/>'); 
		 $(this).css("color","#cf2a04"); 
	})
})