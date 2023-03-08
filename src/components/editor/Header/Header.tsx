import React from 'react';
import useHistory from '../../../hooks/editor/Global/useHistory';
import useDownload from '../../../hooks/editor/Stage/useDownload';
import HeadControlBar from '../../common/editor/HeadControlBar/HeadControlBar';

function Header() {
  const { requestExport } = useDownload();
  const { historyBack, historyForward } = useHistory();

  const handleRedo = () => {
    historyForward();
  };

  const handleUndo = () => {
    historyBack();
  };

  const handleRequestExport = () => {
    requestExport();
  };

  return (
    <HeadControlBar
      onRedo={handleRedo}
      onUndo={handleUndo}
      onRequestExport={handleRequestExport}
    />
  );
}

export default Header;
