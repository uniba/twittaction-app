Ti.include('../twitterSetting/xauth.js');
Ti.include('feedFunctions.js');

var win1 = Ti.UI.currentWindow;
win1.backgroundImage = 'paper_uniba_rdd.png' ;
var tabbar1 = Titanium.UI.createTabbedBar({
    labels: ['follow', 'all'],
    index:0,
		//backgroundColor:'black'
});
win1.rightNavButton = tabbar1;

var tableView = Titanium.UI.createTableView({
    backgroundColor:'transparent',
    separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
    //separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
});


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
            win1.remove(tableView);
            recommendLogin(win1); //feedFunctions.js 内にある関数
        }else{
        //alert(7);
            followData(reference[0],tableView);
        }
            
   }else if(e.index == 1){
    //alert(6);
    allTwittaction(reference[1],tableView);

   }
});

var loginCheck = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
);

    loginCheck.loadAccessToken('twitter');
    
if((loginCheck.isAuthorized() == false) || ( Titanium.Network.online == false )) {
    win1.remove(tableView);
    recommendLogin(win1); //feedFunctions.js 内にある関数
}else{
     //alert('1!!');
    win1.add(tableView);
    socialGraph(); // feedFunctions.js
    //alert(5);
    followData(reference[0],tableView);

}