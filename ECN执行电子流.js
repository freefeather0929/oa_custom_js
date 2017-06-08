/**
 * Created by freef on 2017-03-21.
 * ECN执行电子流前端脚本备份
 */

//整改方案输出环节
$(function () {
    $("#field9384").attr("readonly", true);
    $("#field9385").attr("readonly", true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val();   //当前日期
        if($("#field9344 option[value='0']").attr("selected")){   //整改方案
            $("#field9384").val(curDate);
            $("#field9384span").html(curDate);
        }else{
            $("#field9384").val("");
            $("#field9384span").html("");
        }
        if($("#field9345 option[value='0']").attr("selected")){   //作业指导书
            $("#field9385").val(curDate);
            $("#field9385span").html(curDate);
        }else{
            $("#field9385").val("");
            $("#field9385span").html("");
        }
        return true;
    }
});

//整改BOM、图纸输出环节
jQuery(document).ready(function (){
    $("#field9386").attr("readonly", true);
    $("#field9387").attr("readonly", true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9492 option[value='0']").attr("selected")){ //整改BOM
            $("#field9386").val(curDate);
            $("#field9386span").html(curDate);
        }else{
            $("#field9386").val("");
            $("#field9386span").html("");
        }
        if($("#field9493 option[value='0']").attr("selected")){ //作业图纸
            $("#field9387").val(curDate);
            $("#field9387span").html(curDate);
        }else{
            $("#field9387").val("");
            $("#field9387span").html("");
        }
        return true;
    }

});

//在制-改造计划输出环节
$(function () {
    $("#field9388").attr("readonly" , true);

    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9375 option[value='0']").attr("selected")){ //改造任务令
            $("#field9388").val(curDate);
            $("#field9388span").html(curDate);
        }else {
            $("#field9388").val("");
            $("#field9388span").html("");
        }
        return true;
    }
});

//在制执行进度环节
$(function () {

    $("#field9389").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9376 option[value='0']").attr("selected")){ //在制执行确认日期
            $("#field9389").val(curDate);
            $("#field9389span").html(curDate);
        }else {
            $("#field9389").val("");
            $("#field9389span").html("");
        }
        return true;
    }

});

//在途-物控执行进度
$(function () {

    $("#field9390").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9377 option[value='0']").attr("selected")){ //在途确认时间
            $("#field9390").val(curDate);
            $("#field9390span").html(curDate);
        }else {
            $("#field9390").val("");
            $("#field9390span").html("");
        }
        return true;
    }

});

//在库-制造执行进度

$(function () {

    $("#field9391").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9379 option[value='0']").attr("selected")){ //在途确认时间
            $("#field9391").val(curDate);
            $("#field9391span").html(curDate);
        }else {
            $("#field9391").val("");
            $("#field9391span").html("");
        }
        return true;
    }

});

//在库-物流执行进度
$(function () {

    $("#field9392").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9378 option[value='0']").attr("selected")){ //在库-物流执行确认时间
            $("#field9392").val(curDate);
            $("#field9392span").html(curDate);
        }else {
            $("#field9392").val("");
            $("#field9392span").html("");
        }
        return true;
    }

});

//市场品-品质执行进度
$(function () {

    $("#field9393").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9380 option[value='0']").attr("selected")){ //在库-物流执行确认时间
            $("#field9393").val(curDate);
            $("#field9393span").html(curDate);
        }else {
            $("#field9393").val("");
            $("#field9393span").html("");
        }
        return true;
    }

});


//执行结果确认
$(function () {

    $("#field9394").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期
        if($("#field9381 option[value='0']").attr("selected")){ //执行完成确认时间
            $("#field9394").val(curDate);
            $("#field9394span").html(curDate);
        }else {
            $("#field9394").val("");
            $("#field9394span").html("");
        }
        return true;
    }

});

//执行总结环节
$(function () {

    $("#field9395").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期

        $("#field9395").val(curDate);   //总结时间
        $("#field9395span").html(curDate);
        return true;
    }

});

//ECN申请人确认结束
$(function () {

    $("#field9395").attr("readonly" , true);
    checkCustomize = function(){
        var curDate = $("input[name='currentdate']").val(); //当前日期

        $("#field9395").val(curDate);   //总结时间
        $("#field9395span").html(curDate);
        return true;
    }

});