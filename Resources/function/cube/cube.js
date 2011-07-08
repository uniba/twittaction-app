var win = Ti.UI.currentWindow;
alert('assas');
var webview = Ti.UI.createWebView({
    url:"http://www.google.co.jp/"
});

win.add(webview);
win.open();
