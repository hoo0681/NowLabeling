/*라벨링 관련 스크립트*/
/*
    v0. 라벨 구조체정의
    v1. 이미지내에서 마우스로 드래그하여 영역을 지정하는 이벤트
    v2. 드래그중 범위를 보여주는 이벤트
    v3. 영역선택 후 라벨을 붙이는 이벤트, 공백이면 영역 지정 취소
    4. 라벨 리스트에 추가
    5. 라벨 리스트에서 체크가 된것은 보임
    6. 보이는 영역위에 마우스가 있으면 리스트에서 다른색으로 강조 
    7. 리스트에는 삭제 편집 버튼이있음
    8. 편집은 라벨 내용을 편집하는것
    9. 초기화버튼 누르면 확인 후 리스트 초기화
*/


var IdforLBL=0;
var LBList=[];
var forJson=[];

function LaBelst(label,x,y,w,h){
    this.id=IdforLBL++;
    this.label=label;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;    
};

function mouseSet(i) 
 {
    var samClick=true;
    var mode=false;
    var startX=0;
    var startY=0;
    var left, top, width, height;
    var $focus=$(".focus");//마우스로 선택중
    var $popup=$(".minipopup");
    
    $popup.hide();
    $(i).on('mousedown',function(e) {
        if(!samClick){
            return;
        }
        mode=true;
        //console.log('on');
        $focus.hide();
        $popup.hide();
        $('.highlight').hide();
        startX=e.offsetX;
        startY=e.offsetY;
        width=height=0;
        samClick=false;
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
        $popup.css('top',(y-100));
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
        $popup.css('top',(y-100));
        $focus.show();
        $popup.show();
        $("#tdX").html(`${x}`);
        $("#tdY").html(`${y}`);
    }).on('mouseup',function (e){
        if (!mode){
            return;
        }
        $(".labelckbox").trigger('onclick');
        $(".labelckbox").trigger('onclick');
        mode=false;
        
        
    }).on('mouseout',function (e){
        if (!mode){
            return;
        }
        $(".labelckbox").trigger('onclick');
        $(".labelckbox").trigger('onclick');
        mode=false;
        
        
    }).on('dblclick',function(e){
        $focus.hide();
        $popup.hide();
        $focus.css('width',0);
        $focus.css('height',0);
        samClick=true;
        console.log("dbclick");
    });
    $('#label').keydown(function(e){
        if(e.keyCode==13||e.which==13){
            let getlabel= new LaBelst($('#label').val(),left,top,width,height);
            LBList.push(getlabel);
            
            let roundbox=document.createElement('div');
            roundbox.setAttribute("class",'highlight');
            roundbox.setAttribute("id",`${getlabel.id}`);
            document.querySelector("#view").appendChild(roundbox); $(`#${getlabel.id}`).css("left",left).css("top",top).css("width",width).css("height",height).hide();
            
            newLabel(getlabel);
            console.table(LBList);
            $('#label').val('');
            roundbox.addEventListener('click',function(){
                console.log($(`input:checkbox[id="ck${roundbox.getAttribute('id')}"]`).attr('checked'));
               $(`#ck${roundbox.getAttribute('id')}`).prop('checked','false'); 
            });
            $focus.hide();
            $popup.hide();
            $focus.css('width',0);
            $focus.css('height',0);
            samClick=true;
       } 
    });
};
function newLabel(item){
    let newP=document.createElement("p");
    let newId=item.id;
    
    newP.setAttribute("class",`${item.label}`);
    newP.setAttribute("id",`p${newId}`);
    let newText=document.createTextNode(item.label);
    
    
    let ckBox=document.createElement('input');
    ckBox.setAttribute('type','checkbox')
    ckBox.setAttribute("class",`labelckbox`);
    ckBox.setAttribute("id",`ck${newId}`);
    ckBox.setAttribute("defaultChecked",'true');
    ckBox.onclick=function(){
      if(ckBox.checked){
          $(`#${newId}`).show();
      }
        else{
            $(`#${newId}`).hide();
        }
    };
    newP.appendChild(ckBox);
    newP.appendChild(newText);
    
    let xBtn=document.createElement("span");
    let xText=document.createTextNode("X");
    xBtn.setAttribute("class",'del');
    xBtn.appendChild(xText);
    newP.appendChild(xBtn);
    
    
    
    let labelList=document.querySelector("#labelList");
    labelList.insertBefore(newP,labelList.childNodes[0]);
    //LBList.find(tmp => tmp.id == )
    console.log(newP.id);
}

$("#DownSw").click(function(){
    /*
        LBList의 오브젝트들을 json을 파싱하여 다운로드합니다.
    */
    forJson+=(JSON.stringify(LBList[0]));
    for (let i =1;i<LBList.length;i++)
        {
            forJson+=(','+JSON.stringify(LBList[i]));
            
        }
    console.log(forJson);
    var dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(forJson);
    var link = $("#link").attr("href", dataUri);
    $("#link").attr('download','result.json');
});
