/*------xauth部分   --------------------------*/
Ti.include("../../../../../../../../../twitterSetting/lib/twitter_api.js");
//Ti.include("../../../../../../../../../twitterSetting/twitter_settings.js");
Ti.include("../../../../../../../../../twitterSetting/tweet_db.js");

var TwitterSettings = {
    consumerKey:'32hSIl7UzNjy39p3u3Muw',
    consumerSecret:'KDIuHJoSOqxhMUzqk5e34IMYzU4X99m7b9XiG5zk'
};


Ti.App.twitterApi = new TwitterApi({
	consumerKey:TwitterSettings.consumerKey,
	consumerSecret:TwitterSettings.consumerSecret
});

var twitterApi = Ti.App.twitterApi;
/*
twitterApi.init({
	username: settingsXauth.username,
	password: settingsXauth.password
	});
    
    */
//ここを変えるとuserが変わる
/*------xauth部分終わり   --------------------------*/