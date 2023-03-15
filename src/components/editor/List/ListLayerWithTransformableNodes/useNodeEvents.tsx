import { KonvaNodeEvents } from 'react-konva';
import usePressedKey from '../../../../hooks/editor/global/usePressedKey';
import useSelect from '../../../../hooks/editor/node/useSelect';
import useTransform from '../../../../hooks/editor/node/useTransform';
import { Node } from '../../../../types/editor';

function useNodeEvents() {
  const { changeSelect, appendSelect, isSelected } = useSelect();
  const pressedKey = usePressedKey();
  const { transformNodesConfig } = useTransform();

  function getNodeEvents(node: Node): KonvaNodeEvents {
    return {
      onClick: select,
      onTouchStart: select,
      onMouseDown: select,
      onDragEnd: e => {
        transformNodesConfig([
          { id: node.id, config: { x: e.target.x(), y: e.target.y() } },
        ]);
      },
      ...(node.type === 'text' && {
        onChange: (text: string) => {
          transformNodesConfig([{ id: node.id, config: { text } }]);
        },
      }),
    };

    function select() {
      return pressedKey.current.Shift
        ? !isSelected(node.id) && appendSelect(node.id)
        : !isSelected(node.id) && changeSelect(node.id);
    }
  }

  return {
    getNodeEvents,
  };
}

export default useNodeEvents;
