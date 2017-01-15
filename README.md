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

#### Example

```js
import {Autobind} from 'babel-autobind';

 class MyComponent extends React.Component {

 }
 export default Autobind(MyComponent,'YourComponent');
```

From release `0.3.3`, it is possible to rename the class name from decorator too.

#### Example

```js
import {Autobind} from 'babel-autobind';

@Autobind('YourComponent')
 class MyComponent extends React.Component {

 }
 export default MyComponent;
```
