Ti.include('twitterAct.js');

//------------------------------------------------------------- 
//              Infomation about  tweetWin(A6 image)
//-------------------------------------------------------------


var win = Ti.UI.currentWindow;
var sendTwittaction = [];
sendTwittaction[0] = win.twittaction;
sendTwittaction[1] = win.twittactionUrl;
var nav = win.nav;
//define send button for navibar of tweetwin(A6 image)
var UA_sendButton = Titanium.UI.createButton({
	title: "送信",
	width:67,
	height:32,
    enabled:false
	
});


//add send button as rightNavButton for tweetwin(A6 image)
win.rightNavButton = UA_sendButton;

//if(sendTwittaction[0]!=true){
//create a hintTextLabel for textarea
/*
var UA_hintTextLabel = Titanium.UI.createLabel({
    text:"コメントを入力",
    top:15,
    left:15,
    height:'auto',
    width: 'auto'

});
*/
var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
dir.createDirectory();

//create file
var shortUrlFile = Titanium.Filesystem.getFile(dir.nativePath, 'shortUrl.json');

var contents = shortUrlFile.read();

if (contents == null) {
    var config = {shortUrl:''};
    
}else{

try
    {
        var config = JSON.parse(contents.text);
        //alert(config);//確認
    }
    catch(ex)
    {
        return;
    }    
    //alert(config.shortUrl);

}


var UA_tweetComment = Titanium.UI.createTextArea({
    //hintText: "コメントを入力",
    //by using TextArea, we can not use hintText property 
    // of course, we can use hintText in textField
    height:150,
    width:300,
    top:10,
    font:{fontSize:20},
    borderWidth:2,
    borderColor:'#bbb',
    borderRadius:5,
    value:' '+config.shortUrl+' #twitt_dev_action'

});
//}else{
/*  
var UA_hintTextLabel = Titanium.UI.createLabel({
    //text:"コメントを入力",
    top:15,
    left:15,
    height:'auto',
    width: 'auto'

});

var UA_tweetComment = Titanium.UI.createTextArea({
    //hintText: "コメントを入力",
    //by using TextArea, we can not use hintText property 
    // of course, we can use hintText in textField
    value:' '+sendTwittaction[1]+' ',
    height:150,
    width:300,
    top:10,
    font:{fontSize:20},
    borderWidth:2,
    borderColor:'#bbb',
    borderRadius:5

});

*/
//}

var UA_countNumberLabel = Titanium.UI.createLabel({
    text: 140,
    left:250,
    top:150,
    width:50,
    height:40
}); 

//if the content of tweet is empty, the sendbutton can not be used
//if the length of content exceed 140 characters, the sendbutton also can 
//not be used
UA_tweetComment.addEventListener('change',function(e){
  if(e.value == "")
  {UA_sendButton.enabled = false;
  UA_countNumberLabel.text = 140;
  }
  else
  {
   UA_countNumberLabel.text = 140 - e.value.length; 
   if(e.value.length<=140)
   {
    UA_sendButton.enabled = true;
   }
   else
   {
    UA_sendButton.enabled = false;
   }
   };
});

/*
//once the mouse blur textArea and the content is empty, show the hintTextLabel
UA_tweetComment.addEventListener('blur', function(e){
    if(e.value == "")
    {
        UA_hintTextLabel.show();
    }
    else
    {
        UA_hintTextLabel.hide();
    }


});
*/
/*
//once the mouse focus on TextArea, hide the hintTextLabel
UA_tweetComment.addEventListener('focus', function(e){

        UA_hintTextLabel.hide();

});
*/

UA_sendButton.addEventListener(
    'click',
    function () {
    
        if(sendTwittaction[0]==true){
            tweetTwittaction( UA_tweetComment.value );
        }else{
            tweet( UA_tweetComment.value );
        }
    }
);



//add textfield for tweetWin
win.add(UA_tweetComment);
//win.add(UA_hintTextLabel);
win.add(UA_countNumberLabel);
