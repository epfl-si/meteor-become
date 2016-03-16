function becomePolicy() { throw new Meteor.Error("BECOME_PERMISSION_DENIED") }

/** @class Become */
Become = {
  policy: function(policy) {
    if (policy) {
      becomePolicy = policy;
    } else {
      return becomePolicy;
    }
  },
  options: {
    onServerError: undefined
  }
};

Become.policy.allows = function(fromUserId, toUserId) {
  return becomePolicy(fromUserId, toUserId);
};
