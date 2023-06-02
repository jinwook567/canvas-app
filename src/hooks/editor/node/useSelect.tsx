import { useRecoilState } from 'recoil';
import { selectedIdsState } from '../../../recoil/editor/atoms';
import { Child } from '../../../utils/editor/node';

function useSelect() {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const isSelected = (node: Child) => selectedIds.includes(node.id);

  const resetSelect = () => {
    setSelectedIds([]);
  };

  const deselect = (node: Child) => {
    setSelectedIds(currentVal =>
      currentVal.filter(selectedId => selectedId !== node.id)
    );
  };

  const appendSelect = (node: Child) => {
    setSelectedIds(currentVal => [...new Set([...currentVal, node.id])]);
  };

  const changeSelect = (node: Child) => {
    setSelectedIds([node.id]);
  };

  const replaceSelect = (nodes: Child[]) => {
    setSelectedIds(nodes.map(node => node.id));
  };

  return {
    isSelected,
    resetSelect,
    deselect,
    appendSelect,
    changeSelect,
    replaceSelect,
  };
}

export default useSelect;
