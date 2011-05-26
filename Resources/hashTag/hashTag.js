/*
*このソースはハッシュタグでの検索のみを行っています。
*
*/


/* 参照サイト
* http://gihyo.jp/dev/serial/01/titanium/0002?page=2 
* このサイトは全体的な動きを参考にしている 
*
*/

/* 
*-titanium の　tableview の解説
* http://code.google.com/p/titanium-mobile-doc-ja/wiki/TableView
*-titanium の　tableview レファレンス
* http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableView-object
*
*-Titanium.UI.TableViewRow のレファレンス
* http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableViewRow-object
*
*-Titanium.UI.Label のレファレンス
* http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.Label-object.html
*
*-titanium HTTPClientによる通信 の解説 (xhr)
* http://code.google.com/p/titanium-mobile-doc-ja/wiki/guides_network_httpclient
*
*/

/* twitter search api
*参照 http://dev.twitter.com/doc/get/search
*
* search.format  jsonで扱うときは formatはjson
* q=hoge    hoge に検索したい単語を入力。　uriエンコードしてないといけない。
* rpp=数字   数字　に一度のリクエストで取得する件数を指定する。1~100まで。
* page=数字   取得するページ番号を指定する。1つのページには rpp で指定した件数分が表示される。
*
* 取得例 http://search.twitter.com/search.json?q=obama&rpp=50&page=1
*
*/

var win = Ti.UI.currentWindow;

var hashTag = '#jishin'; //ここに検索したい単語を入力する。
var encodeHashTag = encodeURIComponent(hashTag); //encodeする必要がある
var twitterUrl="http://search.twitter.com/search.json?q="+encodeHashTag+"&rpp=50&page=1";

var tableView;
var data=[];

/*
* JSONの取得、解析 JSON.parse(this.responseText);
*/

var xhr = Titanium.Network.createHTTPClient();
xhr.open('GET', twitterUrl);

xhr.onload = function() {

    var jsonData = JSON.parse(this.responseText);
        //alert(jsonData);
        //上の１文をコメントアウトして実行すると、json が見れる
    
        //alert(jsonData.results[1].text);
        //要素の取り出し例

// 検索したハッシュタグを一番上に表示させる。
var tagRow = Titanium.UI.createTableViewRow({
        width:'auto',
        height:'auto'
});
var tagLabel =Titanium.UI.createLabel({
        text:hashTag,
        width:'auto',
        height:'auto'
});
tagRow.add(tagLabel);        
data.push(tagRow);

//以下 for 文で tweetのコメントを 全部取得する
    for (var i=0;i<jsonData.results.length;i++){
        
        var row = Titanium.UI.createTableViewRow({
            width:'auto',
            height:'auto'
        });
        
            var tweet = jsonData.results[i];
            var tweetText = tweet.text;
           
            var commentLabel =Titanium.UI.createLabel({
                text:tweetText,
                width:'auto',
                height:'auto'
            });
        row.add(commentLabel);
        
        data.push(row);
        
    }//for{} の閉じ
    
    //ここで取得したコメントを表示させている
    tableview= Titanium.UI.createTableView({
        data:data
    });
    win.add(tableview);

};//xhr.onload = function(){} の閉じ
xhr.send();