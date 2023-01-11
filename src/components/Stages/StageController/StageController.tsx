import React from 'react';
import useStage from '../../../hooks/useStage';

type Props = {
  index: number;
};

function StageController({ index }: Props) {
  const { appendStage, deleteStage } = useStage();
  const handleAppendStage = () => {
    appendStage(index);
  };
  const handleDeleteStage = () => {
    deleteStage(index);
  };

  return (
    <div>
      <button
        onClick={handleAppendStage}
        type="button"
        data-testid={`add-stage-${index}`}
      >
        Stage 추가
      </button>
      <button
        onClick={handleDeleteStage}
        type="button"
        data-testid={`delete-stage-${index}`}
      >
        Stage 제거
      </button>
    </div>
  );
}

export default StageController;
