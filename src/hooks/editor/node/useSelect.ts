import { useRecoilState } from 'recoil';
import { selectedIdsState } from 'recoils/editor/atoms';
import { Shape } from 'utils/editor/node';

function useSelect() {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const isSelected = (node: Shape) => selectedIds.includes(node.id);

  const resetSelect = () => {
    setSelectedIds([]);
  };

  const deselect = (node: Shape) => {
    setSelectedIds(currentVal =>
      currentVal.filter(selectedId => selectedId !== node.id)
    );
  };

  const appendSelect = (node: Shape) => {
    setSelectedIds(currentVal => [...new Set([...currentVal, node.id])]);
  };

  const changeSelect = (node: Shape) => {
    setSelectedIds([node.id]);
  };

  const replaceSelect = (nodes: Shape[]) => {
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
