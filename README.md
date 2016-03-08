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

+ `Become.become()` is called from the client.
