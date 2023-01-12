import { useRecoilState } from 'recoil';
import { currentStageState } from '../recoil/editor';
import { SelectedIds, KonvaNode, KonvaStage } from '../types/editor';
import { createGroupNode } from '../utils/editor';
import useSelect from './useSelect';

type InitialValue = {
  notGroupNodes: KonvaNode[];
  groupNodes: KonvaNode[];
  firstNodeIndex: number;
};
const initialValue: InitialValue = {
  notGroupNodes: [],
  groupNodes: [],
  firstNodeIndex: Infinity,
};

const separateGroupNodes = ({
  currentStage,
  selectedIds,
}: {
  currentStage: KonvaStage;
  selectedIds: SelectedIds;
}) =>
  currentStage.reduce((acc, node) => {
    if (selectedIds.includes(node.id)) {
      acc.groupNodes.push(node);
      acc.firstNodeIndex = Math.min(
        acc.firstNodeIndex,
        acc.notGroupNodes.length
      );
    } else {
      acc.notGroupNodes.push(node);
    }
    return acc;
  }, initialValue);

function useGroup() {
  const [currentStage, setCurrentStage] = useRecoilState(currentStageState);
  const { selectShape, deselect } = useSelect();

  const organizeGroup = (selectedIds: SelectedIds) => {
    if (selectedIds.length < 2) return;
    const { notGroupNodes, groupNodes, firstNodeIndex } = separateGroupNodes({
      currentStage,
      selectedIds,
    });
    const groupNode = createGroupNode({ children: groupNodes });
    const newStage = [
      ...notGroupNodes.slice(0, firstNodeIndex),
      groupNode,
      ...notGroupNodes.slice(firstNodeIndex, notGroupNodes.length),
    ];

    setCurrentStage(newStage);
    selectShape({ id: groupNode.id, type: 'change' });
  };

  const closeGroup = (groupId: KonvaNode['id']) => {
    const newStage = currentStage.reduce((acc, node) => {
      if (node.id === groupId && node.type === 'group') {
        const children = node.children.map(child => ({
          ...child,
          x: child.x * node.scaleX + node.x,
          y: child.y * node.scaleY + node.y,
          scaleX: child.scaleX * node.scaleX,
          scaleY: child.scaleY * node.scaleY,
        }));
        acc.push(...children);
      } else {
        acc.push(node);
      }

      return acc;
    }, [] as KonvaNode[]);

    deselect();
    setCurrentStage(newStage);
  };

  return { organizeGroup, closeGroup };
}

export default useGroup;
