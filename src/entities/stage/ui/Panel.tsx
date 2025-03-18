import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButtonList } from 'shared/ui';

type Props = {
  onCreate: () => void;
  onDelete: () => void;
  onNext?: () => void;
  onPrev?: () => void;
};

function Panel({ onCreate, onDelete, onNext, onPrev }: Props) {
  return (
    <IconButtonList
      items={[
        {
          icon: <KeyboardArrowUpIcon fontSize="small" />,
          buttonProps: {
            onClick: () => onPrev?.(),
            disabled: !onPrev,
          },
        },
        {
          icon: <KeyboardArrowDownIcon fontSize="small" />,
          buttonProps: {
            onClick: () => onNext?.(),
            disabled: !onNext,
          },
        },
        {
          icon: <AddCircleOutlineIcon fontSize="small" />,
          buttonProps: {
            onClick: onCreate,
          },
        },
        {
          icon: <DeleteIcon fontSize="small" />,
          buttonProps: {
            onClick: onDelete,
          },
        },
      ]}
    />
  );
}

export default Panel;
