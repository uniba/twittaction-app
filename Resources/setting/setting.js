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
var textusername = Ti.UI.createTextField({
    left: 100,
    width: 200,  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});
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

/*------xauth読み込み部分   --------------------------*/
    Ti.include("../twitterSetting/lib/twitter_api.js");
    Ti.include("../twitterSetting/twitter_settings.js");


/*------xauth読み込み部分 終  --------------------------*/    

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
        //alert(user_id);
    }
    
    
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
        alert('エラーが発生しました3');
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

/*------ログイン情報の削除   --------------------------*/
var logoutButton = Ti.UI.createButton({
    title: 'ログアウト',
    height:50,
    width:200,
    bottom:20
});

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
        /*
        Ti.include("../twitterSetting/tweet_db.js"); 
        //var TweetDB = new TweetDB();
        var dbName = 'tweetdb';
        //TweetDB.open();
        //var db = TweetDB.db();
        var db = Titanium.Database.open(dbName);
        var rows = db.execute('SELECT * FROM tweets');
        Titanium.API.info('ROW COUNT = ' + rows.getRowCount());
        db.execute('DELETE FROM tweets');
        Titanium.API.info('DELETE FROM tweets');
        
        db.close();
        */
        /*
        var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        //newDir.createDirectory();
        newDir.deleteDirectory();
        
        Ti.API.info('derete mydir');
        */
        // TabGroupの取得 http://code.google.com/p/titanium-mobile-doc-ja/wiki/TabGroup
        //var tabGroup =settingWin.tabGroup;
        //var feedTab = Titanium.UI.currentWindow.tabGroup;
        //tabGroup.close();
        //tabGroup.open();
        // 所属するタブはtabsプロパティにある
        
        //alert(tabGroup.tabs[1].title);
        /* feedの画面をリセットしたい。
        タブを消して再セットしようとしたが、うまくいかなかった。
        tabGroup.removeTab(tabGroup.tabs[4]);
        
        var win2=Titanium.UI.createWindow({
            url: 'setting.js',
            title:'feed',
            backgroundColor:'#fff'
        });
        
        var newtab = Titanium.UI.createTab({  
		    icon:'../picture/feed_over.png',
		    title:'feed',
			win:win2
		});
		tabGroup.addTab(newtab);
        */

        
});



//var logout = Ti.UI.createTableViewRow({title:''});
//logout.add(logoutLabel);


//data[0].add(logout);	

/*------ログイン情報の削除　終   --------------------------*/

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
    scrollable:false
});

//add tableview
settingWin.add(tableview);
settingWin.add(logoutButton);