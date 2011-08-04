var win = Ti.UI.currentWindow;

var saveWebview = win.SaveWebView;

win.barColor = 'black';

//Titanium.UI.currentWindow.showNavBar();
//------------------------------------------------------------- 
//            Infomation about  recStartWin(A3 image)
//-------------------------------------------------------------


var UA_webView = Titanium.UI.createWebView({
		//url: "html/testevaljs.html",
        url: "http://twittaction.preview.dev.uniba.jp/test/rec/testevaljs.html",
        zindex:1,
        touchEnabled:false
});


//create directory 
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

//create file
var newFile = Titanium.Filesystem.getFile(newDir.nativePath, 'acce.json');

var UA_myArrayX = new Array();
var UA_myArrayY = new Array();
var UA_myArrayZ = new Array();
var UA_lastObject = new Object();

var UA_tempDataX;
var UA_tempDataY;
var UA_tempDataZ;

var UA_recordTime;

var UA_acceScale = 50;

acceFunction = function(e){
    UA_tempDataX = e.x;
    UA_tempDataY = e.y;
    UA_tempDataZ = e.z;
    
    //at here, we need to save data into array with the format of json
    UA_myArrayX.push(UA_tempDataX);
    UA_myArrayY.push(UA_tempDataY);
    UA_myArrayZ.push(UA_tempDataZ);
    
    UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+')');

};

//add start button to count time
var UA_startButton = Titanium.UI.createButton({
    title : 'start'
});

//add counter function
var myButton = 0;
//var fixTime = 10000.000;
//var timeFrequency = 50;
var alertDialog = Titanium.UI.createAlertDialog({
	message:'保存しますか？',
	buttonNames:['Cancel', 'OK'],
	cancel:1
	});
    
    
    alertDialog.addEventListener('click', function(e){
    if(e.index==0){
        UA_startButton.title = 'start';
        UA_webView.reload();
        emptyJson();
    }
    if(e.index==1){
        UA_startButton.title = 'start';
        saveJson(saveWebview,win,newFile);    
    }
    });

function myWatch(flug)
{
	if(myButton==0)
    {

	myButton=1;
	//UA_startButton.backgroundImage = "../pic/twittaction_stop.png";
    Titanium.Accelerometer.addEventListener('update', acceFunction);
    //if you set interval time is 1 millseconds,it is difficult to stop. 
	}
    else
    {
        if(flug==0)
        {
        myButton = 0;
        Titanium.Accelerometer.removeEventListener('update', acceFunction);
        alertDialog.show();
        }
    }
}

//add event detect for start button
/*
UA_startButton.addEventListener('touchend',function(e){
myWatch(0);

});
*/
UA_startButton.addEventListener('click',function(e){
    UA_startButton.title = 'stop';
    myWatch(0);
});

win.add(UA_webView);
Titanium.UI.currentWindow.setRightNavButton(UA_startButton);

//when click OK button, we need to save Json data to local file
function saveJson(saveWebview,win,newFile)
{
    var saveWebview = saveWebview;
    var win = win;
    var newFile = newFile;
    UA_lastObject['RecTime'] = UA_recordTime;    
    UA_lastObject['X'] =  UA_myArrayX;
    UA_lastObject['Y'] =  UA_myArrayY;
    UA_lastObject['Z'] =  UA_myArrayZ;
    var json = JSON.stringify(UA_lastObject);
    //alert(json);
    newFile.write(json);
    
    
    var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
    if(twitterConfig.exists()){
        var  twitterConfigJson = JSON.parse(twitterConfig.read());
        //alert(twitterConfigJson['user_id']);
    } else {
        alert("ログイン情報がありません");
    }


    if(Titanium.Network.online == false){
        // エラー表示
        saveWebview.reload();
        win.close(); 
        return;
    }


    var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        newDir.createDirectory();
    
    var profileImageFile = Titanium.Filesystem.getFile(newDir.nativePath, 'profile_image_url_https.json');
    var profileImageFileContents = profileImageFile.read();
    
    if (profileImageFileContents == null) {
        var profileImageFileContents = {profile_image_url_https:''};
        
    }else{

    try
        {
            var profileImageJson = JSON.parse(profileImageFileContents.text);
            //alert(profileImageJson);//確認
        }
        catch(ex)
        {
            return;
        }      
    }
    
     var postInfomationFile = Titanium.Filesystem.getFile(newDir.nativePath, 'postInfomation.json');
     var postInfomation = new Object();
         postInfomation['userId'] = twitterConfigJson['user_id'];
         postInfomation['message'] = '';
         postInfomation['sequence'] = json;
         postInfomation['profile_image_url_https'] = profileImageJson.profile_image_url_https;
           
     var postInfomationJson = JSON.stringify(postInfomation);
         postInfomationFile.write(postInfomationJson);
    saveWebview.reload();
    win.close(); 
}

//when click cancel button, we need to empty array 
function emptyJson()
{
    UA_myArrayX = [];
    UA_myArrayY = [];
    UA_myArrayZ = [];
}