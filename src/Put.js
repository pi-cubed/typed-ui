import React, { Component, Element, cloneElement } from 'react';
import { isInputObjectType, isWrappingType } from 'graphql';
import { HigherOrderOutput } from './HigherOrderOutput';
import { HigherOrderInput } from './HigherOrderInput';
import { getDefaultData, merge } from './utils';

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
  const input = isInput(props.type);
  const Component = input ? Input : Output;
  return (
    <Component
      onChange={props.onChange || (() => {})}
      isInput={input}
      {...props}
    />
  );
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
      data: props.data || getDefaultData(props.type),
      key: 0
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
    this.setState(
      ({ key }) => ({ data, key: key + 1 }),
      () => {
        this.props.onChange(this.state.data);
      }
    );
  };

  /**
   * TODO docs
   *
   * @private
   */
  renderOutput() {
    return (
      <HigherOrderOutput
        {...this.props}
        ofType={this.props.type}
        data={this.state.data}
        onChange={this.onChange}
      />
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderChild() {
    const { children, type } = this.props;
    const childProps = { ...children.props, ...this.state, type };
    return typeof children === 'object'
      ? cloneElement(children, childProps)
      : children(childProps);
  }

  render() {
    return this.props.children ? (
      <div>
        {this.renderOutput()}
        <br />
        {this.renderChild()}
      </div>
    ) : (
      this.renderOutput()
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
      data: props.data || getDefaultData(props.type),
      key: 0
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
    this.setState(
      ({ key }) => ({ data, key: key + 1 }),
      () => this.props.onChange(this.state.data)
    );
  };

  /**
   * TODO docs
   *
   * @private
   */
  renderInput() {
    return (
      <HigherOrderInput
        {...this.props}
        ofType={this.props.type}
        data={this.state.data}
        onChange={this.onChange}
      />
    );
  }

  render() {
    const { children, type } = this.props;
    return children ? (
      <div>
        {this.renderInput()}
        <br />
        {cloneElement(children, { ...children.props, ...this.state, type })}
      </div>
    ) : (
      this.renderInput()
    );
  }
}
