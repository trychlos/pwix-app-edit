/*
 * pwix:app-edit/src/common/js/constants.js
 */

AppEdit.C = {
    // verbosity levels
    Verbose: {
        NONE: 0,
        CONFIGURE:      0x01 <<  0,
        FUNCTIONS:      0x01 <<  1,
        PAGE:           0x01 <<  2, // a synonym for DISPLAY_UNIT
        DISPLAY_UNIT:   0x01 <<  2
    }
};

// non exported variables

I18N = 'pwix:app-edit:i18n:namespace';