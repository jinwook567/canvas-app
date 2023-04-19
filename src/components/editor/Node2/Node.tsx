import { ReactElement, useEffect } from 'react';

type Props = {
  isSelected: boolean;
  updateTransformer: () => void;
  render: ReactElement;
};

function Node({ isSelected, updateTransformer, render }: Props) {
  useEffect(() => {
    updateTransformer();

    return () => {
      updateTransformer();
    };
  }, [isSelected]);

  return render;
}

export default Node;
