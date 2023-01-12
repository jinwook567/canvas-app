import { KonvaNodeEvents } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import usePressedKey from '../../../hooks/usePressedKey';
import { KonvaNode } from '../../../types/editor';
import useSelect from '../../../hooks/useSelect';
import useTransform from '../../../hooks/useTransform';

function useNodeEvents(node: KonvaNode) {
  const isPressedKeyRef = usePressedKey();

  const { selectShape } = useSelect();
  const { onTransformEnd } = useTransform();

  const handleOnDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    const x = e.target.x();
    const y = e.target.y();
    onTransformEnd([{ id, x, y }]);
  };

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
    onDragEnd: handleOnDragEnd,
  };

  return nodeEvents;
}

export default useNodeEvents;
