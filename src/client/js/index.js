/*
 * pwix:app-edit/src/client/js/index.js
 */

import { CoreApp } from 'meteor/pwix:core-app';

import '../../common/js/index.js';

import { RunContext } from '../classes/run-context.class';

// provides base classes in AppEdit global object
CoreApp.RunContext = RunContext;

// our functions
import './DOM.js';
