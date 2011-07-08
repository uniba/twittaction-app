function UA_display_twitter_homeline(queryUrl, params)
{
    var win = Ti.UI.currentWindow;
    var UA_tableview;
    var UA_tableViewData = [];
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 100000;
    xhr.open('GET', queryUrl);
    xhr.onload = function () 
    {
        try
        { 
            var UA_tweetsContent = eval('('+this.responseText+')');
            if(params == 'search')
            {
                var tweets = UA_tweetsContent['results'];
            }
            else if(params == 'feed')
            {
                var tweets = UA_tweetsContent;
            }
            else if(params == 'hashtag'){
                var tweets = UA_tweetsContent['results'];
            }
            
            
            
            for (var c=0;c<tweets.length;c++)
            {
				var tweet = tweets[c].text;
                if(params == 'search')
                {
                    var user = tweets[c].from_user;
                    var avatar = tweets[c].profile_image_url;
                    var created_at=tweets[c].created_at;
				}
                else if(params == 'feed')
                {
                    var user = tweets[c].user.screen_name;
                    var avatar = tweets[c].user.profile_image_url;
                    var created_at = tweets[c].user.created_at;
                }
                else if(params == 'hashtag'){
                    var user = tweets[c].from_user;
                    var avatar = tweets[c].profile_image_url;
                    var created_at=tweets[c].created_at;
                }
            
                //var created_at = prettyDate(strtotime(tweets[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

				var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

				// Create a vertical layout view to hold all the info labels and images for each tweet

				var av = Ti.UI.createImageView({
						image:avatar,
						left:5,
						top:10,
						height:50,
						width:50
					});
				// Add the avatar image to the row
                row.add(av);

				var user_label = Ti.UI.createLabel({
					text:user,
					left:70,
					width:200,
					top:2,
					height:30,
					textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the row
                row.add(user_label);
                

				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:70,
					top:31,
					height:'auto',
					width:200,
					//textAlign:'left',
					font:{fontSize:14}
				});
				// Add the tweet to the row
                row.add(tweet_text);
                
                var time = new Date(created_at);
                    yy = time.getYear(); //日本時間に変換
                    mm = time.getMonth() + 1;
                    dd = time.getDate();
                    tt= time.getHours();
                    mi= time.getMinutes();
                    ss=time.getMinutes();
                    if (yy < 2000) { yy += 1900; }
                    if (mm < 10) { mm = "0" + mm; }
                    if (dd < 10) { dd = "0" + dd; }
                    if (tt < 10) { tt = "0" + tt; }
                    if (mi < 10) { mi = "0" + mi; }
                    //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
                var created_at = mm + "-" + dd +" " + tt +":"+mi;
                //tweetObj.created_at = date.toLocaleString();
                
                var date_label = Ti.UI.createLabel({
					text:created_at,
                    right:0,
                    top:2,
					//bottom:2,
					height:30,
					textAlign:'right',
					width:150,
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:12}
               });
				// Add the date to the row
                row.add(date_label);
                
				// Add the vertical layout view to the row
				row.className = 'UA_item'+c;
				UA_tableViewData[c] = row;
                
			}
            if(params == 'search')
            {
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                top:43,
                //minRowHeight:60
                });
            }
            else if(params == 'feed')
            {
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                //top:0,
                //minRowHeight:60
                });
            }else if(params == 'hashtag'){
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                //top:0,
                //minRowHeight:60
                });
            }
            
            //add event for tableview click
            UA_tableView.addEventListener('click',function(e){
                var testArray = e.rowData.getChildren();
                var displayIndex = e.index;
                var UA_tweetDisplayWin = Ti.UI.createWindow({
                    
                    url: '../function/tweetDisplayWin.js',
                    backButtonTitle: 'back',
                    backgroundColor: '#fff',
                    tabBarHidden: true
                    
                    
                });
                
                //pass data to UA_tweetDisplayWin
                UA_tweetDisplayWin.displayIndex = e.index;
                UA_tweetDisplayWin.displayAvatar = testArray[0].image;
                UA_tweetDisplayWin.displayTitle = testArray[1].text;
                UA_tweetDisplayWin.displayText = testArray[2].text;
                UA_tweetDisplayWin.created_at = testArray[3].text;
                
                UA_tweetDisplayWin.UA_tableViewData = UA_tableViewData;
            
                Ti.UI.currentTab.open(UA_tweetDisplayWin);
            });






/*-- pull to reflesh 部分 始まり--------------------------------------------*/

    var border = Ti.UI.createView({
        backgroundColor:"#576c89",
        height:2,
        bottom:0
    });

    var tableHeader = Ti.UI.createView({
        backgroundColor:"#e2e7ed",
        width:320,
        height:60
    });
    // fake it til ya make it..  create a 2 pixel
    // bottom border
    tableHeader.add(border);

    var arrow = Ti.UI.createView({
        backgroundImage:"../../../../../../twitterSetting/whiteArrow.png",
        width:23,
        height:60,
        bottom:10,
        left:20
    });

    var statusLabel = Ti.UI.createLabel({
        text:"Pull to reload",
        left:55,
        width:200,
        bottom:30,
        height:"auto",
        color:"#576c89",
        textAlign:"center",
        font:{fontSize:13,fontWeight:"bold"},
        shadowColor:"#999",
        shadowOffset:{x:0,y:1}
    });

    var lastUpdatedLabel = Ti.UI.createLabel({
        text:"Last Updated: "+formatDate(),
        left:55,
        width:200,
        bottom:15,
        height:"auto",
        color:"#576c89",
        textAlign:"center",
        font:{fontSize:12},
        shadowColor:"#999",
        shadowOffset:{x:0,y:1}
    });

    var actInd = Titanium.UI.createActivityIndicator({
        left:20,
        bottom:13,
        width:30,
        height:30
    });

    tableHeader.add(arrow);
    tableHeader.add(statusLabel);
    tableHeader.add(lastUpdatedLabel);
    tableHeader.add(actInd);

    UA_tableView.headerPullView = tableHeader;


    var pulling = false;
    var reloading = false;
function beginReloading()
{
	// just mock out the reload
	setTimeout(endReloading,2000);
}


    // twitter 追加部分
var endReloading=function()
    {
     /*-twitter  取得-------------------------------------*/
     
     UA_display_twitter_homeline(queryUrl, params);
     
      /*-twitter  終わり-------------------------------------*/    
        
        // when you're done, just reset
         UA_tableView.setContentInsets({top:0},{animated:true});
            reloading = false;
            lastUpdatedLabel.text = "Last Updated: "+formatDate();
            statusLabel.text = "Pull down to refresh...";
            actInd.hide();
            arrow.show();
        } //function endReloading(){   の終わり

    UA_tableView.addEventListener('scroll',function(e)
    {
        var offset = e.contentOffset.y;
        if (offset <= -65.0 && !pulling)
        {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = true;
            arrow.animate({transform:t,duration:180});
            statusLabel.text = "Release to refresh...";
        }
        else if (pulling && offset > -65.0 && offset < 0)
        {
            pulling = false;
            var t = Ti.UI.create2DMatrix();
            arrow.animate({transform:t,duration:180});
            statusLabel.text = "Pull down to refresh...";
        }
    });


    UA_tableView.addEventListener('scrollEnd',function(e)
    {
        if (pulling && !reloading && e.contentOffset.y <= -65.0)
        {
            reloading = true;
            pulling = false;
            arrow.hide();
            actInd.show();
            statusLabel.text = "Reloading...";
            UA_tableView.setContentInsets({top:60},{animated:true});
            arrow.transform=Ti.UI.create2DMatrix();
            beginReloading();
        }
    });

/*-- pull to reflesh 部分 終わり--------------------------------------------*/    
    















            
            win.add(UA_tableView);
			
		}
		catch(E)
        {
			alert(E);
		}
	 
	};
	xhr.send(); 
  

}



/*---- pull to refresh の関数部分 ------------------------------*/
function formatDate()
{
	var date = new Date;
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
	}
	return datestr;
} //function formatDate()




/*---- pull to refresh の関数部分　終 ------------------------------*/