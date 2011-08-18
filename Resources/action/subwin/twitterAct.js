
/* 6/2
このページでは、
xauth.js の
twitterApi.init({
	username: settingsXauth.username,
	password: settingsXauth.password
	});
    
    部分は、setting.js の 74行目にあるから、
    setting.js でsqliteかなんかに、settingsXauth.usernameと settingsXauth.passwordを保存して取り出す必要があるかも。
    tokenを保存してるのを取得出来るのが一番いいのだけれど・・・
    
    6/23 何とかなった。

*/

Ti.include('../../twitterSetting/xauth.js');


/*------twitter投稿部分   --------------------------*/
Ti.include('../../twitterSetting/lib/oauth_adapter.js');


function tweet(message) 
{

    var oAuthAdapter = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
    );

    oAuthAdapter.loadAccessToken('twitter');

    var isTweetSended = oAuthAdapter.sendTweet(
        'https://api.twitter.com/1/statuses/update.json',
        [['status', message]],
        'Twitter', //アラートのタイトル 
        '投稿しました.', //成功したときのアラートメッセージ
        '投稿できませんでした' //失敗したときのアラートメッセージ
    );
    //oauth_adapter.jsの oAuthAdapter.sendTweet を書き換えている
    // 8/18 oAuthAdapter.sendTweet を戻した。
    //add by hebinbin 
    /*
    twitterApi.statuses_home_timeline(
    {
        onSuccess: function(response){
               var UA_tweetDisplayWin = Ti.UI.createWindow({
                
                url: '../../function/tweetDisplayWin.js',
                backButtonTitle: 'back',
                backgroundColor: '#fff',
                tabBarHidden: true,
                barColor:'black'
                
                
        });
        
        UA_tweetDisplayWin.displayIndex = 0;
        UA_tweetDisplayWin.displayText = message;
        UA_tweetDisplayWin.displayTitle = isTweetSended[1];
        UA_tweetDisplayWin.avartarUrl = isTweetSended[2];
        UA_tweetDisplayWin.displayAvatar = isTweetSended[2];
        UA_tweetDisplayWin.created_at = isTweetSended[3];
        UA_tweetDisplayWin.displayTweet = true;      
        UA_tweetDisplayWin.UA_tableViewData = response;

        
        Ti.UI.currentTab.open(UA_tweetDisplayWin);
        
        
        },
        onError: function(error){
            Ti.API.error(error);
        }
    });
    */
    if (oAuthAdapter.isAuthorized() == false) {
        alert('settingでログインしてください');
    };
}


/*
function tweetTwittaction(message) 
{

    var oAuthAdapter = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
    );

    oAuthAdapter.loadAccessToken('twitter');

    var isTweetSended = oAuthAdapter.sendTweet(
        'https://api.twitter.com/1/statuses/update.json',
        [['status', message]],
        'Twitter', //アラートのタイトル 
        '投稿しました.', //成功したときのアラートメッセージ
        '投稿できませんでした' //失敗したときのアラートメッセージ
    );
    //oauth_adapter.jsの oAuthAdapter.sendTweet を書き換えている
    
    //add by hebinbin 

        twitterApi.statuses_home_timeline(
        {
            onSuccess: function(response){
                   var UA_tweetDisplayWin = Ti.UI.createWindow({
                    
                    url: '../../function/tweetDisplayWin.js',
                    backButtonTitle: 'back',
                    backgroundColor: '#fff',
                    tabBarHidden: true,
                    barColor:'black'
                    
                    
            });
        
 
            
        UA_tweetDisplayWin.displayIndex = 0;    
        UA_tweetDisplayWin.displayText = message;
        UA_tweetDisplayWin.displayTitle = isTweetSended[1];
        UA_tweetDisplayWin.avartarUrl = isTweetSended[2];
        UA_tweetDisplayWin.displayAvatar = isTweetSended[2];
        UA_tweetDisplayWin.created_at = isTweetSended[3];
        UA_tweetDisplayWin.displayTweet = true;      
        UA_tweetDisplayWin.UA_tableViewData = response;
        UA_tweetDisplayWin.displayNav = nav; // tweetWin.js の var nav = win.nav;
        
        //Ti.UI.currentTab.open(UA_tweetDisplayWin);
        nav.open(UA_tweetDisplayWin,{animated:true});
        
            },
            onError: function(error){
                Ti.API.error(error);
            }
        }
        );
        
        
            

    if (oAuthAdapter.isAuthorized() == false) {
                alert('settingでログインしてください');
    };
}

*/






/*------twitter投稿部分 終わり   --------------------------*/