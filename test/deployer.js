'use strict';

var expect = require('chai').expect; // eslint-disable-line
var pathFn = require('path');
var util = require('hexo-util');
var fs = require('hexo-fs');
var spawn = util.spawn;

describe('deployer', function() {
	var baseDir = pathFn.join(__dirname, 'deployer_test');
	var publicDir = pathFn.join(baseDir, 'public');

	var ctx = {
		base_dir: baseDir,
		public_dir: publicDir,
		log: {
			info: function() {},
            console: function(args) {
                ctx.log.buffer = args;
                return ;
            }
		}
	};

	var deployer = require('../lib/deployer').bind(ctx);


/*	after(function() {
		return fs.rmdir(baseDir);
	});

	function validate(branch) {
		branch = branch || 'master';

		// Clone the remote repo
		return spawn('git', ['clone', fakeRemote, validateDir, '--branch', branch]).then(function() {
			// Check the branch name
			return fs.readFile(pathFn.join(validateDir, '.git', 'HEAD'));
		}).then(function(content) {
			content.trim().should.eql('ref: refs/heads/' + branch);

			// Check files
			return fs.readFile(pathFn.join(validateDir, 'foo.txt'));
		}).then(function(content) {
			content.should.eql('foo');
		});
	}
*/
	it('should warning about no configuration', function() {

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

        deployer()
        expect(ctx.log.buffer).to.be.a('string');
        expect(ctx.log.buffer).to.equal(help);
    });

});
