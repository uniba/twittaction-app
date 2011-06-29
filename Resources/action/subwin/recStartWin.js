var win = Ti.UI.currentWindow;

//------------------------------------------------------------- 
//            Infomation about  recStartWin(A3 image)
//-------------------------------------------------------------


var UA_webView = Titanium.UI.createWebView({
		url: "html/testevaljs.html"
});



//add label to display choosed type
var UA_recStartRightLabel = Ti.UI.createLabel({
 	text: 'type-A',
 	top:10,
 	left: 250,
 	width:'auto',
 	height:40
});

//change to other mode: open a new windows and add toolbar
var UA_recCancelButton = Titanium.UI.createButton({
title: 'back',
left:10,
top:10,
width:60,
height: 40

});

UA_recCancelButton.addEventListener('click', function(e){
	win.close();
   
});

//display accelerometer data x,y,z
//actually, I should put these code into the seperated file
//maybe named as accelerometer.js 
/*
var x = Titanium.UI.createLabel({
    text:'x',
    top:60,
    left:10,
    width:'auto',
    height:20
});

var y = Titanium.UI.createLabel({
    text:'y',
    top:90,
    left:10,
    width:'auto',
    height:20
});

var z = Titanium.UI.createLabel({
    text:'z',
    top:120,
    left:10,
    width:'auto',
    height:20
});
*/

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

//test
//UA_myArrayX.push(0);
//UA_myArrayX.push(1);
//UA_myArrayX.push(2);
//UA_myArrayX.push(3);
//UA_myArrayX.push("X0");
//UA_myArrayX.push("X1");
//UA_myArrayX.push("X2");
//UA_myArrayX.push("X3");

//UA_myArrayY.push(0);
//UA_myArrayY.push(1);
//UA_myArrayY.push(2);
//UA_myArrayY.push(3);
//UA_myArrayY.push("Y0");
//UA_myArrayY.push("Y1");
//UA_myArrayY.push("Y2");
//UA_myArrayY.push("Y3");

//UA_myArrayZ.push(0);
//UA_myArrayZ.push(1);
//UA_myArrayZ.push(2);
//UA_myArrayZ.push(3);
//UA_myArrayZ.push("Z0");
//UA_myArrayZ.push("Z1");
//UA_myArrayZ.push("Z2");
//UA_myArrayZ.push("Z3");

//var jsonRead = newFile.read();
//var jsonArray = JSON.parse(jsonRead);

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



var UA_labelInterval = Ti.UI.createLabel({
text:'10.000',  //default time is 10 seconds
left:130,
width:'auto',
height: 20,
top:250
});

//add start button to count time
var UA_startButton = Titanium.UI.createButton({
	title: 'start',
	left: 100,
	top: 150,
	height: 50,
	width: 100
});

//add counter function
var myButton = 0;
var fixTime = 10000.000;
var timeFrequency = 50;
var alertDialog = Titanium.UI.createAlertDialog({
	message:'保存しますか？',
	buttonNames:['Cancel', 'OK'],
	cancel:1
	});
    alertDialog.addEventListener('click', function(e){
    if(e.index==0){
    UA_startButton.title = "start";
    UA_labelInterval.text = "10.000";
    UA_webView.reload();
    emptyJson();
    }
    if(e.index==1){
    UA_labelInterval.text = "10.000";
    //at here, we need to save acce data into two filesystem
    saveJson();
    //Ti.UI.currentTab.close(win);
    //Ti.UI.currentTab.close(win);
    

    win._caller.close();
    win.close();
    }
    });

function myWatch(flug)
{
	if(myButton==0)
    {
	Start = new Date();
    UA_recordTime = Start;
	myButton=1;
	UA_startButton.title = "stop";
    Titanium.Accelerometer.addEventListener('update', acceFunction);
    //if you set interval time is 1 millseconds,it is difficult to stop. 
	myInterval = setInterval(function(){myWatch(1);}, timeFrequency);
	}
    else
    {
        if(flug==0)
        {
        myButton = 0;
        clearInterval(myInterval); 
        Titanium.Accelerometer.removeEventListener('update', acceFunction);
        alertDialog.show();
        }
	Stop = new Date();
	T=Stop.getTime()-Start.getTime();
	timeDisplay = fixTime - T;
    if(timeDisplay <= timeFrequency)
        {
           myButton=0;
           clearInterval(myInterval);
           Titanium.Accelerometer.removeEventListener('update', acceFunction);   
           alertDialog.show();
           timeDisplay=0;
        }
    S = Math.floor(timeDisplay/1000);
    Ms = timeDisplay%1000;
    UA_labelInterval.text = S+":"+Ms;
            }
    

	
}

//when click OK button, we need to save Json data to local file
function saveJson()
{
    UA_lastObject['RecTime'] = UA_recordTime;    
    UA_lastObject['X'] =  UA_myArrayX;
    UA_lastObject['Y'] =  UA_myArrayY;
    UA_lastObject['Z'] =  UA_myArrayZ;
    var json = JSON.stringify(UA_lastObject);
    //alert(json);
    //newFile.write(json);
    
    var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
    if(twitterConfig.exists()){
    var  twitterConfigJson= JSON.parse(twitterConfig.read());
    //alert(twitterConfigJson['user_id']);
} else {
    alert("ログイン情報がありません");
}
    
    var xhr = Titanium.Network.createHTTPClient();
    var jsonEncodeUri = encodeURI(json);
    
    xhr.onload = function(){
        //alert(json);
        var dialog = Titanium.UI.createAlertDialog();
            dialog.setTitle('加速度センサーのデータ');
            dialog.setMessage(json); 
            dialog.show();
        var text = this.responseText;
        alert('処理した後のurlのイメージ \n'+text);
    };
    
    
    xhr.open('POST','http://10.4.0.54:3001/action');
    xhr.send({userId:twitterConfigJson['user_id'],message:'testメッセージ',sequence:json});
    
    
    
    
}

//when click cancel button, we need to empty array 
function emptyJson()
{
    UA_myArrayX = [];
    UA_myArrayY = [];
    UA_myArrayZ = [];
}

//add event detect for start button
UA_startButton.addEventListener('click',function(e){
// we need to add some program here
myWatch(0);

});


//win.rightNavButton = recstartrightlabel;
win.add(UA_webView);
win.add(UA_recCancelButton);
win.add(UA_startButton);
win.add(UA_labelInterval);
win.add(UA_recStartRightLabel);

