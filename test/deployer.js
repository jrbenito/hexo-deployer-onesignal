'use strict';

var expect = require('chai').expect; // eslint-disable-line
var pathFn = require('path');
//var util = require('hexo-util');
//var fs = require('hexo-fs');
//var spawn = util.spawn;

describe('deployer', function() {
	var baseDir = pathFn.join(__dirname, 'deployer_test');
	var publicDir = pathFn.join(baseDir, 'public');

    var ctx = {
        log: {
            buffer: '',
        }
    };

    ctx.logger = function() {
        for (var i = 0; i < arguments.length; i++) {
            if (i > 0) {
                ctx.log.buffer += ' ';
            }
            ctx.log.buffer += arguments[i];
        }
    }

	ctx.base_dir = baseDir;
    ctx.public_dir = publicDir;
    ctx.log.info = ctx.logger;
    ctx.log.console = ctx.logger;
    ctx.log.error = ctx.logger;


	var config_example = {};

	var deployer = require('../lib/deployer').bind(ctx);

    beforeEach(function () {
        ctx.log.buffer = '';
        config_example = {
            app_id: "UUID app ID",
            app_auth_key: "Token app",
        };
    });

	it('should warning about no configuration', function() {

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

        deployer();
        expect(ctx.log.buffer).to.be.a('string')
          .and.equal(help);
    });

    it('must return Error if no template file found', function() {
        config_example.app_template_file = 'not-exist.txt';
        
        expect(deployer(config_example)).to.be.an.instanceOf(Error);
        expect(ctx.log.buffer).to.be.a('string')
          .and.have.string('Template file not found: ');
    });

    it('must find default template', function() {
        deployer(config_example);
        expect(ctx.log.buffer).to.be.a('string')
          .and.have.string('');
    })

});
