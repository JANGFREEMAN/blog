var $ = require('jquery');

module.exports = {
  /**
    ajax请求服务端数据
    @param url 请求地址
    @param method http的method
    @param data  请求数据
    @param callback 请求回调
  */
  ajaxRequest: function(url,method='get',data,callback){
    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      type: method,
      cache: false,
      success: function(result){
          callback(result);
      },
    });
  },
  handleOnLoad:function(e){
    alert(e.target.html());
  },
  /*
    异步表单上传，主要用于异步上传文件
    @param url 请求地址
    @param method http的method
    @param form jquery的form表单对象
    @param callback 请求回调
  */
  iFrameForm: function(url,method = 'post',form,callBack){
    var iFrame = $('<iframe style = "display:none" name = "xhr"  id = "xhr"></iframe>');
    $('body').append(iFrame);
    form.attr('target','xhr');
    form.attr('action',url);
    form.attr('method',method);
    form.attr('disabled',"disabled");
    form.attr('enctype','multipart/form-data');
    form.submit();
    $("#xhr").on('load',function(){
      var result = JSON.parse($(window.frames['xhr'].document.body).text());
      $(this).remove();
      callBack(result);
    })
  }
}
