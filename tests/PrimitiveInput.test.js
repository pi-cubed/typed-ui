import expect from 'expect';
import React from 'react';
import { StringInput } from 'src/PrimitiveInput';
import { fuzz } from './utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('StringInput', () => {

  /**
   * Return a shallow StringInput component with the given onChange handler.
   * 
   * @callback onChange - The handle for change events.
   * @returns {ShallowWrapper} The shallow component.
   */
  const wrap = onChange => shallow(<StringInput onChange={onChange} />);

  
  it('handles strings', done => {
    const data = fuzz('abc');
    wrap( event => {
      expect(event).toEqual(data);
      done(null);
    }).find('input').simulate('change', { target: { value: data } });;
  });


  it('is empty by default', () => {
    expect(wrap(() => {}).find('input').props().value).toEqual('');
  });

});
