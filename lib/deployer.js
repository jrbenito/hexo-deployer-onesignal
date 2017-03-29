'use strict';


module.exports = function(args) {

    args = args || '';
    var log = this.log;
    var verbose = !args.silent;

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

	if (!args.app_template_id && process.env.ONESIGNAL_APP_TEMPLATE_ID) {
		args.app_template_id = process.env.ONESIGNAL_APP_TEMPLATE_ID;
	}

	if (!args.app_auth_key || !args.app_id || !args.app_template_id) {
		var help = '';

		help += 'You have to configure the deployment settings in _config.yml first!\n\n';
		help += 'Example:\n';
		help += '  deploy:\n';
		help += '    type: onesignal\n';
		help += '    app_id: <onesingal app uuid>\n';
		help += '    app_auth_key: <onesignal auth token>\n';
		help += '    app_template_id: <message template id>\n\n';
		help += '[CAUTION] Do not version (git) your config file if app_auth_key is specified!\n';
		help += '          Alternativily do not define it in _config.yml but as enviroment\n';
		help += '          variable.\n\n';
		help += 'Example:\n';
		help += '$ export ONESGINAL_APP_AUTH_KEY="<onesignal auth token>"\n';

		log.console(help);
		return;
	}
}
