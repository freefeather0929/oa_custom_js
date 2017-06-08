/**** 付款申请中各环节使用的前端脚本 ****/

//*******开始 javascript 代码 start**************************************************************************
<script type="text/javascript">
    $(function(){
       $("#field8796").bind('change',function(){
		  if($("option:last",this).is(":selected")){
			setNeedcheck(8776);
		  }else{
			setNotNeedcheck(8776);
			$("#field8776").val("").attr("readonly",true);
		  }
	   });
	   
	   $("#field8790").bind('change',function(){
		   if($("option:last",this).is(":selected")){
			setNeedcheck(8777);
		  }else{
			setNotNeedcheck(8777);
			$("#field8777").val("").attr("readonly",true);
		  }
	   });
	   
	});

//设置某个字段为必填
function setNeedcheck(i){    //设置需要必填 i 数字id  
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
//*******开始环节 javascript 代码 end*****************************************************************************

//在选择按钮，点击确定时触发，实为在对应字段value属性发生变化时触发。
function browserChange(id){
      var ele = $("#field"+id);
      $(ele).bindPropertyChange(function(){
            getLevel1Department(id,8356);    
      });
}

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

