import React, { Component } from 'react';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  getNamedType,
  isListType,
  isEnumType,
  isObjectType,
  isInputObjectType,
  isWrappingType
} from 'graphql';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from './PrimitiveOutput';

/**
 * TODO docs
 *
 * @private
 */
const output = Component => (data, onChange) => (
  <Component data={data} onChange={onChange} />
);

/**
 * TODO docs
 *
 * @private
 */
const componentNames = {
  Int: IntegerOutput,
  Float: FloatOutput,
  Boolean: BooleanOutput,
  String: StringOutput,
  ID: StringOutput
};

/**
 * TODO docs
 *
 * @private
 */
export const getOutput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListOutput ofType={ofType.ofType} data={data} onChange={onChange} />
    );
  }
  if (isEnumType(ofType)) {
    return output(EnumOutput);
  }
  if (isObjectType(ofType)) {
    return (data, onChange) => (
      <ObjectOutput
        name={ofType.name}
        fields={ofType.getFields()}
        data={data}
        onChange={onChange}
      />
    );
  }
  if (isInputObjectType(ofType)) {
    return (data, onChange) => (
      <ObjectInput
        name={ofType.name}
        fields={ofType.getFields()}
        onChange={onChange}
        data={data}
      />
    );
  }
  if (isWrappingType(ofType)) {
    return getOutput(ofType.ofType);
  }
  return output(componentNames[getNamedType(ofType).name]);
};

/**
 * Return a list around given data using component producer.
 *
 * @param {Function} makeOutput - produces components for list items.
 * @param {Array.<*>} data - The list data.
 * @param {listOutput~onChange} onChange - The handler for change events.
 * @returns {Component} A list around the items.
 *
 * @private
 */
const listOutput = (makeOutput, data, onChange) => (
  <ul>{data.map((d, i) => <li key={i}>{makeOutput(d, onChange)}</li>)}</ul>
);
/**
 * This callback handles listOutput change events.
 *
 * @callback listOutput~onChange
 * @param {Array.<*>} value
 *
 * @private
 */

/**
 * Returns a list surrounding the supplied list data.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.ofType - The type of the list items.
 * @param {Array.<*>} props.data - The list data.
 * @param {ListOutput~onChange} props.onChange - The handler for change events.
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
 * This callback handles ListOutput change events.
 *
 * @callback ListOutput~onChange
 * @param {Array.<*>} value
 */

/**
 * Return an object component around the given data using the component producer.
 *
 * @param {Function} makeOutput - produces components for object items.
 * @param {Object} data - The object data.
 * @param {string} data.name - The object name.
 * @param {Object} data.fields - The object fields.
 * @param {objectOutput~onChange} data.onChange - The handler for change events.
 * @returns {Component} A component containing the object.
 *
 * @private
 */
const objectOutput = (makeOutput, { name, data, onChange }) => (
  <div>
    <div>{name}</div>
    <ul>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          {makeOutput(key)(value, val =>
            onChange(_.assign({}, data, { [key]: val }))
          )}
        </li>
      ))}
    </ul>
  </div>
);
/**
 * This callback handles objectOutput change events.
 *
 * @callback objectOutput~onChange
 * @param {Object} value
 *
 * @private
 */

/**
 * Returns a object surrounding the supplied object data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the object.
 * @param {Object} props.fields - The type of fields of the object.
 * @param {Object} props.data - The object data.
 * @param {ObjectOutput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A object surrounding the object items.
 *
 * @example <caption>Display an object of one string</caption>
 * <ObjectOutput
 *     name="This is the name of the object."
 *     fields={{
 *         hew: { type: GraphQLString }
 *     }}
 *     data={{ hew: 'This is a string field called hew.' }}
 * />;
 */
export const ObjectOutput = props =>
  objectOutput(key => getOutput(props.fields[key].type), props);
/**
 * This callback handles ObjectOutput change events.
 *
 * @callback ObjectOutput~onChange
 * @param {Object} value
 */
