var win = Ti.UI.currentWindow;


/* newDir フォルダの確認用ボタン
var testCheck= Titanium.UI.createButton({
    title:'testCheckAccel',
	top:100,
	left: 50,
	width: 105,
	height: 34
});

testCheck.addEventListener('click', function(e){
  //actionWin.close();
	var tijson = null;
*/

/*
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

//create file
var newFile = Titanium.Filesystem.getFile(newDir.nativePath, 'acce.json');
if(newFile.exists()){
    //this.tijson = Titanium.JSON.parse(newFile.read());
    alert(newFile.read());
} else {
    alert("file no exists");
}
});

*/

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




//create webview for actionWin(A1 image)
var SaveWebView = Titanium.UI.createWebView({
		url: "actionHtml/action.html"
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
	Ti.UI.currentTab.open(UA_tweetWin);
    
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
//win.add(testCheck);
win.add(UA_tweetButton);
win.add(UA_recButton);