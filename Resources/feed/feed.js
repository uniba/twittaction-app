Ti.include('../twitterSetting/xauth.js');
Ti.include('feedFunctions.js');

var win1 = Ti.UI.currentWindow;
var tabbar1 = Titanium.UI.createTabbedBar({
    labels: ['follow', 'all'],
    index:0
});
win1.rightNavButton = tabbar1;

var reference = [];
reference[0]=0;
reference[1]=0;
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
            followData(reference[0]);
            //reference(i[0]);
            //i[0] = i[0] - 1;
        }
            
   }else if(e.index == 1){
    //alert('1!!');
    allTwittaction(reference[1]);
    //reference(i[0]);
    //i[0] = i[0] + 1;
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
    followData(reference[0]);

}

function reference(i){
    alert(i);
}