// JavaScript Document
function transToERP(){
    var userids = $("#field9079").val();
	var accountid = $("#field9080").val();
	var year = $("#field9077").val();
	var month = $("#field9081").val();

	if(year.replace(/\s+/g,"") == ""){
		alert("请选择年份！");
		return false;
	}
	if(month.replace(/\s+/g,"") == ""){
		alert("请选择月份！");
		return false;
	}
	
	if(!$("#field9082").is(":checked")){
		if(accountid.replace(/\s+/g,"") == "" && userids.replace(/\s+/g,"") == ""){
			alert("人员为空时请选择帐套！");
			return false;
		}
	}
	
	$.ajax({
		method: "post",
		url: "/dh/kaoq/KQTransToU9.jsp",
		data: {
			"userids":userids,
			"accountid":accountid,
			"year":year,
			"month":month
		},
		success : function(data){
			eval("var obj = " + data);
			console.log(obj);
		}
	});
}