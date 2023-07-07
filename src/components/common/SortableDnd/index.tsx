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
  DragStartEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { Grid } from '@mui/material';

type OnDragEnd<T extends { id: UniqueIdentifier }> = (
  updater: (item: T[]) => T[]
) => void;

type Props<T extends { id: UniqueIdentifier }> = {
  children: React.ReactNode;
  onDragStart?: (id: UniqueIdentifier) => void;
  onDragEnd: OnDragEnd<T>;
};

function SortableDnd<T extends { id: UniqueIdentifier }>({
  children,
  onDragStart,
  onDragEnd,
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onDragEnd(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        const newItem = arrayMove(items, oldIndex, newIndex);
        return newItem;
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (onDragStart) onDragStart(active.id);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}

type ContextProps = {
  items: UniqueIdentifier[];
  children: React.ReactNode;
};

function Context({ items, children }: ContextProps) {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {children}
    </SortableContext>
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

SortableDnd.Context = Context;
SortableDnd.Item = Item;

export default SortableDnd;
