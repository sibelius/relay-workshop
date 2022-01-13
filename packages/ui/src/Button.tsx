import styled from 'styled-components';
import { flexbox, FlexboxProps, space, SpaceProps } from 'styled-system';
import _Button from '@mui/material';

interface ButtonProps extends FlexboxProps, SpaceProps {}

export const Button = styled(_Button)<ButtonProps>`
  ${flexbox}
  ${space}
`;
