import React, { Component } from 'react';
import _ from 'lodash';
import { getInput, defaultInput } from './Input';

/**
 * TODO docs
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
 * @example <caption>Logging to console</caption>
 * <ListInput ofType={GraphQLString} onChange={console.log} />
 */
export class ListInput extends Component {
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
 * This callback handles ListInput change events.
 * @callback ListInput~onChange
 * @param {Array.<*>} value
 */

/**
 * Returns an object input component with change events handled by the given callback.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input object.
 * @param {Object} props.fields - The input object fields.
 * @param {ObjectInput~onChange} props.onChange - The handler for change events.
 * @returns {Component} An object input component.
 *
 * @example <caption>Logging to console</caption>
 * <ObjectInput
 *     name="This is the name of the input object."
 *     fields={{
 *         name: { type: GraphQLString }
 *     }}
 *     onChange={console.log}
 * />;
 */
export class ObjectInput extends Component {
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

/**
 * This callback handles ObjectInput change events.
 * @callback ObjectInput~onChange
 * @param {Object} value
 */
