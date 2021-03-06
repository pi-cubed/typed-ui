import React from 'react';
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  getNamedType,
  isLeafType
} from 'graphql';
import deepmerge from 'deepmerge';

/**
 * TODO docs
 *
 * @private
 */
export const updateArray = (array, index, value) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1)
];

/**
 * TODO docs
 *
 * @private
 */
export const removeItem = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
];

/**
 * TODO docs
 *
 * @private
 */
export const merge = (a, b) =>
  deepmerge(a || {}, b || {}, { arrayMerge: (_, x) => x });

/**
 * TODO docs
 *
 * @private
 */
const getComponentName = type =>
  type.constructor.name === 'GraphQLScalarType'
    ? `GraphQL${getNamedType(type).name}`
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
  return getTypeComponentMap(defaultTypeComponentMap, props)[
    getComponentName(ofType)
  ]({
    ...props,
    ...ofType,
    options: ofType.getValues && _.keys(ofType.getValues()),
    fields: ofType.getFields && ofType.getFields(),
    defaultComponent: defaultTypeComponentMap[getComponentName(ofType)]
  });
};

/**
 * TODO docs
 *
 * @private
 */
export const getDefaultFieldData = ({ args = [], type }) => ({
  input: args.reduce(
    (acc, { name, type }) => merge(acc, { [name]: getDefaultData(type) }),
    {}
  ),
  output: getDefaultData(type)
});

/**
 * TODO docs
 *
 * @private
 */
const defaultData = {
  GraphQLInt: type => 0,
  GraphQLFloat: type => 0,
  GraphQLBoolean: type => true,
  GraphQLString: type => '',
  GraphQLID: type => '',
  GraphQLEnumType: t => t.getValues()[0].value,
  GraphQLList: ({ ofType }) => [getDefaultData(ofType)],
  GraphQLNonNull: ({ ofType }) => getDefaultData(ofType),
  GraphQLObjectType: t => ({}),
  GraphQLInputObjectType: type =>
    _.mapValues(type.getFields(), ({ type }) => getDefaultData(type))
};

/**
 * Return default data for a given GraphQL type.
 *
 * @param {GraphQLType} type - The GraphQL type.
 * @returns {*} data.
 *
 * @private
 */
export const getDefaultData = type => defaultData[getComponentName(type)](type);
