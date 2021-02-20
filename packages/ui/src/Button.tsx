import styled from 'styled-components';
import { flexbox, FlexProps, space, SpaceProps } from 'styled-system';
import _Button from '@material-ui/core/Button';

interface ButtonProps extends FlexProps, SpaceProps {}

export const Button = styled(_Button)<ButtonProps>`
  ${flexbox}
  ${space}
`;
