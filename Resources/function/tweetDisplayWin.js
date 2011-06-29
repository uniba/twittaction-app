var win = Ti.UI.currentWindow;

//------------------------------------------------------------- 
//              Infomation about  tweetDisplayWin(B3 image)
//-------------------------------------------------------------

var displayIndex = win.displayIndex;
var displayTitle = win.displayTitle;
var displayText = win.displayText;
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
    
    