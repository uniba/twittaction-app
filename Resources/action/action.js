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
    url:'subwin/recWin.js',
    title:'type',
    backgroundColor:'#fff',
    barColor:'black'
});




//create webview for actionWin(A1 image)
var UA_webView = Titanium.UI.createWebView({
		url: "http://dev.uniba.jp/~ryo/cube/"
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
   Ti.UI.currentTab.open(UA_recWin);
});

//add webview, tweetbutton and recbutton to actionWin
win.add(UA_webView);
//win.add(testCheck);
win.add(UA_tweetButton);
win.add(UA_recButton);