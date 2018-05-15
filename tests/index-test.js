import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PrimitiveOutput from '../src/PrimitiveOutput';
import { mutate } from 'fuzzer';

const fuzz = x => mutate.object({ x })().x;

describe('PrimitiveOutput', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('displays string', () => {
    const data = fuzz('abc123');
    render(<PrimitiveOutput data={data} />, node, () =>
      expect(node.innerHTML).toContain(data)
    );
  });

  it('displays integer', () => {
    const data = fuzz(123);
    render(<PrimitiveOutput data={data} />, node, () =>
      expect(node.innerHTML).toContain(data)
    );
  });
});
