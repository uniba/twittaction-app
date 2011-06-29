
    var data = [];
    var tableView = Ti.UI.createTableView({
        data:data
    });

    var db = new TweetDB();

    twitterApi.statuses_home_timeline(
        {
            onSuccess: function(response){
                db.addTweets(response);
                updateTimeline(db.getSavedTweets());
            },
            onError: function(error){
                Ti.API.error(error);
            }
        }
    );

    win1.add(tableView);

    /*-------- pull to refresh 部分 ------------------------------*/

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
        backgroundImage:"twitterSetting/whiteArrow.png",
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

    tableView.headerPullView = tableHeader;


    var pulling = false;
    var reloading = false;


    // twitter 追加部分
    var endReloading=function()
    {
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
       
        twitterApi.statuses_home_timeline(
        {
            onSuccess: function(response){
                db.addTweets(response);
                updateTimeline(db.getSavedTweets());
            },
            onError: function(error){
                Ti.API.error(error);
            }
        }
        );
        } //else{締め
        win1.add(tableView);
      /*-twitter timeline 終わり-------------------------------------*/    
        
        // when you're done, just reset
        tableView.setContentInsets({top:0},{animated:true});
        reloading = false;
        lastUpdatedLabel.text = "Last Updated: "+formatDate();
        statusLabel.text = "Pull down to refresh...";
        actInd.hide();
        arrow.show();
    } //function endReloading(){   の終わり



    tableView.addEventListener('scroll',function(e)
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


    tableView.addEventListener('scrollEnd',function(e)
    {
        if (pulling && !reloading && e.contentOffset.y <= -65.0)
        {
            reloading = true;
            pulling = false;
            arrow.hide();
            actInd.show();
            statusLabel.text = "Reloading...";
            tableView.setContentInsets({top:60},{animated:true});
            arrow.transform=Ti.UI.create2DMatrix();
            beginReloading();
        }
    });

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
/*---- pull to refresh 部分 終------------------------------*/