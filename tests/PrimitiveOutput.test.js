import expect from 'expect';
import React from 'react';
import PrimitiveOutput from 'src/PrimitiveOutput';
import { fuzz } from './utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('PrimitiveOutput', () => {

  /**
   * Return the mounted PrimitiveOutput component with supplied data.
   * 
   * @param {*} data - The primitive data.
   * @returns {ShallowWrapper} The mounted component.
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

  
  it('displays boolean', () => {
    // TODO change from html() to contains()
    expect(wrap(true).html()).toEqual('<input type="checkbox" value="true"/>');
  });

});
