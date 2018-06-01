import React, { Component } from 'react';
import {
  getNamedType,
  GraphQLInt,
  isListType,
  isEnumType,
  isObjectType,
  isInputObjectType,
  isWrappingType
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
const componentNames = {
  Int: IntegerOutput,
  Float: FloatOutput,
  Boolean: BooleanOutput,
  String: StringOutput,
  ID: StringOutput
};

// TODO docs
export const getOutput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListOutput ofType={ofType.ofType} data={data} onChange={onChange} />
    );
  }
  if (isEnumType(ofType)) {
    return output(EnumOutput);
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
  if (isWrappingType(ofType)) {
    return getOutput(ofType.ofType);
  }
  return output(componentNames[getNamedType(ofType).name]);
};

// TODO docs
export class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.output = getOutput(this.props.type);
  }

  onChange = data => {
    this.setState({ data }, () => this.props.onChange(this.state.data));
  };

  render() {
    return this.output(this.state.data, this.onChange);
  }
}
