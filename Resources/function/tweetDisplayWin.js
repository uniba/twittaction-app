var win = Ti.UI.currentWindow;
win.backgroundColor = 'black';

//------------------------------------------------------------- 
//              Infomation about  tweetDisplayWin(B3 image)
//-------------------------------------------------------------

var displayNav = [];
displayNav[0] = win.displayNav;//tweet投稿画面から
var displayAvatarImage = win.displayAvatar;
var picture = win.displayAvatar;
var picpic = {'a':picture};
//picpic[0]=picture;

var displayIndex = win.displayIndex;
var displayTitle = win.displayTitle;
var displayText = win.displayText;
var displaycreated_at = win.created_at;
var displayAvartarUrl = win.avartarUrl;
var AvartarUrl = [];
AvartarUrl[0] = displayAvartarUrl;


var UA_tableViewData = win.UA_tableViewData;
var displayTweet = win.displayTweet;//tweet投稿画面から

var windowTitle = Ti.UI.createLabel({
        text: displayTitle,
        width: '200',
        textAlign: 'center',
        color:'white'
    });
                    

    win.setTitleControl(windowTitle);
    
    var rows = [];
    
    var tweetParts = Ti.UI.createTableViewRow({
        height:'auto',
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
    });
    
    
    var background = Ti.UI.createView({
        backgroundImage:'images/fukidashi1.png',
        width:300,
    });    
    tweetParts.add(background);
    
    var displayLabel = Ti.UI.createLabel({
        text: displayText,
        top:7,
        bottom: 42,
        width: 290,
        height:'auto',
        textAlign: 'center',
        font:{fontSize:14}
    });
    tweetParts.add(displayLabel);
    
    var created_atLabel = Ti.UI.createLabel({
        text: displaycreated_at,
        bottom: 31,
        width: 260,
        height:'auto',
        textAlign: 'right',
        font:{fontSize:11}
    });
    tweetParts.add(created_atLabel);
    
    rows.push(tweetParts);
    

    var avatarParts = Ti.UI.createTableViewRow({
        height:'170',
        touchEnabled : false,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
    });
    
    var displayAvatar = Ti.UI.createImageView({
        image:displayAvatarImage,
        //left:160,
        //top:200,
        height:50,
        width:50
    });
    //avatarParts.add(displayAvatar);
    
    var webview = Ti.UI.createWebView({
        url:"cube/cube.html",
        backgroundColor:'#616161',
        scalesPageToFit:true
    });
    
    //var changeImage1 = 'imageUrl("';
    //var changeImage2 = changeImage1.concat(picture);
    
    //var changeImage3 = '")';
   // var changeImage0 = changeImage1 + picture + changeImage2;
    
    //alert(changeImage2);
    
    
    //alert(displayAvartarUrl);
    
    webview.addEventListener('load', function(e){
     webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
    });
    
    
    /*
    setTimeout(function(){
        webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
        
    }
    ,
    800);
    */
    
    
    avatarParts.add(webview);
    rows.push(avatarParts);
    
    
    var tableview = Titanium.UI.createTableView({
        data: rows,
        separatorStyle:0,
        //touchEnabled:false,
        backgroundColor:'#616161',
        
        /*
        backgroundGradient:{
            type:'linear',
            colors:['black','#CCC'],
            startPoint:{x:0,y:'0%'},
            endPoint:{x:0,y:'100%'}
        },
        */
    
    
    });
    win.add(tableview);
    
    
    
        displayLabel.addEventListener('click',function(e)
    {
    
        //alert(e.source.text);
        //regular expression : 正規表現
        var q = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;
        var str = e.source.text;
        var result = str.match(q);
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
                    var webWin = Titanium.UI.createWindow({
                        backgroundColor:'#fff',
                        barColor:'black'
                    });


                    var webview = Ti.UI.createWebView();
                    // webviewで表示したサイトのタイトルの取得
                    webview.addEventListener('load',function(e){
                         Ti.API.debug("webview loaded: "+e.url);
                         var title = webview.evalJS('document.title');
                         webWin.title=title;
                    });
                    
                    webview.url = regularExpressionUrl[0];

                    webWin.add(webview);
                    
                    //win.open({animated:true});
                    if(displayNav[0]){
                    //alert('yes!!!');
                       displayNav[0].open(webWin,{animated:true}); 
                       
                    }else{
                    //alert('no!!!');
                        Titanium.UI.currentTab.open(webWin,{animated:true});
                    }
                }
            });
    alertDialog.show();
        
        }
        
        
    });
    
    
   var UA_TL = Titanium.UI.createButton({
        bottom:0,
        left:0,
        height: 45,
        width: 80,
        backgroundImage:'images/black.png',
    });
    var UA_TLLabel = Ti.UI.createLabel({
        text:'TL',
        width:20,
        height:20,
        bottom:0,
        left:34,
        font:{fontSize:10},
        color:'white',
        
    });
    UA_TL.add(UA_TLLabel);

    var UA_TLImageView = Ti.UI.createImageView({
        image:'images/TL_icon.png',
        height:100,
        width:60,
        bottom:-20
    });
    UA_TL.add(UA_TLImageView);
    
    
    var UA_new = Titanium.UI.createButton({
        bottom:0,
        left: 80,
        height: 45,
        width: 80,
        backgroundImage:'images/black.png',
    });
    var UA_newLabel = Ti.UI.createLabel({
        text:'new',
        width:20,
        height:20,
        bottom:0,
        font:{fontSize:10},
        color:'white',
        
    });
    UA_new.add(UA_newLabel);

    var UA_newImageView = Ti.UI.createImageView({
        image:'images/new_icon.png',
        height:100,
        width:60,
        bottom:-20
        
    });
    UA_new.add(UA_newImageView);
    
                        
    
    var UA_old = Titanium.UI.createButton({
        bottom:0,
        left:160,
        height: 45,
        width: 80,
        backgroundImage:'images/black.png',
    });

    var UA_oldLabel = Ti.UI.createLabel({
        text:'old',
        width:20,
        height:20,
        bottom:0,
        left:34,
        font:{fontSize:10},
        color:'white',
        
    });
    UA_old.add(UA_oldLabel);

    var UA_oldImageView = Ti.UI.createImageView({
        image:'images/old_icon.png',
        height:100,
        width:60,
        bottom:-20
        
    });
    UA_old.add(UA_oldImageView);



    var UA_share = Titanium.UI.createButton({
        bottom:0,
        left:240,
        height: 45,
        width: 80,
        backgroundImage:'images/black.png',
    });

    var UA_shareLabel = Ti.UI.createLabel({
        text:'share',
        width:30,
        height:20,
        bottom:0,
        left:27,
        font:{fontSize:10},
        color:'white',
        
    });
    UA_share.add(UA_shareLabel);

    var UA_shareImageView = Ti.UI.createImageView({
        image:'images/share_icon.png',
        height:100,
        width:60,
        bottom:-20
    });
    UA_share.add(UA_shareImageView);

    
    
    
    
    
    
    
    UA_TL.addEventListener('click', function(e){
                    
        Ti.UI.currentTab.close(win);
                    
    });
                
    UA_new.addEventListener('click', function(e){
                    
        if(displayIndex - 1 >= 0)
        {
            if(displayTweet == true)
            {
            displayAvatar.image = UA_tableViewData[displayIndex - 1].user.profile_image_url;
            displayLabel.text = UA_tableViewData[displayIndex - 1].text;
            windowTitle.text = UA_tableViewData[displayIndex - 1].user.screen_name;
            //created_atLabel.text = created_atFunc(UA_tableViewData[displayIndex - 1].user.created_at);
            //うまく時間が取れない
            created_atLabel.text = '';
            
            AvartarUrl[0] = UA_tableViewData[displayIndex - 1].user.profile_image_url;
            setTimeout(function(){
                webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
        
            }
            ,
            0);
            
            win.setTitleControl(windowTitle);
            displayIndex = displayIndex - 1;
            tweetParts.height='auto';
            }
            else
            {
            displayAvatar.image = UA_tableViewData[displayIndex - 1].getChildren()[0].image;
            windowTitle.text = UA_tableViewData[displayIndex - 1].getChildren()[1].text;
            displayLabel.text = UA_tableViewData[displayIndex - 1].getChildren()[2].text;
            created_atLabel.text = UA_tableViewData[displayIndex - 1].getChildren()[3].text;
            AvartarUrl[0] = UA_tableViewData[displayIndex - 1].getChildren()[4].text;
            setTimeout(function(){
                webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
        
            }
            ,
            0);
    
            
            
            
            win.setTitleControl(windowTitle);
            displayIndex = displayIndex - 1;
            tweetParts.height='auto';
            }                
            
            
            
                            
        }
                    
    });
                
    UA_old.addEventListener('click', function(e){
    
    
    if(displayTweet == true)
    {
        displayAvatar.image = UA_tableViewData[displayIndex + 1].user.profile_image_url;
        displayLabel.text = UA_tableViewData[displayIndex + 1].text;
        windowTitle.text = UA_tableViewData[displayIndex + 1].user.screen_name;
        //created_atLabel.text = created_atFunc(UA_tableViewData[displayIndex + 1].user.created_at);
        created_atLabel.text = '';
        
        
        
        AvartarUrl[0] = UA_tableViewData[displayIndex + 1].user.profile_image_url;
        setTimeout(function(){
            webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
    
        }
        ,
        0);
        
        win.setTitleControl(windowTitle);
        displayIndex = displayIndex + 1;
        tweetParts.height='auto';
    }
    else
    {
        displayAvatar.image = UA_tableViewData[displayIndex + 1].getChildren()[0].image;
        displayLabel.text = UA_tableViewData[displayIndex + 1].getChildren()[2].text;
        windowTitle.text = UA_tableViewData[displayIndex + 1].getChildren()[1].text;
        created_atLabel.text = UA_tableViewData[displayIndex + 1].getChildren()[3].text;
        AvartarUrl[0] = UA_tableViewData[displayIndex + 1].getChildren()[4].text;
        setTimeout(function(){
            webview.evalJS('imageUrl("'+AvartarUrl[0]+'")');
    
        }
        ,
        0);
        
        
        win.setTitleControl(windowTitle);
        
        
        displayIndex = displayIndex + 1;
        tweetParts.height='auto';
    }

                    


    });
    /*
    UA_old.addEventListener('touchstart', function(e){
        UA_oldImageView.image = 'images/share_icon.png';
    });        
    UA_old.addEventListener('touchend', function(e){
        UA_oldImageView.image = 'images/old_icon.png';
    });        
      */  
    
    win.add(UA_TL);
    win.add(UA_old);
    win.add(UA_new);
    win.add(UA_share);
    
    
function created_atFunc(tweetTime){
var time = new Date(tweetTime);
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
    var pub_day = mm + "-" + dd +" " + tt +":"+mi;

return pub_day;
}
    