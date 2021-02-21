import styled from 'styled-components';
import { flexbox, space, layout, LayoutProps, SpaceProps, FlexboxProps, compose } from 'styled-system';

interface ContentProps extends FlexboxProps, SpaceProps, LayoutProps {}

export const Content = styled.div<ContentProps>`
  max-width: 500px;
  margin: 0 auto;
  padding: 35px;

  ${compose(flexbox, space, layout)}
`;
