//create searchTab and add seachWin
Ti.include("../function/twitter_userline_func.js");
var win = Titanium.UI.currentWindow;


//define search bar for searchWin
var UA_searchBar = Ti.UI.createSearchBar({
    barColor: '#000',
    showCancel:true,
    height: 43,
    top: 0
});


UA_searchBar.addEventListener('return', function(e){

    var url = 'http://search.twitter.com/search.json?q=';
    var query = encodeURI(e.value);
    var fromuser = encodeURI('&from=');
    
    /*
    //we need to get fromuser 
    var fromuser = 'hebinbin';
    var queryUrl1 = url.concat(query);
    var queryUrl2 = queryUrl1.concat('&from=');
    var queryUrl = queryUrl2.concat(fromuser);
    */
    //UA_tableView.data = UA_display_twitter_homeline(queryUrl, 'search');
    var queryUrl=url+query;
    UA_display_twitter_homeline(queryUrl, 'search');
    UA_searchBar.blur();
});

//define the action for search bar
UA_searchBar.addEventListener('change', function(e){
    //
});
UA_searchBar.addEventListener('cancel', function(e){
    UA_searchBar.blur();
});

UA_searchBar.addEventListener('focus', function(e){
    //
});
UA_searchBar.addEventListener('blur', function(e){
    //
});

win.add(UA_searchBar);


