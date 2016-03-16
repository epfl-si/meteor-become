var METEOR_LOGIN_TOKEN_KEY = "Meteor.loginToken",
    BECOME_LOGIN_TOKEN_KEY = "Become.origLoginToken",
    REAL_USER_KEY = "Become.realUser";

function defaultServerErrorHandler(error) {
  if (error instanceof Meteor.Error) {
    alert(error.message);
  } else {
    alert(error);
  }
}

var Token = {
  get: function() {
    return Meteor._localStorage.getItem(METEOR_LOGIN_TOKEN_KEY);
  },
  save: function(token) {
    Session.set(BECOME_LOGIN_TOKEN_KEY, token);
  },
  restore: function() {
    Meteor._localStorage.setItem(METEOR_LOGIN_TOKEN_KEY,
      Session.get(BECOME_LOGIN_TOKEN_KEY));
    Session.set(BECOME_LOGIN_TOKEN_KEY, undefined);
  }
};

/**
 * Become another user.
 *
 * Invoke the login method on the server with the "become" optional argument
 * set to targetUserID. Upon success, update all relevant state.
 *
 * @locus Client
 * @param targetUserID The ID of the target user in Meteor.users
 * @param opt_callback Called with no arguments upon success, or with an
 *                     exception upon error. If no callback is specified, the
 *                     default behavior is to display any errors with alert().
 */
Become.become = function(targetUserID, opt_callback) {
  var realUser = EJSON.clone(Meteor.user());
  var previousToken = Token.get();
  Accounts.callLoginMethod({
    methodArguments: [{become: targetUserID}],
    userCallback: function(result) {
      if (! result) {
        Token.save(previousToken);
        Session.set(REAL_USER_KEY, realUser);
      }
      if (opt_callback) {
        opt_callback(result);
      } else if (result instanceof Error) {
        defaultServerErrorHandler(result);
      }
    }
  });
};

/**
 * The user the client was originally logged in as. A reactive data source.
 */
Become.realUser = function() {
  return Session.get(REAL_USER_KEY);
};

/**
 * Log out of the account one has become, and back to the main identity.
 *
 * Initiate the process of disconnecting and reconnecting as the original
 * user. Has no effect if the client is not currently acting as another
 * user.
 *
 * Note: this method, like the underlying
 * [`Meteor.reconnect`](http://docs.meteor.com/#/full/meteor_reconnect)
 * method, doesn't take a callback. However, one can react to changes in
 * `Meteor.userId` et al, or set callbacks with
 * [`Accounts.onLogin`](http://docs.meteor.com/#/full/accounts_onlogin)
 * and
 * [`Accounts.onLoginFailure`](http://docs.meteor.com/#/full/accounts_onloginfailure)
 */
Become.restore = function() {
  if (! Tracker.nonreactive(function() { return Session.get(REAL_USER_KEY) })) {
    return;  // Nothing to restore
  }
  Meteor.disconnect();
  Session.set(REAL_USER_KEY, undefined);
  Token.restore();
  Meteor.reconnect();
};

/**
@external TransformStream
@see https://nodejs.org/api/stream.html#stream_class_stream_transform
*/
