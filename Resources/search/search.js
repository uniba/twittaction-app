//create searchTab and add seachWin

var searchWin = Titanium.UI.currentWindow;

//define search bar for searchWin
var searchbar = Ti.UI.createSearchBar({
    barColor: '#000',
    shwoCancel:true,
    height: 43,
    top:0
});

//define the action for search bar
searchbar.addEventListener('change', function(e){
//Titanium.API.info('search bar: you type ' + e.value + ' act val ' + searchbar.value);
});
searchbar.addEventListener('cancel', function(e){
//Titanium.API.info('search bar cancel fired');
//searchbar.blur();
});
searchbar.addEventListener('return', function(e){
//Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
    
    //At here, we need to write some program to do search 
    //as one idea, design tableview to get home_timeline again.
    //and using search method intergated in Javascript
    
    //Ti.API.info(searcharray.length);
    //Ti.API.info(e.value);
    //for(var searchcount=0; searchcount<=searcharray.length;searchcount++)
    //{
    	//var searchindex = searcharray[searchcount].search(e.value);
    	//if(searchindex==-1)
    //	{
    	//we need to do something
    //	}
   // 	else
   // 	{
    	//we need to do something
    	//Ti.API.info(searcharray[searchcount]);
    //	}
   // }
});
searchbar.addEventListener('focus', function(e){
//Titanium.API.info('search bar: focus received');
});
searchbar.addEventListener('blur', function(e){
//Titanium.API.info('search bar:blur received');
});

//add serach bar in searchWin
searchWin.add(searchbar);