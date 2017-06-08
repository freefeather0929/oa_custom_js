       checkCustomize = function(){
           var flag = false;
           var judges = document.getElementById("field8959").value;
		   
           if(judges.replace(/\s+/g,"") != ""){
               judges = judges.split(",");
               var row,rowIndex;
               $("input[name='check_node_0']").each(function(i,n){
                   row = $(n).parent().parent();
                   rowIndex = $(row).attr("_rowindex");
                   if(judges.indexOf($("#field7703_"+rowIndex).val())>-1){
                       alert("你选择的评委："+$("#field7703_"+rowIndex+"span a").html()+"，已经做过评价，不需要再选择，请修改。");
                       flag = true;
                       return false;
                   }
               });
               if(flag) return false;
			   
			   var jdeds = document.getElementById("field8960").value;
			   jdeds = jdeds.split(",");
			   
			   for(var i=0;i<jdeds.length;i++){
				   if(judges.indexOf(jdeds[i])>-1){
					   flag = true;
					   alert("你已经向评委："+$("#field8956span a:eq("+i+")").html()+"，发送过评委评价流程，请修改你选择的。");
					   break;
				   }
			   }
			   
			   if(flag) return false;
           }
		   
           return true;
       };