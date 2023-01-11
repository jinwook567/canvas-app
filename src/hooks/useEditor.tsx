import { MutableRefObject, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedIdsState,
  stageSizeState,
  stagesState,
  currentStageIndexState,
  currentStageState,
} from '../recoil/editor';
import {
  IsPressedKey,
  KonvaNode,
  KonvaStage,
  KonvaStages,
  NodeArg,
  SelectedIds,
  StageIndex,
  TransformedNodes,
} from '../types/editor';
import {
  arrangeSameShapeNode,
  createGroupNode,
  createNode,
} from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [currentStageIndex, setCurrentStageIndex] = useRecoilState(
    currentStageIndexState
  );
  const [stageSize, setStageSize] = useRecoilState(stageSizeState);

  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);
  const currentStage = useRecoilValue(currentStageState);

  const handleAppendAsset = (nodeArg: NodeArg) => {
    const node = createNode({ nodeArg, stageSize });

    const newAttrs = stages.map((nodes, index) =>
      index === currentStageIndex
        ? [...nodes, arrangeSameShapeNode({ currentStage, node })]
        : nodes
    );

    setStages(newAttrs);
  };

  const checkTargetIndexInRange = (targetIndex: StageIndex) => {
    if (targetIndex >= stages.length || targetIndex < 0)
      throw new Error('wrong targetIndex range');
  };

  const selectStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);
    setCurrentStageIndex(targetIndex);
  };

  const handleAppendStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);

    const appendedStages = stages.reduce(
      (acc, cur, index) =>
        index === targetIndex ? [...acc, cur, []] : [...acc, cur],
      [] as KonvaStages
    );

    setStages(appendedStages);
    setCurrentStageIndex(targetIndex + 1);
  };

  const handleDeleteStage = (targetIndex: StageIndex) => {
    if (stages.length === 1 && targetIndex === 0) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages.filter((_, index) => index !== targetIndex));
    setCurrentStageIndex(currentStageIndex === 0 ? 0 : currentStageIndex - 1);
  };

  const selectShape = ({
    id,
    type,
  }: {
    id: KonvaNode['id'];
    type: 'append' | 'change';
  }) => {
    setSelectedIds(
      type === 'append' ? ids => [...new Set([...ids, id])] : [id]
    );
  };

  const deselect = () => {
    setSelectedIds([]);
  };

  useEffect(() => {
    console.log('iam rendered');
    deselect();
  }, [currentStageIndex]);

  const handleChangeCurrentStage = (newStage: KonvaStage) => {
    const newStages = stages.map((stage, index) =>
      index === currentStageIndex ? newStage : stage
    );
    setStages(newStages);
  };

  const handleTransformNodes = (transformedNodes: TransformedNodes[]) => {
    const newStage = currentStage.map(node => {
      const transformedNode = transformedNodes.find(
        trNode => trNode.id === node.id
      );
      return transformedNode ? { ...node, ...transformedNode } : node;
    });
    handleChangeCurrentStage(newStage);
  };

  const handleOrganizeGroup = (ids: SelectedIds) => {
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

    const { notGroupNodes, groupNodes, firstNodeIndex } = currentStage.reduce(
      (acc, node) => {
        if (ids.includes(node.id)) {
          acc.groupNodes.push(node);
          acc.firstNodeIndex = Math.min(
            acc.firstNodeIndex,
            acc.notGroupNodes.length
          );
        } else {
          acc.notGroupNodes.push(node);
        }
        return acc;
      },
      initialValue
    );

    const groupNode = createGroupNode({ children: groupNodes });

    const newStage = [
      ...notGroupNodes.slice(0, firstNodeIndex),
      groupNode,
      ...notGroupNodes.slice(firstNodeIndex, notGroupNodes.length),
    ];

    handleChangeCurrentStage(newStage);
    selectShape({ id: groupNode.id, type: 'change' });
  };

  const handleCloseGroup = (groupId: KonvaNode['id']) => {
    deselect();

    const newStage = currentStage.reduce((acc, node) => {
      if (node.id === groupId && node.type === 'group') {
        const children = node.children.map(child => ({
          ...child,
          x: child.x + node.x,
          y: child.y + node.y,
          scaleX: child.scaleX * node.scaleX,
          scaleY: child.scaleY * node.scaleY,
        }));
        acc.push(...children);
      } else {
        acc.push(node);
      }

      return acc;
    }, [] as KonvaNode[]);

    handleChangeCurrentStage(newStage);
  };

  return {
    handleAppendAsset,
    handleAppendStage,
    handleDeleteStage,
    stages,
    setStages,
    currentStageIndex,
    currentStage,
    selectStage,
    stageSize,
    setStageSize,
    selectedIds,
    selectShape,
    deselect,
    handleTransformNodes,
    handleOrganizeGroup,
    handleCloseGroup,
  };
}

export function usePressedKey() {
  const initialValue: IsPressedKey = {
    Shift: false,
  };

  const isPressedKeyRef = useRef<{ [key in string]: boolean }>(initialValue);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isPressedKeyRef.current[e.key] !== undefined) {
      isPressedKeyRef.current[e.key] = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (isPressedKeyRef.current[e.key] !== undefined) {
      isPressedKeyRef.current[e.key] = false;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isPressedKeyRef as MutableRefObject<IsPressedKey>;
}

export default useEditor;
