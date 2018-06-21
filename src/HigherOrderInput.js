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
    return getInput(ofType.ofType);
  }
  return input(componentNames[getNamedType(ofType).name]);
};

/**
 * TODO docs and do
 *
 * @private
 */
const defaultInput = ofType => null;

/**
 * TODO docs
 *
 * @private
 */
const updateArray = (array, index, value) => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

/**
 * Returns a list input component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.ofType - The type of items in the list.
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
    this.default = defaultInput(props.ofType);
    this.input = getInput(props.ofType);
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

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((_, key) => (
            <li key={key}>{this.input(this.state.list, this.onChange(key))}</li>
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
    this.input = _.mapValues(props.fields, (_, key) =>
      getInput(props.fields[key].type)
    );
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

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <ul>
          {Object.keys(this.state.fields).map(key => (
            <li key={key}>
              {this.input[key](this.state.fields, this.onChange(key))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
