import { ReactElement, useEffect } from 'react';

type Props = {
  isSelected: boolean;
  isInSelectedStage: boolean;
  updateTransformer: (isSelected: boolean) => void;
  select: () => void;
  deselect: () => void;
  render: ReactElement;
};

function Node({
  isSelected,
  isInSelectedStage,
  updateTransformer,
  select,
  deselect,
  render,
}: Props) {
  useEffect(() => {
    updateTransformer(isSelected);
  }, [isSelected]);

  useEffect(() => {
    select();
    return () => {
      deselect();
      updateTransformer(false);
    };
  }, []);

  useEffect(() => {
    if (isSelected && !isInSelectedStage) deselect();
  }, [isSelected, isInSelectedStage]);

  return render;
}

export default Node;
