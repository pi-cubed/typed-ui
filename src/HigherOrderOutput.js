import React, { Component } from 'react';
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
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from './PrimitiveOutput';
import { ObjectInput, HigherOrderInput } from './HigherOrderInput';
import { withProps, makeComponent, getTypeComponentMap } from './utils';

/**
 * Returns a list surrounding the supplied list data.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLOutputType} props.ofType - The type of the list items.
 * @param {Array.<*>} props.data - The list data.
 * @param {ListOutput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A list surrounding the list items.
 *
 * @example <caption>Display a list of strings</caption>
 * <ListOutput ofType={GraphQLString} data={['abc', 'd', 'xyz']} />
 * @example <caption>Display a list of list of integers</caption>
 * <ListOutput
 *  ofType={new GraphQLList(GraphQLInt)}
 *  data={[[0, 1, 2], [10, 11, 12], [50, 100]]}
 * />
 */
export const ListOutput = ({ data, ...props }) => (
  <ul>
    {data.map((d, k) => (
      <li key={k}>
        <HigherOrderOutput {...props} data={data[k]} />
      </li>
    ))}
  </ul>
);
/**
 * This callback handles ListOutput change events.
 *
 * @callback ListOutput~onChange
 * @param {Array.<*>} value
 */

/**
 * Returns a object surrounding the supplied object data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the object.
 * @param {Object} props.fields - The type of fields of the object.
 * @param {Object} props.data - The object data.
 * @param {ObjectOutput~onChange} props.onChange - The handler for change events.
 * @returns {Component} A object surrounding the object items.
 *
 * @example <caption>Display an object of one string</caption>
 * <ObjectOutput
 *     name="This is the name of the object."
 *     fields={{
 *         hew: { type: GraphQLString }
 *     }}
 *     data={{ hew: 'This is a string field called hew.' }}
 * />;
 */
export const ObjectOutput = props => <ObjectOutputComponent {...props} />;
/**
 * This callback handles ObjectOutput change events.
 *
 * @callback ObjectOutput~onChange
 * @param {Object} value
 */

/**
 * TODO docs
 *
 * @private
 */
class ObjectOutputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = _.mapValues(props.fields, () => !!props.defaultToggle);
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderReturn({ type }, k) {
    const { data, fields, onChange } = this.props;
    return (
      <HigherOrderOutput
        {...this.props}
        ofType={type}
        data={data[k]}
        onChange={val => onChange(_.assign({}, data, { [k]: val }))}
      />
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderArgs({ args }, key) {
    return _.keys(args).length ? (
      <ul style={{ listStyleType: 'none' }}>
        {args.map(({ name, type }, i) => (
          <li key={i}>
            {name}
            <HigherOrderInput {...this.props} ofType={type} />
          </li>
        ))}
      </ul>
    ) : null;
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderDivider({ type, args }) {
    return !isLeafType(type) || _.keys(args).length ? <hr /> : null;
  }

  renderToggle(key) {
    return (
      <input
        type="checkbox"
        checked={this.state[key]}
        onChange={() => this.setState(prev => ({ [key]: !prev[key] }))}
      />
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  renderField(field, key) {
    return (
      <div>
        {this.renderToggle(key)}
        {key}
        {this.state[key] ? (
          <div>
            {this.renderArgs(field)}
            {this.renderDivider(field)}
            {this.renderReturn(field, key)}
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * TODO docs
   *
   * @private
   */
  render() {
    const { data, name, fields } = this.props;
    return (
      <div>
        <div>{name}</div>
        <ul style={{ listStyleType: 'none' }}>
          {_.keys(data).map(k => (
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
export const NonNullOutput = ({ ofType: { name }, ...props }) =>
  getTypeComponentMap(defaultTypeComponentMap, props)[name]({
    ...props,
    defaultComponent: defaultTypeComponentMap[name]
  });

/**
 * A map from GraphQL types to outputs.
 *
 * @private
 */
const defaultTypeComponentMap = {
  Int: IntegerOutput,
  Float: FloatOutput,
  Boolean: BooleanOutput,
  String: StringOutput,
  ID: StringOutput,
  GraphQLEnumType: EnumOutput,
  GraphQLObjectType: ObjectOutput,
  GraphQLInputObjectType: ObjectInput,
  GraphQLList: ListOutput,
  GraphQLNonNull: NonNullOutput
};

/**
 * Component for displaying GraphQL output types of higher order.
 *
 * @param {GraphQLOutputType} ofType - The type of the input.
 * @param {Object.<GraphQLOutputType, Component>} ofType - Map from GraphQL
 *   input types to components.
 * @returns {React.Element} An element displaying the input.
 */
export const HigherOrderOutput = makeComponent(defaultTypeComponentMap);
