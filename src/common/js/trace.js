/*
 * pwix:app-edit/src/common/js/trace.js
 */

_verbose = function( level ){
    if( AppEdit.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( ...args );
    }
};

_trace = function( functionName ){
    _verbose( AppEdit.C.Verbose.FUNCTIONS, ...arguments );
};
