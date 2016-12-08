[![Build Status](https://travis-ci.org/abdennour/babel-autobind.svg?branch=master)](https://travis-ci.org/abdennour/babel-autobind)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/babel-autobind/badge.svg?branch=master)](https://coveralls.io/github/abdennour/babel-autobind?branch=master)

# Overview

#### it binds methods  to its class prototype + Compatible with stub/spy used on unit-test frameworks (Sinon.Js, enzyme,...so on) + Can be worked together with other 3rd party decorators (like `autobind-decorator`)


# Basic Example :

```js
import {Autobind} from 'babel-autobind';

@Autobind
 class MyComponent extends React.Component {

 }
 export default MyComponent;
```

Or

```js
import {Autobind} from 'babel-autobind';

 class MyComponent extends React.Component {

 }
 export default Autobind(MyComponent);
```


**@Autobind** decorator is more elegant  than **Autobind(...)** function , However ,  **Autobind(...)** function is overloaded . Indeed, it accepts 2nd argument to rename the class after binding.

#### Example

```js
import {Autobind} from 'babel-autobind';

 class MyComponent extends React.Component {

 }
 export default Autobind(MyComponent,'YourComponent');
```
