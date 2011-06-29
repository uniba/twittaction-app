/*----------------------Table and Win Information----------------*/
//Author: uniba.jp
/*---------------------------------------------------------------*/

//create settingTable and add settingWin
var settingWin = Ti.UI.currentWindow;

//create twitter login interface by using tableview
var data = [];
data[0] = Ti.UI.createTableViewSection({headerTitle:'Twitter アカウント'});
var rowusername = Ti.UI.createTableViewRow({title:''});
var textusername = Ti.UI.createTextField({
    left: 100,
    width: 200,  
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});
var labelusername = Ti.UI.createLabel({
    text: 'Username:',
    left: 10
});
rowusername.add(labelusername);
rowusername.add(textusername);
//rowusername.className = 'control';
data[0].add(rowusername);
var rowpassword = Ti.UI.createTableViewRow({title:''});
var textpassword = Ti.UI.createTextField({
    left: 100,
    width: 200,
    passwordMask: true,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT
});

var labelpassword = Ti.UI.createLabel({
    text: 'Password:',
    left: 10
});

rowpassword.add(labelpassword);
rowpassword.add(textpassword);

data[0].add(rowpassword);	


// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

//add tableview
settingWin.add(tableview);


//add leftbutton and rightbutton on navbar
var leftbutton = Titanium.UI.createButton({title:'キャンセル'});
var rightbutton = Titanium.UI.createButton({title:'ログイン'});


//add the action for rightbutton(login)
rightbutton.addEventListener('click',function()
{
  var twitteraccount = textusername.value;
  var twitterpassword = textpassword.value;
  //Ti.API.info(twitteraccount);
  //Ti.API.info(twitterpassword);
  //at here we need to insert auenthecation program
});

//win4.add(tableview);
settingWin.leftNavButton = leftbutton;
settingWin.rightNavButton = rightbutton;