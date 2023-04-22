import { ReactElement, useEffect } from 'react';

type Props = {
  isSelected: boolean;
  updateTransformer: (isSelected: boolean) => void;
  render: ReactElement;
};

function Node({ isSelected, updateTransformer, render }: Props) {
  useEffect(() => {
    updateTransformer(isSelected);

    return () => {
      updateTransformer(isSelected);
    };
  }, [isSelected]);

  return render;
}

export default Node;
