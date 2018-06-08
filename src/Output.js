import React, { Component } from 'react';
import {
  getNamedType,
  GraphQLInt,
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
import { ListOutput, ObjectOutput } from './HigherOrderOutput';
import { ObjectInput } from './HigherOrderInput';

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
 * Component for outputting GraphQLType data.
 *
 * @extends Component
 */
export class Output extends Component {
  /**
   * Returns a component displaying the data with the given type.
   *   Passes changes in the data to the given handler.
   *
   * @param {Object} props - The component props.
   * @param {GraphQLType} props.type - The type of the data.
   * @param {Object} [props.data] - The initial data.
   * @param {Output~onChange} [props.onChange] - The handler for changes in the data.
   * @returns {Component} A component displaying the data.
   *
   * @example <caption>Displaying a string</caption>
   * <Output type={GraphQLString} data="abc" />
   * @example <caption>Displaying an object</caption>
   * <Output
   *  type={
   *    new GraphQLObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
   *  }
   *  data={{ w: 'xyz' }}
   * />
   * @example <caption>Log object input to console</caption>
   * <Output
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
    this.output = getOutput(this.props.type);
  }
  /**
   * This callback handles Output change events.
   *
   * @callback Output~onChange
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
    return this.output(this.state.data, this.onChange);
  }
}
