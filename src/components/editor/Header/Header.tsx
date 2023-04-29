import React from 'react';
import useHistory from '../../../hooks/editor/global/useHistory';
import HeadControlBar from '../../common/editor/HeadControlBar/HeadControlBar';

type Props = {
  onRequestExport: () => void;
};

function Header({ onRequestExport }: Props) {
  const { historyBack, historyForward } = useHistory();

  const handleRedo = () => {
    historyForward();
  };

  const handleUndo = () => {
    historyBack();
  };

  return (
    <HeadControlBar
      onRedo={handleRedo}
      onUndo={handleUndo}
      onRequestExport={onRequestExport}
    />
  );
}

export default Header;
