import {
  arrangeSameShapeNode,
  createNodeConfig,
  findSameShapeNode,
  getCenterPosition,
  getInitialPosition,
} from '../editor';

const stageSize = { width: 1000, height: 1000 };
const nodeSize = { width: 500, height: 500 };

test('test getCenterPosition function', () => {
  const { x, y } = getCenterPosition({ stageSize, nodeSize });
  expect(x).toBe(250);
  expect(y).toBe(250);
});

test('test getInitialPosition function', () => {
  const { width, height } = getInitialPosition({
    stageSize,
    nodeSize,
    ratio: 0.3,
  });
  expect(width).toBe(300);
  expect(height).toBe(300);
});

test('test findSameShapeNode function', () => {
  const node1 = createNodeConfig({
    nodeArg: { width: 500, height: 500, url: 'aa', type: 'image' },
    stageSize,
  });
  const node2 = createNodeConfig({
    nodeArg: { width: 500, height: 500, url: 'aa', type: 'image' },
    stageSize,
  });
  const node3 = createNodeConfig({
    nodeArg: { width: 600, height: 300, url: 'aa', type: 'image' },
    stageSize,
  });

  const currentStage = [node1, node2];
  expect(findSameShapeNode({ currentStage, nodeConfig: node1 })).toBe(node1);
  expect(
    findSameShapeNode({ currentStage, nodeConfig: node3 })
  ).toBeUndefined();
});

test('test arrangeSameShapeNode function', () => {
  const node1 = createNodeConfig({
    nodeArg: { width: 500, height: 500, url: 'aa', type: 'image' },
    stageSize,
  });
  const node2 = createNodeConfig({
    nodeArg: { width: 500, height: 500, url: 'aa', type: 'image' },
    stageSize,
  });

  const currentStage = [node1];
  expect(arrangeSameShapeNode({ currentStage, nodeConfig: node2 }).x).toBe(
    node2.x + 15
  );
  expect(arrangeSameShapeNode({ currentStage, nodeConfig: node2 }).y).toBe(
    node2.y + 15
  );
  currentStage.push(arrangeSameShapeNode({ currentStage, nodeConfig: node2 }));

  expect(arrangeSameShapeNode({ currentStage, nodeConfig: node2 }).x).toBe(
    node2.x + 30
  );
  expect(arrangeSameShapeNode({ currentStage, nodeConfig: node2 }).x).toBe(
    node2.x + 30
  );
});

export default {};
