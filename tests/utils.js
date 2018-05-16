import { mutate } from 'fuzzer';


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
