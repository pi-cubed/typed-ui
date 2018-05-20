import React, { Component } from 'react';

/**
 * Returns a list surrounding the supplied list data.
 *
 * @param {Object} props - The component props.
 * @param {GraphQLType} props.type - The type of the list items.
 * @param {*} props.data - The list data.
 * @returns {Component} A list surrounding the list items.
 *
 * @example <caption>Display a list of strings</caption>
 * <ListOutput type={GraphQLString} data={['abc', 'd', 'xyz']} />
 * @example <caption>Display a list of list of integers</caption>
 * <ListOutput type={GraphQLList(GraphQLInt)} data={[[0, 1, 2], [10, 11, 12], [50, 100]]} />
 */
export const ListOutput = ({ type, data }) => {
  // TODO
};
