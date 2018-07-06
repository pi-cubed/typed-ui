import React from 'react';

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
export const withRender = WC => ({ render, ...props }) =>
  render ? render(props.data) : <WC {...props} />;

/**
 * TODO docs
 *
 * @private
 */
export const updateArray = (array, index, value) => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};
