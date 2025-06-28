/*
 * pwix:app-edit/src/common/classes/run-context.class.js
 */

import _ from 'lodash';
import mix from '@vestergaard-company/js-mixin';

import { AppPages } from 'meteor/pwix:app-pages';

import { IAppEditable } from '../interfaces/iapp-editable.iface.js';

export class RunContext extends mix( AppPages.RunContext ).with( IAppEditable ){

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

// replace the AppPages RunContext class with our extended one
AppPages.RunContext = RunContext;
