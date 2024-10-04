Package.describe({
    name: 'pwix:app-edit',
    version: '1.0.2-rc',
    summary: 'Extends a Meteor RunContext to let an application have editable inline documents',
    git: 'https://github.com/trychlos/pwix-app-edit.git',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'AppEdit'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:app-edit' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    api.use( 'check' );
    api.use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.use( 'pwix:core-app@1.0.0' );
    api.use( 'pwix:editor@1.4.0' );
    api.use( 'pwix:i18n@1.5.0' );
    api.use( 'pwix:toggle-switch@0.3.0' );
    api.use( 'pwix:ui-layout@2.0.0' );
    api.use( 'reactive-var' );
    api.use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    api.use( 'tracker' );
    api.addFiles( 'src/client/components/AppEditButton/AppEditButton.js', 'client' );
    api.addFiles( 'src/client/components/AppEditSerializer/AppEditSerializer.js', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
