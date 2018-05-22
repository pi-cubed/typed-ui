import React from 'react';
import { getNamedType, isListType, isInputObjectType } from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import { ListInput, ObjectInput } from './HigherOrderInput';

// TODO docs
const input = Component => onChange => <Component onChange={onChange} />;

// TODO docs
export const getInput = ofType => {
  if (isListType(ofType)) {
    return onChange => <ListInput ofType={ofType.ofType} onChange={onChange} />;
  }
  if (isInputObjectType(ofType)) {
    return onChange => (
      <ObjectInput
        name={ofType.name}
        fields={ofType._typeConfig.fields}
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
