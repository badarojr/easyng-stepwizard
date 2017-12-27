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

`easy-step` options:
- `title`: The title to your step.
- `description`: The description to your step.
- `next-if`: Condition for moving forward. Default `true`
- `next-text`: Text for the button. Default `Next`.
- `next-class`: Sets the classes for the button. E.g. ```html next-class="btn btn-primary" ```
- `previous-if`: Condition for moving backwards. Default `true`
- `previous-text`: Text for the button. Default `Back`
- `previous-class`: Sets the classes for the button.

# Author

Roberto L. Badaró Jr.

# License

easy-step-wizard.js is copyright 2017 Roberto L. Badaró Jr. and contributors.
It is licensed under the BSD license. See the include LICENSE file for details.
