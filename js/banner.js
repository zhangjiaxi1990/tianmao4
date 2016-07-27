/**
 * Created by Administrator on 2016/6/23 0023.
 */
//获取元素
var banner = document.getElementById('banner');
var bannerInner= document.getElementsByClassName('bannerInner')[0];
var imgList= bannerInner.getElementsByTagName('img');
var bannerTip = document.getElementsByClassName('bannerTip')[0];
var lis = bannerTip.getElementsByTagName('li');
var leftBtn=banner.getElementsByTagName('a')[0];
var rightBtn=banner.getElementsByTagName('a')[1];
//获取数据
var data=null;
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
}
getData();
console.log(data);
//数据绑定
function bindData(){
    var str="";
    var strFocus="";
    if(data){
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+=' <img src="" trueSrc="'+curData.src+'">';
            if(i===0){
                strFocus+=' <li class="bg"></li>';
            }else{
                strFocus+=' <li></li>';
            }
        }
        str+=' <img src="" trueSrc="'+data[0].src+'">';
        bannerInner.innerHTML=str;
        bannerTip.innerHTML=strFocus;
        utils.setCss(bannerInner,'width',(data.length+1)*1130);
    }
}
bindData();
//图片加载
function leayLoadImg(){
    for(var i=0;i<imgList.length;i++){
        (function(i){
            var curImg=imgList[i];
            if(curImg.isLoad){
                return;
            }
            var tempImg=new Image;
            tempImg.src=curImg.getAttribute('trueSrc');
            tempImg.onload = function(){
                curImg.src=this.src;
                curImg.style.display='block';
            }
            curImg.isLoad=true;
        })(i)
    }
}
 window.setInterval(leayLoadImg,1000);
//图片轮播
var step=0;
var timer;
var interval=2000;
function autoMove(){
    if(step==data.length){
        step=0;
        utils.setCss(bannerInner,'left',-step*1130);
    }
    step++;
    window.zhufengAnimate(bannerInner,{left:-step*1130},1000);
    focusImgEvent();
}

timer=window.setInterval(autoMove,interval);


//鼠标移入移出
banner.onmouseover =function(){
    window.clearInterval(timer);
    leftBtn.style.display='block';
    rightBtn.style.display='block';
}
banner.onmouseout =function(){
    timer=window.setInterval(autoMove,interval);
    leftBtn.style.display='none';
    rightBtn.style.display='none';
}
//焦点跟随图片流动事件
function focusImgEvent(){
    var tempFocus=step==lis.length ? 0 : step;
    for(var i=0;i<lis.length;i++){
        if(i==tempFocus){
            lis[i].className='bg';
        }else{
            lis[i].className='';
        }
    }
}
//点击焦点显示相应的图片事件
       function XX(){
           for(var i=0;i<lis.length;i++){
               var curFocus=lis[i];
               curFocus.index=i;
               curFocus.onclick=function(){
                   step=this.index;
                   window.zhufengAnimate(bannerInner,{left:(-step*1130)},1000);
                   focusImgEvent();
               }
           }
       }
XX();

//点击左右按钮实现图片转换
leftBtn.onclick = function(){
    if(step==0){
        step=data.length;
        utils.setCss(bannerInner,'left',-step*1130);
    }
    step--;
    window.zhufengAnimate(bannerInner,{left:-step*1130},1000);
    focusImgEvent();
}
rightBtn.onclick=autoMove;

