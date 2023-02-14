import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedIdsState,
  stageSizeState,
  stageListState,
  currentStageState,
} from '../recoil/editor';
import useAsset from './useAsset';
import useGroup from './useGroup';
import useEditorHistory from './useEditorHistory';
import useSelect from './useSelect';
import useStage from './useStage';
import useTransform from './useTransform';
import useSideEffects from './useSideEffects';

function useEditor() {
  const [stages, setStages] = useRecoilState(stageListState);
  const [stageSize, setStageSize] = useRecoilState(stageSizeState);
  const selectedIds = useRecoilValue(selectedIdsState);
  const currentStage = useRecoilValue(currentStageState);

  useSideEffects();

  return {
    stages,
    setStages,
    currentStage,
    stageSize,
    setStageSize,
    selectedIds,
    ...useStage(),
    ...useAsset(),
    ...useSelect(),
    ...useGroup(),
    ...useTransform(),
    ...useEditorHistory(),
  };
}

export default useEditor;
