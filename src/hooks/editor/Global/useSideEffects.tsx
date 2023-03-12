import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedIdsState, stagesState } from '../../../recoil/editor/atoms';
import { selectedStageState } from '../../../recoil/editor/selectors';
import useSelect from '../Node/useSelect';
import useHistory from './useHistory';

function useSideEffects() {
  const stages = useRecoilValue(stagesState);
  const { createHistory } = useHistory();

  useEffect(() => {
    createHistory(stages);
  }, [stages]);

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

export default useSideEffects;
