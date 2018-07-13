import React from 'react';
import { getNamedType } from 'graphql';

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
  const c = map[ofType.constructor.name] || map[getNamedType(ofType).name];
  return ofType in ['Int', 'Float', 'String', 'Boolean', 'ID'] ? 0 : c;
};

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
