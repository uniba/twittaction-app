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
            },
            onError: function(error){
                alert(error);
                Ti.API.error(error);
            }
        }
    );

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