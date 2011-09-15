var win = Ti.UI.currentWindow;

var UA_tweetWin = Titanium.UI.createWindow({  
    url:'subwin/tweetWin.js',
    title:'Tweet',
    backgroundColor:'#fff',
    //barColor:'black'
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
		//url: "http://twittaction.preview.dev.uniba.jp/test/actionHtml/action.html",
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
    
    var imageFile = Titanium.Filesystem.getFile(newDir.nativePath, 'profile_image_url_https.json');
    var imageFileContents = imageFile.read();
    var imageFileJson = JSON.parse(imageFileContents.text);
    //alert(imageFileContents.text);
    //alert(imageFileJson);
    SaveWebView.evalJS('imageUrl("'+imageFileJson.profile_image_url_https+'")');
    

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
    var coverWin = Titanium.UI.createWindow({
        opacity:0.2,
        backgroundColor:'blue',
        
    });
    var actInd = Titanium.UI.createActivityIndicator({
        style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
        font: {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
        message: '短縮URLを作成中です',
        color:'black',
        opacity:1.0,
    });
    actInd.show();
    coverWin.open();
    win.add(coverWin);
    win.add(actInd);
    
    try{
    
    var xhr = Titanium.Network.createHTTPClient();
    xhr.setTimeout(30000);
    
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
        
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        
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
    
    //xhr.setTimeout(100);
    xhr.onerror = function(){
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        alert('エラーが発生しました');
    };
    var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
    if(twitterConfig.exists()){
        var  twitterConfigJson = JSON.parse(twitterConfig.read());
        //alert(twitterConfigJson.screen_name);
    } else {
        alert("ログイン情報がありません");
    }
    var formatTime = formatModified();
    
    xhr.send({userId:postInformationJson.userId, message:'', sequence:postInformationJson.sequence,  profile_image_url_https:postInformationJson.profile_image_url_https , formatTime:formatTime , screen_name:twitterConfigJson.screen_name});
    
    }
    catch(error){
                
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        
        
        alert('エラーが発生しました。');
    }

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


var formatModified = function(){
    var time = new Date();
              var yy = time.getYear(); //日本時間に変換
              var  mm = time.getMonth() + 1;
              var  dd = time.getDate();
              var  tt= time.getHours();
              var  mi= time.getMinutes();
              var  ss=time.getMinutes();
                if (yy < 2000) { yy += 1900; }
                if (mm < 10) { mm = "0" + mm; }
                if (dd < 10) { dd = "0" + dd; }
                if (tt < 10) { tt = "0" + tt; }
                if (mi < 10) { mi = "0" + mi; }
            //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
            var pub_day = mm + "-" + dd + " " + tt + ":" + mi ;
            return pub_day;
}