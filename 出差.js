/**
 * Created by freef on 2017-03-23.
 */
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
/*
* 页面加载完成后，设置多行文本动态显示行高，文本框的只读
*/
$(function(){
    var bumen = $("#field7779span").text();
    if(bumen=="客户服务部"){
        $(".mainTd_19_0").parent().show();
        $(".mainTd_20_0").parent().show();
        $(".mainTd_15_0").parent().show();
        $(".mainTd_16_0").parent().show();
        $(".mainTd_17_0").parent().show();
        $(".mainTd_18_0").parent().show();
    }else{
        $(".mainTd_19_0").parent().hide();
        $(".mainTd_20_0").parent().hide();
        $(".mainTd_15_0").parent().hide();
        $(".mainTd_16_0").parent().hide();
        $(".mainTd_17_0").parent().hide();
        $(".mainTd_18_0").parent().hide();
    }

    $("#field7815").css("width","97%");
    $("#field7805").css("width","97%");
    $("#field7791").css("width","97%");
    $("#field7792").css("width","97%");

    $('textarea').keyup(function () {
        autoResize('field7791',2,1000);
        autoResize('field7792',2,1000);
    });

});
/**
 * 功能：textarea自增高度
 * @param id -- textarea元素ID
 */
function autoResize(id,minRows,maxRows){
    var t = document.getElementById(id);
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
        } else {
            t.style.overflowY = "auto";
            break;
        }
    }
}

/*
 *  提交前检验
 */
checkCustomize = function (){
    /*if(!checktime()){
        return false;
    }*/
    if(date()){
        if(time()){
            return true;
        } else {
            return false;
        }
    }else{
        return false;
    }
}

/**
 * （已废弃）
 * 功能：检测当前日期和预计结束日期，如果当前日期小于预计结束日期，则禁止提交
 * @returns {boolean}
 */
/*
function checktime(){
    var jsrq=$("#field7787").val(); //结束日期
    var jssj=$("#field8311").val(); //结束时间
    var stDate=(""+jsrq+" "+jssj+":00").replace(/-/g,"/");//开始
    var D = new Date(stDate);
    var date = new Date();
    if((date-D)>0){
        return true;
    }else{
        alert("当前日期日期早于出差结束日期，不得提交！");
        return false;
    }
}
*/

/*
 * 功能：校验实际出差日期
 * 说明：实际出差开始日期不能早于预计出差开始日期
 */
/*function checkReportDate(){
    var preStartDate =$("#field7785").val();   //预计出差日期 -- preStartDate
    var reportStartDate = $("#field7801").val();    //实际出差日期 -- reportStartDate
    if(time!=""){
        var date_report = new Date(reportStartDate);
        var date_pre = new Date(preStartDate);
        if(date_pre - date_report>0){
            alert("提示：实际出差日期不得早于预计出差日期！");
            return false;
        }else if(date_pre - date_report<=0){
            return true;
        }
    }else{
        return true;
    }
}*/

/*
 * 功能：校验实际出差日期 -- 替代原 “date()” 函数（原来的名字起得实在无语……）
 * 说明：实际出差开始日期不能早于预计出差开始日期
 */
function checkReportDate(){
    var preStartDate =$("#field7785").val();   //预计出差日期 -- preStartDate
    var reportStartDate = $("#field7801").val();    //实际出差日期 -- reportStartDate
    if(reportStartDate!=""){
        var date_report = reportStartDate;
        var date_pre = preStartDate;
        if(date_pre > date_report){
            alert("提示：实际出差开始日期（"+date_report+"），不得早于预计出差日期（"+date_pre+"）！");
            return false;
        }else if(date_pre <= date_report){
            return true;
        }
    }else{
        return true;
    }
}

/**
 *  功能：对结束日期和开始日期的校验
 *  @return {boolean}
 */
function time() {
    var todaytxt = $("#field7801span").text();  //实际开始日期
    var time = $("#field7803span").text();  //实际结束日期
    if (time != "") {
        var date11 = new Date(time);
        var date22 = new Date(todaytxt);
        if ( (date22 - date11) > 0) {
            alert("提示：实际出差结束日期不得早于实际出差开始时间！");
            return false;
        } else if ((date22 - date11) < 0) {
            return true;
        } else if ((date22 - date11) == 0) {
            var tim1 = $("#field8313span").text();
            var tim2 = $("#field8314span").text();
            if ((tim1 != "") && (tim2 != "")) {
                var a1 = tim1.substr(0, 2);
                var a3 = tim1.substr(3, 2);
                a4 = a1 + a3;
                a5 = parseInt(a4);
                var t2 = tim2.substr(0, 2);
                var t3 = tim2.substr(3, 2);
                t4 = t2 + t3;
                t5 = parseInt(t4);
                if ((a5 - t5) > 0) {
                    alert("提示：结束时间不得早于开始时间！");
                    return false;
                } else if ((a5 - t5) <= 0) {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}

(function($){

    $(function () {
        $("#field7801_tdwrap").parent().hide();
        $("#field7803_tdwrap").parent().hide();

        $("#field7791").css("width", "97%");
        $("#field7792").css("width", "97%");
        var minRows = 2;
        // 最大高度，超过则出现滚动条
        var maxRows = 1000;

        function autoResize() {
            var t = document.getElementById('field7791');
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

        function autoResize11() {
            var t = document.getElementById('field7792');
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
            autoResize11();
        });


    })

    /*
     *  检测重复ajax
     */
    function chongfu() {
        var check = "true";
        var requestid1 = document.getElementById("requestid");
        var rqid = "";
        if (requestid1 == null) {
            rqid = 0;
        } else {
            rqid = document.getElementById("requestid").value;
        }
        var userid = $("#field7777").val(); //申请人
        var startDate = $("#field7785span").text(); //开始日期
        var endDate = $("#field7787span").text(); //结束日期
        var startTime = $("#field8310span").text(); //开始时间
        var endTime = $("#field8311span").text(); //结束时间
        if (startDate != "" && endDate != "" && startTime != "" && endTime != "") {
            var json = "{'userid':'" + userid + "','ksrq':'" + startDate + "','jsrq':'" + endDate + "','kssj':'" + startTime + "','rqid':'" + rqid + "','jssj':'" + endTime + "'}";
            var chuchai = json.replace(/'/g, '"');
            $.ajax({
                type: "Post",
                data: "chuchai=" + chuchai,
                async: false,
                url: "/dinghan/jsp/ChuChaiCheck.jsp",
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
        }
        return check;
    }

    function ccnum() {
        var num = 0;
        <!-- 获取全部明细的开始日期 -->
        var startDate = $("#field7785span").text();
        <!-- 获取全部明细的结束日期 -->
        var endDate = $("#field7787span").text();
        if (startDate != "" && endDate != "") {
            for (var i = 0; i < startDate.length; i = i + 10) {
                var sdate = startDate.substr(i, 10);
                var edate = endDate.substr(i, 10);
                var startDate = new Date(sdate);
                var endDate = new Date(edate);
                num = num + (endDate - startDate) / (1000 * 3600 * 24) + 1;
            }
            $("#field7924").val(num);
        }
    }

    function fuzhi(){
        var startDate = $("#field7785span").text(); //开始日期
        var endDate = $("#field7787span").text(); //结束日期
        var startTime = $("#field8310span").text(); //开始时间
        var endTime = $("#field8311span").text(); //结束时间
        $("#field7801").val(startDate);
        $("#field8313").val(startTime);
        $("#field7803").val(endDate);
        $("#field8314").val(endTime);
    }

    /*
     *  点击提交时，对日期和时间的校验，
     */
    checkCustomize = function () {
        ccnum();
        if (true) {
            if (time()) {
                if (chongfu() == "true") {
                    return true;
                } else {
                    return false;
                }

            }
            return false;
        } else {
            return false;
        }
    }



    /*
     *  对日期的校验
     */
    function date() {
        var todaytxt = $("#field7778").val();
        var time = $("#field7785span").text();
        if (time != "") {
            var date11 = new Date(time);
            var date22 = new Date();
            if ((date22 - date11) > 0) {
                alert("提示：出差日期不得早于今天！");
                return false;
            } else if ((date22 - date11) <= 0) {
                return true;
            }

        } else {
            return true;
        }
    }

    /*
     *  对结束日期和开始日期的校验
     */
    function time() {
        var todaytxt = $("#field7785span").text();
        var time = $("#field7787span").text();
        if ((time != "") && (todaytxt != "")) {
            var date11 = new Date(time);
            var date22 = new Date(todaytxt);
            if ((date22 - date11) > 0) {
                alert("提示：出差结束日期不得早于出差开始时间！");
                return false;
            } else if ((date22 - date11) < 0) {
                return true;
            } else if ((date22 - date11) == 0) {

                var tim1 = $("#field8310span").text();
                var tim2 = $("#field8311span").text();
                if ((tim1 != "") && (tim2 != "")) {

                    var a1 = tim1.substr(0, 2);
                    var a3 = tim1.substr(3, 2);
                    a4 = a1 + a3;
                    a5 = parseInt(a4);
                    var t2 = tim2.substr(0, 2);
                    var t3 = tim2.substr(3, 2);
                    t4 = t2 + t3;
                    t5 = parseInt(t4);
                    if ((a5 - t5) > 0) {
                        alert("提示：结束时间不得早于开始时间！");
                        return false;
                    } else if ((a5 - t5) <= 0) {
                        return true;
                    }
                } else {
                    return true;
                }


            }
        } else {
            return true;
        }
    }

})(jQuery)


