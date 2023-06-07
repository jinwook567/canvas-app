import React from 'react';
import Konva from 'konva';
import Observer from '../../../components/common/Observer/Observer';
import Maybe from '../../../utils/maybe';
import useSelect from '../../../hooks/editor/stage/useSelect';

type Props = {
  konvaNode: Konva.Node | null;
  deselect: () => void;
};

function SelectRuleApplier({ konvaNode, deselect }: Props) {
  const { selectedStage } = useSelect();

  const isInSelectedStage = Maybe.fromNullable(konvaNode)
    .map(node => node.getStage())
    .map(stage => stage.id())
    .map(id => id === selectedStage?.id);

  return (
    <Observer
      value={isInSelectedStage}
      watchers={[isInSelectedStage => !isInSelectedStage && deselect()]}
    />
  );
}

export default SelectRuleApplier;
