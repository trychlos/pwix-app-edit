/*
 * pwix:app-edit/src/common/js/functions.js
 */

import { EnvSettings } from 'meteor/pwix:env-settings';

AppEdit.currentPage = function(){
    const currentPage = AppEdit.runContext.iAppPageableCurrent();
    return currentPage;
}

AppEdit.environmentWantSwitch = function(){
    const wantSwitch = EnvSettings.environmentSettings().wantEditionSwitch === true;
    return wantSwitch;
}
