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
        followData();
    }
        
   }else if(e.index == 1){
    //alert('1!!');
    allTwittaction();
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
     //alert('1!!');
    socialGraph(); // feedFunctions.js
    followData();

}

var twittactionAll = new twittactionAllUser('all');
var twittactionFollow = new twittactionAllUser('follow');

function followData(twittactionFollow){
 try{
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        xhr.onload = function(){
          //alert(this.responseText);
          var allJson = JSON.parse(this.responseText);
          //alert(allJson[0].key);
          //alert(this.responseText);
          //twittactionAllUser(allJson,'follow');
          twittactionFollow.addTable(allJson);
        };
        
        var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
        if(twitterConfig.exists()){
            var  twitterConfigJson = JSON.parse(twitterConfig.read());
           // alert(twitterConfigJson.user_id);
        } else {
            alert("ログイン情報がありません");
        }
        
        xhr.open('POST','http://twittaction.com/follow');
        xhr.onerror = function(){
            alert('エラーが発生しました');
        };
        xhr.send({userId:twitterConfigJson.user_id});
        
        }
        
    catch(error){
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        alert('エラーが発生しました。');
    }
}

function allTwittaction(twittactionAll){
    try{
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        xhr.onload = function(){
          //alert(this.responseText);
          var allJson = JSON.parse(this.responseText);
          //alert(allJson[0].key);
          
          twittactionAll.addTable(allJson);
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