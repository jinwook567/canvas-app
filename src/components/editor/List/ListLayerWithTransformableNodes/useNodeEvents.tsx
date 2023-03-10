import { KonvaNodeEvents } from 'react-konva';
import _ from 'lodash';
import usePressedKey from '../../../../hooks/editor/Global/usePressedKey';
import useSelect from '../../../../hooks/editor/Node/useSelect';
import useTransform from '../../../../hooks/editor/Node/useTransform';
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
