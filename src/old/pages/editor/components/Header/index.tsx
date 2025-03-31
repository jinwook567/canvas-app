import React from 'react';
import useHistory from 'old/hooks/editor/global/useHistory';
import TopControlBar from 'widgets/workspace/ui/TopControlBar';

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

  return null;
}

export default Header;
