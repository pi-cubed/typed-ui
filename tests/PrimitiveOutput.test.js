import expect from 'expect';
import React from 'react';
import { PrimitiveOutput, BooleanOutput, EnumOutput } from 'src/PrimitiveOutput';
import { fuzz } from './utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('PrimitiveOutput', () => {

  /**
   * Return a shallow PrimitiveOutput component with the supplied data.
   * 
   * @param {*} data - The primitive data.
   * @returns {ShallowWrapper} The shallow component.
   */
  const wrap = data => shallow(<PrimitiveOutput data={data} />);

  /**
   * Expects the component returned by PrimitiveOutput to contain the data.
   * 
   * @param {*} data - The primitive data.
   */
  const contains = data => () => {
    const fuzzed = fuzz(data);
    expect(wrap(fuzzed).contains(fuzzed)).toEqual(true);
  }

  
  it('displays string', contains('abc'));

  
  it('displays integer', contains(123));

  
  it('displays float', contains(1.23));

});


describe('EnumOutput', () => {

  /**
   * Return a shallow EnumOutput component with the supplied data.
   * 
   * @param {Object.<string, boolean>} data - The enum data.
   * @returns {ShallowWrapper} The shallow component.
   */
  const wrap = data => shallow(<EnumOutput data={data} />);

  
  it('displays enum', () => {
    const data = {
      a: false,
      b: true,
      c: true
    };
    const comp = <select multiple disabled>
      <option value="a" selected={false}>a</option>
      <option value="b" selected={true}>b</option>
      <option value="c" selected={true}>c</option>
    </select>;
    expect(wrap(data).contains(comp)).toEqual(true);
  });

});


describe('BooleanOutput', () => {

  /**
   * Return a shallow BooleanOutput component with the supplied data.
   * 
   * @param {boolean} data - The boolean data.
   * @returns {ShallowWrapper} The shallow component.
   */
  const wrap = data => shallow(<BooleanOutput data={data} />);

  
  it('displays boolean', () => {
    // TODO change from html() to contains()
    expect(wrap(true).html()).toEqual('<input type="checkbox" value="true"/>');
  });

});
