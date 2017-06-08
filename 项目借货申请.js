
/*
 * 项目借货申请流程javascript脚本
 */
 
/*开始环节*/
    $(function(){
        if($("#field8972").val() == "1"){
            $("#tr_turncontra").css("display", "none");
        }
        checkCustomize = function(){
            //超过2个站点，必须填写合同报价清单
			if($("input[name='check_node_0']").size()>1){
				var attachNum = $("#field8975_idnum_1").val();
				var attachTmpNum = 0;
				if($("#fsUploadProgress8975 .progressBarStatus").size()>0){
					$("#fsUploadProgress8975 .progressBarStatus").each(function(){
						if($(this).html().replace(/\s+/g,"") != "Cancelled"){
							attachTmpNum ++;
						}
					});
				}
				if(attachNum == undefined || attachNum == 0){
					if(attachTmpNum == 0){
						alert("站点超过2个，请上传合同价格清单！");
						return false;
					}
				}
			}
			if(parseInt(getUnverifiedProjBrowAppNum(),10) > 1){
				alert("您尚有2个发起并且未核销的项目借货流程，不能再继续发起新的借货，请先将以前的借货至少核销1项。");
				return false;
			}
			return false;
        }
    });
/*
  功能：获取未核销的借货评审流程数量
*/
function getUnverifiedProjBrowAppNum(){
	var _num = 0;
	$.ajax({
		method : 'post',
		url : '/dinghan/jsp/GetUnverifiedProjbrowApps.jsp',
		async : false,
		data : {appno:$("#field8962").val(),formid:wf__info.formid},
		success : function(data){
			eval("var obj = "+data);
			_num = obj.num;
		}
	});
	return _num;
}

/*开始环节  end  */
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