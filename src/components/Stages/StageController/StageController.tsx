import React from 'react';
import useEditor from '../../../hooks/useEditor';

type Props = {
  index: number;
};

function StageController({ index }: Props) {
  const { handleAppendStage } = useEditor();
  return (
    <div>
      <button
        onClick={() => handleAppendStage(index)}
        type="button"
        data-testid={`add-stage-${index}`}
      >
        Stage 추가
      </button>
    </div>
  );
}

export default StageController;
