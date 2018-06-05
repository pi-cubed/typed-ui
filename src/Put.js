import React, { Component } from 'react';
import { isInputObjectType, isWrappingType } from 'graphql';
import { Input } from './Input';
import { Output } from './Output';

/**
 * TODO docs
 */
export const Put = ({ type, onChange = () => {}, ...props }) => {
  const Component =
    isInputObjectType(type) ||
    (isWrappingType(type) && isInputObjectType(type.ofType))
      ? Input
      : Output;
  return <Component {...props} type={type} onChange={onChange} />;
};
