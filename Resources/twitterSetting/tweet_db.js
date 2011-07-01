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
            Ti.API.debug('Found: ' + rows.getRowCount() );
            if ( rows.getRowCount() > 0 ) continue;

            var res = this.db.execute(
                'INSERT INTO tweets (screen_name, profile_image_url, tweet_text, status_id, created_at) VALUES(?,?,?,?,?)',
                tweet.user.screen_name,
                tweet.user.profile_image_url,
                tweet.text,
                tweet.id_str,
                tweet.created_at
            );
            Ti.API.debug('Add to DB');
        }
        this.close();
        return true;
    };

    this.getSavedTweets = function() {
        this.open();
            var rows = this.db.execute('SELECT * FROM tweets ORDER BY created_at ASC');
            
            
        /* tweetの保存する件数を制限する。
<<<<<<< HEAD
        * var over=rowsNum-100 をいじる
        *
        */
            var rowsNum = rows.getRowCount();
            var over=rowsNum-25;
=======
        * var over=rowsNum-10 をいじる
        *
        */
            var rowsNum = rows.getRowCount();
            var over=rowsNum-10;
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
                Titanium.API.info('ROW COUNT = ' + rowsNum);
                if(over >= 0){
                for(i=1;i<=over;i++){
                Titanium.API.info('消去： ' + i);
                var deleteWords=rows.fieldByName('tweet_text');
                
                    this.db.execute(
                        'DELETE FROM tweets WHERE tweet_text = ?',
                        deleteWords
                    );
<<<<<<< HEAD
                    Titanium.API.info('DELETE  screen_name :' + rows.fieldByName('screen_name'));
                    Titanium.API.info('DELETE tweet: ' + deleteWords);
                    Titanium.API.info('DELETE  created_at: ' + rows.fieldByName('created_at'));
                    
=======
                    Titanium.API.info('DELETE tweet= ' + deleteWords);
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
                    rows.next();
                }
            }
        /*---tweetの保存する件数を制限する。終--------------------------------------*/
        
        var rows = this.db.execute( 'SELECT * FROM tweets ORDER BY created_at DESC' );
        var res = [];
        if ( rows.getRowCount() > 0 ) {
            Ti.API.debug('Found: ' + rows.getRowCount() );
            while ( rows.isValidRow() ) {
                var tweetObj = {};
                tweetObj.user = {};
                tweetObj.user.screen_name = rows.fieldByName('screen_name');
                tweetObj.user.profile_image_url
                    = rows.fieldByName('profile_image_url');
<<<<<<< HEAD
                tweetObj.user.text = rows.fieldByName('tweet_text');
                //var date = new Date(rows.fieldByName('created_at'));
                //var time=rows.fieldByName('created_at');
                
                var time = new Date(rows.fieldByName('created_at'));
                            yy = time.getYear(); //日本時間に変換
                            mm = time.getMonth() + 1;
                            dd = time.getDate();
                            tt= time.getHours();
                            mi= time.getMinutes();
                            ss=time.getMinutes();
=======
                tweetObj.text = rows.fieldByName('tweet_text');
                //var date = new Date(rows.fieldByName('created_at'));
                //var time=rows.fieldByName('created_at');
                
                var d3 = new Date(rows.fieldByName('created_at'));
                            yy = d3.getYear(); //日本時間に変換
                            mm = d3.getMonth() + 1;
                            dd = d3.getDate();
                            tt= d3.getHours();
                            mi= d3.getMinutes();
                            ss=d3.getMinutes();
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
                            if (yy < 2000) { yy += 1900; }
                            if (mm < 10) { mm = "0" + mm; }
                            if (dd < 10) { dd = "0" + dd; }
                            if (tt < 10) { tt = "0" + tt; }
                            if (mi < 10) { mi = "0" + mi; }
<<<<<<< HEAD
                //var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
                var pub_day = mm + "-" + dd +" " + tt +":"+mi;
                //tweetObj.created_at = date.toLocaleString();
                
                tweetObj.user.created_at =pub_day;
=======
                var pub_day=yy + "-" + mm + "-" + dd +" " + tt +":"+mi;
                //tweetObj.created_at = date.toLocaleString();
                
                tweetObj.created_at =pub_day;
>>>>>>> 4c83eb356feb68c174a558922f923d2f2d676743
                
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