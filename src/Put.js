import React, { Component } from 'react';
import { isInputType } from 'graphql';
import { Input } from './Input';
import { Output } from './Output';

export const Put = props => {
  const Component = isInputType(props.type) ? Input : Output;
  return <Component {...props} />;
};
