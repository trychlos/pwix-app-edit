/*
 * pwix:app-edit/src/common/js/functions.js
 */

import { EnvSettings } from 'meteor/pwix:env-settings';

AppEdit.currentPage = function(){
    const currentPage = AppEdit.runContext.iAppPageableCurrent();
    return currentPage;
}

AppEdit.environmentWantSwitch = async function(){
    return EnvSettings.environmentSettings()
        .then(( settings ) => {
            const wantSwitch = ( settings.wantEditionSwitch === true );
            return wantSwitch;
        });
}
