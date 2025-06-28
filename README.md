# pwix:app-edit

## What is it ?

A package which helps an application to manage inline editable documents. It relies on `pwix:core-app` and extends the `CoreApp.RunContext` class with a `IAppEditable` interface.

## Features

When an application manages inline editable documents, following features are managed:

- a switch button is available and let the user edit the document; this button may be hidden or disabled, on or off

- a Blaze component is available and let the user visually edit the document

- a storage collection is used to record the document depending of the chosen language.

## How does this work ?

At the environment level, the `wantEditionSwitch` parameter must be set to `true` to activate the features (for the application in this environment). When `false`, which is the default, the edition switch is NOT displayed.

A `wantEditionSwitch` must be set to `true` in each display unit which wants take advantage of this feature. This is only considered if the eponym environment settings is itself set to `true`. When the display unit property is `false`, which is the default, the edition switch can be hidden, or shown and disabled, depending of the relevant configuration parameter.

When both switches are `true` (for the application's page in the current environment), the user must be allowed to edit this particular page. This is the function of the configured `allowFn()` function. When the user is not allowed, the edition switch can be hidden, or shown and disabled, depending of the relevant configuration parameter.

The `pwix:app-edit` package extends the `AppPages.DisplayUnit` class to add and manage the `wantEditionSwitch` property.

## Provides

### `AppEdit`

The exported `AppEdit` global object provides following items:

#### Functions

##### `AppEdit.currentPage()`

A shortcut to the `CoreAPP.IAppPageable.iAppPageableCurrent()` method.

##### `AppEdit.environmentWantSwitch()`

Whether the environment settings have defined a `wantEditionSwitch` to `true`, defaulting to `false`.

#### Interfaces

##### `AppEdit.IAppEditable`

The definition of the interface added to the `CoreApp.RunContext` class.

#### Functions

##### `AppEdit.configure()`

See [below](#configuration).

A reactive data source.

##### `AppEdit.i18n.namespace()`

Returns the i18n namespace used by the package. Used to add translations at runtime.

### Interfaces

The `pwix:app-edit` package extends the `CoreApp.RunContext` class with the `IAppEditable` interface providing folllowing methods:

- `iAppEditableAsked( [ask<Boolean>] ): Boolean`

    A getter/setter which says if the user has asked for editing the current document.

### Blaze components

#### `AppEditButton`

Displays (or not) a toggle button to let the user enter in edition mode on the current page.

The component is configurable through the package configuration as this is considered as an application-level component.

#### `AppEditSerializer`

Encapsulates the `pwix:editor/teEditor` component to manage serialization and multi-languages documents.

The component must be provided with the same parameters than `teEditor`.

## Permissions management

This package can take advantage of `pwix:permissions` package to manage the user permissions through the configured `allowFn()` function.

## Configuration

The package's behavior can be configured through a call to the `AppEdit.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `allowFn`

    An async function which will be called with an action string identifier, and must return whether the current user is allowed to do the specified action.

    If the function is not provided, then the default is to deny all editions.

    `allowFn` prototype is: `async allowFn( action<String>, user<String|Object>, page<DisplayUnit> ): Boolean`

- `collection`

    The name of the documents collection(s), defaulting to `contents`.

- `toggleHiddenWhenNotConnected`

    Whether the toggle button must be shown and disabled when user is not connected, or hidden.

    Defaults to `true`: button is hidden.

- `toggleHiddenWhenUnallowed`

    Whether the toggle button must be shown and disabled when user is connected but not allowed, or hidden.

    Defaults to `true`: button is hidden.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `AppEdit.C.Verbose.NONE`

        Do not display any trace log to the console

    - `AppEdit.C.Verbose.CONFIGURE`

        Trace `AppEdit.configure()` calls and their result

Please note that `AppEdit.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `AppEdit.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.0.0:

```js
    'lodash': '^4.17.0',
    '@vestergaard-company/js-mixin': '^1.0.3'
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

New and updated translations are willingly accepted, and more than welcome. Just be kind enough to submit a PR on the [Github repository](https://github.com/trychlos/pwix-app-edit/pulls).

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-app-edit/issues).

---
P. Wieser
- Last updated on 2024, Oct. 4th
