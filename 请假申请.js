/*  请假流程 JavaScript */
/* node ： 开始 start */

(function($){

    $(function () {

        $("#field8640").attr("readonly", true);

        /*
         *  点击开始时间时，校验标准工作时间必填
         */
        $("button[name='addbutton0']").bind('mousedown', function () {
            if ($("#field7733 option[value='']").is(":selected")) {
                alert("提示：请先选择“标准工作时间”");
                return false;
            }
        });

        /*
         *  点击提交时，对日期和时间的校验
         */
        checkCustomize = function () {
            var appno = $("#field7728").val();  //流水号
            if(appno != ""){
                if(date2()){
                }else{
                    return false;
                }
            }else{
                if(date()){
                }else{
                    return false;
                }
            }

            countLeaveDay();   //计算请假天数

            if (biaozhun()) {   //是否符合标准
                if (date1()) {
                    if (beishu1()) {
                        if (biggerone()) {
                            if (getchongfu() == "true") {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    });

    /**
     * 计算请假天数
     *
     */
    function countLeaveDay(){
        var num=0;
        var rowIndex,startDate,endDate,startDatetxt,endDatetxt,tmp;
        $("input[name='check_node_0']").each(function (i,n) {
            rowIndex = $(n).val();
            startDatetxt = $("#field7743_"+rowIndex).val();
            endDatetxt = $("#field7745_" + rowIndex).val();
            if (startDatetxt != "" && endDatetxt != "") {
                startDate = new Date(startDatetxt.replace(/-/g,"/"));
                endDate = new Date(endDatetxt);
                num = num + (endDate -startDate)/(1000*3600*24)+1;
            }
        });
        $("#field8640").val(num);
    }

    /**
     * 功能：检测请假是否超过一天，超过的要求填写工作委托
     * @return {boolean}
     */

    function isNeedWorkProxy(num){
        var _dayNum = num;

        if(_dayNum > 1){
            if($("input[name='check_node_1']").length == 0){
                alert("请假超过1天，请填写工作委托！");
                return false;
            }
        }
    }

    function setHDTime(startTime, endTime) {
        var hdtime = 0;
        if (startTime == "" || endTime == "" || startTime >= endTime) return hdtime;
        //取标准工作
        var aWKT = $("#field7733 option:selected").text();
        if (aWKT == "") {
            alert("请选择标准工作时间");
            return hdtime;
        }

        var q = aWKT.substr(0, 5);
        var p = aWKT.substr(6, 5);
        var timea = q.substr(1, 1);
        var timep = p.substr(0, 2);
        var timeb = q.substr(3, 2);
        var timeo = p.substr(3, 2);
        <!-- 标准工作时间的开始时间和结束时间 -->
        var atime = parseInt(timea + timeb);
        var ptime = parseInt(timep + timeo);
        //上午下班时间、下午上班时间
        var rstime = 1200;
        var retime = 1300;
        if (atime == 850 && ptime == 1800) retime = 1350; //东莞

        //处理开始时间
        if (atime > startTime) startTime = atime;

        //处理结束
        if (ptime < endTime) endTime = ptime;

        if (endTime <= rstime) hdtime = endTime - startTime;
        else if (endTime <= retime) hdtime = rstime - startTime;
        else if (startTime <= rstime) hdtime = endTime - startTime - (retime - rstime);
        else if (startTime <= retime) hdtime = endTime - retime;
        else hdtime = endTime - startTime;

        if (hdtime < 0) hdtime = 0;
        else if (hdtime > 8000) hdtime = 8000;
        return hdtime;
    }

    /*
     * 请假时间必须是小时的整倍数
     */
    function beishu1() {
        var qw = true;
        var userid = $("#field7729").val(); //用户id
        <!-- 获取全部明细的开始日期 -->
        var startDate = $(".detail0_3_2").children("span").text();
        <!-- 获取全部明细的结束日期 -->
        var endDate = $(".detail0_3_4").children("span").text();
        <!-- 获取全部明细的开始时间 -->
        var tim1 = $(".detail0_3_3").children("span").text();
        <!-- 获取全部明细的结束时间 -->
        var tim2 = $(".detail0_3_5").children("span").text();
        <!-- 获取标准工作时间的开始时间；结束时间 -->
        var a = $("#field7733 option:selected").text();
        var q = a.substr(0, 5);
        var p = a.substr(6, 5);
        var timea = q.substr(1, 1);
        var timea1= q.substr(0, 2);
        var timep = p.substr(0, 2);
        var timeb = q.substr(3, 2);
        var timeo = p.substr(3, 2);
        <!-- 标准工作时间的开始时间和结束时间 -->
        atime = parseInt(timea + timeb);
        ptime = parseInt(timep + timeo);

        var nxj=0;//年休假总数
        var txj=0;//调休假总数
        for (var i = 0; i < startDate.length; i = i + 10) {
            var s1 = startDate.substr(i, 10);//开始日期
            var s2 = endDate.substr(i, 10);//结束日期
            var date11 = new Date(s1);
            var date22 = new Date(s2);
            var e = tim1.substr(i / 2, 5);//开始时间
            var m = tim2.substr(i / 2, 5);//结束时间
            var stDate=(""+s1+" "+e+"").replace(/-/g,"/");//开始
            var enDate=(""+s2+" "+m+"").replace(/-/g,"/");//结束
            var stDate1=(""+s1+" "+timep+":"+timeo+"").replace(/-/g,"/");//开始
            var enDate1=(""+s2+" "+timep+":"+timeo+"").replace(/-/g,"/");//结束
            var enDate2=(""+s2+" "+timea1+":"+timeb+"").replace(/-/g,"/");//结束
            var sta_date = new Date(stDate);
            var end_date = new Date(enDate);
            var sss=new Date(stDate1);
            var ddd=new Date(enDate1);
            var ddd2=new Date(enDate2);
            var num2 =(ddd-sss)/(1000*3600*24);  //此条明细请假天数
            var num=0;
            if(num2>0){
                if(e=="08:30"||e=="09:00"){
                    num=num+8+(num2-1)*8;
                }else{
                    num=num+(sss - sta_date )/(1000*3600)+(num2-1)*8;
                }

                if(m=="12:00"){
                    num = num+(end_date - ddd2)/(1000*3600);
                }else{
                    num = num + 8;
                }
            }else{
                if((e == "08:30"||e == "09:00")&&(m == "17:30"||m == "18:00")){
                    num = 8;
                }else{
                    num=num+(end_date -sta_date )/(1000*3600);
                }
            }

            var t2 = e.substr(0, 2);
            var m1 = m.substr(0, 2);
            var t3 = e.substr(3, 2);
            var m2 = m.substr(3, 2);
            var start = parseInt(t2 + t3);
            var end = parseInt(m1 + m2);
            var id1 = "field7747_";
            var id2 = i / 10;
            id = id1 + id2;
            var b = $("#" + id + "  option:selected").val();

            if (b == "") {
                return true;
            }

            if(b==2){
                nxj=nxj+num;
            }else if(b==3){
                txj=txj+num;
            }

            var rstime = 1200;
            var retime = 1300;
            if (atime == 850 && ptime == 1800) retime = 1350; //东莞

            switch (b) {
                case "0":
                case "1":
                    //上午下班时间、下午上班时间
                    //判断请假是否个下午
                    if (date11 - date22==0) {
                        if ((start == atime || start == retime) && (end == rstime || end == ptime))
                            break;
                    } else {
                        if (start == atime || start == retime) {
                            if (end == rstime || end == ptime) break;
                            //判断最后一天的请假时间是否满足1小时的整数倍
                            start = ptime; //保证第一天的请假时数是整数
                        } else if (end == rstime || end == ptime) {
                            //判断第一天的时间是否满足1小时的整数倍
                            end = ptime; //保证最后一天的请假时数是整数
                        } else {
                            //判断请假时间是否满足1小时的整数倍
                        }
                    }

                    var time = 0;

                    if ((date11 - date22) == 0) {
                        var time = setHDTime(start, end);

                        if ((time % 100) != 0) {
                            alert("提示：第" + (i / 10 + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：本次请假时数不是一个小时的整数倍！");
                            return false;
                        }
                    } else if ((date11 - date22) != 0) {
                        var time1 = setHDTime(start, ptime);
                        var time2 = setHDTime(atime, end);
                        if ((time1 % 100) != 0) {
                            alert("提示：第" + (i / 10 + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：第一天请假时数不是一个小时的整数倍！");
                            return false;
                        } else {
                            if ((time2 % 100) != 0) {
                                alert("提示：第" + (i / 10 + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：最后一天请假时数不是一个小时的整数倍！");
                                return false;
                            } else {
                                qw = true;
                            }
                        }

                    }
                    break;
                case "2":   //年休
                case "3":   //调休
                    //最小请假单位为半天（整个上午或下午或全天）且不允许销假
                    if (start == atime) {
                        if (end != rstime && end != ptime) {
                            alert("第" + (i / 10 + 1) + "行不满足考勤规定：年休假、调假最小请假为半天（整上午或整下午或全天");
                            flag = true;
                            return false;
                        }
                    } else if (start == retime) {
                        if (end != rstime && end != ptime) {
                            alert("第" + (i / 10 + 1) + "行，不满足考勤规定：年休假、调休假最小请假单位为半天（整上午或整下午或全天）");
                            flag = true;
                            return false;
                        }
                    } else {
                        alert("第" + (i / 10 + 1) + "行，不满足考勤：年休假、调休假最小请假单位为半天（整上午或整下午或全天）");
                        flag = true;
                        return false;
                    }

                    break;
                case "7"://产检
                    //每月8小时，每次只能是整个上午或下午或全天且不允许销假
                    if ((date11 - date22)==0) {
                        if (start == atime) {
                            if (end != rstime && end != ptime) {
                                alert("第" + (i / 10 + 1)+ "行，不满足考勤规定：产检假每次只能申请半天或全天");
                                flag = true;
                                return false;
                            }
                        } else if (start == retime) {
                            if (end != ptime) {
                                alert("第" + (i / 10 + 1) + "行，不满足考勤规定：产检假每次只能申请半天或全天");
                                flag = true;
                                return false;
                            }
                        } else {
                            alert("第" + (i / 10 + 1) + "行，不满足考勤规定：产检假每次只能申请半天或全天");
                            flag = true;
                            return false;
                        }
                    } else {
                        alert("第" + (i / 10 + 1) + "行，不满足考勤规定：产检假不允许跨天申请");
                        flag = true;
                        return false;
                    }
                    break;
                case "9"://哺乳
                    //每天只允许有一小时
                    if ((date11 - date22)==0) {
                        var hdtime = setHDTime(start, end);
                        if (hdtime != 100) {
                            alert("第" + (i / 10 + 1) + "行，不满足考勤规定：哺乳假每次只允许请1小时");
                            flag = true;
                            return false;
                        }
                    } else {
                        alert("第" + (i / 10 + 1) + "行，不满足考勤规定：哺乳假不允许跨天填写");
                        flag = true;
                        return false;
                    }
                    break;
            }
        }

        if(nxj!=0){
            $.ajax({
                type: "Post",
                async: false,
                url: "/dinghan/jsp/GetNianXiuAndTiaoXiu.jsp",
                data: {"userid":userid,"num":num,"b":2,"appno":$("#field7728").val()},
                dataType: "text",
                success: function (rsdata) {
                    rsdata = rsdata.replace(/(^\s*)|(\s*$)/g, "");
                    eval("var obj = " + rsdata);
                    if (obj.flag == "true") {
                        qw = true;
                    } else {
                        alert(obj.info+",剩余年休假："+obj.synx);
                        qw=false;
                    }
                },
                complete: function (xhr, ts) {
                    xhr = null;
                }
            });
            if(qw==false){return false;}
        }
        if(txj!=0){
            $.ajax({
                type: "Post",
                async: false,
                url: "/dinghan/jsp/GetNianXiuAndTiaoXiu.jsp",
                data: {"userid":userid,"num":num,"b":3,"appno":$('#field7728').val()},
                dataType: "text",
                success: function (rsdata) {
                    rsdata = rsdata.replace(/(^\s*)|(\s*$)/g, "");
                    eval("var obj = " + rsdata);
                    if (obj.flag == "true") {
                        qw = true;
                    } else {
                        alert(obj.info+",剩余调休假："+obj.sytx);
                        qw= false;
                    }
                },
                complete: function (xhr, ts) {
                    xhr = null;
                }
            });
            if(qw==false) return false;
        }
        return qw;
    }

    /**
     * 检测重复
     *
     */
    function getchongfu() {
        var check = "true";
        var requestid1 = document.getElementById("requestid");
        var rqid="";
        if(requestid1==null){
            rqid=0;
        }else{
            rqid=document.getElementById("requestid").value;
        }

        /*	var workcode = $("#field8361").val();//工号 */
        var userid = $("#field7729").val(); //用户id
        <!-- 获取全部明细的开始日期 -->
        var startDate = $(".detail0_3_2").children("span").text();
        <!-- 获取全部明细的结束日期 -->
        var endDate = $(".detail0_3_4").children("span").text();
        <!-- 获取全部明细的开始时间 -->
        var time1 = $(".detail0_3_3").children("span").text();
        <!-- 获取全部明细的结束时间 -->
        var time2 = $(".detail0_3_5").children("span").text();
        var json = "{'qingjia':["
        if(startDate!="" && endDate!="" && time1!="" && time2!=""){
            for (var i = 0; i < startDate.length; i = i + 10) {
                var sdate = startDate.substr(i, 10);
                var edate = endDate.substr(i, 10);
                var stime = time1.substr(i / 2, 5);
                var etime = time2.substr(i / 2, 5);
                json += "{'userid':'" + userid + "',";
                json += "'ksrq':'" + sdate + "',";
                json += "'kssj':'" + stime + "',";
                json += "'rqid':'" + rqid+ "',";
                json += "'jsrq':'" + edate + "',";
                if ((i + 10) >= startDate.length) {
                    json += "'jssj':'" + etime + "'}";
                } else {
                    json += "'jssj':'" + etime + "'},";
                }
            }
            json += "]}"
            var json12 = json.replace(/'/g, '"');
            $.ajax({
                type: "Post",
                data: "mx3info=" + json12,
                async: false,
                url: "/dinghan/jsp/Dupdetection.jsp",
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

    function qjnum(){
        var num=0;
        <!-- 获取全部明细的开始日期 -->
        var startDate = $(".detail0_3_2").children("span").text();
        <!-- 获取全部明细的结束日期 -->
        var endDate = $(".detail0_3_4").children("span").text();
        if(startDate!=""&&endDate!=""){
            for (var i = 0; i < startDate.length; i = i + 10) {
                var sdate = startDate.substr(i, 10);
                var edate = endDate.substr(i, 10);
                var ssDate= new Date(sdate);
                var seDate =new Date(edate);
                num = num + (seDate -ssDate)/(1000*3600*24)+1;
            }
            $("#field8640").val(num);
        }
    }

    /*
     *  选择时间和标准工作时间校验
     */
    function biaozhun() {
        var a = $("#field7733 option:selected").text();
        var q = a.substr(0, 5);
        var p = a.substr(6, 5);
        var timea = q.substr(1, 1);
        var timep = p.substr(0, 2);
        var timeb = q.substr(3, 2);
        var timeo = p.substr(3, 2);
        atime = parseInt(timea + timeb);
        ptime = parseInt(timep + timeo);

        var time = $(".detail0_3_3").children("span").text();
        var time2 = $(".detail0_3_5").children("span").text();
        if ((time != "") && (a != "") && (time2 != "")) {
            for (var i = 0; i < time.length; i = i + 5) {
                var e = time.substr(i, 5);
                var m = time2.substr(i, 5);
                var t2 = e.substr(0, 2);
                var m1 = m.substr(0, 2);
                var t3 = e.substr(3, 2);
                var m2 = m.substr(3, 2);
                t5 = parseInt(t2 + t3);
                m3 = parseInt(m1 + m2);
                if ((atime - t5) > 0) {
                    var a = i / 5 + 1;
                    alert("提示：第" + a + "行开始时间不得早于标准工作时间（" + q + "）");
                    return false;
                } else {
                    if ((m3 - ptime) > 0) {
                        var a = i / 5 + 1;
                        alert("提示：第" + a + "行结束时间不得晚于标准工作时间（" + p + "）");
                        return false;
                    }
                    var b = true;
                }
            }
            return b;
        } else {
            return true;
        }
    }

    /*
     *  对开始日期和申请日期的校验
     */
    function date2() {
        var w = false;
        var todaytxt = $("#field7730").val();
        var time = $(".detail0_3_2").children("span").text();
        if (time != "") {
            for (var i = 0; i < time.length; i = i + 10) {
                var q = time.substr(i, 10);
                var date11 = new Date(q);
                var date22 = new Date(todaytxt);
                if ((date22 - date11) >0) {
                    var a = i / 10 + 1;
                    alert("提示：第" + a + "行请假日期不得早于申请日期！");
                    return false;
                } else if ((date22 - date11) <= 0) {
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

    /**
     *  检测请假日期是否早于申请日期
     */
    function isEarlyThanAppDate(leaveDate){
        var appDate = $("#field7730").val();

    }

    /*
     *  对开始日期和申请日期的校验
     */
    function date() {
        var w = false;
        var todaytxt = $("#field7730").val();
        var time = $(".detail0_3_2").children("span").text();
        if (time != "") {
            for (var i = 0; i < time.length; i = i + 10) {
                var q = time.substr(i, 10);
                var date11 = new Date(q);
                var date22 = new Date();
                if ((date22 - date11) > 86400000) {
                    var a = i / 10 + 1;
                    alert("提示：第" + a + "行请假日期不得早于今天！");
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
     *  对开始日期和结束日期的校验；
     *  当开始日期和结束日期是同一天时，检验开始时间和结束时间
     */
    function date1() {
        var w = false;
        var todaytxt = $(".detail0_3_4").children("span").text();
        var time = $(".detail0_3_2").children("span").text();
        if ((time != "") && (todaytxt != "")) {
            for (var i = 0; i < time.length; i = i + 10) {
                var q = time.substr(i, 10);
                var e = todaytxt.substr(i, 10);
                var date22 = new Date(q);
                var date11 = new Date(e);
                if ((date22 - date11) > 0) {
                    var a = i / 5 + 1;
                    alert("提示：第" + a + "行结束日期不得早于开始日期！");
                    return false;
                } else if ((date22 - date11) < 0) {
                    w = true;
                } else if ((date22 - date11) == 0) {

                    var w = false;
                    var time1 = $(".detail0_3_3").children("span").text();
                    var time2 = $(".detail0_3_5").children("span").text();
                    if ((time1 != "") && (time2 != "")) {

                        var q = time1.substr(i / 2, 5);
                        var e = time2.substr(i / 2, 5);
                        var time1 = new Date(time1);

                        var timea = q.substr(0, 2);
                        var timeb = q.substr(3, 2);
                        time4 = timea + timeb;
                        time5 = parseInt(time4);
                        var t2 = e.substr(0, 2);
                        var t3 = e.substr(3, 2);
                        t4 = t2 + t3;
                        t5 = parseInt(t4);
                        if ((time5 - t5) >= 0) {
                            var a = i / 10 + 1;
                            alert("提示：第" + a + "行结束时间不得早于或等于开始时间！");
                            return false;
                        } else if ((time5 - t5) < 0) {
                            w = true;
                        }

                    } else {
                        return true;
                    }

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

/* node : 开始 end */

// JavaScript Document

$(function(){

//alert($("#div0button").html());

/*
 *  点击开始时间时，校验标准工作时间必填
 */
    changStylebyHasST($("#field7733"));

    $("#field7733").bind('change', function(){
        changStylebyHasST($("#field7733"));
    });

/*
 *  点击提交时，对日期和时间的校验，
 */
dobeforecheck = function () {
    qjnum();
    if (date()) {
        if (biaozhun()) {
            if (date1()) {
                if (beishu1()) {
                    if (biggerone()) {
						var requestid = document.getElementById("requestid");
						if(requestid==null){
							if (getchongfu() == "true") {
								return true;
							}else{
								return false;
							}
						}else{
							return true;
						}
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
        return false;
    }
}

/*
 *  对开始日期和结束日期的校验；
 *  当开始日期和结束日期是同一天时，检验开始时间和结束时间
 */
function date1() {
    var w = false;
    $("input[name^='field7743_']").each(function (i) {
        var time = $(this).val();
        var m = "field7745_" + i;
        var todaytxt = $("#" + m + "").val();
        if (time != "" && todaytxt != "") {
            var date22 = new Date(time);
            var date11 = new Date(todaytxt);
            if ((date22 - date11) > 0) {
                var a = i + 1;
                alert("提示：第" + a + "行结束日期不得早于开始日期！");
                return false;
            } else if ((date22 - date11) < 0) {
                w = true;
            } else if ((date22 - date11) == 0) {
                var z = "field8577_" + i;
                var x = "field8578_" + i;
                var q = $("#" + z + "").val();
                var e = $("#" + x + "").val();
                if (q != "" && e != "") {
                    var timea = q.substr(0, 2);
                    var timeb = q.substr(3, 2);
                    time4 = timea + timeb;
                    time5 = parseInt(time4);
                    var t2 = e.substr(0, 2);
                    var t3 = e.substr(3, 2);
                    t4 = t2 + t3;
                    t5 = parseInt(t4);
                    if ((time5 - t5) >= 0) {
                        var a = i / 10 + 1;
                        alert("提示：第" + a + "行结束时间不得早于或等于开始时间！");
                        return false;
                    } else if ((time5 - t5) < 0) {
                        w = true;
                    }
                } else {
                    return true;
                }
            }
        }
    });
    return w;
}

/*
 *  选择时间和标准工作时间校验
 */
function biaozhun() {
    var b = false;
    var a = $("#field7733 option:selected").text();
    if (a == "") {
        alert("提示：请选择标准工作时间！");
        return false;
    }
    var q = a.substr(0, 5);
    var p = a.substr(6, 5);
    var timea = q.substr(1, 1);
    var timep = p.substr(0, 2);
    var timeb = q.substr(3, 2);
    var timeo = p.substr(3, 2);
    atime = parseInt(timea + timeb);
    ptime = parseInt(timep + timeo);

    $("input[name^='field8577_']").each(function (i) {
        var e = $(this).val();
        var p = "field8578_" + i;
        var m = $("#" + p + "").val();
        if (e != "" && m != "") {
            var t2 = e.substr(0, 2);
            var m1 = m.substr(0, 2);
            var t3 = e.substr(3, 2);
            var m2 = m.substr(3, 2);
            t5 = parseInt(t2 + t3);
            m3 = parseInt(m1 + m2);
            if ((atime - t5) > 0) {
                var a = i + 1;
                alert("提示：第" + a + "行开始时间不得早于标准工作时间（" + q + "）");
                return false;
            } else {
                if ((m3 - ptime) > 0) {
                    var a = i + 1;
                    alert("提示：第" + a + "行结束时间不得晚于标准工作时间（" + p + "）");
                    return false;
                }
                b = true;
            }
        } else {
            return true;
        }
    });
    return b;
}

/*
 *  请假超过一天必须填写工作委托
 */
function biggerone() {
    var ww = false;
    $("input[name^='field7743_']").each(function (i) {
        var s1 = $(this).val();
        var a = "field7745_" + i;
        var s2 = $("#" + a + "").val();
        var date11 = new Date(s1);
        var date22 = new Date(s2);
        if ((date11 - date22) != 0) {
            var a = $("span[name='detailIndexSpan1']").text();
            if ("" == a) {
                alert("请假超过一天，必须填写工作委托");
                return false;
            } else {
                ww = true;
            }
        } else {
            ww = true;
        }

    });
    return ww;
}

function changStylebyHasST(ele){
    if($(ele).val().replace(/\s+/g,"") == ""){
        $("#button0_note").css({display: ''});
        $("#button0_tr").css({display: 'none'});
    }else{
        $("#button0_note").css({display: 'none'});
        $("#button0_tr").css({display: ''});
    }
}

function setHDTime(startTime, endTime) {
        var hdtime = 0;
        if (startTime == "" || endTime == "" || startTime >= endTime) return hdtime;
        //取标准工作
        var aWKT = $("#field7733 option:selected").text();
        if (aWKT == "") {
            alert("请选择标准工作时间");
            return hdtime;
        }

        var q = aWKT.substr(0, 5);
        var p = aWKT.substr(6, 5);
        var timea = q.substr(1, 1);
        var timep = p.substr(0, 2);
        var timeb = q.substr(3, 2);
        var timeo = p.substr(3, 2);
        <!-- 标准工作时间的开始时间和结束时间 -->
        var atime = parseInt(timea + timeb);
        var ptime = parseInt(timep + timeo);
        //上午下班时间、下午上班时间
        var rstime = 1200;
        var retime = 1300;
        if (atime == 850 && ptime == 1800) retime = 1350; //东莞

        //处理开始时间
        if (atime > startTime) startTime = atime;

        //处理结束
        if (ptime < endTime) endTime = ptime;

        if (endTime <= rstime) hdtime = endTime - startTime;
        else if (endTime <= retime) hdtime = rstime - startTime;
        else if (startTime <= rstime) hdtime = endTime - startTime - (retime - rstime);
        else if (startTime <= retime) hdtime = endTime - retime;
        else hdtime = endTime - startTime;

        if (hdtime < 0) hdtime = 0;
        else if (hdtime > 8000) hdtime = 8000;
        return hdtime;
    }
/*
 *  请假时间必须是小时的整倍数
 */
function beishu1() {
    var qw = true;
    var userid = $("#field7729").val(); //用户id
    <!-- 获取标准工作时间的开始时间；结束时间 -->
    var a = $("#field7733 option:selected").text();

    var q = a.substr(0, 5);
    var p = a.substr(6, 5);
    var timea = q.substr(1, 1);
    var timea1 = q.substr(0, 2);
    var timep = p.substr(0, 2);
    var timeb = q.substr(3, 2);
    var timeo = p.substr(3, 2);

    <!-- 标准工作时间的开始时间和结束时间 -->
    atime = parseInt(timea + timeb);
    ptime = parseInt(timep + timeo);

    var nxj=0;//年休假总数
    var txj=0;//调休假总数

    $("input[name^='field7743_']").each(function (i) {
        var s1 = $(this).val();
        var a = "field7745_" + i;
        var b = "field8577_" + i;
        var c = "field8578_" + i;
        var s2 = $("#" + a + "").val();
        <!-- 开始日期 结束日期 -->
        var date11 = new Date(s1);
        var date22 = new Date(s2);
        <!-- 开始时间 结束时间 -->
        var e = $("#" + b + "").val();
        var m = $("#" + c + "").val();
        var t2 = e.substr(0, 2);
        var m1 = m.substr(0, 2);
        var t3 = e.substr(3, 2);
        var m2 = m.substr(3, 2);
        var start = parseInt(t2 + t3);
        var end = parseInt(m1 + m2);

        var stDate=(""+s1+" "+e+"").replace(/-/g,"/");//开始
        var enDate=(""+s2+" "+m+"").replace(/-/g,"/");//结束
        var stDate1=(""+s1+" "+timep+":"+timeo+"").replace(/-/g,"/");//开始
        var enDate1=(""+s2+" "+timep+":"+timeo+"").replace(/-/g,"/");//结束
        var enDate2=(""+s2+" "+timea1+":"+timeb+"").replace(/-/g,"/");//结束
        var sta_date = new Date(stDate); 
        var end_date = new Date(enDate);
		var sss=new Date(stDate1);
		var ddd=new Date(enDate1);
		var ddd2=new Date(enDate2);
		var num2 =(ddd-sss)/(1000*3600*24);//此条明细请假天数
		var num=0;
		if(num2>0){
			if(e=="08:30"||e=="09:00"){
				num=num+8+(num2-1)*8;
			}else{
				num=num+(sss-sta_date )/(1000*3600)+(num2-1)*8;
			}

			if(m=="12:00"){
				num=num+(end_date -ddd2)/(1000*3600);
			}else{
				num=num+8
			}
		}else{
			if((e=="08:30"||e=="09:00")&&(m=="17:30"||m=="18:00")){
				num=8;
			}else{
				num=num+(end_date -sta_date )/(1000*3600);
			}
		}
        var id1 = "field7747_" + i;
        /* 请假类别 */
        var b = $("#" + id1 + "").val();
        if (b == "") {
            return true;
        }
        if(b==2){
        	nxj=nxj+num;
        }else if(b==3){
        	txj=txj+num;
        }

        var rstime = 1200;
        var retime = 1300;
        if (atime == 850 && ptime == 1800) retime = 1350; //东莞

        switch (b) {
        case "0":
        case "1":
            //上午下班时间、下午上班时间
            //判断请假是否个下午
            if (date11 - date22 == 0) {
                if ((start == atime || start == retime) && (end == rstime || end == ptime)) break;
            } else {
                if (start == atime || start == retime) {
                    if (end == rstime || end == ptime) break;
                    //判断最后一天的请假时间是否满足1小时的整数倍
                    start = ptime; //保证第一天的请假时数是整数
                } else if (end == rstime || end == ptime) {
                    //判断第一天的时间是否满足1小时的整数倍
                    end = ptime; //保证最后一天的请假时数是整数
                } else {
                    //判断请假时间是否满足1小时的整数倍
                }
            }

            var time = 0;

            if ((date11 - date22) == 0) {

                var time = setHDTime(start, end);

                if ((time % 100) != 0) {
                    alert("提示：第" + (i + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：本次请假时数不是一个小时的整数倍！");
                    return false;
                }
            } else if ((date11 - date22) != 0) {
                var time1 = setHDTime(start, ptime);
                var time2 = setHDTime(atime, end);
                if ((time1 % 100) != 0) {
                    alert("提示：第" + (i + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：第一天请假时数不是一个小时的整数倍！");
                    return false;
                } else {
                    if ((time2 % 100) != 0) {
                        alert("提示：第" + (i + 1) + "行不满足考勤规定：事假、病假最低请假单位一个小时。注：最后一天请假时数不是一个小时的整数倍！");
                        return false;
                    } else {
                        qw = true;
                    }
                }
            }
            break;
        case "2":
        case "3":
            //最小请假单位为半天（整个上午或下午或全天）且不允许销假
            if (start == atime) {
                if (end != rstime && end != ptime) {
                    alert("第" + (i + 1) + "行不满足考勤规定：年休假、调假最小请假为半天（整上午或整下午或全天");
                    flag = true;
                    return false;
                }
            } else if (start == retime) {
                if (end != rstime && end != ptime) {
                    alert("第" + (i + 1) + "行，不满足考勤规定：年休假、调休假最小请假单位为半天（整上午或整下午或全天）");
                    flag = true;
                    return false;
                }
            } else {
                alert("第" + (i + 1) + "行，不满足考勤：年休假、调休假最小请假单位为半天（整上午或整下午或全天）");
                flag = true;
                return false;
            }

            break;
        case "7":
            //每月8小时，每次只能是整个上午或下午或全天且不允许销假
            if ((date11 - date22)==0) {
                if (start == atime) {
                    if (end != rstime && end != ptime) {
                        alert("第" + (i + 1) + "行，不满足考勤规定：产检假每次只能申请半天或全天");
                        flag = true;
                        return false;
                    }
                } else if (start == retime) {
                    if (end != ptime) {
                        alert("第" + (i + 1) + "行，不满足考勤规定：产检假每次只能申请半天或全天");
                        flag = true;
                        return false;
                    }
                } else {
                    alert("第" + (i + 1) + "行，不满足考勤规定：产检假每次只能申请半天或全天");
                    flag = true;
                    return false;
                }
            } else {
                alert("第" + (i + 1) + "行，不满足考勤规定：产检假不允许跨天申请");
                flag = true;
                return false;
            }
            break;
        case "9":
            //每天只允许有一小时
            if ((date11 - date22)==0) {
                var hdtime = setHDTime(start, end);
                if (hdtime != 100) {
                    alert("第" + (i + 1) + "行，不满足考勤规定：哺乳假每次只允许请1小时");
                    flag = true;
                    return false;
                }
            } else {
                alert("第" + (i + 1) + "行，不满足考勤规定：哺乳假不允许跨天填写");
                flag = true;
                return false;
            }
            break;
        }
    });

    if(nxj!=0){
    	$.ajax({
	        type: "Post",
	        async: false,
	        url: "/dinghan/jsp/GetNianXiuAndTiaoXiu.jsp?userid="+userid+"&&num="+nxj+"&&b=2",
	        dataType: "text",
	        success: function (rsdata) {
	                rsdata = rsdata.replace(/(^\s*)|(\s*$)/g, "");
	                eval("var obj = " + rsdata);
	                if (obj.flag == "true") {
	                    qw = true;
	                } else {
	                   alert(obj.info+",剩余年休假："+obj.synx);
	                   qw=false;
	                }
	            },
	            complete: function (xhr, ts) {
	                xhr = null;
	            }
	    });
		if(qw==false){return false;}
    }

    if(txj!=0){
    	$.ajax({
	        type: "Post",
	        async: false,
	        url: "/dinghan/jsp/GetNianXiuAndTiaoXiu.jsp?userid="+userid+"&&num="+txj+"&&b=3",
	        dataType: "text",
	        success: function (rsdata) {
	                rsdata = rsdata.replace(/(^\s*)|(\s*$)/g, "");
	                eval("var obj = " + rsdata);
	                if (obj.flag == "true") {
	                    qw = true;
	                } else {
	                    alert(obj.info+",剩余调休假："+obj.sytx);
	                    qw= false;
	                }
	            },
	            complete: function (xhr, ts) {
	                xhr = null;
	            }
	    });
		if(qw==false){return false;}
    }
    return qw;
}

});

/*
 *  对开始日期和申请日期的校验
 */
function date() {
    var w = false;
    var todaytxt = $("#field7730").val();
    var date22 = new Date(todaytxt);
    $("input[name^='field7743_']").each(function (i) {
        var time = $(this).val();
        if (time != "" && todaytxt != "") {
            var date11 = new Date(time);
            if ((date22 - date11) > 86400000) {
                var a = i + 1;
                alert("提示：第" + a + "行请假日期不得早于今天！");
                return false;
            } else if ((date22 - date11) <= 86400000) {
                w = true;
            }
        } else {
            return false;
        }

    });
    return w;
}

function qjnum() {
    var num = 0;
    $("input[name^='field7743_']").each(function (i) {
        var sdate = $(this).val();
        var m = "field7745_" + i;
        var edate = $("#" + m + "").val();
        if (sdate != "" && edate != "") {
            var ssDate = new Date(sdate);
            var seDate = new Date(edate);
            num = num + (seDate - ssDate) / (1000 * 3600 * 24) + 1;

        }
    });
    $("#field8640").val(num);
    //alert($("#field8640").val();
}

/**
 * 检测重复
 *
 */
function getchongfu() {
    var check = "true";
	var requestid1 = document.getElementById("requestid");
	var rqid="";
	if(requestid1==null){
		rqid=0;
	}else{
		rqid=document.getElementById("requestid").value;
	}
    var userid = $("#field7729").val(); //用户id
    var json = "{'qingjia':[";
    $("input[name^='field7743_']").each(function (i) {
        var sdate = $(this).val();
        var a = "field7745_" + i;
        var b = "field8577_" + i;
        var c = "field8578_" + i;
        var edate = $("#" + a + "").val();
        var stime = $("#" + b + "").val();
        var etime = $("#" + c + "").val();
        if (sdate != "" && edate != "" && stime != "" && etime != "") {
            json += "{'userid':'" + userid + "',";
            json += "'ksrq':'" + sdate + "',";
            json += "'kssj':'" + stime + "',";
        	json += "'rqid':'" + rqid+ "',";
            json += "'jsrq':'" + edate + "',";
            if ((i + 1) >= $("input[name^='field7743_']").length) {
                json += "'jssj':'" + etime + "'}";
            } else {
                json += "'jssj':'" + etime + "'},";
            }
        } else {
            return true;
        }
    });
    json += "]}"
    var json12 = json.replace(/'/g, '"');
    $.ajax({
        type: "Post",
        data: {"mx3info":json12},
        async: false,
        url: "/dinghan/jsp/Dupdetection.jsp",
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

}

//自定义删除行函数（改写自系统自带的删除功能，去除confirm提示，用于自动删除明细）
function delRowCus(groupid){
	var oTable = jQuery("table#oTable"+groupid);
	var checkObj = oTable.find("input[name='check_node_"+groupid+"']:checked");
	if(checkObj.size()>0){
		var curindex = parseInt($G("nodesnum"+groupid).value);
		var submitdtlStr = $G("submitdtlid"+groupid).value;
		var deldtlStr = $G("deldtlid"+groupid).value;
		checkObj.each(function(){
			var rowIndex = jQuery(this).val();
			var belRow = oTable.find("tr[_target='datarow'][_rowindex='"+rowIndex+"']");
			var keyid = belRow.find("input[name='dtl_id_"+groupid+"_"+rowIndex+"']").val();
			//提交序号串删除对应行号
			var submitdtlArr = submitdtlStr.split(',');
			submitdtlStr = "";
			for(var i=0; i<submitdtlArr.length; i++){
				if(submitdtlArr[i] != rowIndex)
					submitdtlStr += ","+submitdtlArr[i];
			}
			if(submitdtlStr.length > 0 && submitdtlStr.substring(0,1) === ",")
				submitdtlStr = submitdtlStr.substring(1);
			//已有明细主键存隐藏域
			if(keyid != "")
				deldtlStr += ","+keyid;
			//IE下需先销毁附件上传的object对象，才能remove行
			try{
				belRow.find("td[_fieldid][_fieldtype='6_1'],td[_fieldid][_fieldtype='6_2']").each(function(){
					var swfObj = eval("oUpload"+jQuery(this).attr("_fieldid"));
					swfObj.destroy();
				});
			}catch(e){}
			belRow.remove();
			curindex--;
		});
		$G("submitdtlid"+groupid).value = submitdtlStr;
		if(deldtlStr.length >0 && deldtlStr.substring(0,1) === ",")
			deldtlStr = deldtlStr.substring(1);
		$G("deldtlid"+groupid).value = deldtlStr;
		$G("nodesnum"+groupid).value = curindex;
		//序号重排
		oTable.find("input[name='check_node_"+groupid+"']").each(function(index){
			var belRow = oTable.find("tr[_target='datarow'][_rowindex='"+jQuery(this).val()+"']");
			belRow.find("span[name='detailIndexSpan"+groupid+"']").text(index+1);
		});
		oTable.find("input[name='check_all_record']").attr("checked", false);
		//表单设计器，删除行触发公式计算
		triFormula_delRow(groupid);
		try{
			calSum(groupid);
		}catch(e){}
		try{		//自定义函数接口,必须在最后，必须try-catch
			eval("_customDelFun"+groupid+"()");
		}catch(e){}
	}
}