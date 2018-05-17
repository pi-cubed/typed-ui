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
export const IntegerInput = ({ onChange }) =>
	<input type='number' pattern='\d+' onChange={e => onChange(e.target.value)} />;

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
export const FloatInput = ({ onChange }) =>
	<input type='number' step={0.01} onChange={e => onChange(e.target.value)} />;

/**
 * This callback handles FloatInput change events.
 * @callback FloatInput~onChange
 * @param {float} value
 */
