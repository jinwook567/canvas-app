import React from 'react';
import useEditor from '../../../hooks/useEditor';

type Props = {
  index: number;
};

function StageController({ index }: Props) {
  const { handleAppendStage, handleDeleteStage } = useEditor();
  return (
    <div>
      <button
        onClick={() => handleAppendStage(index)}
        type="button"
        data-testid={`add-stage-${index}`}
      >
        Stage 추가
      </button>
      <button
        onClick={() => handleDeleteStage(index)}
        type="button"
        data-testid={`delete-stage-${index}`}
      >
        Stage 제거
      </button>
    </div>
  );
}

export default StageController;
