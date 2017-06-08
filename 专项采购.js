/**** 专项采购中各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
$(function(){
	$("#field7278").change(function(){
		var typeval = $("#field7278").val();  
		var typeval2=$("#field7276").val();
		var type=typeval-typeval2;
		if(type>0){
			alert("已支付金额应小于预支付金额！");
			$("#field7278").val("");  
		}
	});     
		
	$("#field7276").change(function(){
		var typeval = $("#field7278").val();  
		var typeval2=$("#field7276").val();
		var type=typeval-typeval2;
		if(type>0){
			alert("已支付金额应小于预支付金额！");
			$("#field7278").val("");  
		}
	});
 });
</script>
//*******开始环节 javascript 代码 end**************************************************************************************

//自定义提交前检验脚本
function checkCustomize = function(){
	
}

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
