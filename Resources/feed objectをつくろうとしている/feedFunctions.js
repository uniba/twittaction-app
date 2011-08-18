// twitter から取得だったのを twittactionのサーバーからデータを収録するようにした。
var twittactionAllUser = function (followORall){

            
    this.addTable = function(json){
            var win = Ti.UI.currentWindow;
    //var UA_tableview;
    var UA_tableViewData = [];
    //var tweets = eval('('+response+')');
   // alert(tweets);
    for (var c=0;c<json.length;c++)
    {
        var tweet = json[c];
        var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
        var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

        var av = Ti.UI.createImageView({
            image:tweet.profile_image_url_https,
            left:5,
            top:10,
            height:50,
            width:50
        });
				// Add the avatar image to the row
        row.add(av);

        var user_label = Ti.UI.createLabel({
            text:tweet.screen_name,
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
            text:tweet.message,
            left:70,
            top:31,
            height:'auto',
            width:200,
            //textAlign:'left',
            font:{fontSize:14}
        });
				// Add the tweet to the row
        row.add(tweet_text);
        //var modified = formatModified(tweet.modified);
        var created_at = Ti.UI.createLabel({
            text:tweet.formatTime,
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
            text:tweet.profile_image_url_https,
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
        
    
    
     UA_tableView.addEventListener('click',function(e){
        var testArray = e.rowData.getChildren();
        var displayIndex = e.index;
        var check = e.rowData.getChildren()[2].text;
        //alert(check);
       
         //alert(e.source.text);
        //regular expression : 正規表現
        var q = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;
        //var str = e.source.text;
        var result = check.match(q);
        if(result==null){
            regularExpressionUrl=0;
        }else{
            regularExpressionUrl=result;
        }
             
        
        //alert(e.rowData.url[0]);
        if(regularExpressionUrl==0){
            alert('urlがありません');
        }else{
        var webWin = Titanium.UI.createWindow({
            backgroundColor:'#fff',
            barColor:'black'
        });
        var webview = Ti.UI.createWebView({touchEnabled:false});
        // webviewで表示したサイトのタイトルの取得
        webview.addEventListener('load',function(e){
             Ti.API.debug("webview loaded: "+e.url);
             var title = webview.evalJS('document.title');
             webWin.title=title;
        });
        webview.url = regularExpressionUrl[0];
        webWin.add(webview);
        Titanium.UI.currentTab.open(webWin,{animated:true});
        }
        
    });
        this.win.add(this.UA_tableView);
    };
    this.removeTable = function(){
        this.win.remove(this.UA_tableView);
    };

}

var formatModified = function(){
    var time = new Date();
              var yy = time.getYear(); //日本時間に変換
              var  mm = time.getMonth() + 1;
              var  dd = time.getDate();
              var  tt= time.getHours();
              var  mi= time.getMinutes();
              var  ss=time.getMinutes();
                if (yy < 2000) { yy += 1900; }
                if (mm < 10) { mm = "0" + mm; }
                if (dd < 10) { dd = "0" + dd; }
                if (tt < 10) { tt = "0" + tt; }
                if (mi < 10) { mi = "0" + mi; }
            //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
            var pub_day = mm + "-" + dd + " " + tt + ":" + mi ;
            return pub_day;
}

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


function socialGraph(){
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,  'twitter.config');
    if (file.exists == false) return;

    var contents = file.read();
    if (contents == null) return;
    try{
        var config = JSON.parse(contents.text);
        //alert(config);//確認
    }
    catch(ex){
        return;
    }
    
    if (config.user_id){ 
       var user_id = config.user_id;
        //alert(user_id);
    }
    
    
    try{
    // https://dev.twitter.com/docs/api/1/get/friends/ids 
    twitterApi.friends_ids({
        url:'http://api.twitter.com/1/friends/ids.json?user_id='+user_id,
        onSuccess:function(responce){
            //alert(responce)
            var xhrUserid = Titanium.Network.createHTTPClient();
            xhrUserid.setTimeout(30000);
            
            /*
            xhrUserid.onload = function(){
                //alert('onload')
            };
            */
            xhrUserid.open('POST','http://twittaction.com/socialGraph');
            
            xhrUserid.onerror = function(error){
            //var error = JSON.parse(err);
                alert(error);
            };
            
            //alert(user_id);
            //alert(responce);
            xhrUserid.send({userId:user_id,friends:responce});
        },
        onError:function(error){
            Titanium.API.info('friends_ids post error:'+error)
        }
    });


    }
    catch(error){
        alert('エラーが発生しました。2');
    }
}
