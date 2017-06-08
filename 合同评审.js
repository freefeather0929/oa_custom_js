/**** 付款申请中各环节使用的前端脚本 ****/

//*******开始 javascript 代码 start**************************************************************************
    $(function(){
		customSetStyle();	//自定制改变样式
		isShowBusiInfo();
		$("#field6771").bind('change',function(){    //评审类型
			setStyleByContraType($(this).val());
			clearValueByIsBrow($(this).val());
		});
		
		$("#field6775").bind('change',function(){    //借货处理办法
			setStyleByBrowSolType($(this).val());
		});
		
		$("#field6781").bind('change',function(){    //是否有外配套设备
			setStyleByIsHasExtraSupport($(this).val());	
		});
                
		$("#field7949").bind('change',function(){    //是否有合同资料
			clearValueByIsHasContraText($(this).val());
		});

                //工程服务信息
		$("#field6801").bind('change',function(){	//培训级别、名额及特殊承诺
			clearValueBYChengNuo($(this).val());
		});
                
		$("#field6804").bind('change',function(){	//现场仓库租用及保管方
			setStyleByLocalkeeper(this);
		});
		
		$("#field6806").bind('change',function(){	//现场卸货方
			setStyleByLocalLoader(this);
		});
		
		$("#field6805").bind('change',function(){	//交货地点
			setStyleByTrancPoint(this);
		});

		$("#field6807").bind('change',function(){	//工程界面
			setStyleByProjectUI(this);
		});

		$("#field6810").bind('change',function(){	//工程改造费用
			if($("option[value='0']",this).is(":selected")){
				$("#field6811").val("");
			}
		});

	   $("#field6813").bind('change',function(){	//维保起计条件
			setStyleByWeiBaoStart(this);
		});

		$("#field6828").bind('blur',function(){
			getZheKou();
		});
		$("#field6831").bind('blur',function(){
			getZheKou();
		});

		$("#field6833").bind('change',function(){	//是否符合公司付款方式标准
			setStyleByPayFrom($(this).val());
		});

		//定制提交检测
		checkCustomize = function(){
			//分支判定：
			var prodType = $("#field6770").val();
			var aJumpArray = new Array("0","1","4","5","10");
                        if(aJumpArray.indexOf(prodType) > -1){
				$("#field8840").val('2');
			}else{
				var extra = $("#field8839").val(); 
				if(extra.indexOf('2') > -1 || extra.indexOf('3') > -1){
					$("#field8840").val('1');
				}else{
					$("#field8840").val('0');
				}
			}
                        
			if(confirm("确定要提交吗?")){
				return true;
			}else{
				return false;
			}
		}
    
      	});  //document.ready 结束

	function isShowBusiInfo(){	//判断是否显示商务评审信息
		var inrole = false;
		var curUserId = wf__info.f_bel_userid;
		var signer = $("#field6855").val();
		if(signer!=""){
			signer = signer.split(",");
			if(signer.indexOf(curUserId)>-1){
				inrole = true;
			}
		}
		if(inrole != true){
			$.ajax({
				method : 'post',
				url : '/dinghan/jsp/IsInRole.jsp',
				data : {'roleid':165},
				async : false,
				success : function(data){
					eval("var obj="+data);
					if(obj.inrole == "1"){
						inrole = true;
					}
				}
			});
		}
		if(inrole){
			$("tr[name='busiinfo']").css({display: ''});
		}else{
			$("tr[name='busiinfo']").remove();
		}	
	}        

	function customSetStyle(){
		setStyleByContraType($("#field6771").val());
		setStyleByBrowSolType($("#field6775").val());
		setStyleByIsHasExtraSupport($("#field6781").val());
		setStyleByLocalkeeper($("#field6804"));
		setStyleByLocalLoader($("#field6806"));
		setStyleByTrancPoint($("#field6805"));
		setStyleByProjectUI($("#field6807"));
		setStyleByWeiBaoStart($("#field6813"));
		setStyleByPayFrom($("#field6833").val());
	}

        function setStyleByLocalkeeper(ele){    //现场仓库租用及保管方
            if($("option:last",ele).is(":selected")){
				
			}else{
				$("#field8833").val("");
			}
        }            

        function setStyleByLocalLoader(ele){    //卸货方
           if($("option:last",ele).is(":selected")){
				
			}else{
				$("#field8834").val("");
			}
		}
       
		function setStyleByTrancPoint(ele){    //交货地点
			if($("option:last",ele).is(":selected")){
				
			}else{
				$("#field8835").val("");
			}
		}
       
		function setStyleByProjectUI(ele){     //工程界面
           if($("option[value='0']",ele).is(":selected")){
			}else{
				$("#field7936").val("");	//非标准工程界面描述
			}
		}

		function setStyleByWeiBaoStart(ele){       //维保起计条件
            if($("option:last",ele).is(":selected")){
			}else{
				$("#field7938").val("");
			}
		}

		function setStyleByPayFrom(val){    //付款方式
			if(val=='1'){
			}else{
				$("#field7941").val("");
				$("#field7942").val("");
			}
		}
        //计算折扣率
	function getZheKou(){
		var num1 = $("#field6828").val();
		var num2 = $("#field6831").val();
		if(num1=="" || num2=="") return false;
		var num = parseFloat(num1)/parseFloat(num2);
		num = num*100;
		$("#field6832").val(num.toFixed(2));
                $("#field6832span").html(num.toFixed(2));
	}


	/**
	 * 没有合同文本时，清空值
	 */	
	function clearValueByIsHasContraText(val){
		if(val == '0'){
			$("#field6791").val("");    //可提供时间
			$("#field6791span").html("");
			$("#field7935").val("");    //原因说明
		}else{
			oUpload6789.cancelQueue();	//合同及协议附件列表删除
		}
	}

        /**
	 * 非借货评审时，清空要货证明附件列表
	 */	
	function clearValueByIsBrow(val){
		if(val != '0'){
			oUpload6797.cancelQueue();	//要货证明文件
		}
	}

	/**
	 * 根据合同类型，改变样式
	 */	
	function setStyleByContraType(val){
		if(val=='0'){	//借货评审
			$("#browreason_tr").css({display: ''});	
			$("#browprodtype_tr").css({display: ''});
			
		}else{												//销售评审
			$("tr[name='prodbrow']").css({display: 'none'});
			$("#field7931").val("");	//借货原因
			$("#field6775").val("");	//借货处理办法
			$("#field7930").val("");	//其他说明
			$("#field6776").val("");	//退还承诺日期
			$("#field6777").val("");	//转销售合同日期
			$("#field6778").val("");	//销售最低金额
			$("#field8836").val("");	//付款方式
		}
	}
	
	/**
	 * 根据借货处理办法，改变样式
	 */
	function setStyleByBrowSolType(val){
		switch(val){
			case '0':		//退还公司
				$("#return_tr").css({display: ''});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: 'none'});
				$("#field7930").val("");
				$("#field6777").val("");
				$("#field6778").val("");
				$("#field8836").val("");
			break;
			
			case '1':		//转销售
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: ''});
				$("#field6776").val("");
				$("#field7930").val("");
			break;
			
			case '2':		//其他
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: ''});
				$("#trunsale_tr").css({display: 'none'});
				$("#field6776").val("");
				$("#field6777").val("");
				$("#field6778").val("");
				$("#field8836").val("");
			break;
		}
	}
	
	/**
	 *	根据是否有外配套设备，改变样式;
	 */
	function setStyleByIsHasExtraSupport(val){
		if(val == '0'){
			
		}else{
			$("#field8839").val("");
			$("#field8839span").html("");
			$("#field7932").val("");

		}
	}

        //根据培训级别、名额及特殊承诺改变样式
	function clearValueBYChengNuo(val){
		if(val == '0'){
			$("#field6802").val("");
			$("#field6803").val("");
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

//将某个字段设置为不必填
function setNotNeedcheck(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"span");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

//将某个字段设置为必填  用于browser框
function setNeedcheckB(i){//设置需要必填 i 数字id  
    var str = ',field'+i;  
	var needchecklists = document.all("needcheck");
    if(needchecklists.value.search(str)<0){   
            needchecklists.value = needchecklists.value+str;          
    }
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
	if(fv.val()=='')
		 f.html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
}

//将某个字段设置为不必填  用于browser框
function setNotNeedcheckB(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}
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

//*******品质评审环节 javascript 代码 start *****************************************************************************

<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
    $(function(){
		customSetStyle();	//自定制改变样式
		$("#field6824").bind('change',function(){
			setStyleByIsHasMeasureStandard();
		});
		$("#field6825").bind('change',function(){
			setStyleByIsHasMeasureStandard();
		});
    });  //document.ready 结束
        
	function customSetStyle(){
		setStyleByContraType($("#field6771").val());
		setStyleByBrowSolType($("#field6775").val());
		setStyleByIsHasExtraSupport($("#field6781").val());
	}	
    
	function setStyleByIsHasMeasureStandard(){	//是否有验收标准
		var isHasStandard = $("#field6824").val();	//项目条款中是否有验收标准
		var isProblemClosed = $("#field6825").val();  //类似产品的质量问题是否已关闭
		
		if(isHasStandard == '1' || isProblemClosed == '1'){
			setNeedcheck(7940);
		}else{
			setNotNeedcheck(7940);
		}
	}
	
	/**
	 * 根据合同类型，改变样式
	 */	
	function setStyleByContraType(val){
		if(val=='0'){	//借货评审
			$("#browreason_tr").css({display: ''});	
			$("#browprodtype_tr").css({display: ''});
			setNeedcheck(7931);
			setNeedcheck(6775);
		}else{												//销售评审
			$("tr[name='prodbrow']").css({display: 'none'});
			setNotNeedcheck(7931);	//借货原因
			setNotNeedcheck(6775);	//借货处理办法
			setNotNeedcheck(7930);	//其他说明
			setNotNeedcheck(6776);	//退还承诺日期
			setNotNeedcheck(6777);	//转销售合同日期
			setNotNeedcheck(6778);	//销售最低金额
			setNotNeedcheck(8836);  //付款方式
		}
	}
	
	/**
	 * 根据借货处理办法，改变样式
	 */
	function setStyleByBrowSolType(val){
		switch(val){
			case '0':		//退还公司
				$("#return_tr").css({display: ''});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: 'none'});
				setNeedcheck(6776);
				setNotNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
			
			case '1':		//转销售
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: ''});
				setNotNeedcheck(6776);
				setNotNeedcheck(7930);
				setNeedcheck(6777);
				setNeedcheck(6778);
				setNeedcheck(8836);
			break;
			
			case '2':		//其他
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: ''});
				$("#trunsale_tr").css({display: 'none'});
				setNotNeedcheck(6776);
				setNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
		}
	}
	
	/**
	 *	根据是否有外配套设备，改变样式;
	 */
	function setStyleByIsHasExtraSupport(val){
		if(val == '0'){
			setNeedcheckB(8839);	//设备类型
			 setNeedcheck(7932);
		}else{
			setNotNeedcheckB(8839);
			setNotNeedcheck(7932);
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

//将某个字段设置为不必填
function setNotNeedcheck(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"span");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

//将某个字段设置为必填  用于browser框
function setNeedcheckB(i){//设置需要必填 i 数字id  
    var str = ',field'+i;  
	var needchecklists = document.all("needcheck");
    if(needchecklists.value.search(str)<0){   
            needchecklists.value = needchecklists.value+str;          
    }
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
	if(fv.val()=='')
		 f.html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
}

//将某个字段设置为不必填  用于browser框
function setNotNeedcheckB(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}


//*******品质评审环节 javascript 代码 end*****************************************************************************

//*******商务评审 javascript 代码 start*****************************************************************************
    $(function(){
		customSetStyle();	//自定制改变样式
		
		//定制提交检测
		checkCustomize = function(){
			getTotalCost();	//计算成本合计
			return false;
		}
		
    });  //document.ready 结束
        
	function customSetStyle(){
		setStyleByContraType($("#field6771").val());
		setStyleByBrowSolType($("#field6775").val());
		setStyleByIsHasExtraSupport($("#field6781").val());
	}	

	function isShowBusiInfo(){	//判断是否显示商务评审信息
		var inrole = false;
		var curUserId = wf__info.f_bel_userid;
		var signer = $("#field6855").val();
		if(signer!=""){
			signer = signer.split(",");
			if(signer.indexOf(curUserId)>-1){
				inrole = true;
			}
		}
		if(inrole != true){
			$.ajax({
				method : 'post',
				url : '/dinghan/jsp/IsInRole.jsp',
				data : {'roleid':165},
				async : false,
				success : function(data){
					eval("var obj="+data);
					if(obj.inrole == "1"){
						inrole = true;
						}
					}
			});
		}
		if(inrole){
			$("tr[name='busiinfo']").css({display: ''});
		}else{
			$("tr[name='busiinfo']").remove();
		}
	}    
	
	function getTotalCost(){	//计算成本合计
		var total = 0;
		total += $("#field6843").val()==""?0:parseFloat($("#field6843").val(),10);	//材料成本
		total += $("#field6843").val()==""?0:parseFloat($("#field6844").val(),10);	//工程服务费
		total += $("#field6843").val()==""?0:parseFloat($("#field6845").val(),10);	//运保费
		total += $("#field6843").val()==""?0:parseFloat($("#field6846").val(),10);	//培训费
		total += $("#field6843").val()==""?0:parseFloat($("#field6847").val(),10);	//其他费用
		$("#field6848").val(total);
	}
	
	/**
	 * 根据合同类型，改变样式
	 */	
	function setStyleByContraType(val){
		if(val=='0'){	//借货评审
			$("#browreason_tr").css({display: ''});	
			$("#browprodtype_tr").css({display: ''});
			setNeedcheck(7931);
			setNeedcheck(6775);
		}else{												//销售评审
			$("tr[name='prodbrow']").css({display: 'none'});
			setNotNeedcheck(7931);	//借货原因
			setNotNeedcheck(6775);	//借货处理办法
			setNotNeedcheck(7930);	//其他说明
			setNotNeedcheck(6776);	//退还承诺日期
			setNotNeedcheck(6777);	//转销售合同日期
			setNotNeedcheck(6778);	//销售最低金额
			setNotNeedcheck(8836);  //付款方式
		}
	}
	
	/**
	 * 根据借货处理办法，改变样式
	 */
	function setStyleByBrowSolType(val){
		switch(val){
			case '0':		//退还公司
				$("#return_tr").css({display: ''});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: 'none'});
				setNeedcheck(6776);
				setNotNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
			
			case '1':		//转销售
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: ''});
				setNotNeedcheck(6776);
				setNotNeedcheck(7930);
				setNeedcheck(6777);
				setNeedcheck(6778);
				setNeedcheck(8836);
			break;
			
			case '2':		//其他
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: ''});
				$("#trunsale_tr").css({display: 'none'});
				setNotNeedcheck(6776);
				setNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
		}
	}
	
	/**
	 *	根据是否有外配套设备，改变样式;
	 */
	function setStyleByIsHasExtraSupport(val){
		if(val == '0'){
			setNeedcheckB(8839);	//设备类型
			 setNeedcheck(7932);
		}else{
			setNotNeedcheckB(8839);
			setNotNeedcheck(7932);
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

//将某个字段设置为不必填
function setNotNeedcheck(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"span");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

//将某个字段设置为必填  用于browser框
function setNeedcheckB(i){//设置需要必填 i 数字id  
    var str = ',field'+i;  
	var needchecklists = document.all("needcheck");
    if(needchecklists.value.search(str)<0){   
            needchecklists.value = needchecklists.value+str;          
    }
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
	if(fv.val()=='')
		 f.html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
}

//将某个字段设置为不必填  用于browser框
function setNotNeedcheckB(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

//*******商务评审 javascript 代码 end*****************************************************************************

//*******借货需求判定 javascript 代码 start**************************************************************************

//根据是否借货发货，设定样式
function setStyleByIsBrow(ele){
	if($("option[value='0']",ele).is(":selected")){
		setNeedcheck(7946);	//原因及目的
		setNeedcheck(7947);	//相配合的策略及行动
		setNeedcheck(6861);	//是否还需要再次申请
	}else{
		$("#field6857 option[value='']").attr("selected",true);   //是否已评审合同文本
		setNotNeedcheck(7946);	//原因及目的
		setNotNeedcheck(7947);	//相配合的策略及行动
		$("#field6861 option[value='']").attr("selected",true);  //是否还需要再次申请
	}
}

checkCustomize = function(){
	//检测明细填写
	if($("#field6856").val()=='0'){
		if($("input[name='check_node_1']").size() == 0){
			alert("请填写借货发货明细！");
			return false;
		}
	}
	return true;
}


//*******借货需求判定 javascript 代码 end**************************************************************************

<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
    $(function(){
		customSetStyle();	//自定制改变样式
		isShowBusiInfo();
		$("#field6862").bind('change',function(){
			if($("option[value='0']").is(":selected")){
				$("#field7948").val("");
			}else{
				setNotNeedcheckB(6865);
			}
		});
    });  //document.ready 结束
        
        function isShowBusiInfo(){	//判断是否显示商务评审信息
		var inrole = false;
		var curUserId = wf__info.f_bel_userid;
		var signer = $("#field6855").val();
		if(signer!=""){
			signer = signer.split(",");
                        if(signer.indexOf(curUserId)>-1){
                            inrole = true;
                        }
		}
                if(inrole != true){
                        $.ajax({
			    method : 'post',
			    url : '/dinghan/jsp/IsInRole.jsp',
                            data : {'roleid':165},
			    async : false,
			    success : function(data){
				eval("var obj="+data);
				if(obj.inrole == "1"){
                                    inrole = true;
                                }
			    }
		        });
                }
                if(inrole){
                    $("tr[name='busiinfo']").css({display: ''});
                }else{
                    $("tr[name='busiinfo']").remove();
                }
	}      

	function customSetStyle(){
		setStyleByContraType($("#field6771").val());
		setStyleByBrowSolType($("#field6775").val());
		setStyleByIsHasExtraSupport($("#field6781").val());
	}	

	/**
	 * 根据合同类型，改变样式
	 */
	function setStyleByContraType(val){
		if(val=='0'){	//借货评审
			$("#browreason_tr").css({display: ''});	
			$("#browprodtype_tr").css({display: ''});
			setNeedcheck(7931);
			setNeedcheck(6775);
		}else{												//销售评审
			$("tr[name='prodbrow']").css({display: 'none'});
			setNotNeedcheck(7931);	//借货原因
			setNotNeedcheck(6775);	//借货处理办法
			setNotNeedcheck(7930);	//其他说明
			setNotNeedcheck(6776);	//退还承诺日期
			setNotNeedcheck(6777);	//转销售合同日期
			setNotNeedcheck(6778);	//销售最低金额
			setNotNeedcheck(8836);  //付款方式
		}
	}
	
	/**
	 * 根据借货处理办法，改变样式
	 */
	function setStyleByBrowSolType(val){
		switch(val){
			case '0':		//退还公司
				$("#return_tr").css({display: ''});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: 'none'});
				setNeedcheck(6776);
				setNotNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
			
			case '1':		//转销售
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: 'none'});
				$("#trunsale_tr").css({display: ''});
				setNotNeedcheck(6776);
				setNotNeedcheck(7930);
				setNeedcheck(6777);
				setNeedcheck(6778);
				setNeedcheck(8836);
			break;
			
			case '2':		//其他
				$("#return_tr").css({display: 'none'});
				$("#otherdesc_tr").css({display: ''});
				$("#trunsale_tr").css({display: 'none'});
				setNotNeedcheck(6776);
				setNeedcheck(7930);
				setNotNeedcheck(6777);
				setNotNeedcheck(6778);
				setNotNeedcheck(8836);
			break;
		}
	}
	
	/**
	 *	根据是否有外配套设备，改变样式;
	 */
	function setStyleByIsHasExtraSupport(val){
		if(val == '0'){
			setNeedcheckB(8839);	//设备类型
			 setNeedcheck(7932);
		}else{
			setNotNeedcheckB(8839);
			setNotNeedcheck(7932);
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

//将某个字段设置为不必填
function setNotNeedcheck(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"span");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

//将某个字段设置为必填  用于browser框
function setNeedcheckB(i){//设置需要必填 i 数字id  
    var str = ',field'+i;  
	var needchecklists = document.all("needcheck");
    if(needchecklists.value.search(str)<0){   
            needchecklists.value = needchecklists.value+str;          
    }
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
	if(fv.val()=='')
		 f.html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
}

//将某个字段设置为不必填  用于browser框
function setNotNeedcheckB(i){// i 数字id  
    var str = ',field'+i;
	var needchecklists = document.all("needcheck");
	needchecklists.value = needchecklists.value.replace(str,'');
	var  f = jQuery("#field"+i+"spanimg");
	var  fv= jQuery("#field"+i);
        fv.val("");
	if(fv.val()=='')
		 f.html('');
}

