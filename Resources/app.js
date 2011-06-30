/*----------------------Table and Win Information----------------*/
//Author: uniba.jp
/*---------------------------------------------------------------*/

Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1=Titanium.UI.createWindow({
    url: 'action/action.js',
    title:'action',
    backgroundColor:'#fff'
});

var win2=Titanium.UI.createWindow({
    url: 'feed/feed.js',
    title:'feed',
    backgroundColor:'#fff'
});


var win3=Titanium.UI.createWindow({
    url: 'search/search.js',
    title:'search',
    backgroundColor:'#fff'

});

var win4=Titanium.UI.createWindow({
    url: 'setting/setting.js',
    title:'設定',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({
    window:win1,
    title:'action',
    icon:'picture/action_over.png',
}); 

var tab2 = Titanium.UI.createTab({
    window:win2,
    title:'feed',
    icon:'picture/feed_over.png',
}); 


var tab3 = Titanium.UI.createTab({
    window:win3,
    title:'search',
    icon:'picture/search.png',
}); 

var tab4 = Titanium.UI.createTab({
    window:win4,
    title:'setting',
    icon:'picture/setting.png',
}); 


tabGroup.addTab(tab1); 
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4); 
tabGroup.open();