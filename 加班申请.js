/**
 * Created by freef on 2017-04-07.
 */

/************************  开始环节 start **************************/

(function($){
    $(function () {

        $("span[id^='field7874_']").live('DOMNodeInserted', function () {
            var id = this.id;
            var num = id.substr(10, 1);
            var xq = "field7874_" + num + "span";
            var time = $("#" + xq + "").text();
            if (time != "") {
                var date11 = new Date(time);
                var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                var week = today[date11.getDay()];
                var xqid = "field8322_" + num;
                $("#" + xqid + "").val(week);
                $("#" + xqid + "").attr("readonly", "true");
            }
        })

        $("input[id^='field8322_']").attr("readonly","true");
        $("#field7872").css("width", "97%");
        var minRows = 2;
        // 最大高度，超过则出现滚动条
        var maxRows = 1000;

        function autoResize() {
            var t = document.getElementById('field7872');
            if (t.scrollTop == 0) t.scrollTop = 1;
            while (t.scrollTop == 0) {
                if (t.rows > minRows)
                    t.rows--;
                else
                    break;
                t.scrollTop = 1;
                if (t.rows < maxRows)
                    t.style.overflowY = "hidden";
                if (t.scrollTop > 0) {
                    t.rows++;
                    break;
                }
            }
            while (t.scrollTop > 0) {
                if (t.rows < maxRows) {
                    t.rows++;
                    if (t.scrollTop == 0) t.scrollTop = 1;
                } else {
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
     *  检测重复ajax
     */
    function chongfu(){
        var check="true";
        var requestid1 = document.getElementById("requestid");
        var rqid="";
        if(requestid1==null){
            rqid=0;
        }else{
            rqid=document.getElementById("requestid").value;
        }
        var userid= $("#field7862").val();
        <!-- 获取全部明细的开始日期 -->
        var startDate = $(".detail0_3_2").children("span").text();
        <!-- 获取全部明细的开始时间 -->
        var time1 = $(".detail0_3_4").children("span").text();
        <!-- 获取全部明细的结束时间 -->
        var time2 = $(".detail0_3_5").children("span").text();
        var json = "{'jiaban':[";

        if(startDate!=""&&time1!=""&&time2!=""){
            for (var i = 0; i < startDate.length; i = i + 10) {
                var sdate = startDate.substr(i, 10);
                var stime = time1.substr(i / 2, 5);
                var etime = time2.substr(i / 2, 5);
                json += "{'userid':'" + userid + "',";
                json += "'jbrq':'" + sdate + "',";
                json += "'rqid':'" + rqid + "',";
                json += "'yjkssj':'" + stime + "',";
                if ((i + 10) >= startDate.length) {
                    json += "'yjjssj':'" + etime + "'}";
                } else {
                    json += "'yjjssj':'" + etime + "'},";
                }
            }
            json += "]}"
            var json12 = json.replace(/'/g, '"');
            $.ajax({
                type: "Post",
                data: "jiaban=" + json12,
                async: false,
                url: "/dinghan/jsp/OverTimeCheck.jsp",
                dataType: "text",
                success: function (rsdata) {
                    rsdata = rsdata.replace(/(^\s*)|(\s*$)/g, "");
                    eval("var obj = " + rsdata);
                    if (obj.flag == "true") {
                        check = "true";
                    } else {
                        alert(obj.info);
                        check = "false";
                    }
                },
                complete: function (xhr, ts) {
                    xhr = null;
                }
            });
            return check;
        }else{
            return check;
        }


    }



    /*
     *  点击提交时，对日期和时间的校验，
     var requestid1 = document.getElementById("requestid").value;
     */
    checkCustomize = function () {
        var a=$("#field8315").val();
        if(a!=""){
            if(date1()){
            }else{
                return false;
            }

        }else{
            if(date()){
            }else{
                return false;
            }
        }


        if (time()) {

            if(chongfu()=="true"){
                return true;
            }else{ return false; }


            return false;
        }else{
            return false;
        }

    }


    /*
     *  对日期的校验
     */
    function date1() {
        var w = false;
        var todaytxt = $("#field7863").val();
        var time = $(".detail0_3_2").children("span").text();
        if (time != "") {
            for (var i = 0; i < time.length; i = i + 10) {
                var q = time.substr(i, 10);
                var date11 = new Date(q);
                var date22 = new Date(todaytxt );
                if ((date22 - date11) >0) {
                    var a = i / 10 + 1;
                    alert("提示：第" + a + "行加班日期不得早于申请日期！");
                    return false;
                } else if ((date22 - date11) <= 86400000) {
                    w = true;
                }
            }
            if (w) {
                return true;
            }
        } else {
            return true;
        }
    }

    /*
     *  对日期的校验
     */
    function date() {
        var w = false;
        var todaytxt = $("#field7863").val();
        var time = $(".detail0_3_2").children("span").text();
        if (time != "") {
            for (var i = 0; i < time.length; i = i + 10) {
                var q = time.substr(i, 10);
                var date11 = new Date(q);
                var date22 = new Date();
                if ((date22 - date11) >86400000) {
                    var a = i / 10 + 1;
                    alert("提示：第" + a + "行加班日期不得早于今天！");
                    return false;
                } else if ((date22 - date11) <= 86400000) {
                    w = true;
                }
            }
            if (w) {
                return true;
            }
        } else {
            return true;
        }
    }


    function time() {
        var w = false;
        var time2 = $(".detail0_3_5").children("span").text();
        var time1 = $(".detail0_3_4").children("span").text();
        if ((time1 != "") && (time2 != "")) {
            for (var i = 0; i < time1.length; i = i + 5) {
                var q = time1.substr(i, 5);
                var e = time2.substr(i, 5);
                var timea = q.substr(0, 2);
                var timeb = q.substr(3, 2);
                time4 = timea + timeb;
                time5 = parseInt(time4);
                var t2 = e.substr(0, 2);
                var t3 = e.substr(3, 2);
                t4 = t2 + t3;
                t5 = parseInt(t4);
                if ((time5 - t5) > 0) {
                    var a = i / 5 + 1;
                    alert("提示：第" + a + "行结束时间不得早于开始时间！");
                    return false;
                } else if ((time5 - t5) <= 0) {
                    w = true;
                }
            }
            if (w) {
                return true;
            }
        } else {
            return true;
        }

    }

})(jQuery)
/************************  开始环节 end **************************/

/* 加班申请 Javascript */

/* node ：员工确认  start */
/*
 *  TODO
 *  请在此处编写javascript代码
 */
function checktime(){

    $("input[id^='field7874_']").each(function (i) {
        var time=$(this).val();
        var a ="field8317_"+i;
        var time1=$("#"+a+"").val();
        var stDateStr=(""+time+" "+time1+":00").replace(/-/g,"/");  //开始
        var stDate = new Date(stDateStr);
        var date = new Date();
        if((date - stDate)>0){
        }else{
            alert("日期早于加班日期，不得提交");
            return false;
        }
    });
    return true;
}

/**
 * 定制提交前检测
 * - - 在系统固有的必填检测前触发 - -
 * 返回 true 时正常提交，返回 false 阻止提交
 * @return {boolean}
 */
checkCustomize = function () {
    if(checktime()){
        return true;
    }else{
        return false;
    }
}

/* node ：员工确认  end */
