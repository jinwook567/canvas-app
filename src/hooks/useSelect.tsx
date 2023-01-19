import { useSetRecoilState } from 'recoil';
import { selectedIdsState } from '../recoil/editor';
import { KonvaNodeConfig } from '../types/editor';

function useSelect() {
  const setSelectedIds = useSetRecoilState(selectedIdsState);

  const selectShape = ({
    id,
    type,
  }: {
    id: KonvaNodeConfig['id'];
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
