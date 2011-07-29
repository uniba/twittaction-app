function UA_update_twitter_homeline(timeline){
    var win = Ti.UI.currentWindow;
    //var UA_tableview;
    var UA_tableViewData = [];
    //var tweets = eval('('+response+')');
   // alert(tweets);
    for (var c=0;c<timeline.length;c++)
    {
        var tweet = timeline[c];
        var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
        var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

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
            textAlign:'left',
            color:'#444444',
            font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the row
        row.add(user_label);
        
        var tweet_text = Ti.UI.createLabel({
            text:tweet.user.text,
            left:70,
            top:31,
            height:'auto',
            width:200,
            //textAlign:'left',
            font:{fontSize:14}
        });
				// Add the tweet to the row
        row.add(tweet_text);
                
        var created_at = Ti.UI.createLabel({
            text:tweet.user.created_at,
            right:0,
            top:2,
            height:30,
            width:150,
            textAlign:'right',
            font:{fontFamily:'Trebuchet MS',fontSize:12}
        });
				// Add the tweet to the row
        row.add(created_at);
          
        var avatarAvartar = Ti.UI.createLabel({
            text:tweet.user.profile_image_url,
            visible:0
        });
        row.add(avatarAvartar);             
				// Add the vertical layout view to the row
        row.className = 'UA_item'+c;
        UA_tableViewData[c] = row;

    }
    
    var UA_tableView = Titanium.UI.createTableView({
        data:UA_tableViewData
    });
        
    win.add(UA_tableView);
    
     UA_tableView.addEventListener('click',function(e){
        var testArray = e.rowData.getChildren();
        var displayIndex = e.index;
        var UA_tweetDisplayWin = Ti.UI.createWindow({
            url: '../function/tweetDisplayWin.js',
            backButtonTitle: 'back',
            backgroundColor: '#fff',
            tabBarHidden: true,
            barColor:'black'
        });
                
            //pass data to UA_tweetDisplayWin
        UA_tweetDisplayWin.displayIndex = e.index;
        UA_tweetDisplayWin.displayAvatar = testArray[0].image;
        UA_tweetDisplayWin.displayTitle = testArray[1].text;
        UA_tweetDisplayWin.displayText = testArray[2].text;
        UA_tweetDisplayWin.created_at = testArray[3].text;
        UA_tweetDisplayWin.avartarUrl = testArray[4].text;
        
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
    /*
   var arrow = Ti.UI.createView({
        backgroundImage:"../../../../../../twitterSetting/whiteArrow.png",
        width:23,
        height:60,
        bottom:10,
        left:20
    });
    */

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

   // tableHeader.add(arrow);
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
    var endReloading=function(){
         /*-twitter timeline 取得-------------------------------------*/
            var loginCheck = new OAuthAdapter(
            TwitterSettings.consumerSecret, //Consumer secret
            TwitterSettings.consumerKey, //Consumer key
            'HMAC-SHA1'
            );

            loginCheck.loadAccessToken('twitter');
            
           if(loginCheck.isAuthorized() == false){
                alert('loginしていないようです。\n settingでloginして下さい。');
           }else{
           
            twitterApi.statuses_home_timeline({
                onSuccess: function(response){
                    db.addTweets(response);
                    UA_update_twitter_homeline(db.getSavedTweets());
                },
                onError: function(error){
                    Ti.API.error(error);
                }
            });
           } //else{締め
            //win1.add(UA_tableview);
          /*-twitter timeline 終わり-------------------------------------*/    
            
            // when you're done, just reset
         UA_tableView.setContentInsets({top:0},{animated:true});
            reloading = false;
            lastUpdatedLabel.text = "Last Updated: "+formatDate();
            statusLabel.text = "Pull down to refresh...";
            actInd.hide();
            //arrow.show();
    } //function endReloading(){   の終わり

    UA_tableView.addEventListener('scroll',function(e)
    {
        var offset = e.contentOffset.y;
        if (offset <= -65.0 && !pulling)
        {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = true;
            //arrow.animate({transform:t,duration:180});
            statusLabel.text = "Release to refresh...";
        }
        else if (pulling && offset > -65.0 && offset < 0)
        {
            pulling = false;
            var t = Ti.UI.create2DMatrix();
            //arrow.animate({transform:t,duration:180});
            statusLabel.text = "Pull down to refresh...";
        }
    });


    UA_tableView.addEventListener('scrollEnd',function(e)
    {
        if (pulling && !reloading && e.contentOffset.y <= -65.0)
        {
            reloading = true;
            pulling = false;
            //arrow.hide();
            actInd.show();
            statusLabel.text = "Reloading...";
            UA_tableView.setContentInsets({top:60},{animated:true});
            //arrow.transform=Ti.UI.create2DMatrix();
            beginReloading();
        }
    });

/*-- pull to reflesh 部分 終わり--------------------------------------------*/    
    

}

/*
function updateTimeline (timeline) {
    var currentData = [];
    for (var i=0;i<timeline.length;i++) {
        var tweet = timeline[i];
        var row = Ti.UI.createTableViewRow(
            {
                height: 'auto',
                layout: 'vertical'
            }
        );

        var imageView = Ti.UI.createImageView(
            {
                image: tweet.user.profile_image_url,
                width: 48,
                height: 48,
                top: 5,
                left: 5
            }
        );
        row.add(imageView);

        var nameLabel = Ti.UI.createLabel(
            {
                width: 120,
                height: 'auto',
                left: 58,
                top: -48,
                fontSize: 6,
                fontWeight: 'bold',
                color: '#2b4771'
            }
        );
        nameLabel.text = tweet.user.screen_name;
        row.add(nameLabel);

        var commentLabel = Ti.UI.createLabel(
            {
                width: 257,
                left: 58,
                top: 1,
                height: 'auto',
                fontSize: 8
            }
        );
        commentLabel.text = tweet.text;
        row.add(commentLabel);
    
    
    
    var q= /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)/gi;
    var str=tweet.text;
    //var result = str.replace(q,"<a href='$1'>$1</a>");
    var result =str.match(q);
    
    if(result==null){
        row.url=0;
    }else{
        row.url=result;
    }
                

        var dateLabel = Ti.UI.createLabel(
            {
                width: 200,
                height: 'auto',
                left: 58,
                top: 5,
                fontSize: 6
            }
        );
        dateLabel.text = tweet.created_at;
        row.add(dateLabel);

        currentData.push(row);
    }
    tableView.setData(currentData);
} //function updateTimeline (timeline) {
*/

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



/*---- 画面再読み込み------------------------------*/
function recommendLogin(window){

    var l1 = Titanium.UI.createLabel({
            text:'settingでログインしていないか、インターネットに接続されていません。',
            width:200,
            height:150,
            top:10,
            color:'#336699',
            textAlign:'center'
    });

    window.add(l1);

    var b1 = Titanium.UI.createButton({
      title:'ログインしたら、クリック。',
      height:40,
      width:300
    });

    b1.addEventListener('click',function(e){
        window.remove(b1);
        window.remove(l1);
        Ti.include('../../../../../../../../../../../feed/feed.js');
    });
    window.add(b1);

}
/*---- 画面再読み込み 終------------------------------*/

