/*
 * /imports/client/components/AppEditButton/AppEditButton.js
 *
 *  Display a toggle button when the user is allowed to edit the current page in an editable environment.
 * 
 *  This is a toggle button, which may be:
 *  - not visible at all (user not connected or not allowed)
 *  - off: user is allowed but didn't have chosen to edit, editor is in STANDARD mode
 *  - on: user is allowed and want edit, editor is in PREVIEW mode
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import './AppEditButton.html';

Template.AppEditButton.onCreated( function(){
    const self = this;

    self.PCK = {
        displayed: new ReactiveVar( false ),
        enabled: new ReactiveVar( false )
    };
});

Template.AppEditButton.onRendered( function(){
    const self = this;

    // hide or show the button depending of the page, the user, the environment (this is up to the application)
    self.autorun(() => {
        if( Meteor.userId()){
            const toggleHiddenWhenUnallowed = AppEdit.configure().toggleHiddenWhenUnallowed;
            AppEdit.runContext.iAppEditableAllowed().then(( allowed ) => {
                if( allowed ){
                    self.PCK.displayed.set( true );
                    self.PCK.enabled.set( true );
                } else {
                    self.PCK.displayed.set( !toggleHiddenWhenUnallowed );
                    self.PCK.enabled.set( false );
                }
            });
        } else {
            const toggleHiddenWhenNotConnected = AppEdit.configure().toggleHiddenWhenNotConnected;
            self.PCK.displayed.set( !toggleHiddenWhenNotConnected );
            self.PCK.enabled.set( false );
        }
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
       //console.debug( 'wantSwitch', displayed );
       return displayed;
    }
});

Template.AppEditButton.events({
    'ts-state .AppEditButton'( event, instance, data ){
        AppEdit.runContext.iAppEditableAsked( data.state );
    }
});
