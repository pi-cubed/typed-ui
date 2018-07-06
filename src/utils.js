import React from 'react';
import { getNamedType } from 'graphql';

/**
 * TODO docs
 *
 * @private
 */
export const withProps = WC => props => newProps => (
  <WC {...newProps} {...props} />
);

/**
 * TODO docs
 *
 * @private
 */
export const updateArray = (array, index, value) => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

export const getComponent = defaultTypeComponentMap => ({
  ofType,
  typeComponentMap = {},
  ...props
}) => {
  const renderMap = {
    ...(typeComponentMap[props.isInput ? 'input' : 'output'] || {}),
    ...defaultTypeComponentMap
  };
  return (renderMap[ofType.constructor.name] ||
    renderMap[getNamedType(ofType).name])({
    ...props,
    ...ofType,
    options: ofType.getValues && _.keys(ofType.getValues()),
    fields: ofType.getFields && ofType.getFields()
  });
};
