import React from 'react';
import {
  getNamedType,
  isListType,
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
export const getInput = ofType => {
  if (isListType(ofType)) {
    return (data, onChange) => (
      <ListInput ofType={ofType.ofType} data={data} onChange={onChange} />
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
  switch (getNamedType(ofType).name) {
    case 'Int':
      return input(IntegerInput);
    case 'Float':
      return input(FloatInput);
    case 'Boolean':
      return input(BooleanInput);
    case 'GraphQLEnumType':
      return input(EnumInput);
    case 'String':
    case 'ID':
    default:
      return input(StringInput);
  }
};

// TODO docs and do
export const defaultInput = ofType => null;

// TODO docs
export const Input = ({ type, data, onChange }) =>
  getInput(type)(data, onChange);
