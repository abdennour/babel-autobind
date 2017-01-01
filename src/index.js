export function Autobind(Mocked, ClassName) {
  if (typeof Mocked === 'string') {
    return function(target) {
      return Autobind(target, Mocked);
    }
  }
  const methods = Object.getOwnPropertyNames(Mocked.prototype);
  const getMethodProperty = (methodName, prop) => Object.getOwnPropertyDescriptor(Mocked.prototype, methodName)[prop];
  const methodsExcluded = ['constructor', 'render'];
  const ruleIncluder = (methodName =>
    methodsExcluded.indexOf(methodName) < 0 &&
    (typeof getMethodProperty(methodName, 'value') === 'function')
  );

  class Mocker extends Mocked {
    constructor() {
      super(...arguments);
      methods.filter(ruleIncluder).forEach((methodName) => {
        this[methodName] = this[methodName].bind(this);
      });
    }
  }

  const rename = (() => {
    Object.defineProperty(Mocker, 'name', {
      writable: true
    });
    Mocker.name = ClassName || Mocked.name || 'AutoBoundComponent';
    Object.defineProperty(Mocker, 'name', {
      writable: false
    });
  })();

  Object.keys(Mocked).forEach(staticAttribute => {
    Mocker[staticAttribute] = Mocked[staticAttribute]
  });

  return Mocker;
};
