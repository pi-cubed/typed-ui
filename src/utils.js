import React from 'react';
import { getNamedType, isLeafType } from 'graphql';

/**
 * TODO docs
 *
 * @private
 */
export const updateArray = (array, index, value) => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

/**
 * TODO docs
 *
 * @private
 */
const getComponent = (map, ofType) => {
  const c = map[getComponentName(ofType)];
  return ofType in ['Int', 'Float', 'String', 'Boolean', 'ID'] ? 0 : c;
};

/**
 * TODO docs
 *
 * @private
 */
const getComponentName = type =>
  type.constructor.name === 'GraphQLScalarType'
    ? getNamedType(type).name
    : type.constructor.name;

/**
 * TODO docs
 *
 * @private
 */
export const getTypeComponentMap = (
  defaultTypeComponentMap,
  { typeComponentMap = {}, isInput }
) => ({
  ...defaultTypeComponentMap,
  ...(typeComponentMap[isInput ? 'input' : 'output'] || {})
});

/**
 * TODO docs
 *
 * @private
 */
export const makeComponent = defaultTypeComponentMap => ({
  ofType,
  ...props
}) => {
  return getComponent(
    getTypeComponentMap(defaultTypeComponentMap, props),
    ofType
  )({
    ...props,
    ...ofType,
    options: ofType.getValues && _.keys(ofType.getValues()),
    fields: ofType.getFields && ofType.getFields(),
    defaultComponent: getComponent(defaultTypeComponentMap, ofType)
  });
};

/**
 * TODO docs
 *
 * @private
 */
const defaultInputs = {
  Int: type => 0,
  Float: type => 0,
  Boolean: type => true,
  String: type => '',
  ID: type => '',
  GraphQLEnumType: type => '',
  GraphQLObjectType: type =>
    _.mapValues(type.getFields(), ({ type }) => getDefaultInput(type)),
  GraphQLInputObjectType: type =>
    _.mapValues(type.getFields(), ({ type }) => getDefaultInput(type)),
  GraphQLList: type => [],
  GraphQLNonNull: ({ ofType }) => getDefaultInput(ofType)
};

/**
 * TODO docs
 *
 * @private
 */
export const getDefaultInput = type =>
  defaultInputs[getComponentName(type)](type);
