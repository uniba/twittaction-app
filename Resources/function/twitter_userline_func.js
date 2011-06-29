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
				}
                else if(params == 'feed')
                {
                    var user = tweets[c].user.screen_name;
                    var avatar = tweets[c].user.profile_image_url;
                }
                else if(params == 'hashtag'){
                    var user = tweets[c].from_user;
                    var avatar = tweets[c].profile_image_url;
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
				//	textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the row
                row.add(user_label);

				//var date_label = Ti.UI.createLabel({
				//	text:created_at,
                //  right:0,
                //  top:-18,
				//	bottom:2,
				//	height:14,
				//	textAlign:'right',
				//	width:110,
				//	color:'#444444',
				//	font:{fontFamily:'Trebuchet MS',fontSize:12}
			//	});
				// Add the date to the row
			//	row.add(date_label);

				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:70,
					top:31,
					height:50,
					width:200,
					//textAlign:'left',
					font:{fontSize:14}
				});
				// Add the tweet to the row
                row.add(tweet_text);
				// Add the vertical layout view to the row
				row.className = 'UA_item'+c;
				UA_tableViewData[c] = row;
                
			}
            if(params == 'search')
            {
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                top:43,
                minRowHeight:60
                });
            }
            else if(params == 'feed')
            {
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                top:0,
                minRowHeight:60
                });
            }else if(params == 'hashtag'){
                var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                top:0,
                minRowHeight:60
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
                UA_tweetDisplayWin.displayTitle = testArray[1].text;
                UA_tweetDisplayWin.displayText = testArray[2].text;
                UA_tweetDisplayWin.UA_tableViewData = UA_tableViewData;
            
                Ti.UI.currentTab.open(UA_tweetDisplayWin);
            });
            
            win.add(UA_tableView);
			
		}
		catch(E)
        {
			alert(E);
		}
	 
	};
	xhr.send(); 
  

}