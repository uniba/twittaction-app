var win = Ti.UI.currentWindow;

var UA_tweetWin = Titanium.UI.createWindow({  
    url:'subwin/tweetWin.js',
    title:'Tweet',
    backgroundColor:'#fff',
    barColor:'black'
});

var UA_recWin = Titanium.UI.createWindow({  
    url:'subwin/recStartWin.js',
    title:'Rec',
    backgroundColor:'#fff',
    barColor:'black'
});
var coverWin = Titanium.UI.createWindow({  
    backgroundColor:'Transparent'
});
coverWin.open();

//create webview for actionWin(A1 image)
var SaveWebView = Titanium.UI.createWebView({
		url: "actionHtml/action.html",
        //touchEnabled:false
});

UA_recWin.SaveWebView = SaveWebView;

/*
//create directory 
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

//create file
var newFile = Titanium.Filesystem.getFile(newDir.nativePath, 'acce.json');
var contents = newFile.read();

if (contents == null){ 
    alert('空');//確認
}else{   
    var insertData = "insertData("+contents.text+")";
    //alert(insertData);
    SaveWebView.evalJS(insertData);

}
*/

SaveWebView.addEventListener('load', function(e){
        //create directory 
    var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
    newDir.createDirectory();

    //create file
    var newFile = Titanium.Filesystem.getFile(newDir.nativePath, 'acce.json');
    var contents = newFile.read();
    //alert (contents.text);
    
    //SaveWebView.evalJS('test()')
    var insertData = "insertData("+contents.text+")";
    //alert(insertData);
    SaveWebView.evalJS(insertData);
    
    
            // オフラインなら処理しないようにしたほうがいいですよね！
    if(Titanium.Network.online == false){
        // エラー表示
        return;
    }

    // オブジェクトを生成します。
    var xhr = Titanium.Network.createHTTPClient();
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,  'twitter.config');
    if (file.exists == false) return;

    var contents = file.read();
    if (contents == null) return;

    try
    {
        var config = JSON.parse(contents.text);
        //alert(config);//確認
    }
    catch(ex)
    {
        return;
    }
    
    if (config.user_id){ 
        user_id = config.user_id;
        //alert(user_id);
    }
    
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
        
        SaveWebView.evalJS('imageUrl("'+json.profile_image_url_https+'")');
    };
    xhr.send();
    

});


//create tweet button for actionWin(A1 image)
var UA_tweetButton = Titanium.UI.createButton({
	backgroundImage:'pic/rec01.png',
    backgroundSelectedImage:'pic/rec01.png',
    title:'Tweet',
	top:325,
	left: 35,
	width: 105,
	height: 34
});


//add eventlistener for tweetbutton
//close actionWin and open tweetwin means changing from A1 to A6
UA_tweetButton.addEventListener('click', function(e){
  //actionWin.close();
    
            
    
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(){

        var url = this.responseText;
        Titanium.API.info('returned url:' +url);
        //alert(url);
        //create directory 
        var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        dir.createDirectory();        
        //create file
        var shortUrlFile = Titanium.Filesystem.getFile(dir.nativePath, 'shortUrl.json');
        var shortUrl = new Object();
        shortUrl['shortUrl'] = url; 
        var shortUrlJson = JSON.stringify(shortUrl);
        shortUrlFile.write(shortUrlJson);
        Ti.UI.currentTab.open(UA_tweetWin);
    };    
        //alert(profileImageJson.profile_image_url_https);
    
    xhr.open('POST','http://twittaction.com/action');
    
    var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        dir.createDirectory();  
    var postInformationFile = Titanium.Filesystem.getFile(dir.nativePath, 'postInfomation.json');
    var config = postInformationFile.read();
    //alert(JSON.parse(config.text));
    var postInformationJson=JSON.parse(config.text);
    
    xhr.send({userId:postInformationJson.userId, message:'', sequence:postInformationJson.sequence,  profile_image_url_https:postInformationJson.profile_image_url_https});
    

});

//create tweet button for actionWin(A1 image)
var UA_recButton = Titanium.UI.createButton({
    backgroundImage:'pic/rec01.png',
    backgroundSelectedImage:'pic/rec01.png',
    title:'Rec',
	top:325,
	right: 35,
	width: 105,
	height: 34
});

//add eventlistener for recbutton
//close actionWin and open recwintype means chaning from A1 to A2 
UA_recButton.addEventListener('click', function(e){
   //actionTab.close(actionWin);
   UA_recWin.hideTabBar();
   Ti.UI.currentTab.open(UA_recWin);
});

//add webview, tweetbutton and recbutton to actionWin
win.add(SaveWebView);
win.add(coverWin);
//win.add(testCheck);
win.add(UA_tweetButton);
win.add(UA_recButton);