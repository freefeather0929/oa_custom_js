/**
 * Created by freef on 2017-03-30.
 */

/* 开始环节 start */
$(function(){

    if(wf__info.requestid=="0" || wf__info.requestid==""){
        $("#field9632").val("");  //电气
        $("#field9634").val("");  //硬件
        $("#field9636").val("");  //结构
        $("#field9633").val("");  //电子工艺
        $("#field9635").val("");  //软件
        $("#field9632span").html("");  //电气
        $("#field9634span").html("");  //硬件
        $("#field9636span").html("");  //结构
        $("#field9633span").html("");  //电子工艺
        $("#field9635span").html("");  //软件
    }
});

/* 开始环节 end */

/*——————————————————————————华丽的分割线——————————————————————————*/



/* 总工审核环节 start */

$(function(){
    bindClearFieldBySelectValue();
    //自定义提交前检测
    checkCustomize = function(){
        setCollectMeasurePsns();
        return true;
    };

});

/**
 * 功能：向总体技术评审人字段赋值，用于总体技术评审环节的处理人
 */
function setCollectMeasurePsns(){

    if($("#field9169 option[value='0']").is(":selected")){
        var psns = "";
        psns += $("#field9632").val() + ",";  //电气
        psns += $("#field9634").val() + ",";  //硬件
        psns += $("#field9636").val() + ",";  //结构
        psns += $("#field9633").val() + ",";  //电子工艺
        psns += $("#field9635").val();  //软件

        $("#field9642").val(psns);
    }

}

/**
 * 功能：根据选择框条件清空对应字段值
 */
function bindClearFieldBySelectValue(){
    bindClearMajorChange();

}

/**
 * 功能：根据工总审核选择清空对应字段值
 */
function bindClearMajorChange(){

    $("#field9622").bind('change',function(){    //总工审核选项
        //alert(this.value);
        if(!$("option[value='0']",this).is(":selected")) {
            $("#field9623 option[value='']").attr('selected',true);  //重大改变
        }
    });

}
/* 总工审核环节 end */

/*——————————————————————————华丽的分割线——————————————————————————*/

/* 总体技术评审环节  start  -- 移动端 */

$(function(){

    var checkOjb = setEditableForCurUser();
    setEditableForCurUser();
    var json = eval('(' + checkOjb + ')');

    checkCustomize = function(){
        var need;
        for(var i = 0;i<json.checkmap.length;i++){
            need = json.checkmap[i].need;
            if(need == "1"){
                if($("#field"+json.checkmap[i].id+" option[value='']").attr("selected")){
                    alert(json.checkmap[i].msg);
                    $("#field"+json.checkmap[i].id).css({backgroundColor:'#FFFF00'});
                    return false;
                }
            }
        }

        $("select").attr("disabled",false);
        return true;
    }
});

/**
 * 功能：根据当前查看人设置总体评审人填写的可填写字段；
 * 移动端定制
 */
function setEditableForCurUser(){
    var checkJson = "{\"checkmap\":[";
    var _curUserID = wf__info.f_bel_userid;
    var elecPsn = $("#field9632").val();
    var darkwarePsn = $("#field9634").val();
    var construcPsn = $("#field9636").val();
    var electechPsn = $("#field9633").val();
    var softPsn = $("#field9635").val();

    checkJson += "{\"id\":\"9625\",\"msg\":\"请选择电气审核意见！\"";
    if(_curUserID == elecPsn){  //电气
        checkJson += ",\"need\":\"1\"";
        //setNeedcheck(9625);
        //setNeedcheck(9637);
    }else{
        checkJson += ",\"need\":\"0\"";
        //setNotNeedcheck(9625);
        //setNotNeedcheck(9637);
        $("#field9625").attr("disabled",true);
        $("#field9637").attr("readonly",true);
    }
    checkJson += "},";
    checkJson += "{\"id\":\"9627\",\"msg\":\"请选择硬件审核意见！\"";
    if(_curUserID == darkwarePsn){  //硬件
        checkJson += ",\"need\":\"1\"";
        //setNeedcheck(9627);
        //setNeedcheck(9639);
    }else{
        checkJson += ",\"need\":\"0\"";
        //setNotNeedcheck(9627);
        //setNotNeedcheck(9639);
        $("#field9627").attr("disabled",true);
        $("#field9639").attr("readonly",true);
    }
    checkJson += "},";
    checkJson += "{\"id\":\"9629\",\"msg\":\"请选择结构审核意见！\"";
    if(_curUserID == construcPsn){  //结构
        checkJson += ",\"need\":\"1\"";
        //setNeedcheck(9629);
        //setNeedcheck(9641);
    }else{
        checkJson += ",\"need\":\"0\"";
        //setNotNeedcheck(9629);
        //setNotNeedcheck(9641);
        $("#field9629").attr("disabled",true);
        $("#field9641").attr("readonly",true);
    }
    checkJson += "},";
    checkJson += "{\"id\":\"9626\",\"msg\":\"请选择电子工艺审核意见！\"";
    if(_curUserID == electechPsn){  //电子工艺
        checkJson += ",\"need\":\"1\"";
        //setNeedcheck(9626);
        //setNeedcheck(9638);
    }else{
        checkJson += ",\"need\":\"0\"";
        //setNotNeedcheck(9638);
        //setNotNeedcheck(9638);
        $("#field9638").attr("disabled",true);
        $("#field9638").attr("readonly",true);
    }
    checkJson += "},";
    checkJson += "{\"id\":\"9626\",\"msg\":\"请选择软件审核意见！\"";
    if(_curUserID == softPsn){  //软件
        checkJson += ",\"need\":\"1\"";
        //setNeedcheck(9628);
        //setNeedcheck(9640);
    }else{
        checkJson += ",\"need\":\"0\"";
        //setNotNeedcheck(9628);
        //setNotNeedcheck(9640);
        $("#field9628").attr("disabled",true);
        $("#field9640").attr("readonly",true);
    }
    checkJson += "}";
    checkJson += "]}";
    return checkJson;
}

/* 总体技术评审环节 end -- 移动端*/

/* 总体技术评审环节  start  -- PC端 */

$(function(){

    setEditableForCurUser();

    checkCustomize = function(){
        $("select").attr("disabled",false);
        return true;
    }

});

/**
 * 功能：根据当前查看人设置总体评审人填写的可填写字段；
 * 移动端定制
 */
function setEditableForCurUser(){

    var _curUserID = wf__info.f_bel_userid;

    var elecPsn = $("#field9632").val();
    var darkwarePsn = $("#field9634").val();
    var construcPsn = $("#field9636").val();
    var electechPsn = $("#field9633").val();
    var softPsn = $("#field9635").val();

    if(_curUserID == elecPsn){  //电气

        setNeedcheck(9625);
        setNeedcheck(9637);
    }else{

        setNotNeedcheck(9625);
        setNotNeedcheck(9637);
        $("#field9625").attr("disabled",true);
        $("#field9637").attr("readonly",true);
    }

    if(_curUserID == darkwarePsn){  //硬件

        setNeedcheck(9627);
        setNeedcheck(9639);
    }else{

        setNotNeedcheck(9627);
        setNotNeedcheck(9639);
        $("#field9627").attr("disabled",true);
        $("#field9639").attr("readonly",true);
    }

    if(_curUserID == construcPsn){  //结构

        setNeedcheck(9629);
        setNeedcheck(9641);
    }else{

        setNotNeedcheck(9629);
        setNotNeedcheck(9641);
        $("#field9629").attr("disabled",true);
        $("#field9641").attr("readonly",true);
    }

    if(_curUserID == electechPsn){  //电子工艺

        setNeedcheck(9626);
        setNeedcheck(9638);
    }else{

        setNotNeedcheck(9638);
        setNotNeedcheck(9638);
        $("#field9638").attr("disabled",true);
        $("#field9638").attr("readonly",true);
    }

    if(_curUserID == softPsn){  //软件

        setNeedcheck(9628);
        setNeedcheck(9640);
    }else{

        setNotNeedcheck(9628);
        setNotNeedcheck(9640);
        $("#field9628").attr("disabled",true);
        $("#field9640").attr("readonly",true);
    }

}

//将某个字段设置为必填
function setNeedcheck(i){//设置需要必填 i 数字id
    var str = ',field'+i;
    var needchecklists = document.all("needcheck");
    if(needchecklists.value.search(str)<0){
        needchecklists.value = needchecklists.value+str;
    }
    var  f = jQuery("#field"+i+"span");
    var  fv= jQuery("#field"+i);
    if(fv.val()=='')
        f.html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
}

//将某个字段设置为不必填
function setNotNeedcheck(i){// i 数字id
    var str = ',field'+i;
    var needchecklists = document.all("needcheck");
    needchecklists.value = needchecklists.value.replace(str,'');
    var  f = jQuery("#field"+i+"span");
    var  fv= jQuery("#field"+i);
    if(fv.val()=='')
        f.html('');
}

/* 总体技术评审环节  end  -- PC端 */