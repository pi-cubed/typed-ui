import React from 'react';
import { getNamedType, GraphQLInt, isListType } from 'graphql';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from './PrimitiveInput';
import { ListInput } from './HigherOrderInput';

// TODO docs
const input = Component => onChange => <Component onChange={onChange} />;

// TODO docs
export const getInput = ofType => {
  if (isListType(ofType)) {
    return onChange => <ListInput ofType={ofType.ofType} onChange={onChange} />;
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
      return input(StringInput);
    default:
      return input(StringInput);
  }
};

// TODO docs and do
export const defaultInput = ofType => null;
