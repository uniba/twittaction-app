<<<<<<< HEAD
=======
//author : uniba.jp

>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
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


    Ti.App.twitterApi = new TwitterApi({
        consumerKey:TwitterSettings.consumerKey,
        consumerSecret:TwitterSettings.consumerSecret
    });

    var twitterApi = Ti.App.twitterApi;
/*------xauth読み込み部分 終  --------------------------*/    

//add the action for rightbutton(login)
rightbutton.addEventListener('click',function()
{
  settingsXauth.username = textusername.value;
  settingsXauth.password = textpassword.value;
<<<<<<< HEAD
  //Ti.API.info(twitteraccount);
  //Ti.API.info(twitterpassword);
  //at here we need to insert auenthecation program
 

=======
 
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
/*------xauth login部分   --------------------------*/
    twitterApi.init({
        username: settingsXauth.username,
        password: settingsXauth.password
    });
<<<<<<< HEAD
    
    //alert("クリック");
    //ここを変えるとuserが変わる    
=======
      
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
/*------xauth login部分終わり   --------------------------*/

});


//win4.add(tableview);
settingWin.leftNavButton = leftbutton;
settingWin.rightNavButton = rightbutton;

leftbutton.addEventListener('click', function(e){
        Titanium.API.info('leftbutton click');
        //Titanium.UI.currentWindow.remove(searchBar)
        //Titanium.UI.currentWindow.titleControl(searchBar)
        textusername.blur();
        textpassword.blur();
});

/*------ログイン情報の削除   --------------------------*/
var logoutLabel = Ti.UI.createLabel({
    text: 'ログアウト'
});

logoutLabel.addEventListener('click', function(e){
        Titanium.API.info('logoutLabel click');
        
        twitterApi.deleteAccessToken();
        
        textusername.value='';
        textpassword.value='';
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
        textusername.blur();
        textpassword.blur();
        
});



var logout = Ti.UI.createTableViewRow({title:''});
logout.add(logoutLabel);


data[0].add(logout);	

/*------ログイン情報の削除　終   --------------------------*/

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

//add tableview
settingWin.add(tableview);