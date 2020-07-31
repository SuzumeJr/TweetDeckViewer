/// Windows用処理
'use strict';

const { Menu } = require('electron');

/// メニューの設定
exports.MenuSettings = function()
{
	// メニュー無効化
	Menu.setApplicationMenu(null);
}
