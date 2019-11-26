import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { EJSON } from 'meteor/ejson'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { check } from 'meteor/check'

import debug_ from 'debug'
const debug = debug_('meteor-become')

const METEOR_LOGIN_TOKEN_KEY = "Meteor.loginToken",
      BECOME_LOGIN_TOKEN_KEY = "Become.origLoginToken",
      REAL_USER_KEY = "Become.realUser"

declare module "meteor/tracker" {
    module Tracker {
        function nonreactive<T> (func: () => T): T
    }
}

const Token = {
    get () : string | null {
        return window.localStorage.getItem(METEOR_LOGIN_TOKEN_KEY)
    },
    save: function(token: string | null) {
        Session.set(BECOME_LOGIN_TOKEN_KEY, token)
    },
    restore: function() {
        window.localStorage.setItem(METEOR_LOGIN_TOKEN_KEY,
                                    Session.get(BECOME_LOGIN_TOKEN_KEY))
        Session.set(BECOME_LOGIN_TOKEN_KEY, undefined)
    }
}

type PolicyFunction = (from: Meteor.User, to: Meteor.User) => boolean
let becomePolicy : PolicyFunction = (_from, _to) => false

export const Become = {
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
    async become (targetUserID: string) {
        var realUser = EJSON.clone(Meteor.user())
        var previousToken = Token.get()

        debug('become: calling server with ID %o', targetUserID)
        await new Promise(function (resolve, reject) {
            Accounts.callLoginMethod({
                methodArguments: [{become: targetUserID}],
                userCallback: function(error) {
                    debug('become: userCallback %o', error)
                    if (error) { reject(error) } else { resolve() }
                }
            })
        })

        Token.save(previousToken)
        Session.set(REAL_USER_KEY, realUser)
    },

    /**
     * The user the client was originally logged in as. A reactive data source.
     */
    realUser () {
        const origUser : Meteor.User = Session.get(REAL_USER_KEY)
        const currentUser = Meteor.user()

        if (origUser && currentUser && (origUser._id !== currentUser._id)) {
            return origUser
        }
    },

    /**
     * Log out of the account one has become, and back to the main identity.
     *
     * Initiate the process of disconnecting and reconnecting as the original
     * user. Has no effect if the client is not currently acting as another
     * user.
     *
     * Note: this method, like the underlying
     * [`Meteor.reconnect`](http://docs.meteor.com/#/full/meteor_reconnect)
     * method, doesn't signal completion via callback nor promise.
     * However, one can react to changes in `Meteor.userId` et al, or
     * set callbacks with
     * [`Accounts.onLogin`](http://docs.meteor.com/#/full/accounts_onlogin)
     * and
     * [`Accounts.onLoginFailure`](http://docs.meteor.com/#/full/accounts_onloginfailure)
     */
    restore () {
        if (! Tracker.nonreactive(() => Session.get(REAL_USER_KEY) )) {
            return  // Nothing to restore
        }

        Meteor.disconnect()
        Session.set(REAL_USER_KEY, undefined)
        Token.restore()
        Meteor.reconnect()
    },

    /**
     * Set the policy.
     *
     */
    policy (policy : PolicyFunction) {
        becomePolicy = policy
    }
}

if (Meteor.isServer) {
    Accounts.registerLoginHandler("become", function(options) {
        const toUserId = options.become
        if (! toUserId) return undefined

        const fromUser = Meteor.user()
        debug('Examining request %o on behalf of %o', options, fromUser)

        if (! fromUser) {
            debug("Cannot become another user if not logged in!")   // #changemymind
            return { error: new  Meteor.Error("BECOME_MUST_BE_LOGGED_IN") }
        }

        check(toUserId, String)

        const toUser = Meteor.users.findOne({_id: toUserId})
        if (! toUser) {
            debug("Unknown target user requested: %o", toUserId)
            return { error: new Meteor.Error("BECOME_UNKNOWN_USER") }
        }

        if (! becomePolicy(fromUser, toUser)) {
            debug("Policy declined %o becoming %o", fromUser, toUser)
            return {error: new  Meteor.Error("BECOME_PERMISSION_DENIED") }
        }

        return {userId: toUser._id}
    })
}
