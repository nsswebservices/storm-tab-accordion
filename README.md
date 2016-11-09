#Storm Tab Accordion

[![Build Status](https://travis-ci.org/mjbp/storm-tab-accordion.svg?branch=master)](https://travis-ci.org/mjbp/storm-tab-accordion)
[![codecov.io](http://codecov.io/github/mjbp/storm-tab-accordion/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-tab-accordion?branch=master)
[![npm version](https://badge.fury.io/js/storm-tab-accordion.svg)](https://badge.fury.io/js/storm-tab-accordion)

Tab and accordion ui component for multi-panelled content areas 

##Usage
HTML
```
<div class="js-tab-accordion">
    <nav role="tablist" class="tab-accordion__tabs">
        <a class="js-tab-accordion-tab" href="#target-1">Item 1</a>
        <a class="js-tab-accordion-tab" href="#target-2">Item 2</a>
        <a class="js-tab-accordion-tab" href="#target-3">Item 3</a>
    </nav>
    <section id="target-1" class="tab-accordion-target">
        <h1 class="js-tab-accordion-title">Item 1</h1>
        <div class="tab-accordion__inner">One</div>
    </section>
    <section id="target-2" class="tab-accordion-target">
        <h1 class="js-tab-accordion-title">Item 2</h1>
        <div class="tab-accordion__inner">Two</div>
    </section>
    <section id="target-3" class="tab-accordion-target">
        <h1 class="js-tab-accordion-title">Item 3</h1>
        <div class="tab-accordion__inner">Three</div>
    </section>
</div>
```

JS
```
npm i -S storm-tab-accordion
```
either using es6 import
```
import TabAccordion from 'storm-tab-accordion';

TabAccordion.init('.js-tab-accordion');
```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-tab-accordion.standalone.js')
    .then(() => {
        StormTabAccordion.init('.js-tab-accordion');
    });
```
or es5 commonjs  (legacy, use the .standalone version in the /dist folder)
```
var TabAccordion = require('./libs/storm-tab-accordion');

TabAccordion.init('.js-tab-accordion');
```


##Example
[https://mjbp.github.io/storm-tab-accordion](https://mjbp.github.io/storm-tab-accordion)


##Options
```
    {
		tabClass: '.js-tab-accordion-tab',
        titleClass: '.js-tab-accordion-title',
        currentClass: 'active',
        active: 0
    }
```

e.g.
```
TabAccordion.init('.js-tab-accordion',);
```


##API
####`TabAccordion.init(selector, opts)`
Initialise the module with a DOM selector and  options object


##Tests
```
npm run test
```

##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
None

##License
MIT