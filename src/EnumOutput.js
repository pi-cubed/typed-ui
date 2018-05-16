import React, { Component } from 'react';


/**
 * Returns a disabled multiple select displaying the supplied data.
 *
 * @param {Object} props - The component props.
 * @param {{Object.<string, boolean>}} data - The enum data.
 * @returns {Component} A select element displaying the data.
 *
 * @example <caption>Display an enum selection</caption>
 * const data = {
 * 	  a: false,
 *    b: true,
 *    c: true
 * });
 * <EnumOutput data={data} />
 */
const EnumOutput = ({ data }) =>
	<select multiple disabled>
		{ Array.from(new Map(Object.entries(data)), ([key, value]) => {
			console.log(key, value);
			return <option value={key} key={key} selected={value}>{key}</option>}) }
	</select>;


// TODO compose within an error boundary
export default EnumOutput; 
