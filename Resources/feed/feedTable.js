<<<<<<< HEAD
/*
    var data = [];
    var tableView = Ti.UI.createTableView({
        data:data
    });
*/
    var db = new TweetDB();

    twitterApi.statuses_home_timeline(
        {
            onSuccess: function(response){
                db.addTweets(response);
                UA_update_twitter_homeline(db.getSavedTweets());
                //alert(db.getSavedTweets());
=======
twitterApi.statuses_home_timeline(
        {
            onSuccess: function(response){
               UA_twitter_homeline(response);
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
            },
            onError: function(error){
                Ti.API.error(error);
            }
        }
    );
<<<<<<< HEAD

    //win1.add(tableView);


/*
    tableView.addEventListener('click',function(e)
    {
        //alert(e.rowData.url[0]);
        if(e.rowData.url==0){
            alert('urlがありません');
        
        }else{
            //alert(e.rowData.url[0]);
            var alertDialog = Titanium.UI.createAlertDialog({
                title: e.rowData.url[0],
                message: 'このurlにアクセスしますか？',
                buttonNames: ['cancel','OK']
            });
            alertDialog.addEventListener('click',function(event){
                // Cancelボタンが押されたかどうか
                if(event.index == 0){
                    // cancel時の処理
                    //alert('cancel');
                }
                // 選択されたボタンのindexも返る
                if(event.index == 1){
                    // "OK"時の処理
                    //alert('OK');
                    
                    
                    // 単純なURLのロード
                    var win = Titanium.UI.createWindow();


                    var webview = Ti.UI.createWebView();
                    // webviewで表示したサイトのタイトルの取得
                    webview.addEventListener('load',function(e){
                         Ti.API.debug("webview loaded: "+e.url);
                         var title = webview.evalJS('document.title');
                         win.title=title;
                    });
                    
                    webview.url = e.rowData.url[0];

                    win.add(webview);
                    
                    //win.open({animated:true});
                    Titanium.UI.currentTab.open(win,{animated:true});
                }
            });
    alertDialog.show();
        
        }
        
    });
    */
=======
    
    
function UA_twitter_homeline(tweets)
{
    var win = Ti.UI.currentWindow;
    var UA_tableview;
    var UA_tableViewData = [];
    //var tweets = eval('('+response+')');
   // alert(tweets);
    for (var c=0;c<tweets.length;c++)
    {
        var tweet = tweets[c].text;
        var user = tweets[c].user.screen_name;
        var avatar = tweets[c].user.profile_image_url;
        
        var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
        var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});
        
    
    
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
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
