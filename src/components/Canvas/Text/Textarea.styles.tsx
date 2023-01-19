import styled from '@emotion/styled';
import { KonvaTextConfig } from '../../../types/editor';

export const TextArea = styled.textarea<
  KonvaTextConfig & { width: number; height: number }
>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-family: ${({ fontFamily }) => fontFamily};
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  overflow: hidden;
  max-width: 100%;
  text-align: ${({ align }) => align};
  vertical-align: ${({ verticalAlign }) => verticalAlign};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  transform: rotate(${({ rotation }) => rotation}deg);
  transform-origin: top left;
  line-height: 1;
`;

export default {};
