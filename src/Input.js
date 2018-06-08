import React, { Component } from 'react';
import {
  getNamedType,
  isListType,
  isEnumType,
  isInputObjectType,
  isObjectType,
  isWrappingType
} from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import { ListInput, ObjectInput } from './HigherOrderInput';
import { ObjectOutput } from './HigherOrderOutput';

/**
 * This type of function accepts data and a change handler and returns a new
 *   component with these props.
 *
 * @function WithDataChange
 * @param {*} data - The data for the component.
 * @param {WithDataChange~onChange} onChange - The change handler for the component.
 * @returns {Component} The component with data and an onChange handler.
 *
 * @private
 */
/**
 * This callback handles data change events.
 *
 * @callback WithDataChange~onChange
 * @param {*} value
 *
 * @private
 */

/**
 * Returns function for adding data and onChange props to the component.
 *
 * @param {Component} Component - The component to add props to.
 * @returns {WithDataChange} A function that will add data and a change handler to a component.
 *
 * @private
 */
const input = Component => (data, onChange) => (
  <Component data={data} onChange={onChange} />
);

/**
 * A map from GraphQL scalars to primitve inputs.
 *
 * @private
 */
const componentNames = {
  Int: IntegerInput,
  Float: FloatInput,
  Boolean: BooleanInput,
  String: StringInput,
  ID: StringInput
};

/**
 * Returns a WithDataChange for the component associated with the given
 *   GraphQL type.
 *
 * @param {GraphQLInputType} ofType - The type of the input.
 * @returns {WithDataChange} A function that will produce the component
 *   displaying the input.
 *
 * @private
 */
export const getInput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListInput ofType={ofType.ofType} data={data} onChange={onChange} />
    );
  }
  if (isEnumType(ofType)) {
    return (data, onChange) => (
      <EnumInput
        options={_.keys(ofType.getValues())}
        data={data}
        onChange={onChange}
      />
    );
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
  // if (isInputObjectType(ofType)) {
  //   return (data, onChange) => (
  //     <ObjectInput
  //       name={ofType.name}
  //       fields={ofType.getFields()}
  //       onChange={onChange}
  //       data={data}
  //     />
  //   );
  // }
  if (isWrappingType(ofType)) {
    return getInput(ofType.ofType);
  }
  return input(componentNames[getNamedType(ofType).name]);
};

/**
 * TODO docs and do
 *
 * @private
 */
export const defaultInput = ofType => null;

/**
 * Component for outputting GraphQLInputType data.
 *
 * @extends Component
 */
export class Input extends Component {
  /**
   * Returns a component displaying the data with the given type.
   *   Passes changes in the data to the given handler.
   *
   * @param {Object} props - The component props.
   * @param {GraphQLType} props.type - The type of the data.
   * @param {Object} [props.data] - The initial data.
   * @param {Input~onChange} [props.onChange] - The handler for changes in the data.
   * @returns {Component} A component displaying the data.
   *
   * @example <caption>Displaying a string</caption>
   * <Input type={GraphQLString} data="abc" />
   * @example <caption>Displaying an object</caption>
   * <Input
   *  type={
   *    new GraphQLObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
   *  }
   *  data={{ w: 'xyz' }}
   * />
   * @example <caption>Log object input to console</caption>
   * <Input
   *  type={
   *    new GraphQLInputObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
   *  }
   *  data={{ w: '' }}
   *  onChange={console.log}
   * />
   */
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.input = getInput(this.props.type);
  }
  /**
   * This callback handles Input change events.
   *
   * @callback Input~onChange
   * @param {Object} value
   */

  /**
   * TODO docs
   *
   * @private
   */
  onChange = data => {
    this.setState({ data }, () => this.props.onChange(this.state.data));
  };

  render() {
    return this.input(this.state.data, this.onChange);
  }
}
