/**** 文档借阅申请各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
$(function(){
    
    //新建明细行绑定函数
    $("button[name='addbutton0']").bind('click',function(){
        var lastrow = $("input[name='check_node_0']:last").parent().parent();
        var lastrowIndex = $(lastrow).attr("_rowindex");
        var id = "field8890_"+lastrowIndex;
        browserChange(id);
    });
    
    //检测明细行
	$("input[name='check_node_0']").each(function(i,n){
		var row = $(n).parent().parent();
		var rowIndex = $(row).attr("_rowindex");
		var id = "#field8890_"+rowIndex;
		browserChange(id);
	});

	//定制提交前检测
	checkCustomize = function(){
		
	}
});

function browserChange(id,curRowIndex){
	var ele = $("#"+id);
	$(ele).bindPropertyChange(function(){
		if($(ele).val().replace(/\s+/g,"")!=""){
			var docId = $(ele).val();
			var docName = $("span a",ele).html();
			var tmpDocId,row,rowIndex;
			$("input[name='check_node_0']").each(function(i,n){
				row = $(n).parent().parent();
				rowIndex = $(row).attr("_rowindex");
				if(curRowIndex != rowIndex){
					tmpDocId = $("#field8890_"+rowIndex).val();
					if(tmpDocId == docId){
						alert("您当前选择的文档与第 ["+(i+1)+" ]行所选择的文档选择重复，每个文档只能选择一次，请重新选择。");
						$("#"+id).val("");
						$("#"+id+"span").html("");
						return false;
					}
				}
			});
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
</script>
//*******开始环节 javascript 代码 end********************************************************************************



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


