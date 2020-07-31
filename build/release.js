const builder = require('electron-builder');
const Platform = builder.Platform;

switch(process.platform)
{
	case 'darwin':
		{
			builder.build({
				config: {
					"icon": "build/icons/mac/icon.icns",
					'mac': {
						'target': 'dmg',
					},
				},
			});
		}
		break;

  case 'win32':
		{
			builder.build({
				targets: Platform.WINDOWS.createTarget(),
				config: {
					'win': {
						"icon": "build/icons/win/icon.ico",
						'target': {
							'target': 'nsis',
							'arch': [
								'x64',
							],
						},
					},
				},
			});      
		}
		break;

  default:
    {
      console.assert("Not Suport Platform !!");
    }
    break;
}


