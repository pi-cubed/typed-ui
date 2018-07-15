import expect from 'expect';
import React from 'react';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from 'src/PrimitiveInput';
import {
  fuzz,
  getInput,
  setInput,
  isEmpty,
  setTarget,
  makeInput
} from './utils';
import { mount } from 'enzyme';

const testInput = (Input, d) => async () => {
  const data = fuzz(d);
  const value = await setInput(Input)(data);
  expect(value).toEqual(data);
};

describe('StringInput', () => {
  it('handles string', testInput(StringInput, 'abc'));

  it('is empty by default', isEmpty(StringInput));
});

describe('IntegerInput', () => {
  it('handles integer', testInput(IntegerInput, 5));

  it('handles negative integer', testInput(IntegerInput, -5));

  // TODO
  xit('ignores non-numeric input', async () => {
    const data = fuzz(5.4);
    const value = await setInput(IntegerInput)(data);
    expect(value).toEqual('');
  });

  it('is empty by default', isEmpty(IntegerInput));
});

describe('FloatInput', () => {
  it('handles float', testInput(FloatInput, 5.4));

  it('handles negative float', testInput(FloatInput, -5.4));

  // TODO
  xit('ignores non-decimal input', async () => {
    const data = fuzz('a');
    const value = await setInput(data)(FloatInput);
    expect(value).toEqual('');
  });

  it('is empty by default', isEmpty(FloatInput));
});

describe('BooleanInput', () => {
  it('handles boolean', async () => {
    const value = await setTarget('input', 'click')(makeInput(BooleanInput));
    expect(value).toExist();
  });

  it('is false by default', () => {
    expect(getInput(mount(<BooleanInput />)).checked).toNotExist();
  });
});

describe('EnumInput', () => {
  it('handles selection', async () => {
    const value = 'c';
    const actual = await setTarget('select', 'change', {
      value
    })(res => <EnumInput options={['a', 'b', value]} data="" onChange={res} />);
    expect(actual).toEqual(value);
  });
});
