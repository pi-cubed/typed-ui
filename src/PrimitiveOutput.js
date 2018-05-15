import React, { Component } from 'react';


/**
 * Returns a checkbox displaying the value of the supplied boolean.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.data - The boolean data.
 * @returns {Component} A chechbox displaying the data.
 *
 * @example <caption>Display true</caption>
 * <BooleanOutput data={true} />
 */
const BooleanOutput = ({ data }) => 
	<input type='checkbox' value={data} />;


/**
 * Returns a div surrounding the supplied data.
 *
 * @param {Object} props - The component props.
 * @param {*} props.data - The primitive data.
 * @returns {Component} A div surrounding the data.
 *
 * @example <caption>Display a string</caption>
 * <PrimitiveOutput data="abc" />
 * @example <caption>Display an integer</caption>
 * <PrimitiveOutput data={123} />
 * @example <caption>Display a boolean</caption>
 * <PrimitiveOutput data={false} />
 */
const PrimitiveOutput = ({ data }) =>
	(typeof data === 'boolean') ?
		<BooleanOutput data={data} /> : <div>{data}</div>;


// TODO compose within an error boundary
export default PrimitiveOutput; 
