import { mutate } from 'fuzzer';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });


/**
 * Returns a fuzzed version of the given data.
 *
 * @param {*} x - The data.
 * @returns {*} The fuzzed data.
 *
 * @example <caption>Fuzz a number</caption>
 * fuzz(5) // => 73
 * @example <caption>Fuzz a string</caption>
 * fuzz('abc') // => 'ebabx'
 * @example <caption>Fuzz an object</caption>
 * fuzz({ a: 5, b: 'abc' }) // => { a: 13, b: 'tnc' }
 */
export const fuzz = x => mutate.object({ x })().x;


// TODO docs
export const getInput = mw => mw.find('input').instance();


// TODO docs
export const setInput = async (data, Input) =>
	await new Promise(res =>
		mount(<Input onChange={res} />)
			.find('input')
			.simulate('change', {
				target: {
					value: data
				}
			})
);


// TODO docs
export const isEmpty = Input => () => expect(getInput(mount(<Input />)).value).toEqual('');
