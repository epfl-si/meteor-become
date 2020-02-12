Allow a user of a Meteor application to act as another one.

# Example

```
import { Become } from 'meteor-become'

Become.policy(function(fromUser, toUser) {
    return toUser.username.indexOf("quatrava") >= 0
});

if (Meteor.isClient) {
    Template.MyBecomeUserForm.events({
        "submit": function(event, target) {
            Become.become(anotherUserID);
            event.stopPropagation();
        }
    });
}
```


# How It Works

1. Client code calls `Become.become()`
2. `Become.become()` saves the current session token and calls the Meteor login function
2. Server checks policy function (set with `Become.policy`) and returns success or error to client
3. Upon success, Meteor.userId() etc. get updated on the client as is normal upon Meteor login
4. Client may now call `Become.restore()` to restore the previous session token and reconnect

# Dependencies

**This code only works if called from a Meteor application.**
Furthermore, the following Meteor core packages are required (add them
with `meteor add` if needed):

- `promise`
- `session`
- `tracker`

# API Reference

Start with [the Become object](https://github.com/epfl-si/meteor-become/blob/rewrite/as-npm-package/docs/modules/_become_.md#const-become) (available on client and server)
