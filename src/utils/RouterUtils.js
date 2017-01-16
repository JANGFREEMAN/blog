

module.exports = {
    redirect: function(url){
        return function(){
            window.location.href = '/#'+url;
            window.location.reload();
        }
    }
}