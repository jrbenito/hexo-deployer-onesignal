'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');

module.exports = function(args) {

    args = args || {};
//    var baseDir = this.base_dir;
//    var deployDir = pathFn.join(baseDir, '.deploy_git');
//    var publicDir = this.public_dir;
//    var extendDirs = args.extend_dirs;
//    var ignoreHidden = args.ignore_hidden;
    var templatesDir = args.templates_dir || pathFn.join(__dirname,'../templates');
    var log = this.log;
//    var verbose = !args.silent;

    // test instrumentation
    if (!log.console) {
        log.console = console.log;
    }

	if (!args.app_auth_key && process.env.ONESIGNAL_APP_AUTH_KEY) {
		args.app_auth_key = process.env.ONESIGNAL_APP_AUTH_KEY;
	}

	if (!args.app_id && process.env.ONESIGNAL_APP_ID) {
		args.app_id = process.env.ONESIGNAL_APP_ID;
	}

//	if (!args.app_template_id && process.env.ONESIGNAL_APP_TEMPLATE_ID) {
//		args.app_template_id = process.env.ONESIGNAL_APP_TEMPLATE_ID;
//	}

    if (!args.app_template_file && process.env.ONESIGNAL_APP_TEMPLATE_FILE) {
		args.app_template_file = process.env.ONESIGNAL_APP_TEMPLATE_FILE;
	}
    else if (!args.app_template_file) {
        args.app_template_file = pathFn.join(templatesDir, "all-segments-default.json");
    }

	if (!args.app_auth_key || !args.app_id) {
		var help = '';

		help += 'You have to configure the deployment settings in _config.yml first!\n\n';
		help += 'Example:\n';
		help += '  deploy:\n';
		help += '    type: onesignal\n';
		help += '    app_id: <onesingal app uuid>\n';
		help += '    app_auth_key: <onesignal auth token>\n';
		help += '    app_template_file: <message template file, default will be used if not informed>\n\n';
		help += '[CAUTION] Do not version (git) your config file if app_auth_key is specified!\n';
		help += '          Alternativily do not define it in _config.yml but as enviroment\n';
		help += '          variable.\n\n';
		help += 'Example:\n';
		help += '$ export ONESGINAL_APP_AUTH_KEY="<onesignal auth token>"\n';

		log.console(help);
		return;
	}

    var exist = fs.existsSync(args.app_template_file);
    if(exist === false) {
        log.error('Template file not found: ',args.app_template_file);
        return new Error('Template file not found');
    }
    log.info('Using template:', args.app_template_file);


}
