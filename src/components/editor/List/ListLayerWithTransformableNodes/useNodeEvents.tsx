import { KonvaNodeEvents } from 'react-konva';
import _ from 'lodash';
import usePressedKey from '../../../../hooks/editor/Global/usePressedKey';
import useSelect from '../../../../hooks/editor/Node/useSelect';
import useTransform from '../../../../hooks/editor/Node/useTransform';
import { Node } from '../../../../types/editor';

function useNodeEvents() {
  const { changeSelect, appendSelect } = useSelect();
  const pressedKey = usePressedKey();
  const { transformNodes } = useTransform();

  const getNodeEvents = (stageId: string, node: Node): KonvaNodeEvents => ({
    onClick: () =>
      pressedKey.current.Shift ? appendSelect(node.id) : changeSelect(node.id),
    onDragEnd: e => {
      const newNode = _.cloneDeep(node);
      newNode.config.x = e.target.x();
      newNode.config.y = e.target.y();
      transformNodes(stageId, [newNode]);
    },
  });

  return {
    getNodeEvents,
  };
}

export default useNodeEvents;
