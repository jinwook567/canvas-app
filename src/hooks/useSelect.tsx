import { useSetRecoilState } from 'recoil';
import { selectedIdsState } from '../recoil/editor';
import { KonvaNode } from '../types/editor';

function useSelect() {
  const setSelectedIds = useSetRecoilState(selectedIdsState);

  const selectShape = ({
    id,
    type,
  }: {
    id: KonvaNode['id'];
    type: 'append' | 'change';
  }) => {
    setSelectedIds(
      type === 'append' ? ids => [...new Set([...ids, id])] : [id]
    );
  };

  const deselect = () => {
    setSelectedIds([]);
  };

  return { selectShape, deselect };
}

export default useSelect;
