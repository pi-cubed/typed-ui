import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PrimitiveOutput from '../src/PrimitiveOutput';
import { mutate } from 'fuzzer';

describe('PrimitiveOutput', () => {
  let node;
  let data;

  beforeEach(() => {
    node = document.createElement('div');
    data = mutate.string('abc123');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('displays data', () => 
    render(<PrimitiveOutput data={data} />, node, () =>
      expect(node.innerHTML).toContain(data)
    )
  );
});
