import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Size, Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createUniqueId } from '../../../utils/unit';

function useCreate() {
  const setStages = useSetRecoilState(stagesState);

  function createStage(stageWithoutId: Omit<Stage, 'id'>, divSize: Size) {
    const stage = giveId(stageWithoutId);
    const scale = getResizeScale(new StageSize(stage).size, divSize, 0.8);

    setStages(currentVal => [
      ...currentVal,
      {
        ...stage,
        width: new StageSize(stage).width * scale,
        height: new StageSize(stage).height * scale,
      },
    ]);
  }

  return {
    createStage,
  };
}

function giveId(stageWithoutId: Omit<Stage, 'id'>): Stage {
  return { ...stageWithoutId, id: createUniqueId() };
}

export class StageSize {
  _stage: Stage;

  constructor(stage: Stage) {
    this._stage = stage;
  }

  get width() {
    return this._stage.config.width || 0;
  }

  get height() {
    return this._stage.config.height || 0;
  }

  get scaleX() {
    return this._stage.config.scaleX || 1;
  }

  get scaleY() {
    return this._stage.config.scaleY || 1;
  }

  get size() {
    return { width: this.width, height: this.height };
  }
}

export default useCreate;
