/*
 * pwix:app-edit/src/client/interfaces/iapp-editable.iface.js
 *
 * An interface which extends the application RunContext with the management of inline documents.
 * 
 * See also https://github.com/justinfagnani/mixwith.js
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { ReactiveVar } from 'meteor/reactive-var';

export const IAppEditable = DeclareMixin(( superclass ) => class extends superclass {

    #editionAsked = new ReactiveVar( false );

    constructor(){
        super( ...arguments );
        const self = this;

        // an autorun tracker reset the editionAsked reactive var each time the user logs out
        Tracker.autorun(() => {
            if( !Meteor.userId()){
                self.ieditableAsked( false );
            }
        });

        // keep this instance at the package level (hoping there is only one)
        AppEdit.runContext = this;

        return this;
    } 

    /**
     * @returns {Boolean} whether edition is allowed to the user for the page
     *  Reactive method
     */
    async ieditableAllowed(){
        const allowFn = AppEdit.configure().allowFn;
        const allowed = allowFn ? await allowFn( 'pwix.app_edit.feat.editable' ) : false;
        return allowed;
    }

    /**
     * Getter/Setter
     * @summary
     * @param {Boolean} b the optional 'asked' status, i.e. whether the used has asked for editing the current page
     * @returns {Boolean} the current asked edition status
     */
    ieditableAsked( b ){
        if( b === true || b === false ){
            this.#editionAsked.set( b );
        }
        return this.#editionAsked.get();
    }
});
