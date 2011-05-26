var win = Ti.UI.currentWindow;


var tweetWin;

//create webview for actionWin(A1 image)
var webview1= Titanium.UI.createWebView({
		url: "http://dev.uniba.jp/~ryo/cube/"
});

//create tweet button for actionWin(A1 image)
var tweetbutton = Titanium.UI.createButton({
	title: "Tweet",
	top:325,
	left: 50,
	width: 67,
	height: 32
});


//add eventlistener for tweetbutton
//close actionWin and open tweetwin means changing from A1 to A6
tweetbutton.addEventListener('click', function(e){
  //actionWin.close();
	Ti.UI.currentTab.open(tweetWin);
    
});

//create tweet button for actionWin(A1 image)
var recbutton = Titanium.UI.createButton({
	title: "Rec",
	top:325,
	left: 200,
	width: 67,
	height: 32
});

//add eventlistener for recbutton
//close actionWin and open recwintype means chaning from A1 to A2 
recbutton.addEventListener('click', function(e){
   //actionTab.close(actionWin);
   Ti.UI.currentTab.open(recWin);
      //alert(test);
});

//add webview, tweetbutton and recbutton to actionWin
win.add(webview1);
win.add(tweetbutton);
win.add(recbutton);




//------------------------------------------------------------- 
//              Infomation about  tweetWin(A6 image)
//-------------------------------------------------------------

var tweetWin = Titanium.UI.createWindow({  
    title:'Tweet',
    backgroundColor:'#fff'
});

//add send button for navibar of tweetwin(A6 image)
var sendbutton = Titanium.UI.createButton({
	title: "送信",
	width:67,
	height:32,
    enabled:false
	
});

//event listening for send button
sendbutton.addEventListener('click', function(e){
  //insert event action go to B3 image
});

//add send button as rightNavButton for tweetwin(A6 image)
tweetWin.rightNavButton = sendbutton;

//create textarea to input comment
var tweetcomment = Titanium.UI.createTextField({
	hintText: "コメントを入力",
	left:0,
	top:0,
	height: 60,
	width: 300
});

var countnumberlabel = Titanium.UI.createLabel({
    text: 140,
    left:250,
    top:150,
    width:50,
    height:40
}); 

//if the content of tweet is empty, the sendbutton can not be used
tweetcomment.addEventListener('change',function(e){
  if(e.value == "")
  {sendbutton.enabled = false;
  countnumberlabel.text = 140;
  }
  else
  {
   countnumberlabel.text = 140 - e.value.length; 
   if(e.value.length<=140)
   {
    sendbutton.enabled = true;
   }
   else
   {
    sendbutton.enabled = false;
   }
   };
});
//add textfield for tweetWin
tweetWin.add(tweetcomment);
tweetWin.add(countnumberlabel);


//------------------------------------------------------------- 
//             Infomation about  recWin(A2 image)
//-------------------------------------------------------------
var recWin = Titanium.UI.createWindow({  
    title:'type',
    backgroundColor:'#fff'
});

//create recbutton2 for recWin(A2 image)
var recbutton2 = Titanium.UI.createButton({
	title: "Rec",
	width:67,
	height:32
	
});

//event listening for recbutton2 
recbutton2.addEventListener('click', function(e){
  //insert event action
  //recWin.close();
  //recStartWin.open();
  //actionTab.close(recWin);
 // actionTab.open(recStartWin);
 	recStartWin.open();
});

//set recbutton2 as right navi button
recWin.rightNavButton = recbutton2;

var webview2 = Titanium.UI.createWebView({
		url: "local_webview.html"
});

webview2.addEventListener('load',function(e){
  test=1;
});


//add webview to recWin
recWin.add(webview2);
//recWin.open({modal:true});


//------------------------------------------------------------- 
//            Infomation about  recStartWin(A3 image)
//-------------------------------------------------------------
var recStartWin = Titanium.UI.createWindow({  
    title:'type-a test',
    backgroundColor:'#fff'
});

//add label to display choosed type
var recstartrightlabel = Ti.UI.createLabel({
 	text: 'type-A',
 	top:10,
 	left: 250,
 	width:'auto',
 	height:40
});

//change to other mode: open a new windows and add toolbar
var reccancelbutton = Titanium.UI.createButton({
title: 'back',
left:10,
top:10,
width:60,
height: 40

});

reccancelbutton.addEventListener('click', function(e){
	recStartWin.close();
});

//var rectoolbar = Titanium.UI.createToolbar({
//items: [reccancelbutton, recstartrightlabel],
//top:0
//});







var labelInterval = Ti.UI.createLabel({
text:'10.000',  //default time is 10 seconds
left:130,
width:'auto',
height: 20,
top:250
});

//add start button to count time
var startbutton = Titanium.UI.createButton({
	title: 'start',
	left: 100,
	top: 150,
	height: 50,
	width: 100
});

//add counter function
var myButton = 0;
function myWatch(flug){
	if(myButton==0){
	Start = new Date();
	myButton=1;
	startbutton.title = "stop";
    //if you set interval time is 1 millseconds,it is difficult to stop. 
	myInterval = setInterval(function(){myWatch(1);}, 100);
	}else{
	if(flug==0){
	myButton = 0;
	startbutton.title = "start";
	clearInterval(myInterval); 
	//labelInterval.text = "10.000";
	var alertDialog = Titanium.UI.createAlertDialog({
	message:'保存しますか？',
	buttonNames:['Cancel', 'OK'],
	cancel:1
	});
    alertDialog.addEventListener('click', function(e){
    if(e.index==0){
    labelInterval.text = "10.000";
    }
    if(e.index==1){
    labelInterval.text = "10.000";
    recStartWin.close();
    // actionTab.close(recWin); 書き換えた
    Ti.UI.currentTab.close(recWin);
    
    }
    });
	alertDialog.show();
	}
	Stop = new Date();
	T=Stop.getTime()-Start.getTime();
	timeDisplay = 10000.000-T;
	S = Math.floor(timeDisplay/1000);
	Ms = timeDisplay%1000;
	labelInterval.text = S+":"+Ms;
    //at here, i need to add one more test program when the time is full 10seconds.
	}
}


//add event detect for start button
startbutton.addEventListener('click',function(e){
// we need to add some program here
myWatch(0);

});

//recStartWin.rightNavButton = recstartrightlabel;
recStartWin.add(reccancelbutton);
recStartWin.add(startbutton);
recStartWin.add(labelInterval);
recStartWin.add(recstartrightlabel);


//maybe we can use tableview but it looks we do not need it
//var datarow = [ ];
//var htmlRow = Titanium.UI.createTableViewRow();
//htmlRow.height = 200;
//htmlRow.className = 'top';
//htmlRow.add(webview);
//htmlRow.add(tweetbutton);
//var buttonRow = Titanium.UI.createTableViewRow();
//buttonRow.className = 'bottom';
//buttonRow.add(tweetbutton);
//buttonRow.add(recbutton);
//var tableview = Titanium.UI.createTableView({
//	data: datarow,
	//style: Titanium.UI.Iphone.TableViewStyle.GROUPED,
//	top: 10
   
//});

//create toolbar actually we can use toolbar in our design
//var actiontoolbar = Titanium.UI.createToolbar({
//items: [tweetbutton, recbutton],
//top: 325,
//translucent: true
//});