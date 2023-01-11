import { KonvaNodeEvents } from 'react-konva';
import usePressedKey from '../../../hooks/usePressedKey';
import useEditor from '../../../hooks/useEditor';
import { KonvaNode } from '../../../types/editor';

function useNodeEvents(node: KonvaNode) {
  const isPressedKeyRef = usePressedKey();

  const { handleTransformNodes, selectShape } = useEditor();

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
    onDragEnd: e => {
      const x = e.target.x();
      const y = e.target.y();
      const { id } = node;
      handleTransformNodes([{ id, x, y }]);
    },
  };

  return nodeEvents;
}

export default useNodeEvents;
