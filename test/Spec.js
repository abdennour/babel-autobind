import 'jsdom-global/register';
import React from 'react';
import {
  mount,
  shallow
} from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import {
  Autobind
} from '../src';

import ComponentWithoutBinding from './examples/ComponentWithoutBinding';
import ComponentWithOurAutoBind from './examples/ComponentWithOurAutoBind';
import ComponentWithAutoBindDecorator from './examples/ComponentWithAutoBindDecorator';


const ComponentBoundAgain = Autobind(ComponentWithAutoBindDecorator);


describe(`babel-autobind`, () => {

  it(`proves that "babel-autobind" solves the issue of binding automatically`, () => {
    const wrapper = mount( <ComponentWithOurAutoBind /> );
    expect(() => {
      wrapper.instance().handleClick({});
    }).toNotThrow();
  });

  it(`proves that using "@autobind decorator" is not enough to stub/spy methods`, () => {
    expect(() => {
      const stub = sinon.stub(
        ComponentWithAutoBindDecorator.prototype,
        'handleClick'
      ).returns(true);
      stub.restore();
    }).toThrow();
  });

  it(`proves that binding again with "babel-autobind" solves the issue of spying methods bound by @autobind at the 1st time`, () => {
    expect(() => {
      const stub = sinon.stub(
        ComponentBoundAgain.prototype,
        'handleClick'
      ).returns(true);
      stub.restore();
    }).toNotThrow();
  });
  it(`proves that "babel-autobind" is enough to have a successed unit-test`, () => {
    const stub = sinon.stub(
      ComponentWithOurAutoBind.prototype,
      'handleClick'
    ).returns(true);
    const wrapper = mount( <ComponentWithOurAutoBind /> );
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    expect(stub.calledTwice).toBeTruthy();
    stub.restore();
  });

  it(`is possible to do the Autobind after exporting the Component`, () => {

    const Proof = Autobind(ComponentWithoutBinding);
    const wrapper = mount( < Proof /> );
    expect(() => {
      wrapper.instance().handleClick({});
    }).toNotThrow();
  });

  it(`rename the bound class to be the same as the name of the original class`, () => {
    let Target = Autobind(ComponentWithoutBinding);
    expect(Target.name).toNotEqual('ComponentWithoutBinding');
    Target = Autobind(ComponentWithoutBinding, true);
    expect(Target.name).toEqual('ComponentWithoutBinding');
  });

});
