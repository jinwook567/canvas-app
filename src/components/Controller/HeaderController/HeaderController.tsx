import { Grid, IconButton } from '@mui/material';
import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import useEditorHistory from '../../../hooks/useEditorHistory';

function HeaderController() {
  const { historyBack, historyForward } = useEditorHistory();
  return (
    <Grid container columnGap={1}>
      <IconButton onClick={historyBack}>
        <UndoIcon fontSize="medium" />
      </IconButton>

      <IconButton onClick={historyForward}>
        <RedoIcon fontSize="medium" />
      </IconButton>
    </Grid>
  );
}

export default HeaderController;
