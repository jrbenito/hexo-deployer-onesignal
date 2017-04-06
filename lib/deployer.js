'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');
var https = require('https');

module.exports = function(args) {

    args = args || {};
//    var baseDir = this.base_dir;
//    var deployDir = pathFn.join(baseDir, '.deploy_git');
//    var publicDir = this.public_dir;
//    var extendDirs = args.extend_dirs;
//    var ignoreHidden = args.ignore_hidden;
    args.verbose = !args.silent;
	args.log = this.log;
    var log = args.log;
    var templatesDir = args.app_templates_dir || pathFn.join(__dirname,'../templates');

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

    if (!args.app_template_file) {
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
    log.info('Loading template', args.app_template_file);

    fs.readFile(args.app_template_file).then( function (data) {

        var message = JSON.parse(data);
        var delay = new Date();
        message.app_id = args.app_id;

        if (args.app_send_delay && (parseInt(args.app_send_delay,10) > 0)) {
            delay.setMinutes(delay.getMinutes()+args.app_send_delay);
        }
        message.send_after = delay.toUTCString();

        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic "+args.app_auth_key
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        if (args.verbose) {
            log.info("Sending message");
        }

        var req = https.request(options, function(res) {
            res.on('data', function(data) {
                if (args.verbose) {
                    log.info("https response:", JSON.parse(data));
                }
            });
        });

        req.on('error', function(e) {
            log.error("https error", e);
        });

        req.write(JSON.stringify(message));
        req.end();
    }); 

}
