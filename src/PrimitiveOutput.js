import React, { Component } from 'react';


/**
 * Returns a div surrounding the supplied data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.data - The string data.
 * @returns {Component} A div surrounding the data.
 *
 * @example <caption>Display the string "abc"</caption>
 * <StringOutput data="abc" />
 */
export const StringOutput = ({ data }) =>
	<div>{data}</div>;


/**
 * Returns a readonly multiple select component displaying the supplied data.
 *
 * @param {Object} props - The component props.
 * @param {Object.<string, boolean>} data - The enum data.
 * @returns {Component} A select component displaying the data.
 *
 * @example <caption>Display an enum selection</caption>
 * const data = {
 * 	  a: false,
 *    b: true,
 *    c: true
 * });
 * <EnumOutput data={data} />
 */
export const EnumOutput = ({ data }) =>
	<select multiple disabled>
		{ Array.from(new Map(Object.entries(data)), ([k, v]) =>
			<option value={k} key={k} selected={v}>{k}</option>) }
	</select>;


/**
 * Returns a readonly checkbox displaying the value of the supplied boolean.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.data - The boolean data.
 * @returns {Component} A chechbox displaying the data.
 *
 * @example <caption>Display true</caption>
 * <BooleanOutput data={true} />
 */
export const BooleanOutput = ({ data }) => 
	<input readOnly type='checkbox' value={data} />;


/**
 * Returns a readonly number input component displaying the integer.
 *
 * @param {Object} props - The component props.
 * @param {integer} props.data - The integer data.
 * @returns {Component} A number input displaying the data.
 *
 * @example <caption>Display an integer</caption>
 * <IntegerOutput data={true} />
 */
export const IntegerOutput = ({ data }) => 
	<input readOnly value={data} type='number' />;


/**
 * Returns a readonly number input component displaying the float.
 *
 * @param {Object} props - The component props.
 * @param {float} props.data - The float data.
 * @returns {Component} A number input displaying the data.
 *
 * @example <caption>Display an float</caption>
 * <FloatOutput data={true} />
 */
export const FloatOutput = ({ data }) => 
	<input readOnly value={data} type='number' />;
