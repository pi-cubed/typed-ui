import React, { Component } from 'react';
import { isInputObjectType, isWrappingType } from 'graphql';
import { HigherOrderOutput } from './HigherOrderOutput';
import { HigherOrderInput } from './HigherOrderInput';

/**
 * TODO docs
 *
 * @private
 */
const isInput = type =>
  isInputObjectType(type) ||
  (isWrappingType(type) && isInputObjectType(type.ofType));

/**
 * Component for displaying GraphQL data
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.type - The type of the data.
 * @param {Object} [props.data] - The initial data.
 * @param {Put~onChange} [props.onChange] - The handler for changes in the data.
 * @param {Put~render} [props.render] - The custom GraphQL data renderer.
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
 * This callback handles Put change events.
 *
 * @callback Put~onChange
 * @param {Object} value
 */
/**
 * This function renders GraphQL data.
 *
 * @callback Put~render
 * @param {GraphQLType} type
 * @param {*} data
 */

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
   * @param {Output~render} [props.render] - The custom GraphQL data renderer.
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
   *
   * @private
   */
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }
  /**
   * This callback handles Output change events.
   *
   * @callback Output~onChange
   * @param {Object} value
   *
   * @private
   */
  /**
   * This function renders GraphQL data.
   *
   * @callback Output~render
   * @param {GraphQLType} type
   * @param {*} data
   *
   * @private
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
    return (
      <HigherOrderOutput
        {...this.props}
        ofType={this.props.type}
        data={this.state.data}
        onChange={this.onChange}
      />
    );
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
   * @param {Input~onChange} props.onChange - The handler for changes in the data.
   * @param {Object} [props.data] - The initial data.
   * @param {Input~render} [props.render] - The custom GraphQL data renderer.
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
   *
   * @private
   */
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }
  /**
   * This callback handles Input change events.
   *
   * @callback Input~onChange
   * @param {Object} value
   *
   * @private
   */
  /**
   * This function renders GraphQL data.
   *
   * @callback Input~render
   * @param {GraphQLType} type
   * @param {*} data
   *
   * @private
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
    return (
      <HigherOrderInput
        {...this.props}
        ofType={this.props.type}
        data={this.state.data}
        onChange={this.onChange}
      />
    );
  }
}
