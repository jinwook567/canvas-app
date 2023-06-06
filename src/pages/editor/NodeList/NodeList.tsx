import React from 'react';
import Konva from 'konva';
import RefProvider from '../../../components/editor/RefProvider/RefProvider';
import usePressedKey from '../../../hooks/editor/global/usePressedKey';
import useSelect from '../../../hooks/editor/node/useSelect';
import Selector from '../../../components/editor/Selector/Selector';
import { Child } from '../../../utils/editor/node';
import TransformerUpdater from '../TransformerUpdater/TransformerUpdater';
import SelectRuleApplier from '../SelectRuleApplier/SelectRuleApplier';
import Node from '../Node/Node';

type Props = {
  items: Child[];
  updateTransformer: (
    node: Konva.Node | null,
    id: string,
    isSelected: boolean
  ) => void;
};

function NodeList({ items, updateTransformer }: Props) {
  const { isSelected, appendSelect, changeSelect, deselect } = useSelect();
  const { isKeyPressed } = usePressedKey();

  const select = (item: Child) =>
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
                  <Node
                    setRef={setRef}
                    node={item}
                    konvaNode={safeRef().getOrElse(null)}
                  />
                </Selector>

                <TransformerUpdater
                  isSelected={isSelected(item)}
                  update={updateTransformer}
                />
                <SelectRuleApplier
                  node={safeRef().getOrElse(null)}
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

export default NodeList;
