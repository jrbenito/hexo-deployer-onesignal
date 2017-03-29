/* global hexo */
'use strict';

hexo.extend.deployer.register('onesignal', require('./lib/deployer'));
