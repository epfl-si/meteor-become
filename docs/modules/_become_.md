[meteor-become](../README.md) › ["become"](_become_.md)

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
* [debug](_become_.md#const-debug)

### Functions

* [becomePolicy](_become_.md#let-becomepolicy)

### Object literals

* [Become](_become_.md#const-become)
* [Token](_become_.md#const-token)

## Type aliases

###  PolicyFunction

Ƭ **PolicyFunction**: *function*

*Defined in [become.ts:35](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L35)*

#### Type declaration:

▸ (`from`: User, `to`: User): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`from` | User |
`to` | User |

## Variables

### `Const` BECOME_LOGIN_TOKEN_KEY

• **BECOME_LOGIN_TOKEN_KEY**: *"Become.origLoginToken"* = "Become.origLoginToken"

*Defined in [become.ts:12](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L12)*

___

### `Const` METEOR_LOGIN_TOKEN_KEY

• **METEOR_LOGIN_TOKEN_KEY**: *"Meteor.loginToken"* = "Meteor.loginToken"

*Defined in [become.ts:11](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L11)*

___

### `Const` REAL_USER_KEY

• **REAL_USER_KEY**: *"Become.realUser"* = "Become.realUser"

*Defined in [become.ts:13](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L13)*

___

### `Const` debug

• **debug**: *Debugger* =  debug_('meteor-become')

*Defined in [become.ts:9](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L9)*

## Functions

### `Let` becomePolicy

▸ **becomePolicy**(`_from`: User, `_to`: User): *false*

*Defined in [become.ts:36](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`_from` | User |
`_to` | User |

**Returns:** *false*

## Object literals

### `Const` Become

### ▪ **Become**: *object*

*Defined in [become.ts:38](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L38)*

###  become

▸ **become**(`targetUserID`: string): *Promise‹void›*

*Defined in [become.ts:51](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L51)*

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

*Defined in [become.ts:108](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L108)*

Set the policy.

**Parameters:**

Name | Type |
------ | ------ |
`policy` | [PolicyFunction](_become_.md#policyfunction) |

**Returns:** *void*

###  realUser

▸ **realUser**(): *any*

*Defined in [become.ts:73](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L73)*

The user the client was originally logged in as. A reactive data source.

**Returns:** *any*

###  restore

▸ **restore**(): *void*

*Defined in [become.ts:93](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L93)*

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

*Defined in [become.ts:21](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L21)*

###  get

▸ **get**(): *string | null*

*Defined in [become.ts:22](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L22)*

**Returns:** *string | null*

###  restore

▸ **restore**(): *void*

*Defined in [become.ts:28](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L28)*

**Returns:** *void*

###  save

▸ **save**(`token`: string | null): *void*

*Defined in [become.ts:25](https://github.com/epfl-idevelop/meteor-become/blob/master/become.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string &#124; null |

**Returns:** *void*
