/**** 非生产物料采购流程中各环节使用的前端脚本 ****/

//*******开始环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
  $(function(){
    browserChange("6435");         //绑定判断所选部门的函数
    $("button[name='addbutton0']").bind('mousedown', function(){
       //判断所属公司是否填写
       if($("#field6417").val().replace(/\s+/g,"")==""){
            alert("请先选择所属公司！")
            return false;
       }
       if($("#field6435").val().replace(/\s+/g,"")==""){
            alert("请先选择所属的部门！")
            return false;
       } 
    }).bind('click',function(){
        var rownum = $("input[name='check_node_0']").size();
		var ele = $("#field6439_"+(rownum-1));
		$(ele).bindPropertyChange(function(){
		    if(isInSameDept($(ele).val(),rownum)==false){
				return true;
			};
		});
    });
    if($("input[name='check_node_0']").size()>0){
         $("input[name='check_node_0']").each(function(i){
                var ele = $("#field6439_"+i);
		$(ele).bindPropertyChange(function(){
		    if(isInSameDept($(ele).val(),(i+1))==false){
				return true;
			};
		});
         });
    }
	//提交前检测
	checkCustomize = function (){
		
	   var comsinger = $("#field9257").val();
	   var arrSinger = comsinger.split(",");
	   if(arrSinger.indexOf("324") === -1){
		   $("#field9257").val(comsinger+=",324");
	   }
        return checkDeptOnSubMit();		//提交时检测每一行选择的人员是否都属于"使用人所属部门"
    });
		if(confirm("确定要提交吗？")){
			 return true;
		}else{
			return false;
		}
	}
});
//提交时检测每一行选择的人员是否都属于"使用人所属部门"
  function checkDeptOnSubMit(){
	var flag = true;
	$("input[name='check_node_0']").each(function(i,n){
		if(isInSameDept($("#field6439_"+i).val(),(i+1)) == false){
		flag = false;
		return false;
	}
	});
	return flag;
  }
  //检测是否在同一个部门
  function isInSameDept(userIDs,rowNum){
	  var deptId = $("#field6435").val();
	  var flag = true;
	  if(deptId ==""){
		   alert("您选择的使用人所在部门为空，请选择！");
		   return false;
	  }
	  if(userIDs.replace(/\s+/g,"")!="")
	  {
		   $.ajax({
			  method:'get',
			  url:'/dinghan/jsp/GetUserInfo.jsp',
			  async:false,
			  data : {deptid:deptId,userids:userIDs},
			  success:function(data){
				eval("var obj = "+data);
				var names = obj.resinfo;
				if(names.length>0){
					var userinfoStr = "";
					for(var i=0;i<names.length;i++){
						if(i>0){userinfoStr+=","}
						userinfoStr+=names[i].lastname;
					}
					alert("第 "+rowNum+" 行选择的"+userinfoStr+"不在所选择的使用人部门内，请重新选择");
					$("#field6439_"+(rowNum-1)).val();
					$("#field6439_"+(rowNum-1)+"span").html("");
                    flag = false;
				}
			  }
		  });
	  }
	  return flag;
  }

  function browserChange(id){
    var ele = $("#field"+id);
    $(ele).bindPropertyChange(function(){
        ajaxgetDepartmentInfo($(ele).val(),id);
    });
  }

  function ajaxgetDepartmentInfo(deptId,id){
        if(deptId!=""){ 
        var ele = $("#field"+id);
        var ele_span = $("#field"+id+"span");
        $.ajax({
            method: 'get',
            url:'/dinghan/jsp/GetDepartmentInfo.jsp',
            async:false,
            data : {deptid:deptId}, 
            success:function(data){
                eval("var obj = "+data);
                if(parseInt(obj.tlevel,10)>3){
                     alert("请选择您选择的部门不是一级或者二级部门，请重新选择");
                     $(ele).val("");
                     $(ele_span).html("");    
                };
            }
        });
        }
  }
//*******开始环节 javascript 代码 end**************************************************************************************



//*******执行采购环节 javascript 代码 start***************************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->

//<script type="text/javascript" src="/dinghan/js/plugin/jqueryblockui/jquery.blockUI.js"></script>	//引用锁屏插件（第三方插件）
//<script type="text/javascript">
    $(function(){	//field8321 -- 判定当前流程是否为分流流程，分流流程的中此字段的值为："1";
        if($("#field8321").val()!="1" && $("input[name='check_node_0']").size()>1){
            $("#fenliubtn_div").html("<input id='fenliu_btn' type='button' value='分流' style='width:80px'></input>");
        }
        $("#fenliu_btn").bind('click',function(){
            fenliu();
        });
    });
/*
 * 流程分流功能
 * 参数：requestId -- 当前流程的请求Id
 *       formId -- 当前流程对应的数据库表Id 是一个负数，后台接收时应进行去绝对值
 *       fenliuRows -- 要分流的明细行的Id组成的字符串，取值名为"check_node_*"的checkbox的value，选择多行时以#号隔开，如：1#3#5
 *       wf__info -- 全局变量，包含流程的一些基本信息，可以通过浏览器开发工具进行查看。
 */
function fenliu(){
	var requestId = wf__info.requestid;
	var formId = wf__info.formid;
        var fenliuRows = "";     //分流的明细Id
	var check_rownum = 0;
	
	if($("input[name='check_node_0']").size() == 1){
		alert("只有一行明细，不能进行分流！");
		return false;
	}
	
	$("input[name='check_node_0']").each(function(){
                if($(this).is(":checked")){
			if(fenliuRows.replace(/\s+/g,"") !=""){
				fenliuRows +="#";
			}
			fenliuRows += $("input[name='dtl_id_0_"+$(this).val()+"']").val();
			check_rownum ++;
		}
       });
	
	if(fenliuRows.replace(/\s+/g,"")==""){
		alert("请选择要分流的行！");
		return false;
	}
	
	if(check_rownum == $("input[name='check_node_0']").size()){
		alert("不能将所有的行进行分流！");
		return false;
	}
	
    if(confirm("确实要执行分流吗？分流之后无法还原。")){
        $.blockUI({ message: '<h4><img src="/images/loading2_wev8.gif" /> 正在分流，请稍后...</h4>' });
        $.ajax({
			method:'post',
			url:'/dinghan/jsp/WorkFlowSplit.jsp',
			data:{'requestid':requestId,'formid':formId,'fenliurows':fenliuRows},
			asnyc:false,
			success:function(data){
				eval("var obj ="+data);
					if(obj.flag == "1"){
						if(confirm("流程分流成功，流程ID："+obj.requestid+"是否现在打开分流流程？当前环节的处理人可以在待办任务中找到此流程的链接")){
							openFullWindowHaveBarForWFList("/workflow/request/ViewRequest.jsp?requestid="+obj.requestid+"&isovertime=0","'"+obj.requestid+"'");	
						}
					}else{
						alert("分流不成功，请与系统管理员联系！");
					}
				},
			error:function(xhr,ts,eth){
					alert("执行分流时出错，请与管理员联系！分流不成功。");
			},
			complete:function(xhr,ts){
				xhr = null;
				$.unblockUI();
			}
        });	
    }else{
        return false;
    }
}
//自定义提交前检验脚本
checkCustomize = function(){
	
}
//</script>
//*******执行采购环节 javascript 代码 end*******


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
