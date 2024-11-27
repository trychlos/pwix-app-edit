/*
 * pwix:app-edit/src/common/classes/display-unit.class.js
 *
 * Extend the AppPages.DisplayUnit class to handle the parameters:
 * - wantEditionSwitch: true|false
 */

import _ from 'lodash';

import { AppPages } from 'meteor/pwix:app-pages';

export class DisplayUnit extends AppPages.DisplayUnit {

    // static data

    // static methods

    // private data

    // private methods

    // public data

    /**
     * Constructor
     * @locus Anywhere
     * @param {String} name the unit name
     * @param {Object} def the unit definition as a javascript object
     * @returns {DisplayUnit} this instance
     */
    constructor( name, def ){
        super( ...arguments );

        this._checkBoolean( def, 'wantEditionSwitch', false );

        return this;
    }

    /**
     * @returns {Boolean} whether edition is allowed to the user for the page
     *  Reactive method
     */
    async editionAllowed(){
        const allowFn = AppEdit.configure().allowFn;
        const allowed = allowFn ? await allowFn( 'pwix.app_edit.feat.editable', undefined, this ) : false;
        return allowed;
    }
}

// replace the AppPages DisplayUnit class with our extended one
AppPages.DisplayUnit = DisplayUnit;
