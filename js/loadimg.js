var view =document.querySelector("#view");
var fileBtn= document.querySelector('#Getimg');
let reader=new FileReader();
$(document).onload=(function(){
    $(".minipopup").hide();
});
reader.onload=function(e){
    document.querySelector("#workingimg").setAttribute('src',e.target.result);

};



fileBtn.onchange=function(e){
    let targetimg;
    if(document.querySelector('#workingimg')==null){
        targetimg=document.createElement('img');
    }
    else{
        targetimg=document.querySelector('#workingimg');
    }
    targetimg.setAttribute('id','workingimg');
    targetimg.setAttribute('class','imgs');
    targetimg.setAttribute("onload",mouseSet(targetimg));
    console.log(e);
    let loadedimg=e.target.files[0];
    
    reader.readAsDataURL(loadedimg);
    view.appendChild(targetimg);
    //mouseSet(targetimg);
    
    console.log(targetimg);
    /*사진 사이즈 조절 추가 해야함*/
};


/*
function mouseSet(i) 
 {
    var mode=false;
    var startX=0;
    var startY=0;
    var left, top, width, height;
    var $focus=$(".focus");//마우스로 선택중
    var $popup=$(".minipopup");
    
    $popup.hide();
    $(i).on('mousedown',function(e) {
        mode=true;
        //console.log('on');
        $focus.hide();
        $popup.hide();
        startX=e.offsetX;
        startY=e.offsetY;
        width=height=0;        
        //이전에 그린 영역 표시 지우기
    }).on('mousemove',function(e) {
        if (!mode){
            return;
        }
        //console.log('move');
        $focus.hide();
        $popup.hide();
        var x=e.offsetX;
        var y=e.offsetY;
        
        width = Math.max(x - startX, startX - x);
        left = Math.min(startX, x);
        $focus.css('left', left);
        $focus.css("width", width);
        height = Math.max(y - startY, startY - y);
        top = Math.min(startY, y);
        $focus.css('top', top);
        $focus.css('height', height);
        
        //console.log(x, startX);
        //console.log(y,startY);
        $popup.css('left',x);
        $popup.css('top',(y-75));
        $("#tdX").html(`${x}`);
        $("#tdY").html(`${y}`);
        $focus.show();
        $popup.show();
        
    }).on("mousewheel",function(e){
        if (!mode){
            return;
        }
        $focus.hide();
        $popup.hide();
        var x=e.offsetX;
        var y=e.offsetY;
        
        width = Math.max(x - startX, startX - x);
        left = Math.min(startX, x);
        $focus.css('left', left);
        $focus.css("width", width);
        height = Math.max(y - startY, startY - y);
        top = Math.min(startY, y);
        $focus.css('top', top);
        $focus.css('height', height);
        
        $popup.css('left',x);
        $popup.css('top',(y-75));
        $focus.show();
        $popup.show();
        $("#tdX").html(`${x}`);
        $("#tdY").html(`${y}`);
    }).on('mouseup',function (e){
        mode=false;
        //console.log('up');
        $focus.hide();
        $popup.hide();
        $focus.css('width',0);
        $focus.css('height',0);
    });
};
*/
