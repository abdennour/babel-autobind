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
import Decorated from './examples/Decorated';
import ComponentWith3rdParty from './examples/ComponentWith3rdParty';


const ComponentBoundAgain = Autobind(ComponentWith3rdParty);


describe(`babel-autobind`, () => {

  it(`proves that "babel-autobind" solves the issue of binding automatically`, () => {
    const wrapper = mount( <ComponentWithOurAutoBind /> );
    expect(() => {
      wrapper.instance().handleClick({});
    }).toNotThrow();
  });

  it(`can be used as decorator → @Autobind`, () => {
    const wrapper = mount( <Decorated /> );
    expect(() => {
      wrapper.instance().handleClick({});
    }).toNotThrow();
  });

  it(`proves that using 3rd-party "@autobind decorator" is not enough to stub/spy methods`, () => {
    expect(() => {
      const stub = sinon.stub(
        ComponentWith3rdParty.prototype,
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

  it(`returns a class with the same name of the original class even it is wrapper by "Autobind(...)" `, () =>{
     const Target = Autobind(ComponentWithoutBinding);
     expect(Target.name).toEqual(ComponentWithoutBinding.name);
  });

  it(`gives the opportunity to control the name of the bound class`, () => {

    const Target = Autobind(ComponentWithoutBinding, 'AnotherName');
    expect(Target.name).toEqual('AnotherName');
  });

});
