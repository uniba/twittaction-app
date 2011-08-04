Ti.include('../twitterSetting/xauth.js');
Ti.include('feedFunctions.js');

var win1 = Ti.UI.currentWindow;
var tabbar1 = Titanium.UI.createTabbedBar({
    labels: ['follow', 'all'],
    index:0
});
win1.rightNavButton = tabbar1;

tabbar1.addEventListener('click', function(e){
   // e.indexにクリックされたボタンのindexがセットされます
   if(e.index == 0){
    //alert('0!!');
        
    var loginCheck = new OAuthAdapter(
        TwitterSettings.consumerSecret, //Consumer secret
        TwitterSettings.consumerKey, //Consumer key
        'HMAC-SHA1'
    );

        loginCheck.loadAccessToken('twitter');
        
    if((loginCheck.isAuthorized() == false) || ( Titanium.Network.online == false )) {
        recommendLogin(win1); //feedFunctions.js 内にある関数
    }else{
        Ti.include('feedTable.js');

    }
        
   }else if(e.index == 1){
    //alert('1!!');
    
    try{
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        xhr.onload = function(){
          //alert(this.responseText);
          var allJson = JSON.parse(this.responseText);
          //alert(allJson[0].key);
          twittactionAllUser(allJson);
          
        };
        xhr.open('POST','http://twittaction.com/all');
        xhr.onerror = function(){
            alert('エラーが発生しました');
        };
        xhr.send();
        
        }
        
    catch(error){
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        alert('エラーが発生しました。');
    }

    
   }
});

var loginCheck = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
);

    loginCheck.loadAccessToken('twitter');
    
if((loginCheck.isAuthorized() == false) || ( Titanium.Network.online == false )) {
    recommendLogin(win1); //feedFunctions.js 内にある関数
}else{
    Ti.include('feedTable.js');

}
