/**** 发票及收据申请中各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<script type="text/javascript">
$(function(){
	//发票类型选择
	$("#field6632").bind('change',function(){
		if($("option:selected",this).html().indexOf("增值税") == -1){
			$("#field6638").val("");	//纳税人识别号
			$("#field6639").val("");	//地址
			$("#field6640").val("");	//电话
			$("#field6641").val("");	//开户行
			$("#field6642").val("");	//账号
		}
	});
	
	//合同类型选择
	$("#field6634").bind('change',function(){
		if($(this).val()>0){
			var ss = "根据《中华人民共和国发票管理办法实施细则》"
			ss = ss + "第二十六条规定填开发票的单位和个人必须在发生经营业务确认营业收入时开具发票。"
			ss = ss + "未发生经营业务一律不准开具发票。请审慎申请、审批，否则公司将面临税务风险！"
			alert(ss);
		}
	});
	
	//是否为公司员工
	$("#field6643").bind('change',function(){
		if($(this).val()>0){
			$("#field6646").val("");	//邮政编码
			$("#field6647").val("");	//地址
		}
	});
	/*
	$("button[name='addbutton0']").bind('click',function(){
		var lastRow = $("input[name='check_node_0']:last").parent().parent();
		var lastRowIndex = $(lastRow).attr("_rowindex");
		$("#field6653_"+lastRowIndex).bind('blur',function(){
			alert($(this).val().length);
		});
	});
	*/
	//检测合同号位数
	$("input[name^='field6653']").live('blur',function(){
		if($(this).val().length>16 || $(this).val().length<14){
			alert("合同号必须为14－16位，请检查。（当前长度为"+$(this).val().length+"）");
		}
	});
	
	//定制提交前检测
	checkCustomize = function(){
		var contraMoney,kjMoney,appMoney,fhMoney;
		var overApp = "";
		var flag = false;
		$("input[name='check_node_0']").each(function(i,n){
			var row = $(n).parent().parent();
			var rowIndex = $(row).attr("_rowindex");
			
			if($("#field6653_"+rowIndex).val().length >16 || $("#field6653_"+rowIndex).val().length<14){
				alert("第 ["+(i+1)+"] 行的合同号位数为："+$("#field6653_"+rowIndex).val().length+"，必须为14-16位，请重新填写。");
				flag = true;
				return false;
			}
			
			contraMoney = parseFloat($("#field6654_"+rowIndex).val(),10);
			kjMoney = parseFloat($("#field6656_"+rowIndex).val(),10);
			appMoney = parseFloat($("#field6657_"+rowIndex).val(),10);
			fhMoney = parseFloat($("#field6658_"+rowIndex).val(),10);
			contraMoney -= kjMoney;
			if(appMoney>contraMoney){
				alert("申请明细中第 ["+(i+1)+"] 行的申请金额超出了合同余额，请重新填写！");
				flag = true;
				return false;
			}
			if(fhMoney < (kjMoney+appMoney)){
				if(overApp.replace(/\s+/g,"")!=""){
					overApp += ";";
				}
				overApp += (i+1);
			}
		});
		
		if(flag){
			return false;
		}else{
			if(overApp.replace(/\s+/g,"") != ""){
				alert("请注意：申请明细中第 ["+overApp+"] 行的已发货金额 < 已开具金额 + 本次申请开具金额！");
			}
			if(confirm("确定要提交吗？")){
				return true;
			}else{
				return false;
			}
		}
	}
});
</script>
//*******开始环节 javascript 代码 end*****************************************************************************

//*******开票环节 javascript 代码 start*****************************************************************************
<script>

$(function(){
	
	
});



</script>
//*******开票环节 javascript 代码 end*****************************************************************************


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

