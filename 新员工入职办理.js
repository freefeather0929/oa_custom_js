/**** 非生产物料采购流程中各环节使用的前端脚本 ****/

//*******账号办理环节 javascript 代码 start**************************************************************************
<script type="text/javascript">
    $(function(){
        browserChange(8333);
		getLevel1Department(8333,8356);
	});
	
	/**
	 * 根据部门字段中的部门id获取其对应的一级部门，
	 * 参数：id -- 部门字段Id数字; pushfield -- 一级部门的字段Id数字
	 */
	function getLevel1Department(id,pushfield){
		var curDeptId = $("#field"+id).val();
		$.ajax({
		method : 'get',
		url:'/dinghan/jsp/GetLevel1DepartmentInfo.jsp',
		async:false,
		data:{deptid:curDeptId},
		success:function(data){
			eval("var obj="+data);
			deptLink = "<a href='/hrm/company/HrmDepartmentDsp.jsp?";
			deptLink +="id="+obj.id;
			deptLink +="&f_weaver_belongto_userid="+wf__info.f_bel_userid;
			deptLink +="&f_weaver_belongto_usertype="+wf__info.f_bel_usertype+"' target='_blank'>"+obj.departmentmark+"</a>";
			$("#field"+pushfield).val(obj.id);
			$("#field"+pushfield+"span").html(deptLink);
			}
		});
	}
	
function browserChange(id){
      var ele = $("#field"+id);
      $(ele).bindPropertyChange(function(){
            getLevel1Department(id,8356);    
      });
}

//*******账号办理环节 javascript 代码 end*****************************************************************************

//*******账号办理环节 javascript 代码 start**************************************************************************
<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript">
   <script type="text/javascript">
   $(function(){
	   getCurUserRoles();
    });
    function toggleFieldEditable(data){
        eval("var obj="+data);
	if(obj.userroles.length>0){
	    var field_roles_map = {"r139":["8346"],"r141":["8353"],"r143":[""],"r144":[""]};
            var rolesId = "";
            var field="";
			alert(field_roles_map.lenght);
	    for(var i=0;i<obj.userroles.length;i++){
	         rolesId = "r"+obj.userroles[i].roleid;
                 for(var k=0;k<field_roles_map[rolesId].length;k++){
                     field = field_roles_map[rolesId][0];
                     setNeedcheck(field);
                 }
	    }
	 }
    }
    //获取当前登录人的角色
    function getCurUserRoles(){
		var userId = wf__info.f_bel_userid;
		$.ajax({
			method : 'post',
			url:'/dinghan/jsp/GetUserRoles.jsp',
			async:false,
			data:{userid:userId},
			success:function(data){
				toggleFieldEditable(data);
				}
		});
    }
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
</script>
//*******账号办理环节 javascript 代码 end**************************************************************************************
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

