import React from 'react';
import { getNamedType, GraphQLInt, isListType } from 'graphql';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from './PrimitiveOutput';
import { ListOutput } from './HigherOrderOutput';

// TODO docs
const output = Component => data => <Component data={data} />;

// TODO docs
export const getOutput = ofType => {
  if (isListType(ofType)) {
    return data => <ListOutput ofType={ofType.ofType} data={data} />;
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
      return output(StringOutput);
    default:
      return output(StringOutput);
  }
};
