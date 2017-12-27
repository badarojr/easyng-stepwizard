# easy-step-wizard.js

Easy Step-Wizard for [AngularJS](https://angularjs.org/)

# Get Started

This version requires AngularJS 1.x version.

### Instalation

Download or clone the repository, then copy the files from `dist/` to your project directory.

Add the sources to your code after adding the dependencies for AngularJS:

```html
<script src="../path-to-your-libs/path-to-angular/angular.min.js"></script>
<script src="../path-to-your-libs/path-to-easyng-step-wizard/dist/easy-step-wizard.min.js"></script>
```

Don't forget to add the CSS link:

```html
<link href="../path-to-your-libs/path-to-easyng-step-wizard/dist/easy-step-wizard.css" rel="stylesheet">
```

# Using the wizard (sounds magic, right?)

There are only two directives, both used as elements: `easy-step-wizard` and `easy-step`.

`easy-step-wizard` options:
- `next-if`: Global condition to enable the 'Next' button.
- `text-next`: Global text for the button. Default `Next`.
- `class-next`: Sets the classes for the button on all steps. E.g.: ``` class-next="btn btn-primary" ```.
- `previous-if`: Global condition for moving backwards. Default `true`.
- `text-previous`: Global text for the button. Default `Back`.
- `class-previous`: Sets the classes for the button. E.g.:  ``` class-previous="btn btn-primary" ```.
- `selector`: Object to control the actions of the step selector. Must be initialized empty. 

`easy-step` options:
- `header`: The header to your step.
- `description`: The description to your step.
- `on-next`: Execute an action when the 'Next' button is clicked.
- `next-if`: Condition for moving forward. Default `true`.
- `text-next`: Text for the button. Default `Next`.
- `class-next`: Sets the classes for the button. E.g.: ``` class-next="btn btn-primary" ```.
- `on-previous`: Execute an action when the 'Back' button is clicked.
- `previous-if`: Condition for moving backwards. Default `true`.
- `text-previous`: Text for the button. Default `Back`.
- `class-previous`: Sets the classes for the button. E.g.: ``` class-previous="btn btn-primary" ```.

### Using the selector

There are 3 methods available: `select`, `next` and `previous`.
- `select(<step>)`: Selects a specific step.
- `next()`: Go to the next step.
- `previous()`: Go to the previous step.

E.g.:

	Controller:

	$scope.mySelector = {};

	HTML:

	<easy-step-wizard selector="mySelector">...</easy-step-wizard>

# Example

There is an example folder in the project showing how to use the step-wizard.

# Author

Roberto L. Badaró Jr.

# License

easy-step-wizard.js is copyright 2017 Roberto L. Badaró Jr. and contributors.
It is licensed under the BSD license. See the include LICENSE file for details.
