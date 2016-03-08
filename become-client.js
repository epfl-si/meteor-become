var METEOR_LOGIN_TOKEN_KEY = "Meteor.loginToken",
    BECOME_LOGIN_TOKEN_KEY = "Become.origLoginToken",
    REAL_USER_KEY = "Become.realUser";

function saveToken() {
  Session.set(BECOME_LOGIN_TOKEN_KEY,
              Meteor._localStorage.getItem(METEOR_LOGIN_TOKEN_KEY));
}

function restoreToken() {
  Meteor._localStorage.setItem(METEOR_LOGIN_TOKEN_KEY,
                               Session.get(BECOME_LOGIN_TOKEN_KEY));
  Session.set(BECOME_LOGIN_TOKEN_KEY, undefined);
};

function defaultServerErrorHandler(error) {
  if (error instanceof Meteor.Error) {
    alert(error.message);
  } else {
    alert(error);
  }
}

Become.become = function(targetUserID, opt_callback) {
  var realUser = EJSON.clone(Meteor.user());
  saveToken();
  Accounts.callLoginMethod({
    methodArguments: [{become: targetUserID}],
    userCallback: function(result) {
      if (! result) {
        Session.set(REAL_USER_KEY, realUser);
      }
      if (opt_callback) {
        opt_callback(result);
      } else if (result instanceof Error) {
        defaultServerErrorHandler(result);
      }
    }
  });
}

/**
 * The user the client was originally logged in as. A reactive data source.
 */
Become.realUser = function() {
  return Session.get(REAL_USER_KEY);
};

/**
 * Log out of the account one has become, and back to the main identity.
 */
Become.restore = function() {
  Meteor.disconnect();
  Session.set(REAL_USER_KEY, undefined);
  restoreToken();
  Meteor.reconnect();
}
