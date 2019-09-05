

var oLi = document.getElementsByTagName('li');
var oUl = document.getElementsByClassName('list')[0];
var falg = false;
var num = 1;
function send(){
    if(!falg){
        ajax('GET','./getPics.php',dataShow,'cpage='+num,true);
        falg = true;  
        num ++;  
    }
}
send();
function dataShow(data){
     var data = JSON.parse(data);
        console.log(data);
        console.log(data.length);
        if(data.length > 0){
            data.forEach(function(ele,index){
                var oImg = new Image();
                oImg.src = ele.image;
                var oItem = document.createElement('div');
                oItem.className = 'item';
                oImg.height = 230 * ele.height / ele.width;
                oItem.appendChild(oImg);
                oLi[findShortest(oLi)].appendChild(oItem);
             });
             falg = false;
        }else{
            // console.log(data.length);
            alert('以无数据');
        }
        
}
function findShortest(list){
    var len = list.length;
    var min = list[0].offsetHeight;
    var index = 0;
    for(var i = 1;i<len;i++){
        var h = list[i].offsetHeight;
        if(h < min){
             min = h;
             index = i;
        }
    }
    return index;
}
//监听滚动条事件
window.onscroll = function(){
    var index = findShortest(oLi);
    var h = oLi[index].offsetHeight;//最短的列的高度
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var  screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if(scrollHeight + screenHeight > h){
        send();
    }
}