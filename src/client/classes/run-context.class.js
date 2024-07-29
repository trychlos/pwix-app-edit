/*
 * pwix:app-edit/src/client/classes/run-context.class.js
 */

import _ from 'lodash';
import mix from '@vestergaard-company/js-mixin';

import { CoreApp } from 'meteor/pwix:core-app';

import { IAppEditable } from '../interfaces/iapp-editable.iface.js';

export class RunContext extends mix( CoreApp.RunContext ).with( IAppEditable ){

    // static data

    // static methods

    // private data

    // private methods

    // public data

    /**
     * Constructor
     * @returns {RunContext} this instance
     */
    constructor(){
        super( ...arguments );
        return this;
    }
}
