/**
 * 外出公干流程 JavaScript 文件
 * Created by zhangxiaoyu  on 2017/5/10.
 */

/**********************************  开始环节 start ************************************/
(function($){
    /*
     *  点击外出时间时，动态显示星期
     */
    $("#field8871span").bind('DOMNodeInserted',function(){
        var time=$("#field8871span").text();
        if(time!=""){
            var date11 = new Date(time);
            var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
            var week = today[date11 .getDay()];
            $("#field8296").val(week);
        }
    });

    /*
     * 页面加载完成后，设置多行文本动态显示行高，文本框的只读
     */
    $(function(){
        $("#field8296").attr("readonly","true");
        $("#field7912").css("width","97%");
        var minRows = 2;
        // 最大高度，超过则出现滚动条
        var maxRows = 1000;
        function autoResize(){
            var t = document.getElementById('field7912');
            if (t.scrollTop == 0) t.scrollTop=1;
            while (t.scrollTop == 0){
                if (t.rows > minRows)
                    t.rows--;
                else
                    break;
                t.scrollTop = 1;
                if (t.rows < maxRows)
                    t.style.overflowY = "hidden";
                if (t.scrollTop > 0){
                    t.rows++;
                    break;
                }
            }
            while(t.scrollTop > 0){
                if (t.rows < maxRows){
                    t.rows++;
                    if (t.scrollTop == 0) t.scrollTop=1;
                }
                else{
                    t.style.overflowY = "auto";
                    break;
                }
            }
        }
        $('textarea').keyup(function () {
            autoResize();
        });
    })

    /*
     *  点击提交时，对日期和时间的校验，
     */
    checkCustomize = function (){
        var a=date();
        var b=time();
        if(b&&a){
            return true;
        }else{
            return false;
        }
    }

    /*
     *  对日期的校验
     */
    function date(){
        var todaytxt = $("#field7887").val();
        var time=$("#field8871span").text();
        if(time!=""){
            var date11 = new Date(time);
            var date22 = new Date(todaytxt);
            if((date22-date11)>0){
                alert("提示：外出日期不得早于今天！");
                return false;
            }else if((date22-date11)<=0){
                return true;
            }
        }else{
            return true;
        }
    }

    /*
     *  对时间的校验，结束时间不得早于开始时间
     */
    function time(){
        var time1= $("#field8292span").text();
        var t1= $("#field8293span").text();
        if((time1!="")&&(t1!="")){
            var time2=time1.substr(0,2) ;
            var time3=time1.substr(3,2);
            time4=time2+time3;
            time5=parseInt(time4);
            var t2=t1.substr(0,2) ;
            var t3=t1.substr(3,2);
            t4=t2+t3;
            t5=parseInt(t4);
            if((time5-t5)>0){
                alert("提示：结束时间不得早于开始时间！");
                return false;
            }else if((time5-t5)<=0){
                return true;
            }
        }else{
            return true;
        }
    }
})(jQuery)
/**********************************  开始环节 end ************************************/