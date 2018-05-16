import React, { Component } from 'react';


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
export const StringInput = ({ onChange }) =>
	<input type='text' defaultValue='' onChange={e => onChange(e.target.value)} />;

/**
 * This callback handles StringInput change events.
 * @callback StringInput~onChange
 * @param {string} value
 */
