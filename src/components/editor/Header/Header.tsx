import _ from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useHistory from '../../../hooks/editor/global/useHistory';
import useDownload from '../../../hooks/editor/stage/useDownload';
import { stageClassesState } from '../../../recoil/editor/atoms';
import HeadControlBar from '../../common/editor/HeadControlBar/HeadControlBar';

function Header() {
  const stages = useRecoilValue(stageClassesState);
  const { requestExport } = useDownload();
  const { historyBack, historyForward } = useHistory();

  const handleRedo = () => {
    historyForward();
  };

  const handleUndo = () => {
    historyBack();
  };

  const handleRequestExport = () => {
    requestExport(
      _.chain(stages)
        .map(stage => stage.node?.toDataURL())
        .compact()
        .value()
    );
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
