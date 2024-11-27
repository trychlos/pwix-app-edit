/*
 * /imports/client/components/AppEditButton/AppEditButton.js
 *
 *  Display a toggle button when the user is allowed to edit the current page in an editable environment.
 * 
 *  This is a toggle button, which may be:
 *  - not visible at all (not allowed by the environment settings, or user not connected or not allowed)
 *  - off: user is allowed but didn't have chosen to edit, editor is in STANDARD mode
 *  - on: user is allowed and want edit, editor is in PREVIEW mode
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import './AppEditButton.html';

Template.AppEditButton.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether the environment wants an edition switch ?
        wantSwitch: new ReactiveVar( false ),
        // whether the user is allowed to edit the current page ?
        allowed: new ReactiveVar( false ),
        // whether to display the switch button ?
        displayed: new ReactiveVar( false ),
        // whether to enable the dismplayed switch ?
        enabled: new ReactiveVar( false )
    };

    // whether the environment wants an edition switch ?
    self.autorun(() => {
        self.PCK.wantSwitch.set( AppEdit.environmentWantSwitch());
    });

    // whether the user is allowed to edit the current page ?
    self.autorun( async () => {
        let allowed = false;
        if( Meteor.userId()){
            const page = AppEdit.currentPage();
            allowed = await page.editionAllowed();
        }
        self.PCK.allowed.set( allowed );
    });

    // whether to display the switch button ?
    self.autorun( async () => {
        let displayed = false;
        if( self.PCK.wantSwitch.get()){
            if( Meteor.userId()){
                const toggleHiddenWhenUnallowed = AppEdit.configure().toggleHiddenWhenUnallowed;
                displayed = self.PCK.allowed.get() ? true : !toggleHiddenWhenUnallowed;
            } else {
                const toggleHiddenWhenNotConnected = AppEdit.configure().toggleHiddenWhenNotConnected;
                displayed = !toggleHiddenWhenNotConnected;
            }
        }
        self.PCK.displayed.set( displayed );
    });

    // whether to enable the switch button when displayed ?
    self.autorun( async () => {
        const enabled = self.PCK.displayed.get() && Boolean( Meteor.userId()) && self.PCK.allowed.get();
        self.PCK.enabled.set( enabled );
    });
});

Template.AppEditButton.helpers({
    toggleParms(){
        return {
            labelLeft: pwixI18n.label( I18N, 'switch_label' ),
            title: pwixI18n.label( I18N, 'switch_title' ),
            name: 'AppEditButton',
            state: AppEdit.runContext.iAppEditableAsked(),
            enabled: Template.instance().PCK.enabled.get()
        }
    },

    wantSwitch(){
       const displayed = Template.instance().PCK.displayed.get();
       return displayed;
    }
});

Template.AppEditButton.events({
    'ts-state .AppEditButton'( event, instance, data ){
        AppEdit.runContext.iAppEditableAsked( data.state );
    }
});
