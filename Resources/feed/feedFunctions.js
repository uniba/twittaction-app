// twitter から取得だったのを twittactionのサーバーからデータを収録するようにした。
var cleckReference = [];
cleckReference[0] = 0 ;
function twittactionAllUser(json,followORall,tableView){

    var win = Ti.UI.currentWindow;
    //win.backgroundColor = 'red';
    //var UA_tableview;
    var UA_tableViewData = [];
    //var tweets = eval('('+response+')');
   // alert(tweets);
    var row = Ti.UI.createTableViewRow({hasChild:false,height:45,backgroundImage : 'feed_button.png',selectedBackgroundImage:'feed_button2.png'});
    
    var newFeed = Titanium.UI.createLabel({
       backgroundImage : 'feed_new.png',
       //backgroundSelectedImage : 'twittaction_feed_new2.png',
       style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
       width:63,
       height:12.5
    });

            // Add the tweet to the row
    row.add(newFeed);      
    UA_tableViewData.push(row);
        

       /*
    var linerow = Ti.UI.createTableViewRow({hasChild:false,backgroundImage:'feed_button.png',height:3});
    var line = Ti.UI.createImageView({
        image:'feed_line.png',
        width:380
    });
    */
    var row = Ti.UI.createTableViewRow({height:3,hasChild:false,backgroundImage : 'feed_button.png'});
    var line = Titanium.UI.createLabel({
       backgroundImage : 'feed_line.png',
       width:380
       //backgroundSelectedImage : 'twittaction_feed_new2.png',
       //style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
       //width:63,
       //height:12.5
    });

            // Add the avatar image to the row
    row.add(line);
    UA_tableViewData.push(row);

    for (var c=0;c<json.length;c++){
        var tweet = json[c];
        //var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
        var row = Ti.UI.createTableViewRow({hasChild:false,height:'auto',selectedBackgroundImage:'feed_button2.png'});

        var av = Ti.UI.createImageView({
            image:tweet.profile_image_url_https,
            left:5,
            top:10,
            height:50,
            width:50
        });
				// Add the avatar image to the row
        row.add(av);
        
        var hukidasi = Ti.UI.createView({
            borderColor:'#62bea9',
            borderWidth:3,
            borderRadius:8,
            backgroundColor:'white',
            top:5,        
            left:65,
            right:12,
            bottom:5
        });
				// Add the avatar image to the row
        row.add(hukidasi);
        
        var user_label = Ti.UI.createLabel({
            text:tweet.screen_name,
            left:75,
            width:200,
            top:6,
            height:30,
            textAlign:'left',
            color:'#444444',
            font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the row
        row.add(user_label);
        
        var tweet_text = Ti.UI.createLabel({
            text:tweet.message,
            left:75,
            top:31,
            bottom:12,
            height:'auto',
            width:200,
            //textAlign:'left',
            font:{fontSize:14}
            //backgroundImage:'../picture/fukidashi2.png',

        });
				// Add the tweet to the row
        row.add(tweet_text);
        //var modified = formatModified(tweet.modified);
        var created_at = Ti.UI.createLabel({
            text:tweet.formatTime,
						color:'#999999',
            right:20,
            top:6,
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
        //row.className = 'UA_item'+c;
        UA_tableViewData.push(row);
        

    }
    /*
    var row = Ti.UI.createTableViewRow({hasChild:false,height:'auto'});
    var oldFeed = Titanium.UI.createButton({
       backgroundImage : 'twittaction_feed_old.png',
       backgroundSelectedImage : 'twittaction_feed_old2.png',
       style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
       width:320,
       height:32.5
    });

    row.add(oldFeed);      
    UA_tableViewData.push(row);
    */
    /*
    var UA_tableView = Titanium.UI.createTableView({
        data:UA_tableViewData,
        backgroundColor:'transparent',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
    });
    */    
    //win.add(tableView);
    var row = Ti.UI.createTableViewRow({height:3,hasChild:false,backgroundImage : 'feed_button.png'});
    var line = Titanium.UI.createLabel({
       backgroundImage : 'feed_line.png',
       width:380
    });

            // Add the avatar image to the row
    row.add(line);
    UA_tableViewData.push(row);
    var row = Ti.UI.createTableViewRow({hasChild:false,height:45,backgroundImage : 'feed_button.png',selectedBackgroundImage:'feed_button2.png'});
    
    var newFeed = Titanium.UI.createLabel({
       backgroundImage : 'feed_old.png',
       //backgroundSelectedImage : 'twittaction_feed_new2.png',
       style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
       width:63,
       height:12.5
    });

            // Add the tweet to the row
    row.add(newFeed);      
    UA_tableViewData.push(row);
        


    tableView.setData(UA_tableViewData,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.UP});
    //tableView.removeEventListener('click',tableViewClick);
    //tableViewClickEvient(tableView,followORall,UA_tableViewData);
    var tableViewClick = function(e){ tableViewClickEvient(e,tableView,followORall,UA_tableViewData);};
    tableView.addEventListener('click',tableViewClick);
    if(cleckReference[0]!=0){
        tableView.removeEventListener('click',tableViewClick);
    }
    cleckReference[0] = cleckReference[0] + 1 ;

}

function test(hoge){
    alert(hoge);
}

function tableViewClickEvient(e,tableView,followORall,UA_tableViewData){

     //alert('クリック行'+e.index);
        if(e.index==0){
        //alert(11);
            if(followORall=='follow'){
                reference[0] = reference[0] - 1 ;
                if( reference[0] < 0 ){
                    reference[0] = 0 ;
                }
                //alert(1);
                followData(reference[0],tableView);
            }else{
                reference[1] = reference[1] - 1 ;
                if( reference[1] < 0 ){
                    reference[1] = 0 ;
                }
                //alert(2);
                allTwittaction(reference[1],tableView);
            }
        }else if(e.index == UA_tableViewData.length -1 ){
                if(followORall=='follow'){
                    reference[0] = reference[0] + 1 ;
                    //alert(3);
                    followData(reference[0],tableView);
                }else{
                    reference[1] = reference[1] + 1 ;
                    if( reference[1] < 0 ){
                        reference[1] = 0 ;
                    }
                    //alert(4);
                    allTwittaction(reference[1],tableView);
                }                
        }else{
            ////alert(e.x+'.'+e.y);
            var testArray = e.rowData.getChildren();
            var displayIndex = e.index;
            var check = e.rowData.getChildren()[3].text;
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
                    backgroundColor:'#fff'
                    //barColor:'black'
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
                //alert(9);
                Titanium.UI.currentTab.open(webWin,{animated:true});
            }
        }
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
            textAlign:'center',
            backgroundColor:'white'
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
        //window.remove(tableView);
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
                alert('エラーが発生しました');
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



function followData(page,tableView){
 try{
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        xhr.onload = function(){
          //alert(this.responseText);
          if(this.responseText=='[]'){
            alert('これより古いデータはありません');
            reference[0] = reference[0] - 1 ;
          }else{
            var allJson = JSON.parse(this.responseText);
              //alert(allJson[0].key);
              //alert(this.responseText);
            twittactionAllUser(allJson,'follow',tableView);
          }
        };
        
        var twitterConfig = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'twitter.config');
        if(twitterConfig.exists()){
            var  twitterConfigJson = JSON.parse(twitterConfig.read());
           // alert(twitterConfigJson.user_id);
        } else {
            alert("ログイン情報がありません");
        }
        
        xhr.open('POST','http://twittaction.com/follow');
        xhr.onerror = function(){
            alert('エラーが発生しました');
        };
        xhr.send({userId:twitterConfigJson.user_id,page:page});
        
        }
        
    catch(error){
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        alert('エラーが発生しました。');
    }
}

function allTwittaction(page,tableView){
    try{
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setTimeout(30000);
        xhr.onload = function(){
          //alert(this.responseText);
        if(this.responseText=='[]'){
            alert('これより古いデータはありません');
            reference[1] = reference[1] - 1 ;
        }else{
          var allJson = JSON.parse(this.responseText);
          //alert(allJson[0].key);
          twittactionAllUser(allJson,'all',tableView);
         } 
        };
        xhr.open('POST','http://twittaction.com/all');
        xhr.onerror = function(){
            alert('エラーが発生しました');
        };
        xhr.send({page:page});
        
        }
        
    catch(error){
        coverWin.close();
        win.remove(actInd);
        win.remove(coverWin);
        alert('エラーが発生しました。');
    }

}