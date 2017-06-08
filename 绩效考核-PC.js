/**** 绩效考核各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
$(function(){
    if($("input[name='iscreate']").val()==1 && (wf__info.requestid == 0 || wf__info.requestid == "") ){
        getCurrentSeason();
        isFilled();
    }
    //加载部门kpi
    if($("#field8626").val()!=""){
        $("#deptkpi_div").html($("#field8626").val());
    }
    //定制提交前检测
    checkCustomize = function(){
        if($("#field8627").val()!=100){
            alert("kpi权重的合计必须为100，请调整你填写的权重！");
            return false;
        }
        return true;
    }
});

function getCurrentSeason(){
    if($("input[name='iscreate']").val()==1 && (wf__info.requestid == 0 || wf__info.requestid == "") ){
        var curDate = $("#field7708").val();
        var curMonth = curDate.slice(5,7);
        curMonth = parseInt(curMonth,10);
        var seasonOpt = "一";
        if(curMonth>9){
            seasonOpt = "四";
        }else if(curMonth>5){
            seasonOpt = "三";
        }else if(curMonth>3){
            seasonOpt = "二";
        }
        $("#field7717").val(seasonOpt);
        $("#field7717span").html(seasonOpt);
    }
}

//判断是否已经填写过季度绩效考核流程
function isFilled(){
    $.ajax({
        method:'post',
        url:'/dinghan/jsp/IsFillSeasonKpi.jsp',
        data:{formid:wf__info.formid},
        async:false,
        success:function(data){
            eval("var obj="+data);
            if(obj.filled == 1){
                alert("你已经填写过本季度的kpi考核流程，即将为您跳转到该流程！");
                openFullWindowHaveBarForWFList("/workflow/request/ViewRequest.jsp?requestid="+obj.requestid+"&isovertime=0","'"+obj.requestid+"'");
                window.top.close();
            }else{
                if(obj.kpicount == 0){
                    alert("部门KPI未配置，请提醒您所在的一级部门主管填写KPI！");
                    window.top.close();
                }
                if(obj.exampsn == "" || obj.reviewpsn == ""){
                    alert("你的绩效考核关系没有正确配置，请与人力资源部绩效考核管理的负责人联系！")
                    window.top.close();
                }
                var kpis = obj.kpis;
                sHtml = "<table style='width:100%;border:solid 1px #CDCDCD;border-collapse:collapse;work-break:break-all'>";
                sHtml += "<tr>";
                sHtml += "<td style='width:10%;text-align:center;border:solid 1px #CDCDCD;height:25px;padding:5px;background-color:#3c78d8;color:#fff'>序号</td>";
                sHtml += "<td style='width:45%;text-align:center;border:solid 1px #CDCDCD;height:25px;padding:5px;background-color:#3c78d8;color:#fff'>KPI指标</td>";
                sHtml += "<td style='width:45%;text-align:center;border:solid 1px #CDCDCD;height:25px;padding:5px;background-color:#3c78d8;color:#fff'>考核标准</td>";
                sHtml += "</tr>";
                for(var i=0;i<kpis.length;i++){
                    sHtml += "<tr>";
                    sHtml += "<td style='text-align:center;border:solid 1px #CDCDCD;height:30px;padding:5px'>"+(i+1)+"</td>";
                    sHtml += "<td style='border:solid 1px #CDCDCD;height:30px;padding:5px'>"+kpis[i].target+"</td>";
                    sHtml += "<td style='border:solid 1px #CDCDCD;height:30px;padding:5px'>"+decodeURI(kpis[i].standard)+"</td>";
                    sHtml += "</tr>";
                }
                sHtml += "</table>";
                $("#field8626").val(sHtml);
                $("#deptkpi_div").html($("#field8626").val());

                //给考核关系人赋值
                $("#field7714").val(obj.exampsn);
                sHtml = "<a href='javaScript:openhrm("+obj.exampsn+");' onclick='pointerXY(event);'>"+obj.exampsnname+"</a>"
                $("#field7714span").html(sHtml);
                $("#field7715").val(obj.reviewpsn);
                sHtml = "<a href='javaScript:openhrm("+obj.reviewpsn+");' onclick='pointerXY(event);'>"+obj.reviewpsnname+"</a>"
                $("#field7715span").html(sHtml);

                if(obj.cross.length>0){
                    //清空当前已经存在的跨部门kpi项目
                    if($("input[name='check_node_4']").length>0){
                        $("input[name='check_node_4']").attr("checked",true);
                        delRowCus(4);
                    }
                    for(var i=0;i<obj.cross.length;i++){
                        addRow4(4);
                        var dt4lastrow =  $("input[name='check_node_4']:last").parent().parent();
                        var dt4lastrowIndex = $(dt4lastrow).attr("_rowindex");
                        $("#field7857_"+dt4lastrowIndex).val(obj.cross[i].agentid);
                        sHtml = "<a href='javaScript:openhrm("+obj.cross[i].agentid+");' onclick='pointerXY(event);'>"+obj.cross[i].agendname+"</a>"
                        $("#field7857_"+dt4lastrowIndex+"span").html(sHtml);
                    }
                }
            }
        }
    });
}
//*******开始环节 javascript 代码 end********************************************************************************

//*******考核责任者填写kpi javascript 代码 start PC端********************************************************************************
$(function(){

    setCrossKpiRowsReadonly();
    //一个临时按钮
    $("#tmp_div").html("<input type='button' onclick='getEmployeeKPI()' value='测试按钮'></input>");
    $("#field7833").attr("readonly", true);    //kpi权重总合计设置为只读
    //加载部门kpi
    if($("#field8626").val()!=""){
        $("#deptkpi_div").html($("#field8626").val());    //部门kpi在开始环节获取之后保存在字段：field8626 中；
    }

    $("button[name='addbutton4']").bind('click',function(){    //跨部门目标明细创建按钮绑定函数。
        var dt4ltrow = $("input[name='check_node_4']:last").parent().parent();
        var dt4ltrowIndex = $(dt4ltrow).attr("_rowindex");
        $("#field7857_"+dt4ltrowIndex).val("");  //新增kpi目标列表时，清空评审人。
        $("#field7857_"+dt4ltrowIndex+"span").html("");
    });

    $("button[name='addbutton1']").bind('click',function(){     //KPI新增明细触发函数
        var dt1ltrowIndex = $("input[name='check_node_1']:last").val();
        $("#field8636_"+dt1ltrowIndex+" option[value='1']").attr("selected", true);
    });

    //定制提交前检测
    checkCustomize = function(){
        //计算kpi总权重；
        if(countTotalwieght()==false)  return false;
        //复制跨步门项目到kpi目标列表
        copyCrossToKpiList();
        return true  //false
    }
});

//在kpi项目表中跨部门项目为只读
function setCrossKpiRowsReadonly(){
    var row,rowIndex;
    $("input[name='check_node_1']").each(function(i,n){
        row = $(n).parent().parent();
        rowIndex = $(row).attr("_rowindex");
        if($("#field8636_"+rowIndex+" option[value='0']").attr("selected")){
            setNotNeedcheck("7821_"+rowIndex);
            setNotNeedcheck("7822_"+rowIndex);
            setNotNeedcheck("7823_"+rowIndex);
            $("#field7821_"+rowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
            $("#field7822_"+rowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
            $("#field7823_"+rowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
            $(row).css({backgroundColor:'#c9daf8'});
        }
    });
}

//计算kpi总权重；
function countTotalwieght(){
    var totalkpiweight = 0.00;
    var flag = true;
    var dt4row,dt4rowIndex,dt1row,dt1rowIndex,numTmp;
    $("input[name='check_node_4']").each(function(i,n){    //加和跨部门项目的权重
        dt4row =  $(n).parent().parent();
        dt4rowIndex = $(dt4row).attr("_rowindex");
        numTmp = $("#field7855_"+dt4rowIndex).val();
        totalkpiweight += numTmp==""?0:parseFloat(numTmp,10);
    });
    $("input[name='check_node_1']").each(function(i,n){   //加和kpi目标列表中非跨部门目标的权重
        dt1row =  $(n).parent().parent();
        dt1rowIndex = $(dt1row).attr("_rowindex");
        if($("#field8636_"+dt1rowIndex).val()==1 || $("#field8636_"+dt1rowIndex).val()==""){
            numTmp = $("#field7823_"+dt1rowIndex).val();
            totalkpiweight += numTmp==""?0.00:parseFloat($("#field7823_"+dt1rowIndex).val(),10);
        }
    });
    $("#field7833").val(totalkpiweight);    //向权重总计字段赋值
    //$("#field7833span").html(totalkpiweight);
    if($("#field7833").val()!=100){
        alert("权重合计必须为100，请调整您填写的权重。当前总权重为："+$("#field7833").val()+"%");
        flag = false;
    }
    return flag;
}

//拷贝跨部门项目到kpi目标列表；
function copyCrossToKpiList(){

    if($("input[name='check_node_4']").size() > 0){
        var rowtmp,rowtmpIndex,crossRow,crossRowIndex,crossid,uncrossid,flag;
        var uncopyId = "";  //记录在跨部门项目明细中没有被删除的明细ID  --  未被删除的跨部门明细不需要被再次拷贝到kpi列表中，也不需要从kpi列表中删除。
        var uncopyIdArray;    //未被删除记录数组
        $("input[name='check_node_1']").each(function(i,n){    //删除kpi目标列表中所有已经存在的跨部门项目目标行
            flag = true;
            rowtmp = $(n).parent().parent();
            rowtmpIndex = $(n).val();
            if($("#field8636_"+rowtmpIndex+" option[value='0']").is(":selected")){
                crossid = $("#field9194_"+rowtmpIndex).val();
                //alert("crossid : : "+crossid);
                $("input[name='check_node_4']").each(function(k,m){
                    crossRow = $(m).parent().parent();
                    crossRowIndex = $(m).val();
                    uncrossid = $("input[name='dtl_id_4_"+crossRowIndex +"']",$(m).parent()).val();
                    //alert($("input[name='dtl_id_4_"+crossRowIndex +"']",$(m).parent()).val());
                    if($("input[name='dtl_id_4_"+crossRowIndex +"']",$(m).parent()).val() == crossid){
                        flag = false;
                        return false;
                    }
                });

                if(flag){
                    if(uncopyId != ""){
                        uncopyId += ",";
                    }
                    uncopyId += uncrossid;
                    $(n).attr("checked", true);
                }
            }
        });
        if(copyId.replace(/\s+/g,"")!=""){
            uncopyIdArray = uncopyId.split(",");
            delRowCus(1);    //执行删除的函数
            var dt1ltrow,dt1ltrowIndex,dt4tmprow,dt4tmprowIndex;
            $("input[name='check_node_4']").each(function(i,n){    //拷贝所有跨部门项目行中的权重、负责人
                dt4tmprow = $(n).parent().parent();
                dt4tmprowIndex = $(dt4tmprow).attr("_rowindex");
                crossid = $("input[name='dtl_id_4_"+dt4tmprowIndex +"']",$(n).parent()).val();
                //alert(crossid);
                //alert(copyIdArray.indexOf(crossid));
                if(uncopyIdArray.indexOf(crossid) < 0){
                    addRow1(1);
                    dt1ltrow = $("input[name='check_node_1']:last").parent().parent();
                    dt1ltrowIndex = $(dt1ltrow).attr("_rowindex");
                    $("#field7823_"+dt1ltrowIndex).val($("#field7855_"+dt4tmprowIndex).val());    //权重
                    setNotNeedcheck("7821_"+dt1ltrowIndex);

                    $("#field7827_"+dt1ltrowIndex).val($("#field7857_"+dt4tmprowIndex).val());    //负责人

                    setNotNeedcheck("7822_"+dt1ltrowIndex);
                    $("#field7827_"+dt1ltrowIndex+"span a").replaceWith($("#field7857_"+dt4tmprowIndex+"span span a").clone());    //负责人的姓名和链接
                    $("#field8636_"+dt1ltrowIndex+" option[value='0']").attr("selected",true);    //标记该行为跨部门目标
                    $("#field9194_"+dt1ltrowIndex).val(crossid);  //记录跨部门项目明细的id

                    $("#field7821_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
                    $("#field7822_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
                    $("#field7823_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor:'#c9daf8'});
                    $(dt1ltrow).css({backgroundColor:'#c9daf8'});
                }
            });
        }
    }
}

//提取员工填写KPI
function getEmployeeKPI(){
    var rowIndex,dt1ltrowIndex;
    var isHasEmployeeKPI = false;
    if($("input[name='check_node_1']").size()>0){
        $("input[name='check_node_1']").each(function(i,n){
            rowIndex = $(n).val();

            if($("#field8636_"+rowIndex+" option[value='1']").is(":selected")) {
                isHasEmployeeKPI = true;
                return false;
            }
        });
    }
    if(isHasEmployeeKPI){
        if(confirm("提取员工KPI将删除之已经提取的员工KPI以及你填写的KPI指标及标准,确认要继续吗？")){
            $("input[name='check_node_1']").each(function(i,n){
                rowIndex = $(n).val();
                if($("#field8636_"+rowIndex+" option[value='1']").is(":selected")) {
                    $(n).attr("checked", true);
                }
            });
            delRowCus(1);
        }else{
            return false;
        }
    }
    //开始复制员工KPI
    $("input[name='check_node_0']").each(function(i,n){
        rowIndex = $(n).val();
        addRow1(1);
        dt1ltrowIndex = $("input[name='check_node_1']:last").val();
        $("#field7821_"+dt1ltrowIndex).html($("#field7818_"+rowIndex).html());
        $("#field7822_"+dt1ltrowIndex).html($("#field7819_"+rowIndex).html());
        $("#field7823_"+dt1ltrowIndex).val($("#field7820_"+rowIndex).val());
        $("#field8636_"+dt1ltrowIndex+" option[value='1']").attr("selected", true);
    });

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
        f.html("<img src='/images/BacoError_wev8.gif' align=absMiddle>");
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
//*******考核责任者填写kpi javascript 代码 end********************************************************************************

//*******跨部门项目负责人填写kpi javascript 代码 start********************************************************************************
$(function(){
    //加载部门kpi
    if($("#field8626").val()!=""){
        $("#deptkpi_div").html($("#field8626").val());
    }
    //对当前登录人做判断
    ChangeKLEditableByCurUser();

    //定制提交前检测
    checkCustomize = function(){
        if($("#field7833").val()!=100){
            alert("kpi权重的合计必须为100，请调整你填写的权重！当前权重总计为："+$("#field7833").val()+"%");
            return false;
        }
        return true;
    }
});

//判断当前登录人变更kpi目标行的可填写属性;
function ChangeKLEditableByCurUser(){
    var curUserId = wf__info.f_bel_userid;
    $("input[name='check_node_1']").each(function(i,n){
        var dt1row = $(n).parent().parent();
        var dt1ltrowIndex = $(dt1row).attr("_rowindex");
        if($("#field7827_"+dt1ltrowIndex).val().replace(/\s+/g,"") != curUserId){
            setNotNeedcheck("7821_"+dt1ltrowIndex);
            setNotNeedcheck("7822_"+dt1ltrowIndex);
            setNotNeedcheck("7823_"+dt1ltrowIndex);
            $("#field"+"7821_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor: '#c9daf8'});
            $("#field"+"7822_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor: '#c9daf8'});
            $("#field"+"7823_"+dt1ltrowIndex).attr("readonly",true).css({backgroundColor: '#c9daf8'});
            $(dt1row).css({backgroundColor: '#c9daf8'});
        }
    });
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
//*******跨部门项目负责人填写kpi javascript 代码 end********************************************************************************

//*******月度跟踪与指导 javascript 代码 start********************************************************************************
(function($){
    $(function(){
        //加载部门kpi
        if($("#field8626").val()!=""){
            $("#deptkpi_div").html($("#field8626").val());
        }
        //清空月度跟踪选项

        //根据当前月份，控制月度总结的可填写属性
        changeSummaryEditablByCurMonth();
        //定制提交前检测
        checkCustomize = function(){
            return true;
        }
    });

//根据当前月份，控制月度总结的可填写属性
    function changeSummaryEditablByCurMonth(){
        var date = new Date();
        var curMonth = date.getMonth()+1;
        //curMonth = 11;
        var season = "一";
        if(curMonth>9){
            season = "四";
        }else if(curMonth>5){
            season = "三";
        }else if(curMonth>3){
            season = "二";
        }
        $("#field7853").val(0);    //月度总结完成填写标识默认为0 ， 0 -- 表示第1、2月均必须填写；2 -- 表示需填写第一个月总结。
        //判断当前月份，改变月度总结的可填写、必填属性；
        if($("#field7717").val().replace(/\s+/g,"") == season){
            switch(curMonth%3){
                case 2 : //第二个月的总结禁止填写，只填写第一个月总结
                    $("input[name='check_node_3']").each(function(i,n){
                        var dt3row = $(n).parent().parent();
                        var dt3rowIndex = $(dt3row).attr("_rowindex");
                        $("#field7844_"+dt3rowIndex).attr("readonly",true).css({backgroundColor: '#ccc'});
                        setNotNeedcheck("7844_"+dt3rowIndex);	//将第二个月的总结填写字段设置为非必填，这样才能提交到月度评价环节。
                    });
                    break;
                case 1 : //第一、二个月的总结禁止填写
                    $("input[name='check_node_3']").each(function(i,n){
                        var dt3row = $(n).parent().parent();
                        var dt3rowIndex = $(dt3row).attr("_rowindex");
                        $("#field7844_"+dt3rowIndex).attr("readonly",true).css({backgroundColor: '#ccc'});
                    });
                    $("input[name='check_node_2']").each(function(i,n){
                        var dt2row = $(n).parent().parent();
                        var dt2rowIndex = $(dt2row).attr("_rowindex");
                        $("#field7838_"+dt2rowIndex).attr("readonly",true).css({backgroundColor: '#ccc'});
                    });
                    break;
                case 0 :   //2个月总结均必填
                    //判断是否第一月的总结已经填写完成；
                    var index = 0;
                    $("input[name='check_node_2']").each(function(i,n){
                        var dt2row = $(n).parent().parent();
                        var dt2rowIndex = $(dt2row).attr("_rowindex");
                        if($("#field7838_"+dt2rowIndex).val().replace(/\s+/g,"") == ""){
                            return false;
                        }
                        index = i;
                    });
                    if($("input[name='check_node_2']").length-1 == index){
                        //第一个月的总结都已填写，则跳转到第二个月的总结标签；
                        ChangeTab(0, 3);
                    }
                    break;
            }
            $("#field7853").val(curMonth%3);
        }
    }

    /**
     * 功能：替换某个标签组中标签页，用于需要自动切换标签页的场景
     * 参数：tabAreaId -- 标签组的class属性数字(标签组是以class为标识的);
     *       targetTab -- 要显示的标签页ID数字（etc:1）;
     *
     */
    function ChangeTab(tabAreaId, targetTabId){
        //获取当前显示的标签页
        var _tabArea = $(".tabarea_"+tabAreaId);
        var _contentId = "tab_"+targetTabId+"_content";
        var _tabId = "tab_"+targetTabId;
        var curTabId = $(".t_sel",_tabArea).attr("id");
        var curContentId = curTabId+"_content";
        if(_tabId != curTabId){	//比较当前显示的标签是否就是目标标签ID;
            //获取当前标签页的html和标签页标题
            var curTabHtml = $("#"+curTabId,_tabArea).html();
            var curTabTitle = $("#"+curTabId+" span",_tabArea).html();
            //获取需要显示标签页的标题
            var tabTitle = $("#"+_tabId+" span",_tabArea).html();
            //互换2个标签页的html
            $("#"+curTabId,_tabArea).html($("#"+_tabId).html());
            $("#"+_tabId,_tabArea).html(curTabHtml);
            //互换2个标签页的标题
            $("#"+curTabId+" span",_tabArea).html(curTabTitle);
            $("#"+_tabId+" span",_tabArea).html(tabTitle);
            //更改两个标签页的类名，保证点击操作的效果（重要）
            $("#"+_tabId,_tabArea).attr("class","t_sel");
            $("#"+curTabId,_tabArea).attr("class","t_unsel");
            //转换标签页内容的显、隐属性
            $("#"+curContentId,_tabArea).css({display: 'none'});
            $("#"+_contentId,_tabArea).css({display: ''});
        }
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
})(jQuery)
//*******月度跟踪与指导 javascript 代码 end****************************************************************/

//*******月度总结评价 javascript 代码 start****************************************************************/
(function($){
    $(function(){
        //加载部门kpi
        if($("#field8626").val()!=""){
            $("#deptkpi_div").html($("#field8626").val());
        }
        //根据当前月份，控制月度总结的可填写属性
        changeSummaryEditablByCurMonth();
        //定制提交前检测
        checkCustomize = function(){
            return true;
        }
    });

    //根据当前月份，控制月度总结的可填写属性
    function changeSummaryEditablByCurMonth(){
        var date = new Date();
        var curMonth = date.getMonth()+1;
        //curMonth = 11;
        var season = "一";
        if(curMonth>9){
            season = "四";
        }else if(curMonth>6){
            season = "三";
        }else if(curMonth>3){
            season = "二";
        }
        $("#field7853").val(0);    //月度总结完成填写标识默认为0 ， 0 -- 表示第1、2月均必须填写；2 -- 表示需填写第一个月总结。
        //判断当前月份，改变月度总结的可填写、必填属性；
        if($("#field7717").val().replace(/\s+/g,"") == season){
            var mark = curMonth%3;
            //alert(mark);
            switch(mark){
                case 2 : //第二个月的评语禁止填写，只填写第一个月评语
                    $("#field7848").attr("readonly",true).css({backgroundColor: '#ccc'});
                    setNotNeedcheck("7848");	//将第二个月的评语字段设置为非必填。
                break;
                case 1 : //第一、二个月的总结禁止填写
                    $("#field7847").attr("readonly",true).css({backgroundColor: '#ccc'});
                    setNotNeedcheck("7847");	//将第一个月的评语字段设置为非必填。
                    $("#field7848").attr("readonly",true).css({backgroundColor: '#ccc'});
                    setNotNeedcheck("7848");	//将第二个月的评语字段设置为非必填。
                break;
                case 0 :   //2个月总结均必填
                    if($("#field7847").html().replace(/s+/g,"") != ""){
                        //第一个月的总结都已填写，则跳转到第二个月的总结标签；
                        ChangeTab(0, 3);
                    }
                break;
            }
            $("#field7853").val(mark);
        }
    }

    /**
     * 功能：替换某个标签组中标签页，用于需要自动切换标签页的场景
     * 参数：tabAreaId -- 标签组的class属性数字(标签组是以class为标识的);
     *       targetTab -- 要显示的标签页ID数字（etc:1）;
     *
     */
    function ChangeTab(tabAreaId, targetTabId){

        var _tabArea = $(".tabarea_"+tabAreaId);    //获取当前显示的标签页
        var _contentId = "tab_"+targetTabId+"_content";
        var _tabId = "tab_"+targetTabId;
        var curTabId = $(".t_sel",_tabArea).attr("id");
        var curContentId = curTabId+"_content";
        if(_tabId != curTabId){	//比较当前显示的标签是否就是目标标签ID;
            //获取当前标签页的html和标签页标题
            var curTabHtml = $("#"+curTabId,_tabArea).html();
            var curTabTitle = $("#"+curTabId+" span",_tabArea).html();
            //获取需要显示标签页的标题
            var tabTitle = $("#"+_tabId+" span",_tabArea).html();
            //互换2个标签页的html
            $("#"+curTabId,_tabArea).html($("#"+_tabId).html());
            $("#"+_tabId,_tabArea).html(curTabHtml);
            //互换2个标签页的标题
            $("#"+curTabId+" span",_tabArea).html(curTabTitle);
            $("#"+_tabId+" span",_tabArea).html(tabTitle);
            //更改两个标签页的类名，保证点击操作的效果（重要）
            $("#"+_tabId,_tabArea).attr("class","t_sel");
            $("#"+curTabId,_tabArea).attr("class","t_unsel");
            //转换标签页内容的显、隐属性
            $("#"+curContentId,_tabArea).css({display: 'none'});
            $("#"+_contentId,_tabArea).css({display: ''});
        }
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
})(jQuery)
//******* 月度总结评价 javascript 代码 end ************************************************************************/

//******* 员工自评 javascript 代码 start ************************************************************************/
(function($){
    $("#field7714_browserbtn").bind("click",function(){
        return false;
    });
    $("#field7715_browserbtn").bind("click",function(){
        return false;
    });
    $(function(){

        $("textarea").css("width", "90%");

        //增加一个特殊操作按钮
        $("#div_btn_extfunction").html("<input id='btn_getrelation' type='button' value='刷新考核关系' style='width: 120px;' />");
        $("#btn_getrelation").bind('click',function () {
            getExamRelationShip();
        });

        //加载部门kpi
        if($("#field8626").val()!=""){
            $("#deptkpi_div").html($("#field8626").val());
        }
        //重新获取考核关系
        getExamRelationShip();
    });

    //定制提交前检测
    checkCustomize = function(){
        //return isAllowSubmit();
        reCheckExamRelation();
        //return false;
        return true;
    }
    /**
     * 判断当前是否允许提交
     * @param curMonth
     */
    function isAllowSubmit(){
        var date = new Date();
        var curMonth = date.getMonth()+1;
        var season = $("#field7717").val(); //当前申请单显示季度

        switch(season){
            case "一":
                if(curMonth<4){
                    alert("本季度尚未结束，请下月再填写！");
                    return false;
                }
                break;
            case "二":
                if(curMonth<7){
                    alert("本季度尚未结束，请下月再填写！");
                    return false;
                }
                break;
            case "三":
                if(curMonth<10){
                    alert("本季度尚未结束，请下月再填写！");
                    return false;
                }
                break;
            case "四":
                if(curMonth>9){
                    alert("本季度尚未结束，请下月再填写！");
                    return false;
                }
                break;
        }
        return true;
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

    /**
     * 获取考核关系
     *
     */
    function getExamRelationShip(){
        $.ajax({
            method:'post',
            url:'/dinghan/jsp/GetKPIExamRelationship.jsp',
            data:{apppsnid:wf__info.f_bel_userid},
            async:false,
            success:function(data){
                eval("var obj="+data);
                console.log(obj);
                if(obj.exampsn == "-1" || obj.reviewpsn == "-1"){
                    alert("你的绩效考核关系没有正确配置，请与人力资源部绩效考核管理的负责人联系！")
                    //window.top.close();
                }
                //给考核关系人赋值
                $("#field7714").val(obj.exampsn);
                sHtml = "<a href='javaScript:openhrm("+obj.exampsn+");' onclick='pointerXY(event);'>"+obj.exampsnname+"</a>"
                $("#field7714span").html(sHtml);

                $("#field8637").val(obj.exampsn);
                sHtml = "<a href='javaScript:openhrm("+obj.exampsn+");' onclick='pointerXY(event);'>"+obj.exampsnname+"</a>"
                $("#field8637span").html(sHtml);

                $("#field7715").val(obj.reviewpsn);
                sHtml = "<a href='javaScript:openhrm("+obj.reviewpsn+");' onclick='pointerXY(event);'>"+obj.reviewpsnname+"</a>"
                $("#field7715span").html(sHtml);

                $("#field8638").val(obj.reviewpsn);
                sHtml = "<a href='javaScript:openhrm("+obj.reviewpsn+");' onclick='pointerXY(event);'>"+obj.reviewpsnname+"</a>"
                $("#field8638span").html(sHtml);
            }
        });
    }

    /**
     * 重新检查考核关系,并按照当前配置的考核关系更新
     * @author zhangxiaoyu / 10593  - 2017-06-06
     */
    function reCheckExamRelation(){
        var examPsn = $("#field7714").val();
        var reviewPsn = $("#field7715").val();
        var examPsn_back = $("#field8637").val();
        var examPsnName_back = $("#field8637span").html();
        var reviewPsn_back = $("#field8638").val();
        var reviewPsnName_back = $("#field8638span").html();
        var sHtml;
        if(examPsn.replace(/\s+/g,"") == "" || examPsn != examPsn_back || $("#field7714span").html() == ""){
            $("#field7714").val(examPsn_back);
            sHtml = examPsnName_back;
            $("#field7714span").html(sHtml);
        }
        if(reviewPsn.replace(/\s+/g,"") == "" || reviewPsn != reviewPsn_back || $("#field7715span").html() == ""){
            $("#field7715").val(reviewPsn_back);
            sHtml = reviewPsnName_back;
            $("#field7715span").html(sHtml);
        }
    }

})(jQuery)
//******* 员工自评 javascript 代码 end ************************************************************************/

//流程页面中含有全局变量如下，用于表示流程的当前状态：
//字段属性联动依赖的全局对象
var wf__info = {
	"requestid": "0",
	"workflowid": "100",
	"nodeid": "569",
	"formid": "-88",
	"isbill": "1",
	"f_bel_userid": "1",
	"f_bel_usertype": "0",
	"datassplit": "////~~datas~~////",
	"paramsplit": "////~~param~~////",
	"valuesplit": "////~~value~~////"
};
