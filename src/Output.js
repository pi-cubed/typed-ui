import React from 'react';
import { getNamedType, GraphQLInt, isListType, isObjectType } from 'graphql';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from './PrimitiveOutput';
import { ListOutput, ObjectOutput } from './HigherOrderOutput';

// TODO docs
const output = Component => data => <Component data={data} />;

// TODO docs
export const getOutput = ofType => {
  if (isListType(ofType)) {
    return data => <ListOutput ofType={ofType.ofType} data={data} />;
  }
  if (isObjectType(ofType)) {
    return data => (
      <ObjectOutput
        name={ofType.name}
        fields={ofType._typeConfig.fields}
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
