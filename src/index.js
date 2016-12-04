export function Autobind(Mocked) {
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
  return Mocker;
};
