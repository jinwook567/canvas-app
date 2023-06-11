import React, { useEffect } from 'react';

type Props = {
  onSelect: () => void;
  onDeselect: () => void;
  children: React.ReactNode;
};

function StageSelector({ onSelect, onDeselect, children }: Props) {
  useEffect(() => {
    onSelect();
    return () => {
      onDeselect();
    };
  }, []);

  return (
    <div onClick={onSelect} role="presentation">
      {children}
    </div>
  );
}

export default StageSelector;
