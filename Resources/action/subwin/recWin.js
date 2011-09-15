var win = Ti.UI.currentWindow;


var UA_recStartWin = Titanium.UI.createWindow({  
    url: 'recStartWin.js',
    title:'Rec',
    backgroundColor:'#fff',
    _caller:win,
   // barColor:'black'
});

//------------------------------------------------------------- 
//             Infomation about  recWin(A2 image)
//-------------------------------------------------------------


//create recbutton for recWin(A2 image)
var UA_recButton = Titanium.UI.createButton({
	title: "Rec",
	width:67,
	height:32
	
});

//event listening for recbutton2 
UA_recButton.addEventListener('click', function(e){
  //insert event action
  //recWin.close();
  //recStartWin.open();
  //actionTab.close(recWin);
  //Ti.UI.currentTab.close(UA_recWin);
  //Ti.UI.currentTab.open(UA_recStartWin);
  //
  //UA_recStartWin.open();
  UA_recStartWin.hideTabBar();
  Titanium.UI.currentTab.open(UA_recStartWin,{animated:true});
});

//set recbutton2 as right navi button
win.rightNavButton = UA_recButton;

var UA_webView = Titanium.UI.createWebView({
		url: "html/webview2.html"
});

UA_webView.addEventListener('load',function(e){
// add program
});





//add webview to recWin
win.add(UA_webView);
//recWin.open({modal:true});

