import React from 'react';
import useHistory from 'old/hooks/editor/global/useHistory';
import HeadControlBar from 'old/components/editor/HeadControlBar';

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
