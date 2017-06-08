/**
 * Created by zhangxiaoyu on 2017-04-12.
 */

/******* 开始环节 ******/

$(function(){
    var i=1;

    $("#field9555").change(function() {
        if(i%2==0){
            setNotNeedcheck(9557);
        }else{
            setNeedcheck(9557);
        }
        i++;
    });

    checkCustomize = function(){

        if(i%2==0){
            var attachNum = $("#field9557_idnum_1").val();
            var attachTmpNum = 0;
            if($("#fsUploadProgress9557 .progressBarStatus").size()>0){
                $("#fsUploadProgress9557 .progressBarStatus").each(function(){
                    if($(this).html().replace(/\s+/g,"") != "Cancelled"){
                        attachTmpNum ++;
                    }
                });
            }
            if(attachNum == undefined || attachNum == 0){
                if(attachTmpNum == 0){
                    alert("请上传配置文件！");
                    return false;
                }else{
                    return true;
                }
            }

        }else{
            return true;
        }

    }

});

/*
function setNotNeedcheck(i){// i 数字id
    var str = ',field'+i;
    var needchecklists = document.all("needcheck");
    needchecklists.value = needchecklists.value.replace(str,'');
    var  f = jQuery("#field"+i+"span");
    var  fv= jQuery("#field"+i);
    if(fv.val()=='')
        f.html('');
}
*/

$(function(){

    var i=1;
    $("#field9555").change('change', function() {
        i=i+1;
    });

});


function setNeedcheck(i){   //设置需要必填 i 数字id
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