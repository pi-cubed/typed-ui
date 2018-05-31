import React, { Component } from 'react';
import {
  getNamedType,
  GraphQLInt,
  isListType,
  isObjectType,
  isInputObjectType
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

// TODO docs
const output = Component => (data, onChange) => (
  <Component data={data} onChange={onChange} />
);

// TODO docs
export const getOutput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListOutput ofType={ofType.ofType} data={data} onChange={onChange} />
    );
  }
  if (isObjectType(ofType)) {
    return (data, onChange) => (
      <ObjectOutput
        name={ofType.name}
        fields={ofType._typeConfig.fields}
        data={data}
        onChange={onChange}
      />
    );
  }
  if (isInputObjectType(ofType)) {
    return (data, onChange) => (
      <ObjectInput
        name={ofType.name}
        fields={ofType._typeConfig.fields}
        onChange={onChange}
        data={data}
      />
    );
  }
  switch (getNamedType(ofType).name) {
    case 'Int':
      return output(IntegerOutput);
    case 'Float':
      return output(FloatOutput);
    case 'Boolean':
      return output(BooleanOutput);
    case 'GraphQLEnumType':
      return output(EnumOutput);
    case 'String':
    case 'ID':
    default:
      return output(StringOutput);
  }
};

// TODO docs
export class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  onChange = data => {
    this.setState({ data }, () => this.props.onChange(this.state.data));
  };

  render() {
    return getOutput(this.props.type)(this.state.data, this.onChange);
  }
}
