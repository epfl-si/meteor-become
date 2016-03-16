Allow a user of a Meteor application to act as another one.

# Example

```
Become.policy(function(fromUserID, toUserID) {
    return Meteor.user.findOne({id: fromUserID}).isSuperUser;
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

# API Reference

<a name="Become"></a>

## Become
**Kind**: global class  

* [Become](#Become)
    * [.become(targetUserID, opt_callback)](#Become.become)
    * [.realUser()](#Become.realUser)
    * [.restore()](#Become.restore)

<a name="Become.become"></a>

### Become.become(targetUserID, opt_callback)
Become another user.

Invoke the login method on the server with the "become" optional argument
set to targetUserID. Upon success, update all relevant state.

**Kind**: static method of <code>[Become](#Become)</code>  
**Locus**: Client  

| Param | Description |
| --- | --- |
| targetUserID | The ID of the target user in Meteor.users |
| opt_callback | Called with no arguments upon success, or with an                     exception upon error. If no callback is specified, the                     default behavior is to display any errors with alert(). |

<a name="Become.realUser"></a>

### Become.realUser()
The user the client was originally logged in as. A reactive data source.

**Kind**: static method of <code>[Become](#Become)</code>  
<a name="Become.restore"></a>

### Become.restore()
Log out of the account one has become, and back to the main identity.

Initiate the process of disconnecting and reconnecting as the original
user. Has no effect if the client is not currently acting as another
user.

Note: this method, like the underlying
[`Meteor.reconnect`](http://docs.meteor.com/#/full/meteor_reconnect)
method, doesn't take a callback. However, one can react to changes in
`Meteor.userId` et al, or set callbacks with
[`Accounts.onLogin`](http://docs.meteor.com/#/full/accounts_onlogin)
and
[`Accounts.onLoginFailure`](http://docs.meteor.com/#/full/accounts_onloginfailure)

**Kind**: static method of <code>[Become](#Become)</code>  
