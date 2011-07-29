// これは、 tweetDisplay.js からの参照している。
Ti.include('twitterAct.js');

//------------------------------------------------------------- 
//              Infomation about  tweetWin(A6 image)
//-------------------------------------------------------------


var win = Ti.UI.currentWindow;

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


var UA_tweetComment = Titanium.UI.createTextArea({
    //hintText: "コメントを入力",
    //by using TextArea, we can not use hintText property 
    // of course, we can use hintText in textField
    height:150,
    width:300,
    top:10,
    font:{fontSize:14},
    borderWidth:2,
    borderColor:'#bbb',
    borderRadius:5,
    value:'RT @'+ win.displayTitle + ':' +win.displayText

});

var UA_countNumberLabel = Titanium.UI.createLabel({
    text: 140,
    left:250,
    top:-70,
    width:50
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

UA_sendButton.addEventListener('click',
    function () {
        UA_sendButton.enabled = false;
        tweet( UA_tweetComment.value );
    }
);


//add textfield for tweetWin
win.add(UA_tweetComment);
//win.add(UA_hintTextLabel);
win.add(UA_countNumberLabel);