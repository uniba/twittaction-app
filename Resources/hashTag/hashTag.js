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
Ti.include("../function/twitter_userline_func.js");
var win = Ti.UI.currentWindow;


function hashtag(hashTag){
    var hashTag = hashTag;
    var encodeHashTag = encodeURIComponent(hashTag); //encodeする必要がある
    var twitterUrl="http://search.twitter.com/search.json?q="+encodeHashTag+"&rpp=50&page=1";

UA_display_twitter_homeline(twitterUrl, 'hashtag');
}// function hashtag(hashTag){ の閉じ


if(Titanium.Network.online == false){
    recommend(win);
}else{
    hashtag("#twitt_dev_action"); //ここに検索したい単語を入力する。
}


/*---- 画面再読み込み------------------------------*/
function recommend(window){

    var l1 = Titanium.UI.createLabel({
            text:'インターネットに接続されていません。',
            width:200,
            height:150,
            top:10,
            color:'#336699',
            textAlign:'center'
    });

    window.add(l1);

    var b1 = Titanium.UI.createButton({
      title:'インターネットに接続したら、クリック。',
      height:40,
      width:300
    });

    b1.addEventListener('click',function(e){
                Ti.include('hashTag.js');
    });
    window.remove(b1);
    window.remove(l1);
    window.add(b1);

}
/*---- 画面再読み込み 終------------------------------*/