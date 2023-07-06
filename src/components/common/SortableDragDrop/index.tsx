import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  UniqueIdentifier,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { Grid } from '@mui/material';

type Props = {
  items: UniqueIdentifier[];
  setItems: (items: Props['items']) => void;
  children: React.ReactNode;
};

function SortableDragDrop({ items, setItems, children }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItem = arrayMove(items, oldIndex, newIndex);
      setItems(newItem);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

type ItemProps = {
  children: React.ReactNode;
  id: UniqueIdentifier;
};

function Item({ children, id }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ width: '100%' }}
    >
      {children}
    </Grid>
  );
}

SortableDragDrop.Item = Item;

export default SortableDragDrop;
