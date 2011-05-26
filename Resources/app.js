// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();



//defination for win
var actionWin;
var tweetWin;
var recWin;
var recStartWin;
var test,webview2;




//------------------------------------------------------------- 
//             Infomation about  actionWin(A1 image)
//-------------------------------------------------------------
var actionWin = Titanium.UI.createWindow({  
    title:'action',
    backgroundColor:'#fff'
});

//Information about ActionTable
//default window is actionWin
var actionTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'action',
    window:actionWin  
});


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
	actionTab.open(tweetWin);
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
   actionTab.open(recWin);
      //alert(test);
});

//add webview, tweetbutton and recbutton to actionWin
actionWin.add(webview1);
actionWin.add(tweetbutton);
actionWin.add(recbutton);


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
    actionTab.close(recWin);
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


// create feedTable and add feedwin to feedTable to display home_timeline

var feedWin = Titanium.UI.createWindow({  
    title:'feed',
    backgroundColor:'#fff'
});
var feedTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'feed',
    window:feedWin
});

//create Tableview to display home_timeline
//cause using home_timeline, it requires authentication
//in order to test tableview, at here, we use user_timeline
var data = [];
var searcharray = [];
var xhr = Ti.Network.createHTTPClient();
xhr.timeout = 100000;
xhr.open("GET","http://api.twitter.com/1/statuses/user_timeline.json?screen_name=hebinbin");
xhr.onload = function () 
{
	try
	{ 
	 	var tweets = eval('('+this.responseText+')');
	 	
	 	for (var c=0;c<tweets.length;c++){

				var tweet = tweets[c].text;
				searcharray[c] = tweet; //used for search
				var user = tweets[c].user.screen_name;
				var avatar = tweets[c].user.profile_image_url;
				//var created_at = prettyDate(strtotime(tweets[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

				var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

				// Create a vertical layout view to hold all the info labels and images for each tweet
				var post_view = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:5,
					top:5,
					bottom:5,
					right:5
				});

				var av = Ti.UI.createImageView({
						image:avatar,
						left:0,
						top:0,
						height:48,
						width:48
					});
				// Add the avatar image to the view
				post_view.add(av);

				var user_label = Ti.UI.createLabel({
					text:user,
					left:54,
					width:120,
					top:-48,
					bottom:2,
					height:16,
					textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the view
				post_view.add(user_label);

				//var date_label = Ti.UI.createLabel({
				//	text:created_at,
			//		right:0,
			//		top:-18,
			//		bottom:2,
			//		height:14,
		//			textAlign:'right',
		//			width:110,
		//			color:'#444444',
	//				font:{fontFamily:'Trebuchet MS',fontSize:12}
	//			});
				// Add the date to the view
	//			post_view.add(date_label);

				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:54,
					top:0,
					bottom:2,
					height:'auto',
					width:236,
					textAlign:'left',
					font:{fontSize:14}
				});
				// Add the tweet to the view
				post_view.add(tweet_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				row.className = 'item'+c;
				data[c] = row;
			}
           // Create the tableView and add it to the window.
           
			var tableview = Titanium.UI.createTableView({data:data,minRowHeight:58});
			feedWin.add(tableview);
		}
		catch(E){
			alert(E);
		}
	 	
	};
	xhr.send();


//create searchTab and add seachWin

var searchWin = Titanium.UI.createWindow({  
    title:'search',
    backgroundColor:'#fff'
});
var searchTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'search',
    window:searchWin
});

//define search bar for searchWin
var searchbar = Ti.UI.createSearchBar({
    barColor: '#000',
    shwoCancel:true,
    height: 43,
    top:0
});

//define the action for search bar
searchbar.addEventListener('change', function(e){
//Titanium.API.info('search bar: you type ' + e.value + ' act val ' + searchbar.value);
});
searchbar.addEventListener('cancel', function(e){
//Titanium.API.info('search bar cancel fired');
//searchbar.blur();
});
searchbar.addEventListener('return', function(e){
//Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
    
    //At here, we need to write some program to do search 
    //as one idea, design tableview to get home_timeline again.
    //and using search method intergated in Javascript
    
    //Ti.API.info(searcharray.length);
    //Ti.API.info(e.value);
    //for(var searchcount=0; searchcount<=searcharray.length;searchcount++)
    //{
    	//var searchindex = searcharray[searchcount].search(e.value);
    	//if(searchindex==-1)
    //	{
    	//we need to do something
    //	}
   // 	else
   // 	{
    	//we need to do something
    	//Ti.API.info(searcharray[searchcount]);
    //	}
   // }
});
searchbar.addEventListener('focus', function(e){
//Titanium.API.info('search bar: focus received');
});
searchbar.addEventListener('blur', function(e){
//Titanium.API.info('search bar:blur received');
});

//add serach bar in searchWin
searchWin.add(searchbar);


//create settingTable and add settingWin
var settingWin = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff'
});
var settingTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'setting',
    window:settingWin
});

//create twitter login interface by using tableview
var data = [];
data[0] = Ti.UI.createTableViewSection({headerTitle:'Twitter アカウント'});
var rowusername = Ti.UI.createTableViewRow({title:''});
var textusername = Ti.UI.createTextField({
    left: 100,
    width: 200,  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});
var labelusername = Ti.UI.createLabel({
    text: 'Username:',
    left: 10
});
rowusername.add(labelusername);
rowusername.add(textusername);
//rowusername.className = 'control';
data[0].add(rowusername);
var rowpassword = Ti.UI.createTableViewRow({title:''});
var textpassword = Ti.UI.createTextField({
    left: 100,
    width: 200,
    passwordMask: true,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});

var labelpassword = Ti.UI.createLabel({
    text: 'Password:',
    left: 10
});

rowpassword.add(labelpassword);
rowpassword.add(textpassword);

data[0].add(rowpassword);	


// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

//add tableview
settingWin.add(tableview);


//add leftbutton and rightbutton on navbar
var leftbutton = Titanium.UI.createButton({title:'キャンセル'});
var rightbutton = Titanium.UI.createButton({title:'ログイン'});


//add the action for rightbutton(login)
rightbutton.addEventListener('click',function()
{
  var twitteraccount = textusername.value;
  var twitterpassword = textpassword.value;
  //Ti.API.info(twitteraccount);
  //Ti.API.info(twitterpassword);
  //at here we need to insert auenthecation program
});

//win4.add(tableview);
settingWin.leftNavButton = leftbutton;
settingWin.rightNavButton = rightbutton;



//  add tabs
//
tabGroup.addTab(actionTab);  
tabGroup.addTab(feedTab);
tabGroup.addTab(searchTab);
tabGroup.addTab(settingTab);  


// open tab group
tabGroup.open();
