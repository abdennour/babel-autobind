export function Autobind(Mocked, ClassName) {
  const methods = Object.getOwnPropertyNames(Mocked.prototype);
  const methodsExcluded = ['constructor', 'render'];
  const ruleIncluder = (methodName =>
    methodsExcluded.indexOf(methodName) < 0 &&
    (typeof Object.getOwnPropertyDescriptor(Mocked.prototype, methodName).set === 'undefined')
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
    Mocker.name =  ClassName || Mocked.name || 'AutoBoundComponent';
    Object.defineProperty(Mocker, 'name', {
      writable: false
    });
  })();

  return Mocker;
};
