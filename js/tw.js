/**
 * Created by Administrator on 2016/6/23 0023.
 */
(function(){
    var zhufengEffect = {
        Linear:function(t,b,c,d){
            return t/d*c+b;
        }
    }
    function move(curEle,target,duration){
        window.clearInterval( curEle.zhufengTimer);
        var begin={};//运动的起始值
        var change={};//总距离
        for(var key in target){
            if(target.hasOwnProperty(key)){
                begin[key]=utils.getCss(curEle,key);
                change[key]=target[key]-begin[key];
            }
        }
        var time =0;
        curEle.zhufengTimer=window.setInterval(function(){
            time+=10;
            if(time>duration){
                utils.getCss(curEle,target);
                window.clearInterval(curEle.zhufengTimer);
                return;
            }
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curPos=zhufengEffect.Linear(time,begin[key],change[key],duration);
                    utils.setCss(curEle,key,curPos);
                }
            }
        },10)
    }
    window.zhufengAnimate=move;
})()