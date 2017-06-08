/**** 发货管理各环节使用的前端脚本 ****/
//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
$(function(){
    $("#field8594").bind('change',function(){    //是否维修收费
		changeFreeReasonNeedCheck();
    });
    $("#field8595").bind('change',function(){    //是否维保过期
		changeFreeReasonNeedCheck();
    });
    //新建明细行绑定函数
    $("button[name='addbutton0']").bind('click',function(){
        var lastrow = $("input[name='check_node_0']:last").parent().parent();
        var lastrowIndex = $(lastrow).attr("_rowindex");
        var date = new Date();
        $("#field8604_"+lastrowIndex).val("DHJ"+date.getFullYear());
        dt1ChangeNeedcheck(lastrowIndex);
    });
    
    //绑定已经存在的行中：产品类型、单位选择‘其他’变更对应字段必填属性
	$("input[name='check_node_0']").each(function(i,n){
		var row = $(n).parent().parent();
		var rowIndex = $(row).attr("_rowindex");
		dt1ChangeNeedcheck(rowIndex);
		if($("#field8609_"+rowIndex+" option:last").is(":selected")){
			setNeedcheck("8621_"+rowIndex);
		}else{
			setNotNeedcheck("8621_"+rowIndex);
		}
		if($("#field8614_"+rowIndex+" option:last").is(":selected")){
			setNeedcheck("8622_"+rowIndex);
		}else{
			setNotNeedcheck("8622_"+rowIndex);
		}
	});

	//定制提交前检测
	checkCustomize = function(){
		//计算模块的总数量
		var modularNum = 0;
		$("input[name='check_node_0']").each(function(i,n){
			var row = row = $(n).parent().parent();
			var rowIndex = $(row).attr("_rowindex");
			if($("#field8608_"+rowIndex).val()==0){
				if($("#field8613_"+rowIndex).val()!=""){
					modularNum+=parseInt($("#field8613_"+rowIndex).val(),10);
				}
			}
		});
		$("#field8623").val(modularNum);
	}
});

function changeFreeReasonNeedCheck(){
	var isfee = $("#field8594").val();	  //是否收维修费
	var iswbOver = $("#field8595").val(); 	//是否维保过期
	if(isfee == 1 && iswbOver==0){
		setNeedcheck(8599);
	} else {
		setNotNeedcheck(8599);
	}
}

//明细表1中改变必填检测字段（“其他类型”，“其他单位”）
function dt1ChangeNeedcheck(rowIndex){
	//其他类型
	$("#field8609_"+rowIndex).live('change',function(){
		if($("option:last",this).attr("selected")==true){
			setNeedcheck("8621_"+rowIndex);
		}else{
			setNotNeedcheck("8621_"+rowIndex);
		}
	});
        
    //其他单位
	$("#field8614_"+rowIndex).live('change',function(){
		if($("option:last",this).attr("selected")==true){
			setNeedcheck("8622_"+rowIndex);
		}else{
			setNotNeedcheck("8622_"+rowIndex);
		}
	});
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
//*******开始环节 javascript 代码 end********************************************************************************

//*******确认物料返回 javascript 代码 start**************************************************************************
$(function(){
	//定制提交前检测
	checkCustomize = function(){
		//计算模块的总数量
		var flag = false;
        var row,rowIndex;
		$("input[name='check_node_0']").each(function(i,n){
			row = $(n).parent().parent();
			rowIndex = $(row).attr("_rowindex");
			if($("#field8619_"+rowIndex).val()==""){
				alert("第"+(i+1)+"行的已返回数为空，请填写！");
				flag = true;
				return false;
			}
			if($("#field8620_"+rowIndex).val()==""){
				alert("第"+(i+1)+"行的是否返回确认为空，请填写！");
				flag = true;
				return false;
			}
			if($("#field8617_"+rowIndex).val()!=$("#field8619_"+rowIndex).val()){
				flag = true;
                alert("第"+(i+1)+"行的实发数量与已返回数不符，请检查！");
				return false;
			}
			if($("#field8620_"+rowIndex+" option[value='1']").is(":selected")){
				flag = true;
				alert("第"+(i+1)+"行的确认返回选择为‘否’，请检查！。");
				return false;
			}
		});
		if(flag){
           return false;
        }else{
           return true;
        }
	}
});
//*******确认物料返回 javascript 代码 end**************************************************************************

//流程页面中含有全局变量如下，用于表示流程的当前状态：
var wf__info = {
	"requestid": "409",
	"workflowid": "38",
	"nodeid": "179",
	"formid": "-8",
	"isbill": "1",
	"f_bel_userid": "324",
	"f_bel_usertype": "0",
	"datassplit": "////~~datas~~////",
	"paramsplit": "////~~param~~////",
	"valuesplit": "////~~value~~////"
};


