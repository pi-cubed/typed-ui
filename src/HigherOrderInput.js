import React, { Component } from 'react';
import { getInput, defaultInput } from './Input';

// TODO docs
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

  onChange(index) {
    return value =>
      this.setState({
        list: updateArray(this.state.list, index, value)
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((_, k) => (
            <li key={k}>{this.input(this.onChange(k))}</li>
          ))}
        </ul>
        <input
          type="button"
          value="+"
          onClick={() =>
            this.setState({
              list: this.state.list.concat(this.default)
            })
          }
        />
      </div>
    );
  }
}

/**
 * This callback handles ListInput change events.
 * @callback ListInput~onChange
 * @param {Array.<*>} value
 */
