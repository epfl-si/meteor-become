Meteor.startup(function() {
  Meteor.defer(function() {
    Accounts.registerLoginHandler("become", loginBecome);
  });
});

function loginBecome(options) {
  var targetUserId = options.become;
  if (! targetUserId) return undefined;
  check(targetUserId, String);

  if (! Meteor.users.findOne({_id: targetUserId}, {_id: true})) {
    return { error: new Meteor.Error("BECOME_UNKNOWN_USER") };
  }
  if (! Become.policy.allows(Meteor.userId(), targetUserId)) {
    return {error: new  Meteor.Error("BECOME_PERMISSION_DENIED") };
  }
  return {userId: targetUserId};
}
