import { Workspace } from './core';

export const root = {
  type: 'root' as const,
  id: 'canvas',
  children: ['stage1'],
  parent: null,
};

export const mockWs: Workspace = {
  canvas: root,
  stage1: {
    type: 'stage',
    id: 'stage1',
    children: ['layer1'],
    parent: 'canvas',
    width: 500,
    height: 500,
  },
  layer1: {
    type: 'layer',
    id: 'layer1',
    children: ['square1', 'square2', 'square3'],
    parent: 'stage1',
  },
  square1: {
    type: 'square',
    id: 'square1',
    width: 50,
    height: 50,
    x: 100,
    y: 100,
    parent: 'layer1',
    fill: 'green',
  },
  square2: {
    type: 'square',
    id: 'square2',
    width: 100,
    height: 100,
    x: 200,
    y: 200,
    parent: 'layer1',
    fill: 'green',
  },
  square3: {
    type: 'square',
    id: 'square3',
    width: 300,
    height: 100,
    x: 200,
    y: 200,
    parent: 'layer1',
    fill: 'green',
  },
};
