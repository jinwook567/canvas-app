import Konva from 'konva';
import { NodeElement, toNodeElement } from './node';

export type ContainerElement = NodeElement & { children: NodeElement[] };

export function toContainerElement(
  node: Konva.Stage | Konva.Layer | Konva.Group
): ContainerElement {
  return {
    ...toNodeElement(node),
    children: (node.children || []).map(child => toNodeElement(child)),
  };
}
