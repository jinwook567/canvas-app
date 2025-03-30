import React, { useState } from 'react';
import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import { Grid, Paper } from '@mui/material';
import { DivSize, SortableDnd } from 'shared/ui';
import PreviewShape from 'old/components/editor/PreviewShape';
import { Shape } from 'old/utils/editor/node';
import DragIndicator from '@mui/icons-material/DragIndicator';

type Props = {
  onChange: (itmes: Props['items']) => void;
  items: Shape[];
};

function SortableLayout({ onChange, items }: Props) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleSelect = (id: UniqueIdentifier) => {
    setActiveId(id);
  };

  const handleItems = (f: (items: Shape[]) => Shape[]) => {
    onChange(f(items));
  };

  const selectedItem = items.find(item => item.id === activeId);

  return (
    <SortableDnd onDragEnd={handleItems} onDragStart={handleSelect}>
      <SortableDnd.Context items={items.map(item => item.id)}>
        {items.map(item => (
          <SortableDnd.Item id={item.id} key={item.id}>
            <Item shape={item} />
          </SortableDnd.Item>
        ))}
      </SortableDnd.Context>
      {selectedItem && (
        <DragOverlay>
          <Item shape={selectedItem} />
        </DragOverlay>
      )}
    </SortableDnd>
  );
}

type ItemProps = {
  shape: Shape;
};

function Item({ shape }: ItemProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 0.5,
        height: 50,
        mb: 1,
      }}
    >
      <Grid
        container
        sx={{ width: '100%', height: '100%' }}
        alignItems="center"
      >
        <DragIndicator />
        <Grid flex={1} height={1}>
          <DivSize
            inherit
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {size => <PreviewShape shape={shape} parentSize={size} />}
          </DivSize>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SortableLayout;
