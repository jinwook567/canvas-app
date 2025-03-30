import React from 'react';
import Masonry from '@mui/lab/Masonry';
import * as Styled from 'shared/ui/Gallery/styles';
import { HorizontalList } from 'shared/ui';

type Props = {
  children: React.ReactNode;
};

function Gallery({ children }: Props) {
  return <Styled.Container>{children}</Styled.Container>;
}

function Horizontal({ children }: Props) {
  return (
    <Styled.HorizontalContainer>
      <HorizontalList>{children}</HorizontalList>
    </Styled.HorizontalContainer>
  );
}

function Mansory({ children }: { children: NonNullable<React.ReactNode> }) {
  return <Masonry columns={3}>{children}</Masonry>;
}

type ItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Item({ children, onClick }: ItemProps) {
  return <Styled.Button onClick={onClick}>{children}</Styled.Button>;
}

Gallery.Horizontal = Horizontal;
Gallery.Mansory = Mansory;
Gallery.Item = Item;

export default Gallery;
