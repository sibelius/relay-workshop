import styled from 'styled-components';
import _Card from '@mui/material/Card';
import { flexbox, space, layout, FlexboxProps, SpaceProps, compose, LayoutProps } from 'styled-system';

interface CardProps extends FlexboxProps, SpaceProps, LayoutProps {}

export const Card = styled(_Card)<CardProps>`
  display: flex;
  flex-direction: row;
  ${compose(flexbox, space, layout)}
`;
