// create feedTable and add feedwin to feedTable to display home_timeline

var feedWin = Titanium.UI.currentWindow;

//create Tableview to display home_timeline
//cause using home_timeline, it requires authentication
//in order to test tableview, at here, we use user_timeline
var data = [];
var searcharray = [];
var xhr = Ti.Network.createHTTPClient();
xhr.timeout = 100000;
xhr.open("GET","http://api.twitter.com/1/statuses/user_timeline.json?screen_name=hebinbin");
xhr.onload = function () 
{
	try
	{ 
	 	var tweets = eval('('+this.responseText+')');
	 	
	 	for (var c=0;c<tweets.length;c++){

				var tweet = tweets[c].text;
				searcharray[c] = tweet; //used for search
				var user = tweets[c].user.screen_name;
				var avatar = tweets[c].user.profile_image_url;
				//var created_at = prettyDate(strtotime(tweets[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

				var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto',backgroundColor:bgcolor});

				// Create a vertical layout view to hold all the info labels and images for each tweet
				var post_view = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:5,
					top:5,
					bottom:5,
					right:5
				});

				var av = Ti.UI.createImageView({
						image:avatar,
						left:0,
						top:0,
						height:48,
						width:48
					});
				// Add the avatar image to the view
				post_view.add(av);

				var user_label = Ti.UI.createLabel({
					text:user,
					left:54,
					width:120,
					top:-48,
					bottom:2,
					height:16,
					textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the view
				post_view.add(user_label);

				//var date_label = Ti.UI.createLabel({
				//	text:created_at,
			//		right:0,
			//		top:-18,
			//		bottom:2,
			//		height:14,
		//			textAlign:'right',
		//			width:110,
		//			color:'#444444',
	//				font:{fontFamily:'Trebuchet MS',fontSize:12}
	//			});
				// Add the date to the view
	//			post_view.add(date_label);

				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:54,
					top:0,
					bottom:2,
					height:'auto',
					width:236,
					textAlign:'left',
					font:{fontSize:14}
				});
				// Add the tweet to the view
				post_view.add(tweet_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				row.className = 'item'+c;
				data[c] = row;
			}
           // Create the tableView and add it to the window.
           
			var tableview = Titanium.UI.createTableView({data:data,minRowHeight:58});
			feedWin.add(tableview);
		}
		catch(E){
			alert(E);
		}
	 	
	};
	xhr.send();
    
feedWin.open();