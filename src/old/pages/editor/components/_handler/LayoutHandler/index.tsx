import SortableLayout from 'old/components/editor/SortableLayout';
import React from 'react';
import useSelect from 'old/hooks/editor/stage/useSelect';
import useTransform from 'old/hooks/editor/stage/useTransform';

function LayoutHandler() {
  const { selectedStage } = useSelect();
  const { transformStage } = useTransform();

  if (!selectedStage) return null;
  return (
    <SortableLayout
      items={selectedStage.children.reverse()}
      onChange={children =>
        transformStage(selectedStage.setChildren(() => children.reverse()))
      }
    />
  );
}

export default LayoutHandler;
