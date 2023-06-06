import React from 'react';
import Konva from 'konva';
import Observer from '../../../components/common/Observer/Observer';
import Maybe from '../../../utils/maybe';
import useSelect from '../../../hooks/editor/stage/useSelect';

type Props = {
  node: Konva.Node | null;
  deselect: () => void;
};

function SelectRuleApplier({ node, deselect }: Props) {
  const { selectedStage } = useSelect();

  const isInSelectedStage = Maybe.fromNullable(node)
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
