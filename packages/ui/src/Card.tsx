import styled from 'styled-components';
import _Card from '@material-ui/core/Card';
import { flexbox, space, layout, FlexProps, SpaceProps, compose, LayoutProps } from 'styled-system';

interface CardProps extends FlexProps, SpaceProps, LayoutProps {}

export const Card = styled(_Card)<CardProps>`
  display: flex;
  flex-direction: row;
  ${compose(flexbox, space, layout)}
`;
