// http://gihyo.jp/dev/serial/01/titanium/0010?page=2
var TweetDB = function() {
    this.dbName = 'tweetdb';
    
    this.open = function () {
        this.db = Titanium.Database.open(this.dbName);
    };
    //Titanium.Database.open() はデータベース名を指定して開く。無かったら作成。
    // http://code.google.com/p/titanium-mobile-doc-ja/wiki/guides_database
    
    this.close = function () {
        this.db.close();
    };

    this.searchByScreenName = function (screen_name) {
        this.open();
        var rows = this.db.execute(
            'SELECT * FROM tweets WHERE screen_name like ?',
            '%' + screen_name + '%'
        );
        var res = [];
        if ( rows.getRowCount() > 0 ) {
            Ti.API.debug('Found: ' + rows.getRowCount() );
            while ( rows.isValidRow() ) {
                var tweetObj = {};
                tweetObj.user = {};
                tweetObj.user.screen_name = rows.fieldByName('screen_name');
                tweetObj.user.profile_image_url
                    = rows.fieldByName('profile_image_url');
                tweetObj.text = rows.fieldByName('tweet_text');
                var date = new Date(rows.fieldByName('created_at'));
                tweetObj.created_at = date.toLocaleString();
                res.push(tweetObj);
                rows.next();
            }
        }
        rows.close();
        this.close();
        return res.length ? res : null;
    };

    this.addTweets = function (tweets) {
        this.open();
        for (var i=0;i<tweets.length;i++) {
            var tweet = tweets[i];
            var rows = this.db.execute(
                'SELECT * FROM tweets WHERE status_id = ?',
                tweet.id_str
            );
            //alert(tweet.id_str);
            Ti.API.info('Found!: ' + rows.getRowCount() );
            Ti.API.info('tweet.user.screen_name: ' + tweet.user.screen_name);
            Ti.API.info('tweet.text: ' + tweet.text);
            Ti.API.info('tweet.created_at twitterからの生の時間: ' + tweet.created_at);
            

            var time = new Date(tweet.created_at);
              var yy = time.getYear(); //日本時間に変換
              var  mm = time.getMonth() + 1;
              var  dd = time.getDate();
              var  tt= time.getHours();
              var  mi= time.getMinutes();
              var  ss=time.getMinutes();
                if (yy < 2000) { yy += 1900; }
                if (mm < 10) { mm = "0" + mm; }
                if (dd < 10) { dd = "0" + dd; }
                if (tt < 10) { tt = "0" + tt; }
                if (mi < 10) { mi = "0" + mi; }
            //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
            var pub_day = mm + "-" + dd + " " + tt + ":" + mi ;

            if ( rows.getRowCount() > 0 ) {
            
                continue;
            
            }
            var res = this.db.execute(
                'INSERT INTO tweets (screen_name, profile_image_url, tweet_text, status_id, created_at) VALUES(?,?,?,?,?)',
                tweet.user.screen_name,
                tweet.user.profile_image_url,
                tweet.text,
                tweet.id_str,
                pub_day
            );
            
            Titanium.API.info('Add to DB : ' + tweet.text);
            Titanium.API.info('データベースにいれた時間: ' + pub_day);
        }
        this.close();
        return true;
    };

    this.getSavedTweets = function() {
        this.open();
            var rows = this.db.execute('SELECT * FROM tweets ORDER BY created_at ASC');
            
            
        /* tweetの保存する件数を制限する。
        * var over=rowsNum-100 をいじる
        *
        */
            var rowsNum = rows.getRowCount();
            var over=rowsNum-100;
                Titanium.API.info('ROW COUNT = ' + rowsNum);
                if(over >= 0){
                for(i=1;i<=over;i++){
                Titanium.API.info('消去： ' + i);
                var deleteWords=rows.fieldByName('tweet_text');
                
                    this.db.execute(
                        'DELETE FROM tweets WHERE tweet_text = ?',
                        deleteWords
                    );
                    Titanium.API.info('DELETE  screen_name :' + rows.fieldByName('screen_name'));
                    Titanium.API.info('DELETE tweet: ' + deleteWords);
                    Titanium.API.info('DELETE  created_at: ' + rows.fieldByName('created_at'));
                    
                    rows.next();
                }
            }
        /*---tweetの保存する件数を制限する。終--------------------------------------*/
        
        var rows = this.db.execute( 'SELECT * FROM tweets ORDER BY created_at DESC' );
        var res = [];
        if ( rows.getRowCount() > 0 ) {
            Ti.API.debug('Found: ' + rows.getRowCount() );
            Titanium.API.info('保存された生の時間。SELECT * FROM tweets ORDER BY created_at DESC　で取り出し ');
            while ( rows.isValidRow() ) {
                var tweetObj = {};
                tweetObj.user = {};
                tweetObj.user.screen_name = rows.fieldByName('screen_name');
                tweetObj.user.profile_image_url
                    = rows.fieldByName('profile_image_url');
                tweetObj.user.text = rows.fieldByName('tweet_text');
                //var date = new Date(rows.fieldByName('created_at'));
                //var time=rows.fieldByName('created_at');
                Titanium.API.info('保存された生の時間: ' +  rows.fieldByName('created_at'));
                /*
                var time = new Date(rows.fieldByName('created_at'));
                            yy = time.getYear(); //日本時間に変換
                            mm = time.getMonth() + 1;
                            dd = time.getDate();
                            tt= time.getHours();
                            mi= time.getMinutes();
                            ss=time.getMinutes();
                            if (yy < 2000) { yy += 1900; }
                            if (mm < 10) { mm = "0" + mm; }
                            if (dd < 10) { dd = "0" + dd; }
                            if (tt < 10) { tt = "0" + tt; }
                            if (mi < 10) { mi = "0" + mi; }
                //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
                var pub_day = mm + "-" + dd +" " + tt +":"+mi;
                //tweetObj.created_at = date.toLocaleString();
                */
                tweetObj.user.created_at = rows.fieldByName('created_at');
                //Titanium.API.info('加工した時間,pub_day :' +  pub_day);
                res.push(tweetObj);
                rows.next();
            }
        }
        rows.close();
        this.close();
        return res;
    };

    this.open();
    this.db.execute('CREATE TABLE IF NOT EXISTS tweets (screen_name TEXT, profile_image_url TEXT, tweet_text TEXT, status_id TEXT, created_at TEXT,url)');
    this.close();
};