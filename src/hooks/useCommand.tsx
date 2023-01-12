import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedIdsState } from '../recoil/editor';
import useAsset from './useAsset';
import useGroup from './useGroup';
import useSelect from './useSelect';

function useCommand() {
  const { organizeGroup, closeGroup } = useGroup();
  const { deleteAsset } = useAsset();
  const { deselect } = useSelect();
  const selectedIds = useRecoilValue(selectedIdsState);

  const handleGroup = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'g') {
      e.preventDefault();
      organizeGroup(selectedIds);
    }

    if (e.metaKey && e.shiftKey && e.key === 'g' && selectedIds.length === 1) {
      e.preventDefault();
      closeGroup(selectedIds[0]);
    }
  };

  const handleDeleteAsset = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      deleteAsset(selectedIds);
      deselect();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    handleGroup(e);
    handleDeleteAsset(e);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIds]);
}

export default useCommand;
