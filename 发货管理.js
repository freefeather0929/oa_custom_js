/**** 发货管理各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
$(function(){
   browserChange("8537");
});

function getQianLiaoList(wfId){
    if(wfId!=""){
        $.blockUI({ message: '<h4><img src="/images/loading2_wev8.gif" /> 正在获取欠料明细，请稍后... </h4>' });
		var formId = wf__info.formid;
		$.ajax({
			method : 'post',
			url:'/dinghan/jsp/GetQianLiaoList.jsp',
			async:false,
			data:{wfid:wfId,formid:formId},
			success:function(rsdata){
				eval("var obj="+rsdata);
							if($("input[name='check_node_0']").length>0){
						$("input[name='check_node_0']").attr("checked",true);
						delRowCus(0);
					}
				if(parseInt(obj.count,10)>0){
					for(var i=0;i<obj.ids.length;i++){
						createList(i,obj.ids[i]);
					}
				}else{
					alert("您选择的流程中没有欠料明细，请重新选择。");
				}
				$.unblockUI();
			},
			complete:function(xhr,ts){
				xhr = null;            
			}
		});
        
    }
}

function browserChange(id){
      var ele = $("#field"+id);
      $(ele).bindPropertyChange(function(){
            getQianLiaoList($(ele).val());
      });
}

/**
 * 功能：生成明细，并且给某个字段赋值；
 * 参数：id -- 字段的ID数字，val -- 向字段赋的值
 */
function createList(id,val){
	addRow0(0);
    var datarow = $("#oTable0 tr[_target='datarow']").get(id);
    var rowindex = ($(datarow).attr("_rowindex"));
    $("#field8561_"+rowindex).val(val);
}

//自定义删除行函数（改编自系统自带的删除功能，去除confirm提示，主要用于自动删除明细的功能）
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
//*******开始环节 javascript 代码 end*****************************************************************************

//*******出货检验环节 javascript 代码 start**************************************************************************
$(function(){
	$("#field8147").bind('change',function(){
		judgeEditable();
	});
	$("#field8149").bind('change',function(){
		judgeEditable();
	});
});
//检验合格选项，变更不合格原因、不合格说明的必填属性
{/*field8149 -- 欠料信息是否与实际相符*/}
{/*field8147 -- 检验结论*/}
function judgeEditable(){
	var ishege = $("#field8147").val();
	var isxiangfu = $("#field8149").val();
    if( ishege==0 || isxiangfu==0){
		$("#field8148 option[value='']").attr("selected",true);
		setNotNeedcheck(8148);
		setNotNeedcheck(8159);
	}else{
		if(isxiangfu == 1){
			$("#field8147 option[value='1']").attr("selected",true);
			$("#field8148 option[value='0']").attr("selected",true);
		}
		setNeedcheck(8148);
		setNeedcheck(8159);
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
//*******出货检验环节 javascript 代码 end*****************************************************************************
//*******在途跟踪记录 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
    $(function(){
        checkCustomize = function (){
            if(isArrival()){
                if(confirm("运输记录显示货物已经到达，确认要提交吗？")){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    });
	
//判断发货是否到达
function isArrival(){
    var rownum =  $("input[name='check_node_1']").size();
    var lastrow = $("input[name='check_node_1']").get((rownum-1));
    var lastrowIndex = $(lastrow).parent().parent().attr("_rowindex");
    var flag = false;
    if($("#field8176_"+lastrowIndex).val()==1){
        $("#field8161").val($("#field8175_"+lastrowIndex).val());
        $("#field8161span").html($("#field8175_"+lastrowIndex+"span").html());
    }else{
        $("#field8161").val("");
        $("#field8161span").html("");
    }
    var isarr = $("#field8176_"+lastrowIndex).val();
    $("#disfield8160 option[value='"+isarr+"']").attr("selected",true);
    
    if(isarr == 1){
        flag = true;
    }else{
        alert("货物尚未到达，请确认填写的运输记录无误，并执行保存操作。");
    }
    return flag;
}

//*******在途跟踪记录 javascript 代码 end************************************
//字段属性联动依赖的全局对象(提交后)
var wf__info = {
	"requestid": "661",
	"workflowid": "106",
	"nodeid": "613",
	"formid": "-99",
	"isbill": "1",
	"f_bel_userid": "1",
	"f_bel_usertype": "0",
	"datassplit": "////~~datas~~////",
	"paramsplit": "////~~param~~////",
	"valuesplit": "////~~value~~////"
};

//字段属性联动依赖的全局对象(提交前)
var wf__info = {
	"requestid": "0",
	"workflowid": "106",
	"nodeid": "613",
	"formid": "-99",
	"isbill": "1",
	"f_bel_userid": "1",
	"f_bel_usertype": "0",
	"datassplit": "////~~datas~~////",
	"paramsplit": "////~~param~~////",
	"valuesplit": "////~~value~~////"
};



