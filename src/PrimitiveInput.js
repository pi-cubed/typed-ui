import React from 'react';

/**
 * TODO docs
 */
const Input = props => (
  <input {...props} onChange={e => props.onChange(e.target.value)} />
);

/**
 * Returns a text field with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {StringInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A text field component.
 *
 * @example <caption>Logging to console</caption>
 * <StringInput onChange={console.log} />
 */
export const StringInput = ({ onChange }) => (
  <Input type="text" defaultValue="" onChange={onChange} />
);

/**
 * This callback handles StringInput change events.
 * @callback StringInput~onChange
 * @param {string} value
 */

/**
 * Returns an integer input component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {IntegerInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} An integer input component.
 *
 * @example <caption>Logging to console</caption>
 * <IntegerInput onChange={console.log} />
 */
export const IntegerInput = ({ onChange }) => (
  <Input type="number" pattern="\d+" onChange={onChange} />
);

/**
 * This callback handles IntegerInput change events.
 * @callback IntegerInput~onChange
 * @param {integer} value
 */

/**
 * Returns a float input component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {FloatInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A float input component.
 *
 * @example <caption>Logging to console</caption>
 * <FloatInput onChange={console.log} />
 */
export const FloatInput = ({ onChange }) => (
  <Input type="number" step={0.01} onChange={onChange} />
);

/**
 * This callback handles FloatInput change events.
 * @callback FloatInput~onChange
 * @param {float} value
 */

/**
 * Returns a boolean input component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {BooleanInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A boolean input component.
 *
 * @example <caption>Logging to console</caption>
 * <BooleanInput onChange={console.log} />
 */
export const BooleanInput = ({ onChange }) => (
  <input type="checkbox" onClick={e => onChange(e.target)} />
);

/**
 * This callback handles BooleanInput change events.
 * @callback BooleanInput~onChange
 * @param {boolean} value
 */

/**
 * Returns a select component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.options = The enum options.
 * @param {string} props.data = The enum data.
 * @param {EnumInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A select component.
 *
 * @example <caption>Logging to console</caption>
 * <EnumInput options={['a', 'b', 'c']} data='b' onChange={console.log} />
 */
export const EnumInput = ({ options, data, onChange }) => (
  <select
    defaultValue={data || options[0]}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(option => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
);

/**
 * This callback handles EnumInput change events.
 * @callback EnumInput~onChange
 * @param {string} value
 */
