import React, { useEffect } from 'react';
import Konva from 'konva';
import usePressedKey from 'hooks/editor/global/usePressedKey';
import useSelect from 'hooks/editor/node/useSelect';
import { Shape } from 'utils/editor/node';
import Selector from 'components/editor/Selector';
import ShapeMatcher from 'pages/editor/components/ShapeMatcher';
import useSafeRef from 'hooks/useSafeRef';
import useApplySelectRules from 'pages/editor/components/ShapeWithSelector/selectRule';

type Props = {
  updateTransformer: (
    konvaNode: Konva.Node | null,
    isSelected: boolean
  ) => void;
  item: Shape;
};

function ShapeWithSelector({ item, updateTransformer }: Props) {
  const { safeRef, setRef } = useSafeRef<Konva.Node | null>();
  const { isSelected, appendSelect, changeSelect, deselect } = useSelect();
  const { isKeyPressed } = usePressedKey(document.body);
  const konvaNode = safeRef().getOrElse(null);

  const select = (item: Shape) =>
    isKeyPressed('Shift') ? appendSelect(item) : changeSelect(item);

  const shapeTransformer = (isSelected: boolean) =>
    updateTransformer(konvaNode, isSelected);

  useEffect(() => {
    shapeTransformer(isSelected(item));
  }, [isSelected(item)]);

  useApplySelectRules(konvaNode, item);

  return (
    <Selector
      onSelect={() => !isSelected(item) && select(item)}
      onDeselect={() => {
        deselect(item);
        shapeTransformer(false);
      }}
    >
      <ShapeMatcher setRef={setRef} shape={item} konvaNode={konvaNode} />
    </Selector>
  );
}

export default ShapeWithSelector;
