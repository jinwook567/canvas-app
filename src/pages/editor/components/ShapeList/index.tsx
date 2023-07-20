import React from 'react';
import Konva from 'konva';
import RefProvider from 'components/editor/RefProvider';
import usePressedKey from 'hooks/editor/global/usePressedKey';
import useSelect from 'hooks/editor/node/useSelect';
import Selector from 'components/editor/Selector';
import { Shape } from 'utils/editor/node';
import TransformerUpdater from 'pages/editor/components/TransformerUpdater';
import SelectRuleApplier from 'pages/editor/components/SelectRuleApplier';
import ShapeMatcher from 'pages/editor/components/ShapeMatcher';

type Props = {
  items: Shape[];
  updateTransformer: (
    konvaNode: Konva.Node | null,
    id: string,
    isSelected: boolean
  ) => void;
};

function ShapeList({ items, updateTransformer }: Props) {
  const { isSelected, appendSelect, changeSelect, deselect } = useSelect();
  const { isKeyPressed } = usePressedKey(document.body);

  const select = (item: Shape) =>
    isKeyPressed('Shift') ? appendSelect(item) : changeSelect(item);

  const curriedUpdateTransformer =
    (node: Konva.Node | null, id: string) => (isSelected: boolean) =>
      updateTransformer(node, id, isSelected);

  return (
    <>
      {items.map(item => (
        <RefProvider<Konva.Node | null> key={item.id}>
          {({ setRef, safeRef }) => {
            const updateTransformer = curriedUpdateTransformer(
              safeRef().getOrElse(null),
              item.id
            );

            return (
              <>
                <Selector
                  onSelect={() => !isSelected(item) && select(item)}
                  onDeselect={() => {
                    deselect(item);
                    updateTransformer(false);
                  }}
                >
                  <ShapeMatcher
                    setRef={setRef}
                    shape={item}
                    konvaNode={safeRef().getOrElse(null)}
                  />
                </Selector>

                <TransformerUpdater
                  isSelected={isSelected(item)}
                  update={updateTransformer}
                />
                <SelectRuleApplier
                  konvaNode={safeRef().getOrElse(null)}
                  deselect={() => deselect(item)}
                />
              </>
            );
          }}
        </RefProvider>
      ))}
    </>
  );
}

export default ShapeList;
