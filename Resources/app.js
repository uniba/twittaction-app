Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1=Titanium.UI.createWindow({
    url: 'action/action.js',
    //url: 'action/actionKikuchi.js',
    title:'action',
    backgroundColor:'#fff',
    barColor:'black'
});

var win2=Titanium.UI.createWindow({
    url: 'feed/feed.js',
    title:'feed',
    backgroundColor:'#fff',
    barColor:'black'
});

var win3 = Ti.UI.createWindow({
     url: 'hashTag/hashTag.js',
     title:'#tag' ,
     backgroundColor:'#fff',
     barColor:'black'
});

var win4=Titanium.UI.createWindow({
    url: 'search/search.js',
    title:'search',
    backgroundColor:'#fff',
    barColor:'black'

});

var win5=Titanium.UI.createWindow({
    url: 'setting/setting.js',
    title:'設定',
    backgroundColor:'#fff',
    barColor:'black'
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
    title:'#tag',
    icon:'picture/tag.png',
}); 

var tab4 = Titanium.UI.createTab({
    window:win4,
    title:'search',
    icon:'picture/search.png',
}); 

var tab5 = Titanium.UI.createTab({
    window:win5,
    title:'setting',
    icon:'picture/setting.png',
}); 


tabGroup.addTab(tab1); 
tabGroup.addTab(tab2);
//tabGroup.addTab(tab3);
//tabGroup.addTab(tab4); 
tabGroup.addTab(tab5);
tabGroup.open();