import expect from 'expect';
import React from 'react';
import { StringInput } from 'src/PrimitiveInput';
import { fuzz, getInput, setInput } from './utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('StringInput', () => {
  const wrap = onChange => mount(<StringInput onChange={onChange} />);
  
  it('handles string', done => {
    const data = fuzz('abc');
    const wrapper = wrap(event => expect(event).toEqual(data) && done(null));
    setInput(data, wrapper);
  });

  it('is empty by default', () => {
    expect(getInput(wrap()).value).toEqual('');
  });
});
