Package.describe({
  name: 'epfl:become',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Allow a user of a Meteor application to act as another one',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/epfl-sti/meteor-become',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('ejson');
  api.use('accounts-base');
  api.use('underscore');
  api.use('session');
  api.use('check');
  api.addFiles('become-common.js');
  api.addFiles('become-client.js', ['client']);
  api.addFiles('become-server.js', ['server']);
  api.export("Become");
});

