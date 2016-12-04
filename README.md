[![Build Status](https://travis-ci.org/abdennour/babel-autobind.svg?branch=master)](https://travis-ci.org/abdennour/babel-autobind)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/babel-autobind/badge.svg?branch=master)](https://coveralls.io/github/abdennour/babel-autobind?branch=master)

# Overview

#### Compatible with stub/spy used on unit-test frameworks (Sinon.Js, enzyme,...so on) since it binds functions  to class prototype.


# Use Case

```js
import {Autobind} from 'babel-autobind';

 class MyComponent extends React.Component {

 }
 export default Autobind(MyComponent);
```
