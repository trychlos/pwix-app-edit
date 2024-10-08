/*
 * pwix:app-edit/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
AppEdit._conf = new ReactiveVar( _conf );

AppEdit._defaults = {
    allowFn: null,
    collection: 'contents',
    toggleHiddenWhenNotConnected: true,
    toggleHiddenWhenUnallowed: true,
    verbosity: AppEdit.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
AppEdit.configure = function( o ){
    if( o && _.isObject( o )){
        _conf = _.merge( AppEdit._defaults, _conf, o );
        AppEdit._conf.set( _conf );
        // be verbose if asked for
        if( _conf.verbosity & AppEdit.C.Verbose.CONFIGURE ){
            //console.log( 'pwix:app-edit configure() with', o, 'building', AppEdit._conf );
            console.log( 'pwix:app-edit configure() with', o );
        }
    }
    // also acts as a getter
    return AppEdit._conf.get();
}

_conf = _.merge( {}, AppEdit._defaults );
AppEdit._conf.set( _conf );
