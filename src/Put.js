import React, { Component } from 'react';
import { isInputObjectType, isWrappingType } from 'graphql';
import { Input } from './Input';
import { Output } from './Output';

const isInput = type =>
  isInputObjectType(type) ||
  (isWrappingType(type) && isInputObjectType(type.ofType));

/**
 * TODO docs
 */
export const Put = ({ type, onChange = () => {}, ...props }) => {
  const Component = isInput(type) ? Input : Output;
  return <Component type={type} onChange={onChange} {...props} />;
};
