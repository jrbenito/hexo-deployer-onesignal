# hexo-deploy-onesignal
[![npm version](https://img.shields.io/npm/v/hexo-deployer-onesignal.svg?style=flat-square)](https://www.npmjs.com/package/hexo-deployer-onesignal) [![npm dependencies](https://img.shields.io/david/jrbenito/hexo-deployer-onesignal.svg?style=flat-square)](https://david-dm.org/jrbenito/hexo-deployer-onesignal#info=dependencies&view=table) [![npm dev dependencies](https://img.shields.io/david/dev/jrbenito/hexo-deployer-onesignal.svg?style=flat-square)](https://david-dm.org/jrbenito/hexo-deployer-onesignal#info=devDependencies&view=table) [![npm download/month](https://img.shields.io/npm/dm/hexo-deployer-onesignal.svg?style=flat-square)](https://www.npmjs.com/package/hexo-deployer-onesignal) [![npm download total](https://img.shields.io/npm/dt/hexo-deployer-onesignal.svg?style=flat-square)](https://www.npmjs.com/package/hexo-deployer-onesignal) [![gitter chat](https://img.shields.io/gitter/room/jrbenito/hexo-deployer-onesignal.svg?style=flat-square)](https://gitter.im/jrbenito/hexo-deployer-onesignal)

Plugin to send notification through Onesignal.com once `hexo deploy` is called.

## Instalation

```
npm install --save hexo-deployer-onesignal
```

Now edit `_config.yml` and add this the `deploy:` section:

```
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy: 
   - type: onesignal
     app_id: abcdefab-ab34-1abc-c123456789ab
```

App_id is used to identify the app (as onesignal calls a notification site/mobile app) at onesignal.com, it is available at
__Keys & IDs__ tabs of "App Settings" menu. This UUID can be disclosed, it is no secret.

Onesignal also provides __REST API Key__ which this plugin uses to access API server. It is kind a password and may be kept
secret hence not recommended to keep it on `_config.yml` that is normally versioned on a public repository. But if site source
has no public repository, it is possible to add `app_auth_key: <REST API Key>` to the deploy section above. For those who keep
source on public repositories, an environment variable is the way to go:

`export ONESIGNAL_APP_AUTH_KEY=<REST API Key>`

Hexo will accept more than one deploy plugin, just add another `-type: ` section:

```
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
   - type: git
     repo: git@github.com:user/repo-name.git
     branch: gh-pages
   - type: onesignal
     app_id: abcdefab-ab34-1abc-c123456789ab
```

## Usage

The plugin is called by hexo when deploy option is used:

```
hexo deploy
INFO  Deploying: onesignal
INFO  Loading template /home/user/my-site/node_modules/hexo-deployer-onesignal/templates/all-segments-default.json
INFO  Deploy done: onesignal
INFO  Sending message
INFO  https response: { id: '89e1ba06-d9eb-4b83-b7f5-e46541825d8e', recipients: 2 }
```

Users subscribed to the site/app will receive notification. See Onesignal dashboard to analytics about subscribed users.

### Notice

Site visitors need a interface to subscribe/unsubscribe notifications for a given hexo site. [This guide](https://documentation.onesignal.com/v3.0/docs/web-push-setup) teachs how.

[Tranquilpeak](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak) theme for hexo has interface implemented at theme level. (not yet released at the time of this write, 
[PR #396](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/pull/396))
