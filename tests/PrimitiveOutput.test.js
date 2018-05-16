import expect from 'expect';
import React from 'react';
import { StringOutput, BooleanOutput, EnumOutput } from 'src/PrimitiveOutput';
import { fuzz } from './utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


describe('StringOutput', () =>
  it('displays string', () => {
    const fuzzed = fuzz(data);
    expect(shallow(<StringOutput data={fuzzed} />).contains(fuzzed)).toEqual(true);
  })
);


describe('EnumOutput', () =>
  it('displays enum', () => {
    const data = {
      a: false,
      b: true,
      c: true
    };
    const select = <select multiple disabled>
      <option value="a" selected={false}>a</option>
      <option value="b" selected={true}>b</option>
      <option value="c" selected={true}>c</option>
    </select>;
    expect(shallow(<EnumOutput data={data} />).contains(select)).toEqual(true);
  })
);


describe('BooleanOutput', () =>
  it('displays boolean', () =>
    // TODO change from html() to contains()
    expect(shallow(<BooleanOutput data={true} />).html()).toEqual('<input type="checkbox" value="true"/>')
  )
);
