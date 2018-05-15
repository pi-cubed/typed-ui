import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PrimitiveOutput from '../src/PrimitiveOutput';

describe('PrimitiveOutput', () => {
  let node;
  const x = 'hew';

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('displays data', () => {
    render(<PrimitiveOutput data={x} />, node, () => {
      expect(node.innerHTML).toContain(x);
    });
  });
});
