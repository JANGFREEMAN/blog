

module.exports = {
    redirect: function(url){
        return function(){
            if(url == '/signout'){
                window.location.href = url;
            }else{
              window.location.href = '/#'+url;
              window.location.reload();
            }
        }
    }
}
