/*------xauth読み込み部分   --------------------------*/
    Ti.include("../twitterSetting/lib/twitter_api.js");
    Ti.include("../twitterSetting/twitter_settings.js");
		Ti.include('../twitterSetting/xauth.js');
/*------xauth読み込み部分 終  --------------------------*/    
var settingsXauth = {
    username:'',
    password:''

};

//create settingTable and add settingWin
var settingWin = Ti.UI.currentWindow;

//create twitter login interface by using tableview
var data = [];
data[0] = Ti.UI.createTableViewSection({headerTitle:'Twitter アカウント'});
var rowusername = Ti.UI.createTableViewRow({title:''});

var loginCheck = new OAuthAdapter(
		TwitterSettings.consumerSecret, //Consumer secret
		TwitterSettings.consumerKey, //Consumer key
		'HMAC-SHA1'
);

loginCheck.loadAccessToken('twitter');
if(loginCheck.isAuthorized() == false) {
	var textusername = Ti.UI.createTextField({
			left: 100,
			width: 200,  
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT
	});
}else{
var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
var contents = twitterConfig.read();
var contentsJson = JSON.parse(contents.text);
var screen_name = contentsJson['screen_name']
//alert(contentsJson['screen_name']);

	var textusername = Ti.UI.createTextField({
			left: 100,
			width: 200,  
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
			value:screen_name
	});
}

var labelusername = Ti.UI.createLabel({
    text: 'Username:',
    left: 10
});
rowusername.add(labelusername);
rowusername.add(textusername);
//rowusername.className = 'control';
data[0].add(rowusername);
var rowpassword = Ti.UI.createTableViewRow({title:''});
var textpassword = Ti.UI.createTextField({
    left: 100,
    width: 200,
    passwordMask: true,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});

var labelpassword = Ti.UI.createLabel({
    text: 'Password:',
    left: 10
});

rowpassword.add(labelpassword);
rowpassword.add(textpassword);

data[0].add(rowpassword);	


//add leftbutton and rightbutton on navbar
var leftbutton = Titanium.UI.createButton({title:'キャンセル'});
var rightbutton = Titanium.UI.createButton({title:'ログイン'});



//add the action for rightbutton(login)
rightbutton.addEventListener('click',function()
{
    
            // オフラインなら処理しないようにしたほうがいいですよね！
    if(Titanium.Network.online == false){
        //alert('in');// エラー表示
        alert('インターネットに接続されていません');
        return;
    }
    
    Ti.App.twitterApi = new TwitterApi({
        consumerKey:TwitterSettings.consumerKey,
        consumerSecret:TwitterSettings.consumerSecret
    });

    var twitterApi = Ti.App.twitterApi;
    //alert('out');
  settingsXauth.username = textusername.value;
  settingsXauth.password = textpassword.value;
  //Ti.API.info(twitteraccount);
  //Ti.API.info(twitterpassword);
  //at here we need to insert auenthecation program
 

/*------xauth login部分   --------------------------*/
    twitterApi.init({
        username: settingsXauth.username,
        password: settingsXauth.password
    });
    
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,  'twitter.config');
    if (file.exists == false) return;

    var contents = file.read();
    if (contents == null) return;
    try{
        var config = JSON.parse(contents.text);
        //alert(config);//確認
    }
    catch(ex){
        return;
    }
    
    if (config.user_id){ 
       var user_id = config.user_id;
			 cleateLogoutButton(settingWin,screen_name); // ログインに成功したら、ログアウトボタンを作成
			 
        //alert(user_id);
    }
    
    // フォローしているユーザーを確認して、twittactionサーバーに保存。
    try{
    // https://dev.twitter.com/docs/api/1/get/friends/ids 
    twitterApi.friends_ids({
        url:'http://api.twitter.com/1/friends/ids.json?user_id='+user_id,
        onSuccess:function(responce){
            //alert(responce)
            var xhrUserid = Titanium.Network.createHTTPClient();
            xhrUserid.setTimeout(30000);
            
            /*
            xhrUserid.onload = function(){
                //alert('onload')
            };
            */
            xhrUserid.open('POST','http://twittaction.com/socialGraph');
            
            xhrUserid.onerror = function(error){
            //var error = JSON.parse(err);
                alert(error);
            };
            
            //alert(user_id);
            //alert(responce);
            xhrUserid.send({userId:user_id,friends:responce});
        },
        onError:function(error){
            Titanium.API.info('friends_ids post error:'+error)
        }
    });


    }
    catch(error){
        alert('エラーが発生しました。2');
    }
    //alert("クリック");
    //ここを変えるとuserが変わる    
/*------xauth login部分終わり   --------------------------*/

    // profile_image_url_https 取得部分
    try{
        // オブジェクトを生成します。
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        
        var twitterUrl = 'http://api.twitter.com/1/users/show.json?user_id='+user_id;
        
        xhr.open('GET',twitterUrl);
        
        // レスポンスを受け取るイベント
        xhr.onload = function(){
            //alert(this.responseText);
            var json = JSON.parse(this.responseText);
            //alert(json);
            //alert(json.profile_image_url_https);
            
            var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
                newDir.createDirectory();
                
            var profileImageFile = Titanium.Filesystem.getFile(newDir.nativePath, 'profile_image_url_https.json');
                //var contents = newFile.read();
            var profile_image_url_https = new Object();;
                profile_image_url_https['profile_image_url_https'] = json.profile_image_url_https; 
            var profile_image_url_httpsJson = JSON.stringify(profile_image_url_https);
                profileImageFile.write(profile_image_url_httpsJson);
            
            //alert(profile_image_url_httpsJson);
            //SaveWebView.evalJS('imageUrl("'+json.profile_image_url_https+'")');
        };
        
        xhr.onerror = function(){
            return;
        };
        
        xhr.send();
        
    } // try{
    
    catch(error){
        alert('エラーが発生しました');
    }
	
});


//win4.add(tableview);
settingWin.leftNavButton = leftbutton;
settingWin.rightNavButton = rightbutton;

leftbutton.addEventListener('click', function(e){
        Titanium.API.info('leftbutton click');
        
        //twitterApi.statuses_public_timeline({onSuccess:function(responce){alert(responce)},onError:function(error){alert(error)}});
    //alert(typeof fol);
        //Titanium.UI.currentWindow.remove(searchBar)
        //Titanium.UI.currentWindow.titleControl(searchBar)
        textusername.blur();
        textpassword.blur();
});


// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:false
});

//add tableview
settingWin.add(tableview);
/*
if(loginCheck.isAuthorized() == true) {
	settingWin.add(logoutButton);
}
*/
/*------ログイン情報の削除   --------------------------*/
if(loginCheck.isAuthorized() == true) {
		cleateLogoutButton(settingWin,screen_name);
}


/*------ログイン情報の削除　終   --------------------------*/

function cleateLogoutButton(settingWin,screen_name){

var logoutButton = Ti.UI.createButton({
    title: 'ログアウト',
    height:50,
    width:200,
    bottom:20
});
/*
var loginUserLabel = Ti.UI.createLabel({
    text: screen_name+'でログインしています。',
    bottom:-40,
		textAlign:'center'
});
*/
logoutButton.addEventListener('click', function(e){
        Titanium.API.info('logoutLabel click');
        Ti.App.twitterApi = new TwitterApi({
            consumerKey:TwitterSettings.consumerKey,
            consumerSecret:TwitterSettings.consumerSecret
        });

        var twitterApi = Ti.App.twitterApi;
        twitterApi.deleteAccessToken();
        
        textusername.value='';
        textpassword.value='';
        textusername.blur();
        textpassword.blur();
				settingWin.remove(logoutButton);
				//settingWin.remove(loginUserLabel);
});
settingWin.add(logoutButton);
//settingWin.add(loginUserLabel);
}

