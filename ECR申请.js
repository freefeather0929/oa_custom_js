/**
 * Created by zhangxiaoyu / 10593 on 2017/5/11.
 */

/******************  开始环节 start ********************/

(function($){

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
            $("#field9620").val("");    //知会人员
            $("#field9620span").html("");    //知会人员
        }
    });

})(jQuery)

/******************  开始环节 end ********************/


/******************  产品审核环节 start  ******************/
(function($){
    $(function(){

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

        if($("#field9623 option[value='0']").is(":selected")){  //重大改变
            var psns = "";
            psns += $("#field9632").val() + ",";  //电气
            psns += $("#field9634").val() + ",";  //硬件
            psns += $("#field9636").val() + ",";  //结构
            psns += $("#field9633").val() + ",";  //电子工艺
            psns += $("#field9635").val();  //软件

            $("#field9642").val(psns);
        }
    }
})(jQuery)

/******************  产品审核环节 end  ******************/