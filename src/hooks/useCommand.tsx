import { RefObject, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedIdsState } from '../recoil/editor';
import useAsset from './useAsset';
import useGroup from './useGroup';
import useSelect from './useSelect';

function useCommand(ref: RefObject<HTMLDivElement>) {
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

  const handleHistoryBack = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'z') {
      e.preventDefault();
    }
  };

  const handleHistoryForward = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target !== ref.current) return;

    handleGroup(e);
    handleDeleteAsset(e);
    handleHistoryBack(e);
    handleHistoryForward(e);
  };

  useEffect(() => {
    ref.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIds]);
}

export default useCommand;
