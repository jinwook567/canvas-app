import React from 'react';
import {
  ByType,
  Config,
  Ids,
  isParent,
  ParentTypes,
  tree,
  Workspace,
} from '../model';
import { elements } from 'entities/layer';
import { isContainer, Container, get, getElement } from 'features/container';
import { Shape } from 'features/shape';
import { Square } from 'entities/square';

type Props = {
  workspace: Workspace;
  onChange?: (workspace: Workspace) => void;
  selectedIds?: Ids;
  onSelect?: (ids: Ids) => void;
  root: ByType<ParentTypes>;
};

function Tree({ workspace, onChange, selectedIds, onSelect, root }: Props) {
  const t = tree(workspace, root);
  console.log({ t });
  const makeTransformable = (layer: Config<'layer'>): Config<'layer'> => {
    return {
      ...layer,
      elements: selectedIds
        ? [
            ...elements(layer),
            {
              type: 'transformer',
              ratio: 'fixed',
              resize: true,
              rotate: false,
              flip: false,
              elements: [...selectedIds.values()],
              id: 'player1',
            },
          ]
        : elements(layer),
    };
  };

  return (
    <>
      {t.type === 'root' ? (
        t.elements.map(el =>
          isParent(el) ? (
            <Tree
              workspace={workspace}
              onChange={onChange}
              selectedIds={selectedIds}
              root={el}
            />
          ) : (
            <Shape {...el} />
          )
        )
      ) : t.type === 'layer' ? (
        <Container {...t} key={t.id}>
          {({ elements, Element }) => (
            <>
              {elements.map(el => (
                <Element {...el} key={el.id} />
              ))}
            </>
          )}
        </Container>
      ) : isContainer(t) ? (
        <Container {...t}>
          {({Element, elements}) => <></>}
          <Container/>
      ) : (
        <></>
      )}

      {t
        // .map(config =>
        //   config.type === 'layer' ? makeTransformable(config) : config
        // )
        .map(config =>
          isContainer(config) ? (
            <Container {...config} key={config.id}>
              {({ elements, Element }) => (
                <>
                  {elements.map(el => (
                    <Element {...el} key={el.id} />
                  ))}
                </>
              )}
            </Container>
          ) : (
            <Shape {...config} key={config.id} />
          )
        )}
    </>
  );
}

export default Tree;
