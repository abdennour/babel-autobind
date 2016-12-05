export function Autobind(Mocked, sameName) {
  const methods = Object.getOwnPropertyNames(Mocked.prototype);
  const methodsExcluded = ['constructor', 'render'];
  const ruleIncluder = (methodName =>
    !methodsExcluded.includes(methodName) &&
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
  if(sameName) {
    const rename = (() => {
      Object.defineProperty(Mocker, 'name', {
        writable: true
      });
      Mocker.name = (Mocked.name && Mocked.name.length) ? Mocked.name : 'Component';
      Object.defineProperty(Mocker, 'name', {
        writable: false
      });
    })();
  }
  return Mocker;
};
