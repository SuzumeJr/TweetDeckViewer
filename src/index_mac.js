
'use strict';

const { app, Menu } = require('electron');

/// メニューの設定
exports.MenuSettings = function()
{
    // アプリケーションメニュー設定
    var menu = Menu.buildFromTemplate([
        {
            label: 'Sample',
            submenu: [
                {label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); }}
            ]
        },
    ]);

    Menu.setApplicationMenu(menu);
}
