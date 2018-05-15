import React, { Component } from 'react';

/**
 * Returns a div surrounding the supplied data.
 * @param {Object} props - The component props.
 * @param {*} props.data - The primitive data.
 * @returns {Component} A div surrounding the data.
 */
function PrimitiveOutput({ data }) {
  return <div>{data}</div>;
}

export default PrimitiveOutput; 