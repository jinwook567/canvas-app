import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedIdsState, stagesState } from '../../../recoil/editor/atoms';
import { selectedStageState } from '../../../recoil/editor/selectors';
import { Stage, Node } from '../../../types/editor';
import usePrevious from '../../usePrevious';
import useSelect from '../Node/useSelect';
import useHistory from './useHistory';

function useSideEffects() {
  useHistoryEffects();
  useSelectEffects();
  useCreateSelectEffects();
}

function useHistoryEffects() {
  const stages = useRecoilValue(stagesState);
  const { createHistory } = useHistory();

  useEffect(() => {
    createHistory(stages);
  }, [stages]);
}

function useSelectEffects() {
  const selectedStage = useRecoilValue(selectedStageState);
  const selectedIds = useRecoilValue(selectedIdsState);
  const { resetSelect, deselect } = useSelect();

  useEffect(() => {
    if (!selectedStage) {
      if (selectedIds.length !== 0) resetSelect();
      return;
    }

    const areSelectedNodesInSelectedStage = selectedIds.every(selectedId =>
      selectedStage.nodes.find(node => node.id === selectedId)
    );

    if (!areSelectedNodesInSelectedStage) {
      selectedIds
        .filter(
          selectedId =>
            !selectedStage.nodes.find(node => node.id === selectedId)
        )
        .forEach(id => deselect(id));
    }
  }, [selectedStage, selectedIds]);
}

function useCreateSelectEffects() {
  const stages = useRecoilValue(stagesState);
  const previous = usePrevious(hash(stages));
  const { replaceSelect } = useSelect();

  useEffect(() => {
    if (!previous) return;

    const newNodeIds = hash(stages).reduce((acc, node) => {
      if (!previous.some(prevNode => prevNode.id === node.id)) {
        acc.push(node.id);
      }
      return acc;
    }, [] as string[]);

    if (!isAllNodesReplaced() && isNewNodeCreated()) {
      replaceSelect(newNodeIds);
    }

    function isAllNodesReplaced() {
      return (
        newNodeIds.length === hash(stages).length && previous?.length !== 0
      );
    }

    function isNewNodeCreated() {
      return newNodeIds.length > 0;
    }
  }, [stages]);

  function hash(stages: Stage[]) {
    const arr: Node[] = [];
    stages.forEach(stage => {
      stage.nodes.forEach(node => arr.push(node));
    });
    return arr;
  }
}

export default useSideEffects;
