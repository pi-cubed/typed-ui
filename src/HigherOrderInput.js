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
  isWrappingType
} from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import { updateArray, makeComponent, getTypeComponentMap } from './utils';

/**
 * TODO docs and do
 *
 * @private
 */
const defaultInput = ofType => null;

/**
 * Returns a list input component with change events handled by the given callback.
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
    const { ofType } = props;
    this.default = defaultInput(ofType);
    this.state = {
      list: [this.default]
    };
  }

  /**
   * TODO docs
   *
   * @private
   */
  onChange(index) {
    return value =>
      this.setState(
        {
          list: updateArray(this.state.list, index, value)
        },
        () => this.props.onChange(this.state.list)
      );
  }

  /**
   * TODO docs
   *
   * @private
   */
  addItem() {
    this.setState({
      list: this.state.list.concat(this.default)
    });
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
          {this.state.list.map((_, key) => (
            <li key={key}>
              <HigherOrderInput
                {...this.props}
                data={this.state.list}
                onChange={this.onChange(key)}
              />
            </li>
          ))}
        </ul>
        <input type="button" value="+" onClick={() => this.addItem()} />
      </div>
    );
  }
}

/**
 * Returns an object input component with change events handled by the given callback.
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
export class ObjectInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: _.mapValues(props.fields, val => defaultInput(val.type))
    };
  }

  /**
   * TODO docs
   *
   * @private
   */
  onChange(key) {
    return value => {
      this.setState(
        { fields: _.assign({}, this.state.fields, { [key]: value }) },
        () => this.props.onChange(this.state.fields)
      );
    };
  }

  /**
   * TODO docs
   *
   * @private
   */
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <ul style={{ listStyleType: 'none' }}>
          {_.keys(this.props.fields).map(key => (
            <li key={key}>
              {key}
              <HigherOrderInput
                {...this.props}
                ofType={this.props.fields[key].type}
                data={this.state.fields[key]}
                onChange={this.onChange(key)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * TODO
 * A component for non null inputs. Bases component selection on name of type.
 */ export const NonNullInput = ({ ofType: { name }, ...props }) =>
  getTypeComponentMap(defaultTypeComponentMap, props)[name]({
    ...props,
    defaultComponent: defaultTypeComponentMap[name]
  });

/**
 * A map from GraphQL scalars to primitve inputs.
 *
 * @private
 */
const defaultTypeComponentMap = {
  Int: IntegerInput,
  Float: FloatInput,
  Boolean: BooleanInput,
  String: StringInput,
  ID: StringInput,
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
