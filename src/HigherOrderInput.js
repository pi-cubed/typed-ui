import React, { Component } from 'react';
import _ from 'lodash';
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
  isWrappingType,
  isLeafType
} from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import {
  updateArray,
  makeComponent,
  getTypeComponentMap,
  getDefaultInput,
  removeItem,
  merge
} from './utils';

/**
 * Returns a list input component with change events handled by the given
 *   callback.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLInputType} props.ofType - The type of items in the list.
 * @param {ListInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A list input component.
 *
 * @example <caption>Log list input to the console</caption>
 * <ListInput ofType={GraphQLString} onChange={console.log} />
 */
export const ListInput = props => <ListInputComponent {...props} />;
/**
 * This callback handles ListInput change events.
 *
 * @callback ListInput~onChange
 * @param {Array.<*>} value
 */

/**
 * Component for outputting GraphQLList data.
 *
 * @extends Component
 *
 * @private
 */
class ListInputComponent extends Component {
  constructor(props) {
    super(props);
    this.defaultInput = () => getDefaultInput(props.ofType);
    this.state = {
      data: props.data || [this.defaultInput()]
    };
  }

  /**
   * TODO docs
   *
   * @private
   */
  onChange(index, value) {
    return this.setState(
      ({ data }) => ({
        data: updateArray(data, index, value)
      }),
      () => this.props.onChange(this.state.data)
    );
  }

  renderItem(data, index) {
    return (
      <div>
        <HigherOrderInput
          {...this.props}
          data={data}
          onChange={val => this.onChange(index, val)}
        />
        {this.state.data.length > 1 ? this.renderRemove(index) : null}
      </div>
    );
  }

  renderRemove(index) {
    return (
      <input
        type="button"
        value="-"
        onClick={() =>
          this.setState(
            {
              data: removeItem(this.state.data, index)
            },
            () => this.props.onChange(this.state.data)
          )
        }
      />
    );
  }

  renderAdd() {
    return (
      <input
        type="button"
        value="+"
        onClick={() =>
          this.setState(
            {
              data: this.state.data.concat(this.defaultInput())
            },
            () => this.props.onChange(this.state.data)
          )
        }
      />
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  render() {
    return (
      <div>
        <ul>
          {this.state.data.map((data, i) => (
            <li key={i}>{this.renderItem(data, i)}</li>
          ))}
        </ul>
        {this.renderAdd()}
      </div>
    );
  }
}

/**
 * Returns an object input component with change events handled by the given
 *   callback.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input object.
 * @param {Object} props.fields - The input object fields.
 * @param {ObjectInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} An object input component.
 *
 * @example <caption>Log object input to the console</caption>
 * <ObjectInput
 *     name="This is the name of the input object."
 *     fields={{
 *         x: { type: GraphQLString }
 *     }}
 *     onChange={console.log}
 * />;
 */
export const ObjectInput = props => <ObjectInputComponent {...props} />;
/**
 * This callback handles ObjectInput change events.
 *
 * @callback ObjectInput~onChange
 * @param {Object} value
 */

/**
 * Component for outputting GraphQLType data.
 *
 * @extends Component
 *
 * @private
 */
class ObjectInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = merge(
      _.mapValues(props.fields, ({ type }) => getDefaultInput(type)),
      props.data
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderReturn({ type }, key) {
    return (
      <HigherOrderInput
        {...this.props}
        ofType={type}
        data={this.state[key]}
        onChange={val =>
          this.setState({ [key]: val }, () => this.props.onChange(this.state))
        }
      />
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderDivider({ type, args }) {
    return !isLeafType(type) ? <hr /> : null;
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderField(field, key) {
    return (
      <div>
        {key}
        {this.renderDivider(field)}
        {this.renderReturn(field, key)}
      </div>
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  render() {
    const { name, fields } = this.props;
    return (
      <div>
        <div>{name}</div>
        <ul style={{ listStyleType: 'none' }}>
          {_.keys(fields).map(k => (
            <li key={k}>{this.renderField(fields[k], k)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * TODO
 * A component for non null inputs. Bases component selection on name of type.
 */
export const NonNullInput = props => <HigherOrderInput {...props} />;

/**
 * A map from GraphQL scalars to primitve inputs.
 *
 * @private
 */
const defaultTypeComponentMap = {
  GraphQLInt: IntegerInput,
  GraphQLFloat: FloatInput,
  GraphQLBoolean: BooleanInput,
  GraphQLString: StringInput,
  GraphQLID: StringInput,
  GraphQLEnumType: EnumInput,
  GraphQLInputObjectType: ObjectInput,
  GraphQLList: ListInput,
  GraphQLNonNull: NonNullInput
};

/**
 * Component for displaying GraphQL input types of higher order.
 *
 * @param {GraphQLInputType} ofType - The type of the input.
 * @param {Object.<GraphQLInputType, Component>} ofType - Map from GraphQL
 *   input types to components.
 * @returns {React.Element} An element displaying the input.
 */
export const HigherOrderInput = makeComponent(defaultTypeComponentMap);
