import React from 'react';
import Masonry from '@mui/lab/Masonry';
import * as Styled from 'components/editor/Asset/styles';
import HorizontalList from 'components/common/HorizontalList';

type Props = {
  children: React.ReactNode;
};

function Asset({ children }: Props) {
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
  onClick: () => void;
};

function Item({ children, onClick }: ItemProps) {
  return <Styled.Button onClick={onClick}>{children}</Styled.Button>;
}

Asset.Horizontal = Horizontal;
Asset.Mansory = Mansory;
Asset.Item = Item;

export default Asset;
