import React from 'react';
import { Box } from '@mui/material';
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
    <Box sx={{ width: 1 }}>
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
    </Box>
  );
}

export default StageController;
