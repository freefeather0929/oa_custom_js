/**
 * Created by freef on 2017-06-07.
 */

(function($){

    function executeCheckAttendanceCollection() {
        var zt = jQuery('#field9057').val();  //帐套
        var hrid = jQuery('#field9058').val();  //人员id
        var date1 = jQuery('#field9066').val();     //汇总月份
        if(zt == "" && hrid == ""){
            alert("人员为空时、请选择帐套！");
        }else{
            if(date1 == ""){
                alert("请选择月份！");
            }else{
                jQuery.ajax({
                    url: '/dh/kaoq/upLoad.jsp?type=2&zt='+zt+'&hrid='+hrid+'&date1='+date1,
                    dataType: 'text',
                    contentType : 'charset=UTF-8',
                    error:function(ajaxrequest){},
                    success:function(content){
                        var obj = eval(content);

                        alert('生成成功');

                    }
                });
            }
        }
    }

})(jQuery)




