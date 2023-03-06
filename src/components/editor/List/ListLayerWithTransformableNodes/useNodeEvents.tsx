import { KonvaNodeEvents } from 'react-konva';
import _ from 'lodash';
import usePressedKey from '../../../../hooks/editor/Global/usePressedKey';
import useSelect from '../../../../hooks/editor/Node/useSelect';
import useTransform from '../../../../hooks/editor/Node/useTransform';
import { Node } from '../../../../types/editor';

function useNodeEvents(stageId: string, node: Node): KonvaNodeEvents {
  const { changeSelect, appendSelect } = useSelect();
  const isPressedKey = usePressedKey();
  const { transformNodes } = useTransform();

  return {
    onClick: () =>
      isPressedKey.current.Shift
        ? appendSelect(node.id)
        : changeSelect(node.id),
    onDragEnd: e => {
      const newNode = _.cloneDeep(node);
      newNode.config.x = e.target.x();
      newNode.config.y = e.target.y();
      transformNodes(stageId, [newNode]);
    },
  };
}

export default useNodeEvents;
