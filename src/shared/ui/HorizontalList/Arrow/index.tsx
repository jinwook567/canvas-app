import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
  onClick?: () => void;
  direction: 'left' | 'right';
};

function Arrow({ direction, onClick }: Props) {
  return (
    <KeyboardArrowRightIcon
      sx={{
        transform: `rotate(${direction === 'left' ? 180 : 0}deg)`,
        color: 'black',
      }}
      onClick={onClick}
      fontSize="large"
    />
  );
}

function RightArrow({ onClick }: Omit<Props, 'direction'>) {
  return <Arrow direction="right" onClick={onClick} />;
}

function LeftArrow({ onClick }: Omit<Props, 'direction'>) {
  return <Arrow direction="left" onClick={onClick} />;
}

export { RightArrow, LeftArrow };
