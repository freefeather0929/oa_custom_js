/**** 预付款延期支付发货申请各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
$(function(){
    var todaytxt = $("#field7288").val();      //当前日期
	$("button[name='addbutton0']").bind('mousedown', function(){
		var time12=$("#field7292span").text();
		var date11 = new Date(time12);
		var date12 = new Date(todaytxt);
		if((date11-date12 )>0){
			return true;
		}else{
			alert("提示：领用日期不得早于申请日期！");
			return false;
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
