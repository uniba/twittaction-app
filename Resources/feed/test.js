function UA_update_twitter_homeline(timeline)
{
    var win = Ti.UI.currentWindow;
    var UA_tableview;
    var UA_tableViewData = [];
    //var tweets = eval('('+response+')');
   // alert(tweets);
    for (var c=0;c<timeline.length;c++)
    {
        var tweet = timeline[c];

        var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
        
        var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor,layout: 'vertical'});
        
    
    
        var av = Ti.UI.createImageView({
            image:tweet.user.profile_image_url,
            left:5,
            top:10,
            height:50,
            width:50
        });
				// Add the avatar image to the row
        row.add(av);

        var user_label = Ti.UI.createLabel({
            text:tweet.user.screen_name,
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
        
        var tweet_text = Ti.UI.createLabel({
					text:tweet.text,
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
    
    var UA_tableView = Titanium.UI.createTableView({
                data:UA_tableViewData,
                top:0,
                minRowHeight:60
    });
    
    
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