import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedIdsState,
  stageSizeState,
  stagesState,
  currentStageState,
} from '../recoil/editor';
import useAsset from './useAsset';
import useGroup from './useGroup';
import useSelect from './useSelect';
import useStage from './useStage';
import useTransform from './useTransform';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [stageSize, setStageSize] = useRecoilState(stageSizeState);
  const selectedIds = useRecoilValue(selectedIdsState);
  const currentStage = useRecoilValue(currentStageState);

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
  };
}

export default useEditor;
