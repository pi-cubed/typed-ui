import React, { Component } from 'react';
import { getOutput } from './Output';

/**
 * Return a list around given data using component producer.
 *
 * @param {Function} makeOutput - produces components for list items.
 * @param {Array.<*>} data - The list data.
 * @returns {Component} A list around the items.
 *
 * @private
 */
const listOutput = (makeOutput, data) => (
  <ul>{data.map((d, i) => <li key={i}>{makeOutput(d)}</li>)}</ul>
);

/**
 * Returns a list surrounding the supplied list data.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.ofType - The type of the list items.
 * @param {GraphQLList<*>} props.data - The list data.
 * @returns {Component} A list surrounding the list items.
 *
 * @example <caption>Display a list of strings</caption>
 * <ListOutput ofType={GraphQLString} data={['abc', 'd', 'xyz']} />
 * @example <caption>Display a list of list of integers</caption>
 * <ListOutput ofType={new GraphQLList(GraphQLInt)} data={[[0, 1, 2], [10, 11, 12], [50, 100]]} />
 */
export const ListOutput = ({ ofType, data }) =>
  listOutput(getOutput(ofType), data);
