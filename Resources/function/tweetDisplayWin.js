var win = Ti.UI.currentWindow;

//------------------------------------------------------------- 
//              Infomation about  tweetDisplayWin(B3 image)
//-------------------------------------------------------------

var displayIndex = win.displayIndex;
var displayTitle = win.displayTitle;
var displayText = win.displayText;
<<<<<<< HEAD

var displayNav = [];
displayNav[0] = win.displayNav;

=======
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
var UA_tableViewData = win.UA_tableViewData;
var displayTweet = win.displayTweet;




var windowTitle = Ti.UI.createLabel({
        text: displayTitle
    });
                    
    var displayLabel = Ti.UI.createLabel({
        text: displayText,
        top: 10,
        textAlign: 'center'
    });
            
    win.setTitleControl(windowTitle);
    win.add(displayLabel);
<<<<<<< HEAD
    
    
        displayLabel.addEventListener('click',function(e)
    {
    
        //alert(e.source.text);
        //regular expression : 正規表現
        var q= /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;
        var str = e.source.text;
        var result =str.match(q);
        if(result==null){
            regularExpressionUrl=0;
        }else{
            regularExpressionUrl=result;
        }
             
        
        //alert(e.rowData.url[0]);
        if(regularExpressionUrl==0){
            alert('urlがありません');
        
        }else{
            //alert(e.rowData.url[0]);
            var alertDialog = Titanium.UI.createAlertDialog({
                title: '['+regularExpressionUrl[0]+']',
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
                    
                    webview.url = regularExpressionUrl[0];

                    win.add(webview);
                    
                    //win.open({animated:true});
                    if(displayNav[0]){
                    //alert('yes!!!');
                       displayNav[0].open(win,{animated:true}); 
                       
                    }else{
                    //alert('no!!!');
                        Titanium.UI.currentTab.open(win,{animated:true});
                    }
                }
            });
    alertDialog.show();
        
        }
        
        
    });
    
    
    
                    
    
    
    
=======
                    
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
    var UA_TL = Titanium.UI.createButton({
        title: 'TL',
        top:370,
        left:0,
        height: 40,
        width: 80  
    });

    var UA_new = Titanium.UI.createButton({
        title: 'new',
        top: 370,
        left: 80,
        height: 40,
        width: 80
    });
                        
    var UA_old = Titanium.UI.createButton({
        title: 'old',
        top:370,
        left:160,
        height: 40,
        width: 80
    });

    var UA_share = Titanium.UI.createButton({
        title: 'share',
        top:370,
        left:240,
        height: 40,
        width: 80
    });


    UA_TL.addEventListener('click', function(e){
                    
        Ti.UI.currentTab.close(win);
                    
    });
                
    UA_new.addEventListener('click', function(e){
                    
        if(displayIndex - 1 >= 0)
        {
            if(displayTweet == true)
            {
                  displayLabel.text = UA_tableViewData[displayIndex - 1].text;
            windowTitle.text = UA_tableViewData[displayIndex - 1].user.screen_name;
            win.setTitleControl(windowTitle);
            displayIndex = displayIndex - 1;

            }
            else
            {
                displayLabel.text = UA_tableViewData[displayIndex - 1].getChildren()[2].text;
            windowTitle.text = UA_tableViewData[displayIndex - 1].getChildren()[1].text;
            win.setTitleControl(windowTitle);
            displayIndex = displayIndex - 1;
            }                
            
            
            
                            
        }
                    
    });
                
    UA_old.addEventListener('click', function(e){
    
    
    if(displayTweet == true)
    {
       displayLabel.text = UA_tableViewData[displayIndex + 1].text;
       windowTitle.text = UA_tableViewData[displayIndex + 1].user.screen_name;
        win.setTitleControl(windowTitle);
        displayIndex = displayIndex + 1;

    }
    else
    {
                displayLabel.text = UA_tableViewData[displayIndex + 1].getChildren()[2].text;
        windowTitle.text = UA_tableViewData[displayIndex + 1].getChildren()[1].text;
            win.setTitleControl(windowTitle);
        displayIndex = displayIndex + 1;
    }

                    


    });
            
    win.add(UA_TL);
    win.add(UA_old);
    win.add(UA_new);
    win.add(UA_share);
    
    