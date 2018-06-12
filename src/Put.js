import React, { Component } from 'react';
import { isInputObjectType, isWrappingType } from 'graphql';
import { getOutput } from './HigherOrderOutput';
import { getInput } from './HigherOrderInput';

const isInput = type =>
  isInputObjectType(type) ||
  (isWrappingType(type) && isInputObjectType(type.ofType));

/**
 * Component for displaying GraphQL data
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.type - The type of the data.
 * @param {Object} [props.data] - The initial data.
 * @param {Output~onChange} [props.onChange] - The handler for changes in the data.
 * @returns {Component} A component displaying the data.
 *
 * @example <caption>Display a string</caption>
 * <Put type={GraphQLString} data="abc" />
 * @example <caption>Display an object</caption>
 * <Put
 *  type={
 *    new GraphQLObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
 *  }
 *  data={{ w: 'xyz' }}
 * />
 * @example <caption>Log object input to the console</caption>
 * <Put
 *  type={
 *    new GraphQLInputObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
 *  }
 *  data={{ w: '' }}
 *  onChange={console.log}
 * />
 */
export const Put = props => {
  const Component = isInput(props.type) ? Input : Output;
  return <Component onChange={props.onChange || (() => {})} {...props} />;
};

/**
 * Component for outputting GraphQLType data.
 *
 * @extends Component
 *
 * @private
 */
class Output extends Component {
  /**
   * Returns a component displaying the data with the given type.
   *   Passes changes in the data to the given handler.
   *
   * @param {Object} props - The component props.
   * @param {GraphQLType} props.type - The type of the data.
   * @param {Object} props.data - The initial data.
   * @param {Output~onChange} props.onChange - The handler for changes in the data.
   * @returns {Component} A component displaying the data.
   *
   * @example <caption>Display a string</caption>
   * <Output type={GraphQLString} data="abc" />
   * @example <caption>Display an object</caption>
   * <Output
   *  type={
   *    new GraphQLObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
   *  }
   *  data={{ w: 'xyz' }}
   * />
   * @example <caption>Log object input to the console</caption>
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

/**
 * Component for outputting GraphQLInputType data.
 *
 * @extends Component
 *
 * @private
 */
class Input extends Component {
  /**
   * Returns a component displaying the data with the given type.
   *   Passes changes in the data to the given handler.
   *
   * @param {Object} props - The component props.
   * @param {GraphQLType} props.type - The type of the data.
   * @param {Object} [props.data] - The initial data.
   * @param {Input~onChange} props.onChange - The handler for changes in the data.
   * @returns {Component} A component displaying the data.
   *
   * @example <caption>Display a string</caption>
   * <Input type={GraphQLString} data="abc" />
   * @example <caption>Display an object</caption>
   * <Input
   *  type={
   *    new GraphQLObjectType({ name: 'abc', fields: { w: { type: GraphQLString } } })
   *  }
   *  data={{ w: 'xyz' }}
   * />
   * @example <caption>Log object input to the console</caption>
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
