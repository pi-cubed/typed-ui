import expect from 'expect';
import React from 'react';
import EnumOutput from 'src/EnumOutput';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('EnumOutput', () => {

  /**
   * Return the mounted EnumOutput component with supplied data.
   * 
   * @param {{Object.<string, boolean>}} data - The enum data.
   * @returns {ShallowWrapper} The mounted component.
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
