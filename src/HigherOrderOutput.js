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
const listOutput = (makeOutput, data, onChange) => (
  <ul>{data.map((d, i) => <li key={i}>{makeOutput(d, onChange)}</li>)}</ul>
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
export const ListOutput = ({ ofType, data, onChange }) =>
  listOutput(getOutput(ofType), data, onChange);

/**
 * Return an object component around the given data using the component producer.
 *
 * @param {Function} makeOutput - produces components for object items.
 * @param {Object} data - The object data.
 * @param {string} data.name - The object name.
 * @param {Object} data.fields - The object fields.
 * @returns {Component} A component containing the object.
 *
 * @private
 */
const objectOutput = (makeOutput, { name, data, onChange }) => (
  <div>
    <div>{name}</div>
    <ul>
      {Object.entries(data).map(d => (
        <li key={d[0]}>
          {makeOutput(d[0])(d[1], val =>
            onChange(_.assign({}, data, { [d[0]]: val }))
          )}
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Returns a object surrounding the supplied object data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the object.
 * @param {Object} props.fields - The type of fields of the object.
 * @param {GraphQLObject<*>} props.data - The object data.
 * @returns {Component} A object surrounding the object items.
 *
 * @example <caption>Display a object of one string</caption>
 * <ObjectOutput
 *     name="This is the name of the object."
 *     fields={{
 *         hew: { type: GraphQLString }
 *     }}
 *     data={{ hew: 'This is a string field called hew.' }}
 * />;
 */
export const ObjectOutput = ({ fields, ...props }) =>
  objectOutput(key => getOutput(fields[key].type), props);
