var win = Ti.UI.currentWindow;

var saveWebview = win.SaveWebView;

win.barColor = 'black';

//Titanium.UI.currentWindow.showNavBar();
//------------------------------------------------------------- 
//            Infomation about  recStartWin(A3 image)
//-------------------------------------------------------------


var UA_webView = Titanium.UI.createWebView({
		url: "html/testevaljs.html",
        zindex:1
});



//add label to display choosed type

/*
var UA_recStartRightLabel = Ti.UI.createLabel({
 	text: 'type-A',
 	top:10,
 	left: 250,
 	width:'auto',
 	height:40
});
*/

//change to other mode: open a new windows and add toolbar

/*
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
*/

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
width:'auto',
height: 90,
top:300,
color:'white',
textAlign:"center",
font:{fontSize: 70, fontFamily:'Futura-CondensedMedium'},
zindex:2
});

//add start button to count time
var UA_startButton = Titanium.UI.createButton({
    backgroundImage:'../pic/twittaction_rec.png',
	//title: 'start',
	height: 174,
	width: 171,
    zindex:2
});

    var t = Titanium.UI.create2DMatrix();
    t = t.scale(0.5, 0.5);
    UA_startButton.animate({
        transform:t,
        duration:0
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
    UA_startButton.backgroundImage = "../pic/twittaction_rec.png";
    UA_labelInterval.text = "10.000";
    UA_webView.reload();
    emptyJson();
    }
    if(e.index==1){
    UA_labelInterval.text = "10.000";
    //at here, we need to save acce data into two filesystem
    
    
    saveJson(saveWebview,win,newFile);
    
    
    //Ti.UI.currentTab.close(win);
    //Ti.UI.currentTab.close(win);
    

    //win._caller.close();
    //win.close();
    }
    });

function myWatch(flug)
{
	if(myButton==0)
    {
	Start = new Date();
    UA_recordTime = Start;
	myButton=1;
	UA_startButton.backgroundImage = "../pic/twittaction_stop.png";
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
    
    if(String(Ms).length==2){
        Ms='0'.concat(Ms);
    }else if(String(Ms).length==1){
        Ms='00'.concat(Ms);
    }
    UA_labelInterval.text = S+":"+Ms;;
            }
    

	
}

//add event detect for start button
UA_startButton.addEventListener('click',function(e){
// we need to add some program here
myWatch(0);

});


//win.rightNavButton = recstartrightlabel;
win.add(UA_webView);
//win.add(UA_recCancelButton);

win.add(UA_labelInterval);
win.add(UA_startButton);
//win.add(UA_recStartRightLabel);



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

    var xhr = Titanium.Network.createHTTPClient();
    var jsonEncodeUri = encodeURI(json);
    
    xhr.onload = function(){
        //alert(json);
        /*
        var dialog = Titanium.UI.createAlertDialog();
            dialog.setTitle('加速度センサーのデータ');
            dialog.setMessage(json); 
            dialog.show();
        
        */
        //var baseWin = Titanium.UI.createWindow({
          //  barColor:'black'
       // });
       // baseWin.hideNavBar();
        
        var url = this.responseText;
        Titanium.API.info('returned url:' +url);
        //alert(url);
        //create directory 
        var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        dir.createDirectory();
        
        //create file
        var shortUrlFile = Titanium.Filesystem.getFile(dir.nativePath, 'shortUrl.json');
        var shortUrl = new Object();;
        shortUrl['shortUrl'] = url; 
        var shortUrlJson = JSON.stringify(shortUrl);
        shortUrlFile.write(shortUrlJson);
        
        
        var contents = shortUrlFile.read();
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
        //alert(config.shortUrl);
        saveWebview.reload();
        win.close(); 

        
        
       // var accelWin = Titanium.UI.createWindow({
         //   barColor:'black'
       // });
       
        /*
        var webview = Ti.UI.createWebView({
            url:url
        });
        */
        
        //var b1 = Titanium.UI.createButton({title:'close'});
        //b1.addEventListener('click', function(e){
          //  accelWin.close();
            //baseWin.close();
            //win._caller.close();
           // win.close();
       // });
       // accelWin.leftNavButton = b1;
        
       // var nav = Titanium.UI.iPhone.createNavigationGroup({
         //  window: accelWin
       // });
        
       // var UA_tweetWin = Titanium.UI.createWindow({  
         //   url:'tweetWin.js',
           // title:'Tweet',
           // backgroundColor:'#fff',
           // barColor:'black'
       // });

        //create tweet button for actionWin(A1 image)
       // var UA_tweetButton = Titanium.UI.createButton({
         //   backgroundImage:'../pic/rec01.png',
           // backgroundSelectedImage:'../pic/rec01.png',
           // title:'Tweet',
           // top:325,
           // left: 35,
           // width: 105,
           // height: 34
        //});
        
        //UA_tweetButton.addEventListener('click', function(e){
          //actionWin.close();
          //  nav.open(UA_tweetWin,{animated:true});
            
       // });
        
                //create tweet button for actionWin(A1 image)
        /*
        var UA_reloadButton = Titanium.UI.createButton({
            backgroundImage:'../pic/rec01.png',
            backgroundSelectedImage:'../pic/rec01.png',
            title:'Reload',
            top:325,
            right: 35,
            width: 105,
            height: 34
        });
        */
        /*
        UA_reloadButton.addEventListener('click', function(e){
          //actionWin.close();
            webview.reload();
            
        });
        */
        
       // accelWin.add(webview);
       // accelWin.add(UA_reloadButton);
       // accelWin.add(UA_tweetButton);
       // UA_tweetWin.twittaction = true;
       // UA_tweetWin.twittactionUrl = url;
       // UA_tweetWin.nav = nav;
       // baseWin.add(nav);

       // baseWin.open({modal:true});
        //accelWin.open({modal:true});
         // 現在のTabに所属させるのなら次のとおり。
       // Titanium.UI.currentTab.open(accelWin,{animated:true});
        //alert('処理した後のurlのイメージ \n'+url);
    };
    
    var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
        newDir.createDirectory();
    
    var profileImageFile = Titanium.Filesystem.getFile(newDir.nativePath, 'profile_image_url_https.json');
    var profileImageFileContents = profileImageFile.read();
     //alert(profileImageFileContents.text);
    //var profileImageJson = eval(profileImageFileContents.text);
    //alert(profileImageJson);
    //alert(profileImageJson[profile_image_url_https]);
    
    
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
        //alert(profileImageJson.profile_image_url_https);

    }
    xhr.open('POST','http://twittaction.com/action');
    xhr.send({userId:twitterConfigJson['user_id'], message:'', sequence:json,  profile_image_url_https:profileImageJson.profile_image_url_https});
}

//when click cancel button, we need to empty array 
function emptyJson()
{
    UA_myArrayX = [];
    UA_myArrayY = [];
    UA_myArrayZ = [];
}