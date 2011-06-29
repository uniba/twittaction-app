function updateTimeline (timeline) {
    var currentData = [];
    for (var i=0;i<timeline.length;i++) {
        var tweet = timeline[i];
        var row = Ti.UI.createTableViewRow(
            {
                height: 'auto',
                layout: 'vertical'
            }
        );

        var imageView = Ti.UI.createImageView(
            {
                image: tweet.user.profile_image_url,
                width: 48,
                height: 48,
                top: 5,
                left: 5
            }
        );
        row.add(imageView);

        var nameLabel = Ti.UI.createLabel(
            {
                width: 120,
                height: 'auto',
                left: 58,
                top: -48,
                fontSize: 6,
                fontWeight: 'bold',
                color: '#2b4771'
            }
        );
        nameLabel.text = tweet.user.screen_name;
        row.add(nameLabel);

        var commentLabel = Ti.UI.createLabel(
            {
                width: 257,
                left: 58,
                top: 1,
                height: 'auto',
                fontSize: 8
            }
        );
        commentLabel.text = tweet.text;
        row.add(commentLabel);
    
    
    
    var q= /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)/gi;
    var str=tweet.text;
    //var result = str.replace(q,"<a href='$1'>$1</a>");
    var result =str.match(q);
    
    if(result==null){
        row.url=0;
    }else{
        row.url=result;
    }
                

        var dateLabel = Ti.UI.createLabel(
            {
                width: 200,
                height: 'auto',
                left: 58,
                top: 5,
                fontSize: 6
            }
        );
        dateLabel.text = tweet.created_at;
        row.add(dateLabel);

        currentData.push(row);
    }
    tableView.setData(currentData);
} //function updateTimeline (timeline) {


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

function beginReloading()
{
	// just mock out the reload
	setTimeout(endReloading,2000);
}


/*---- pull to refresh の関数部分　終 ------------------------------*/



/*---- 画面再読み込み------------------------------*/
function recommendLogin(){

    var l1 = Titanium.UI.createLabel({
            text:'settingでログインしてください',
            width:200,
            height:150,
            top:10,
            color:'#336699',
            textAlign:'center'
    });

    Ti.UI.currentWindow.add(l1);

    var b1 = Titanium.UI.createButton({
      title:'ログインしたら、クリックして。',
      height:40,
      width:300
    });

    b1.addEventListener('click',function(e){
                Ti.include('../../../../../../../../../../../feed/feed.js');
    });
    Ti.UI.currentWindow.add(b1);

}
/*---- 画面再読み込み 終------------------------------*/

