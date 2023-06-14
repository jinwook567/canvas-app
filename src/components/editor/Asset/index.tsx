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

function Wrapper(child: React.ReactNode) {
  return <Styled.Button>{child}</Styled.Button>;
}

function Horizontal({ children }: Props) {
  return (
    <Styled.HorizontalContainer>
      <HorizontalList>
        {React.Children.map(children, child => child)}
      </HorizontalList>
    </Styled.HorizontalContainer>
  );
}

function Mansory({ children }: Props) {
  return (
    <Masonry columns={2}>
      {React.Children.map(children, Wrapper) as NonNullable<React.ReactNode>}
    </Masonry>
  );
}

Asset.Horizontal = Horizontal;
Asset.Mansory = Mansory;

export default Asset;
