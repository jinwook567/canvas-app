import React from 'react';
import Observer from '../../../components/common/Observer/Observer';

type Props = {
  isSelected: boolean;
  update: (isSelected: boolean) => void;
};

function TransformerUpdater({ isSelected, update }: Props) {
  return <Observer value={isSelected} watchers={[update]} />;
}

export default TransformerUpdater;
