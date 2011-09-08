var win = Ti.UI.currentWindow;

//var saveWebview = win.SaveWebView;

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
    //x.text = 'x:' + e.x;
    UA_tempDataX = e.x;
   
    //y.text = 'y:' + e.y;
    UA_tempDataY = e.y;
   
    //z.text = 'z:' + e.z;
    UA_tempDataZ = e.z;
    
    //at here, we need to save data into array with the format of json
    UA_myArrayX.push(UA_tempDataX);
    UA_myArrayY.push(UA_tempDataY);
    UA_myArrayZ.push(UA_tempDataZ);
    
    UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+')');

};

//add start button to count time
var UA_startButton = Titanium.UI.createButton({
	//title : 'start',
    //color : 'white'z,
   backgroundImage : '../pic/rec_start.png',
   backgroundSelectedImage : '../pic/rec_start.png',
	 //backgroundColor:'red',
	 //backgroundSelectedColor:'blue',
    bottom : 20 , 
    width : 254 ,
    height : 35 ,
    //backgroundColor : 'black',
    //opacity : 0.7,
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var coverView = Titanium.UI.createView({
   borderRadius:10,
   backgroundColor:'black',
	 opacity:0.12,
   width:254,
   height:35,
	 bottom:20
});
UA_startButton.addEventListener('touchstart',function(e){
//UA_startButton.backgroundColor='blue';
win.add(coverView);
});
UA_startButton.addEventListener('touchend',function(e){
//UA_startButton.backgroundColor='red';
win.remove(coverView);
});
//add counter function
var myButton = 0;
var fixTime = 5000.000;
var timeFrequency = 1000;

//add event detect for start button
UA_startButton.addEventListener('click',function(e){
    // we need to add some program here
    //UA_startButton.title = 'stop';
    myWatch(0);

});

//win.rightNavButton = recstartrightlabel;
//win.add(UA_recCancelButton);
win.add(UA_webView);
//Titanium.UI.currentWindow.setRightNavButton(UA_startButton);
win.add(UA_startButton);



function myWatch(flug)
{   
    //alert('huga');
	if(myButton==0)
    {
        Start = new Date();
        UA_recordTime = Start;
        myButton=1;
        
        UA_startButton.backgroundImage = '../pic/rec_stop.png';
        UA_startButton.backgroundSelectedImage = '../pic/rec_stop.png';
        Titanium.Accelerometer.addEventListener('update', acceFunction);
        myInterval = setInterval(function(){myWatch(1);}, timeFrequency);
	}else{
        
        if(flug==0){
            myButton = 0;
            clearInterval(myInterval);
            Titanium.Accelerometer.removeEventListener('update', acceFunction);
            //alertDialog.show();
            
            UA_startButton.backgroundImage = '../pic/rec_start.png';
            UA_startButton.backgroundSelectedImage = '../pic/rec_start.png';
						UA_startButton.backgroundSelectedColor = "red";
            saveJson(win,newFile);
            //playMove(win);
            //endWindow();
            endAlert(win);
            UA_webView.reload();
        }
        Stop = new Date();
        T=Stop.getTime()-Start.getTime();
        timeDisplay = fixTime - T;
        if(timeDisplay <= timeFrequency)
        {   
           //UA_startButton.backgroundSelectedImage = '../pic/rec_start.png';
           UA_startButton.backgroundImage = '../pic/rec_start.png';
           UA_startButton.backgroundSelectedImage = '../pic/rec_start.png';
           myButton=0;
           clearInterval(myInterval);
           Titanium.Accelerometer.removeEventListener('update', acceFunction);   
           //alert('hogehoge');
           timeDisplay=0;
           
           saveJson(win,newFile);
           endAlert(win);
           //endWindow();
           //playMove(win);
        }
    }
}

//when click OK button, we need to save Json data to local file
function saveJson(win,newFile)
{
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
    
    win.close(); 
}

//when click cancel button, we need to empty array 
function emptyJson()
{
    UA_myArrayX = [];
    UA_myArrayY = [];
    UA_myArrayZ = [];
}



function playMove(win){
    var playWin = Titanium.UI.createWindow({  
        url:'../action_2.js',
        title:'play',
        backgroundColor:'#fff',
        barColor:'black'
    });
    playWin.win = win ;
    Ti.UI.currentTab.open(playWin);
}

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

function endWindow(){
        var endWin = Titanium.UI.createWindow({backgroundColor:'blue',opacity:0.7,width:270,height:120});
        var endLabel = Titanium.UI.createLabel({text:'録画終了',textAlign:'center',font:{fontSize:20},backgroundColor:'white',height:30,width:120});
        endWin.add(endLabel);
        
        endWin.open();
       // endWin.close();
       setTimeout(function (){
        endWin.close();
    },1400);
}

function endAlert(win){
    var alertDialog = Titanium.UI.createAlertDialog({
        title: '録画完了',
        message: 'OKを押すと再生',
        buttonNames: ['OK'],
    });
    alertDialog.addEventListener('click',function(event){
        // 選択されたボタンのindexも返る
        if(event.index == 0){
            // "OK"時の処理
            playMove(win);
        }
    });
    alertDialog.show();
}