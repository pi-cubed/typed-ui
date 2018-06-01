import React, { Component } from 'react';
import {
  getNamedType,
  isListType,
  isEnumType,
  isInputObjectType,
  isObjectType
} from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import { ListInput, ObjectInput } from './HigherOrderInput';
import { ObjectOutput } from './HigherOrderOutput';

// TODO docs
const input = Component => (data, onChange) => (
  <Component data={data} onChange={onChange} />
);

// TODO docs
const componentNames = {
  Int: IntegerInput,
  Float: FloatInput,
  Boolean: BooleanInput,
  String: StringInput,
  ID: StringInput
};

// TODO docs
export const getInput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListInput ofType={ofType.ofType} data={data} onChange={onChange} />
    );
  }
  if (isEnumType(ofType)) {
    return (data, onChange) => (
      <EnumInput
        options={_.keys(ofType._enumConfig.values)}
        data={data}
        onChange={onChange}
      />
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
  return input(componentNames[getNamedType(ofType).name]);
};

// TODO docs and do
export const defaultInput = ofType => null;

// TODO docs
export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.input = getInput(this.props.type);
  }

  onChange = data => {
    this.setState({ data }, () => this.props.onChange(this.state.data));
  };

  render() {
    return this.input(this.state.data, this.onChange);
  }
}
