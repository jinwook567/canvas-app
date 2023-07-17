import useHistory from 'hooks/editor/global/useHistory';
import usePressedKey from 'hooks/editor/global/usePressedKey';
import useAdd from 'hooks/editor/node/useAdd';
import useGroup from 'hooks/editor/node/useGroup';
import useRemove from 'hooks/editor/node/useRemove';
import useSelect from 'hooks/editor/stage/useSelect';
import { pipe } from 'ramda';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedNodesState, stagesState } from 'recoils/editor/atoms';
import { Group, Shape } from 'utils/editor/node';

function GlobalEffect() {
  useHistoryEffects();
  useKeyboardShortCut();
  return null;
}

function useHistoryEffects() {
  const stages = useRecoilValue(stagesState);
  const { createHistory } = useHistory();

  useEffect(() => {
    createHistory(stages);
  }, [stages]);
}

function useKeyboardShortCut() {
  const copiedNodes = useRef<Shape[]>([]);

  const { removeNodes } = useRemove();
  const selectedNodes = useRecoilValue(selectedNodesState);
  const { addNodesToStage } = useAdd();
  const { selectedStage } = useSelect();
  const shapeGroup = useGroup();

  const remove = () => removeNodes(selectedNodes);
  const copy = () => (copiedNodes.current = selectedNodes);
  const paste = () =>
    selectedStage &&
    addNodesToStage(
      copiedNodes.current.map(shape => shape.duplicate()),
      selectedStage
    );
  const group = () =>
    selectedNodes.length >= 2 && shapeGroup.group(selectedNodes);
  const ungroup = () =>
    selectedNodes.length === 1 &&
    selectedNodes[0].type === 'group' &&
    shapeGroup.ungroup(selectedNodes[0] as Group);

  const controlKeys = ['Meta', 'Control'];

  const shortCuts = [
    { key: ['Backspace'], f: remove },
    { key: ['Delete'], f: remove },
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'c'], f: copy })),
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'v'], f: paste })),
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'x'], f: pipe(copy, remove) })),
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'd'], f: pipe(copy, paste) })),
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'g'], f: group })),
    ...controlKeys.map(ctrl => ({ key: [ctrl, 'Shift', 'g'], f: ungroup })),
  ];

  const keyboardEvent = (isSelected: (...keys: string[]) => boolean) => {
    shortCuts.forEach(({ key, f }) => {
      if (isSelected(...key)) f();
    });
  };

  usePressedKey(keyboardEvent);
}

export default GlobalEffect;
