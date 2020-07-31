'use strict';

const { app, BrowserWindow, shell } = require('electron');
const Store = require('electron-store');
let config = new Store();
let mainWindow = null;

// OS毎に異なる処理のLiblaryを読み込み
let PfLib = null; 
if (process.platform === 'darwin')
{
	// macOS用処理関数ライブラリ読込
	PfLib = require('./index_mac.js');
}
else
{
	// Windows用処理関数ライブラリ読込
	PfLib = require('./index_win.js');
}

// メインウインド生成
function createWindow()
{
	// メインウインド生成
	mainWindow = new BrowserWindow({
		width: config.get('window.width', 800),
		height: config.get('window.height', 400),
		x: config.get('window.left', 0),
		y: config.get('window.top', 0),		
		alwaysOnTop: true,
		webPreferences: {
			enableRemoteModule: false,
			sandbox: true,
		}
	});
	
	// メニュー設定
	PfLib.MenuSettings();

	// 外部ウインドオープンイベント設定
	mainWindow.webContents.on('new-window', function (event, url)
	{
		//イベント前情報をデフォルトに
		event.preventDefault();

		//プロトコルチェック
		const protocol = require('url').parse(url).protocol;
	    if(protocol === 'http:' || protocol === 'https:')
	    {
			//リンクを外部アプリで開く
			shell.openExternal(url);
	    }
	});
	
	// メインウインドウが閉じられる前の処理
	mainWindow.on('close', function() {
		// ウインドの位置とサイズを保存
		let bounds = mainWindow.getNormalBounds();
		config.set('window.height', bounds.height);
		config.set('window.width', bounds.width);	  
		config.set('window.left', bounds.x);
		config.set('window.top', bounds.y);	  
	});
	
	// ウインドが閉じられる時のイベント処理
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	// メインウィンドウにtweetdeckを表示
	mainWindow.loadURL('https://tweetdeck.com/');
	
	// 開発ツールを有効化
	// mainWindow.webContents.openDevTools();
}

//全てのウインドが閉じられた場合
app.on('window-all-closed', function (){
	app.quit();
});

app.enableSandbox();
app.whenReady().then(createWindow);
