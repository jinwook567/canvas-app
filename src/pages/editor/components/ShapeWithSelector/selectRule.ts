import Konva from 'konva';
import useSelect from 'hooks/editor/stage/useSelect';
import useSelectShape from 'hooks/editor/node/useSelect';
import { Maybe } from 'shared/lib';
import { useEffect } from 'react';
import { Shape } from 'utils/editor/node';

function useApplySelectRules(konvaNode: Konva.Node | null, shape: Shape) {
  const { selectedStage } = useSelect();
  const { deselect } = useSelectShape();

  const isInSelectedStage = Maybe.fromNullable(konvaNode)
    .map(node => node.getStage())
    .map(stage => stage.id())
    .map(id => id === selectedStage?.id);

  useEffect(() => {
    if (!isInSelectedStage) deselect(shape);
  }, [isInSelectedStage, shape]);
}

export default useApplySelectRules;
