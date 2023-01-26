import { Grid, IconButton } from '@mui/material';
import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import useEditorHistory from '../../../hooks/useEditorHistory';
import useDownload from '../../../hooks/useDownload';

function HeaderController() {
  const { historyBack, historyForward } = useEditorHistory();
  const { triggerDownload } = useDownload();
  return (
    <Grid container columnGap={1}>
      <IconButton onClick={historyBack}>
        <UndoIcon fontSize="medium" />
      </IconButton>

      <IconButton onClick={historyForward}>
        <RedoIcon fontSize="medium" />
      </IconButton>

      <IconButton onClick={triggerDownload}>
        <DownloadIcon fontSize="medium" />
      </IconButton>
    </Grid>
  );
}

export default HeaderController;
