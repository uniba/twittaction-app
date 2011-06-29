
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


function tweet(message) {

    var oAuthAdapter = new OAuthAdapter(
    TwitterSettings.consumerSecret, //Consumer secret
    TwitterSettings.consumerKey, //Consumer key
    'HMAC-SHA1'
    );

    oAuthAdapter.loadAccessToken('twitter');

    oAuthAdapter.sendTweet(
        'https://api.twitter.com/1/statuses/update.json',
        [['status', message]],
        'Twitter', //アラートのタイトル
        '投稿しました.', //成功したときのアラートメッセージ
        '投稿できませんでした' //失敗したときのアラートメッセージ
    );

    if (oAuthAdapter.isAuthorized() == false) {
                alert('settingでログインしてください');
    };
}

/*------twitter投稿部分 終わり   --------------------------*/