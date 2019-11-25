[meteor-become](../README.md) › [Globals](../globals.md) › ["become"](_become_.md)

# External module: "become"

## Index

### Modules

* ["meteor/tracker"](_become_._meteor_tracker_.md)

### Type aliases

* [PolicyFunction](_become_.md#policyfunction)

### Variables

* [BECOME_LOGIN_TOKEN_KEY](_become_.md#const-become_login_token_key)
* [METEOR_LOGIN_TOKEN_KEY](_become_.md#const-meteor_login_token_key)
* [REAL_USER_KEY](_become_.md#const-real_user_key)

### Functions

* [becomePolicy](_become_.md#let-becomepolicy)

### Object literals

* [Become](_become_.md#const-become)
* [Token](_become_.md#const-token)

## Type aliases

###  PolicyFunction

Ƭ **PolicyFunction**: *function*

*Defined in [become.ts:32](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L32)*

#### Type declaration:

▸ (`fromId`: string, `toId`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`fromId` | string |
`toId` | string |

## Variables

### `Const` BECOME_LOGIN_TOKEN_KEY

• **BECOME_LOGIN_TOKEN_KEY**: *"Become.origLoginToken"* = "Become.origLoginToken"

*Defined in [become.ts:9](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L9)*

___

### `Const` METEOR_LOGIN_TOKEN_KEY

• **METEOR_LOGIN_TOKEN_KEY**: *"Meteor.loginToken"* = "Meteor.loginToken"

*Defined in [become.ts:8](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L8)*

___

### `Const` REAL_USER_KEY

• **REAL_USER_KEY**: *"Become.realUser"* = "Become.realUser"

*Defined in [become.ts:10](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L10)*

## Functions

### `Let` becomePolicy

▸ **becomePolicy**(`_fromId`: string, `_toId`: string): *false*

*Defined in [become.ts:33](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`_fromId` | string |
`_toId` | string |

**Returns:** *false*

## Object literals

### `Const` Become

### ▪ **Become**: *object*

*Defined in [become.ts:35](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L35)*

###  become

▸ **become**(`targetUserID`: string): *Promise‹void›*

*Defined in [become.ts:48](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L48)*

Become another user.

Invoke the login method on the server with the "become" optional argument
set to targetUserID. Upon success, update all relevant state.

**`locus`** Client

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`targetUserID` | string | The ID of the target user in Meteor.users |

**Returns:** *Promise‹void›*

###  policy

▸ **policy**(`policy`: [PolicyFunction](_become_.md#policyfunction)): *void*

*Defined in [become.ts:103](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L103)*

Set the policy.

**Parameters:**

Name | Type |
------ | ------ |
`policy` | [PolicyFunction](_become_.md#policyfunction) |

**Returns:** *void*

###  realUser

▸ **realUser**(): *any*

*Defined in [become.ts:68](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L68)*

The user the client was originally logged in as. A reactive data source.

**Returns:** *any*

###  restore

▸ **restore**(): *void*

*Defined in [become.ts:88](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L88)*

Log out of the account one has become, and back to the main identity.

Initiate the process of disconnecting and reconnecting as the original
user. Has no effect if the client is not currently acting as another
user.

Note: this method, like the underlying
[`Meteor.reconnect`](http://docs.meteor.com/#/full/meteor_reconnect)
method, doesn't signal completion via callback nor promise.
However, one can react to changes in `Meteor.userId` et al, or
set callbacks with
[`Accounts.onLogin`](http://docs.meteor.com/#/full/accounts_onlogin)
and
[`Accounts.onLoginFailure`](http://docs.meteor.com/#/full/accounts_onloginfailure)

**Returns:** *void*

___

### `Const` Token

### ▪ **Token**: *object*

*Defined in [become.ts:18](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L18)*

###  get

▸ **get**(): *string | null*

*Defined in [become.ts:19](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L19)*

**Returns:** *string | null*

###  restore

▸ **restore**(): *void*

*Defined in [become.ts:25](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L25)*

**Returns:** *void*

###  save

▸ **save**(`token`: string | null): *void*

*Defined in [become.ts:22](https://github.com/epfl-idevelop/meteor-become/blob/rewrite/as-npm-package/become.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string &#124; null |

**Returns:** *void*
