<<<<<<< HEAD
Ti.include('../twitterSetting/xauth.js');
Ti.include('feedFunctions.js');

var win1 = Ti.UI.currentWindow;

=======
// create feedTable and add feedwin to feedTable to display home_timeline
Ti.include("../function/twitter_userline_func.js");
Ti.include('../twitterSetting/xauth.js');
Ti.include('feedFunctions.js');

var win1 = Titanium.UI.currentWindow;

//create Tableview to display home_timeline
//cause using home_timeline, it requires authentication
//in order to test tableview, at here, we use user_timeline

>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
var loginCheck = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
);

    loginCheck.loadAccessToken('twitter');
    
<<<<<<< HEAD
if(loginCheck.isAuthorized() == false) {
    recommendLogin(); //feedFunctions.js 内にある関数
}else{
    Ti.include('feedTable.js');

}
=======
if(loginCheck.isAuthorized() == false)
{
    recommendLogin(); //feedFunctions.js 内にある関数
}
else
{
   Ti.include('feedTable.js');
}

win1.open();
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
