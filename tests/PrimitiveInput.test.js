import expect from 'expect';
import React from 'react';
import { StringInput, IntegerInput, FloatInput } from 'src/PrimitiveInput';
import { fuzz, getInput, setInput, isEmpty } from './utils';
import { mount } from 'enzyme';


const testInput = Input => d => async () => {
	const data = fuzz(d);
	const value = await setInput(data, Input);
	expect(value).toEqual(data);
};


describe('StringInput', () => {
  it('handles string', testInput(StringInput)('abc'));

  it('is empty by default', isEmpty(StringInput));
});


describe('IntegerInput', () => {
  it('handles integer', testInput(IntegerInput)(5));

  it('handles negative integer', testInput(IntegerInput)(-5));

  // TODO
  xit('ignores non-numeric input', async () => {
	const data = fuzz(5.4);
	const value = await setInput(data, IntegerInput);
	expect(value).toEqual('');
  });

  it('is empty by default', isEmpty(IntegerInput));
});


describe('FloatInput', () => {
  it('handles float', testInput(FloatInput)(5.4));

  it('handles negative float', testInput(FloatInput)(-5.4));

  // TODO 
  xit('ignores non-decimal input', async () => {
	const data = fuzz('a');
	const value = await setInput(data, FloatInput);
	expect(value).toEqual('');
  });

  it('is empty by default', isEmpty(FloatInput));
});
