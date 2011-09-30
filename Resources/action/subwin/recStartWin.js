var win = Ti.UI.currentWindow;



//var saveWebview = win.SaveWebView;

//win.barColor = 'black';

//Titanium.UI.currentWindow.showNavBar();
//------------------------------------------------------------- 
//            Infomation about  recStartWin(A3 image)
//-------------------------------------------------------------


var UA_webView = Titanium.UI.createWebView({
		url: "html/testevaljs.html",
		//url: "http://twittaction.preview.dev.uniba.jp/test/rec/testevaljs.html",
        zindex:1,
        //touchEnabled:false
});
/*
Titanium.UI.currentWindow.addEventListener('reloadWebView', function(e){
    //alert(JSON.stringify(e));
		UA_webView.reload();
});
*/
win.addEventListener('focus', function(e){
    UA_webView.reload();
		//alert('focus');
});

UA_webView.addEventListener('load', function(e){
	 // ロード完了後に実行される
	var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
	newDir.createDirectory();
	var imageFile = Titanium.Filesystem.getFile(newDir.nativePath, 'profile_image_url_https.json');
	var imageFileContents = imageFile.read();
	var imageFileJson = JSON.parse(imageFileContents.text);
	//alert(imageFileJson.profile_image_url_https);
	UA_webView.evalJS('imageUrl("'+imageFileJson.profile_image_url_https+'")');
});
//create directory 
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

//create file
var newFile = Titanium.Filesystem.getFile(newDir.nativePath, 'acce.json');

var UA_myArrayX = new Array();
var UA_myArrayY = new Array();
var UA_myArrayZ = new Array();
var UA_timestamp = new Array();
var UA_trueHeading = new Array();
var UA_timeFromStart = new Array();
//var tempHeading = [];// tempHeading[0] に参照値を入れる


var UA_lastObject = new Object();

var UA_tempDataX;
var UA_tempDataY;
var UA_tempDataZ;
var UA_tempDatatimestamp;
var UA_tempDataTimeFromStart;

var trueHeading;

var UA_recordTime;

var UA_acceScale = 50;
//add counter function
var myButton = 0;
var fixTime = 7000.000; //録画時間
var timeFrequency = 50;



// acceMoveFunctionは通常時（ボタンを押していないとき）の動き。
// acceFunctionはボタンを押したときの動き。
if((Titanium.Geolocation.locationServicesEnabled === false)||((Titanium.Platform.name != 'android') && (Titanium.Geolocation.locationServicesAuthorization==Titanium.Geolocation.AUTHORIZATION_RESTRICTED))){

	//方位磁石が使えない場合。trueHeadingは　''で送る
	acceMoveFunction = function(e){
			//x.text = 'x:' + e.x;
			UA_tempDataX = e.x;
			//y.text = 'y:' + e.y;
			UA_tempDataY = e.y;
			//z.text = 'z:' + e.z;
			UA_tempDataZ = e.z;
			trueHeading = -1;
			UA_tempDatatimestamp = -1;
			UA_tempDataTimeFromStart = -1;
			//trueHeading(); 
			UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+','+trueHeading +','+UA_tempDatatimestamp+','+UA_tempDataTimeFromStart+')');
	};

	acceFunction = function(e){
			UA_tempDataX = e.x;
			UA_tempDataY = e.y;
			UA_tempDataZ = e.z;
			trueHeading = '';
			//UA_tempDatatimestamp = e.timestamp;
			UA_tempDatatimestamp = S+"."+Ms;
			UA_tempDatatimestamp = new Number(UA_tempDatatimestamp);
			UA_tempDataTimeFromStart = 7.000 - UA_tempDatatimestamp;
			//at here, we need to save data into array with the format of json
			UA_myArrayX.push(UA_tempDataX);
			UA_myArrayY.push(UA_tempDataY);
			UA_myArrayZ.push(UA_tempDataZ);
			UA_timestamp.push(UA_tempDatatimestamp);
			UA_timeFromStart.push(UA_tempDataTimeFromStart);
			UA_trueHeading.push(-1);
			
			UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+','+trueHeading +','+UA_tempDatatimestamp+''+UA_tempDataTimeFromStart+')');
	};
}else{
	//方位磁石が使える場合。 trueHeadingを送る。
	Titanium.Geolocation.addEventListener("heading", function(e){
		trueHeading = e.heading.trueHeading;
	});

	acceMoveFunction = function(e){
			UA_tempDataX = e.x;
			UA_tempDataY = e.y;
			UA_tempDataZ = e.z;
			//UA_trueHeading.push(trueHeading);
			UA_tempDatatimestamp = -1;
			UA_tempDataTimeFromStart = -1;
			UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+','+trueHeading +','+UA_tempDatatimestamp+','+UA_tempDataTimeFromStart+')');
	};

	acceFunction = function(e){
			UA_tempDataX = e.x;
			UA_tempDataY = e.y;
			UA_tempDataZ = e.z;
			//UA_tempDatatimestamp = e.timestamp;
			//at here, we need to save data into array with the format of json
			UA_tempDatatimestamp = S+"."+Ms;
			UA_tempDatatimestamp = new Number(UA_tempDatatimestamp);
			
			UA_tempDataTimeFromStart = 7.000 - UA_tempDatatimestamp;
			
			UA_myArrayX.push(UA_tempDataX);
			UA_myArrayY.push(UA_tempDataY);
			UA_myArrayZ.push(UA_tempDataZ);
			UA_timestamp.push(UA_tempDatatimestamp);
			UA_timeFromStart.push(UA_tempDataTimeFromStart);
			UA_trueHeading.push(trueHeading);

			UA_webView.evalJS('onAlert('+UA_tempDataX+','+UA_tempDataY+','+UA_tempDataZ+','+trueHeading +','+UA_tempDatatimestamp+','+UA_tempDataTimeFromStart+')');
	};
}

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
	win.add(coverView);
});
UA_startButton.addEventListener('touchend',function(e){
	win.remove(coverView);
});


Titanium.Accelerometer.addEventListener('update', acceMoveFunction); //通常時アイコンを動かす関数を呼び出している
//add event detect for start button
UA_startButton.addEventListener('click',function(e){
    // we need to add some program here
    //UA_startButton.title = 'stop';
    myWatch(0);

});

//win.rightNavButton = recstartrightlabel;
//win.add(UA_recCancelButton);
win.add(UA_webView);



var button = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT
});

Titanium.UI.currentWindow.leftNavButton = button;
var coverView2 = Titanium.UI.createView({
});
//win.add(coverView2);
// coverView2は webViewをtouchEnabled:false とすると、imageが書き換わらないので、透明なviewでカバーする
button.addEventListener('click', function(e){
	//	win.remove(coverView2);
		var infoWin = Titanium.UI.createWindow({  
        //url:'html/webview2.html',
        title:'information',
			//backgroundColor:'purple'
    });
		var closeButton = Ti.UI.createButton({
			title:'Close'		
		});
		
		infoWin.leftNavButton = closeButton ;
		closeButton.addEventListener('click', function(e){
			infoWin.close();
		//	win.add(coverView2);
		});
		var imageView = Titanium.UI.createImageView({
			image:'../pic/twittaction_howtouse.png',
			width:320,
			height:800,
			top:0
		});
var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});


var view = Ti.UI.createView({
	backgroundColor:'#336699',
	borderRadius:10,
	width:300,
	height:2000,
	top:10
});

		scrollView.add(imageView);
		infoWin.add(scrollView);
		
		infoWin.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL
		})
});



//Titanium.UI.currentWindow.setRightNavButton(UA_startButton);
win.add(UA_startButton);
/*
var UA_labelInterval = Ti.UI.createLabel({
    text:'7.000',  //default time is 10 seconds
    width:'auto',
    textAlign:"center",
});
win.rightNavButton = UA_labelInterval;
*/

function myWatch(flug)
{   
    //alert('huga');
	if(myButton==0)
    {
        Start = new Date();
        UA_recordTime = Start;
        myButton=1;
        //alert(newFile.read());
        UA_startButton.backgroundImage = '../pic/rec_stop.png';
        UA_startButton.backgroundSelectedImage = '../pic/rec_stop.png';
				
				Titanium.Accelerometer.removeEventListener('update', acceMoveFunction);
        Titanium.Accelerometer.addEventListener('update', acceFunction);
				
        myInterval = setInterval(function(){myWatch(1)}, timeFrequency);
	}else{
        
        if(flug==0){
            myButton = 0;
            clearInterval(myInterval);
            Titanium.Accelerometer.removeEventListener('update', acceFunction);
						Titanium.Accelerometer.addEventListener('update', acceMoveFunction); 
            //alertDialog.show();
            UA_startButton.backgroundImage = '../pic/rec_start.png';
            UA_startButton.backgroundSelectedImage = '../pic/rec_start.png';
						Titanium.Media.vibrate();
						
						UA_startButton.backgroundSelectedColor = "red";
            saveJson(win,newFile);
            //playMove(win);
            //endWindow();
						//UA_labelInterval.text = "7.000";
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
					 Titanium.Media.vibrate();
					 
           myButton=0;
           clearInterval(myInterval);
					 
           Titanium.Accelerometer.removeEventListener('update', acceFunction);
					 Titanium.Accelerometer.addEventListener('update', acceMoveFunction);  

           //alert('hogehoge');
           timeDisplay=0;
           
           saveJson(win,newFile);
					 //UA_labelInterval.text = "7.000";
           endAlert(win);
           //endWindow();
           //playMove(win);
        }
				S = Math.floor(timeDisplay/1000);
				Ms = timeDisplay%1000;
				
				if(String(Ms).length==2){
						Ms='0'.concat(Ms);
				}else if(String(Ms).length==1){
						Ms='00'.concat(Ms);
				}
				//UA_labelInterval.text = S+"."+Ms;
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
		UA_lastObject['trueHeading'] = UA_trueHeading;
		UA_lastObject['timestamp'] = UA_timestamp;
		UA_lastObject['timeFromStart'] = UA_timeFromStart;
		
		
    var json = JSON.stringify(UA_lastObject);
    //alert(json);
		//newFile.write('');
    newFile.write(json);
		Ti.API.info('acce.json:'+json);
		emptyJson();
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
		UA_timestamp = [];
		UA_trueHeading = [];
		UA_timeFromStart = [];
}

function playMove(win){
    var playWin = Titanium.UI.createWindow({  
        url:'../action_2.js',
        title:'Replay',
        backgroundColor:'#fff',
        //barColor:'black'
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
        title: '完了',
        message: 'アクションが記録されました！',
        buttonNames: ['OK'],
    });
    alertDialog.addEventListener('click',function(event){
        // 選択されたボタンのindexも返る
        if(event.index == 0){
            // "OK"時の処理
						
						S = "7";
						Ms = "000";
						//var hoge = S+"."+Ms;
						/*
						var num = hoge - 2.342;
						UA_labelInterval.text = "7.000";
						alert(num);
						UA_labelInterval.text = "7.000";
            */
						
						playMove(win);
        }
    });
    alertDialog.show();
}