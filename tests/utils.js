import { mutate } from 'fuzzer';


/**
 * Returns a fuzzed version of the given data.
 *
 * @param {*} x - The data.
 * @returns {*} Fuzzed data.
 */
export const fuzz = x => mutate.object({ x })().x;
