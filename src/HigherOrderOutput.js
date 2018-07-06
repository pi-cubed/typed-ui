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
import { ObjectInput } from './HigherOrderInput';
import { withProps, withRender } from './utils';

/**
 * Component for displaying GraphQL output types of higher order.
 *
 * @param {GraphQLOutputType} ofType - The type of the input.
 * @param {Object.<GraphQLOutputType, Component>} ofType - Map from GraphQL
 *   input types to components.
 * @returns {React.Element} An element displaying the input.
 */
export const HigherOrderOutput = ({
  ofType,
  typeComponentMap = {},
  ...props
}) => {
  const renderMap = {
    ...(typeComponentMap.input || {}),
    ...defaultTypeComponentMap
  };
  const render =
    renderMap[ofType.constructor.name] || renderMap[getNamedType(ofType).name];
  return render({
    ...props,
    ...ofType,
    fields: ofType.getFields && ofType.getFields()
  });
};
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
 * @param {GraphQLOutputType} props.ofType - The type of the list items.
 * @param {Array.<*>} props.data - The list data.
 * @param {ListOutput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A list surrounding the list items.
 *
 * @example <caption>Display a list of strings</caption>
 * <ListOutput ofType={GraphQLString} data={['abc', 'd', 'xyz']} />
 * @example <caption>Display a list of list of integers</caption>
 * <ListOutput ofType={new GraphQLList(GraphQLInt)} data={[[0, 1, 2], [10, 11, 12], [50, 100]]} />
 */
export const ListOutput = ({ data, ...props }) => (
  <ul>
    {data.map((d, k) => (
      <li key={k}>
        <HigherOrderOutput {...props} data={data[k]} />
      </li>
    ))}
  </ul>
);
// props => listOutput(getOutput(props.ofType))(props);
/**
 * This callback handles ListOutput change events.
 *
 * @callback ListOutput~onChange
 * @param {Array.<*>} value
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
export const ObjectOutput = ({ data, fields, onChange, ...props }) => (
  <div>
    <div>{props.name}</div>
    <ul>
      {_.keys(data).map(k => (
        <li key={k}>
          <HigherOrderOutput
            {...props}
            ofType={fields[k].type}
            data={data[k]}
            onChange={val => onChange(_.assign({}, data, { [k]: val }))}
          />
        </li>
      ))}
    </ul>
  </div>
);
/**
 * This callback handles ObjectOutput change events.
 *
 * @callback ObjectOutput~onChange
 * @param {Object} value
 */

/**
 * TODO
 * A component for non null inputs. Bases component selection on name of type.
 */
export const NonNullOutput = ({ ofType: { name }, ...props }) =>
  defaultTypeComponentMap[name](props);

/**
 * A map from GraphQL types to outputs.
 *
 * @private
 */
const defaultTypeComponentMap = {
  Int: IntegerOutput,
  Float: FloatOutput,
  Boolean: BooleanOutput,
  String: StringOutput,
  ID: StringOutput,
  GraphQLInt: IntegerOutput,
  GraphQLFloat: FloatOutput,
  GraphQLBoolean: BooleanOutput,
  GraphQLString: StringOutput,
  GraphQLID: StringOutput,
  GraphQLEnumType: EnumOutput,
  GraphQLObjectType: ObjectOutput,
  GraphQLInputObjectType: ObjectInput,
  GraphQLList: ListOutput,
  GraphQLNonNull: NonNullOutput
};
